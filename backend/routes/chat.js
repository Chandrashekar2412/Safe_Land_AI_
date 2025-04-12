const express = require('express');
const router = express.Router();
const path = require('path');
const rateLimit = require('express-rate-limit');
const fetch = require('node-fetch');
require('dotenv').config({ path: path.resolve(__dirname, '../.env') });

// Create a rate limiter
const limiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 10, // limit each IP to 10 requests per windowMs
    message: { error: 'Too many requests, please try again later.' }
});

// Apply rate limiting to all routes
router.use(limiter);

// Fallback responses for when API is unavailable
const fallbackResponses = [
    "I'm currently experiencing technical difficulties. Please try again later or contact support.",
    "I'm temporarily unavailable. For immediate assistance, please contact our support team.",
    "The AI service is currently undergoing maintenance. Please try again in a few minutes.",
    "I'm having trouble connecting to my knowledge base right now. Please try again later.",
    "Due to high demand, I'm temporarily unavailable. Please try again in a few moments."
];

// Get a random fallback response
const getRandomFallbackResponse = () => {
    const randomIndex = Math.floor(Math.random() * fallbackResponses.length);
    return fallbackResponses[randomIndex];
};

// Simple aviation knowledge base for fallback responses
const aviationKnowledgeBase = {
    "landing": "A proper landing requires maintaining the correct approach speed, descent rate, and alignment with the runway. Ensure flaps are in the correct position and monitor your instruments throughout the approach.",
    "takeoff": "During takeoff, ensure proper engine power settings, monitor airspeed, and maintain the correct climb rate. Be prepared to abort if any parameters are outside normal limits.",
    "weather": "Always check weather conditions before flight. Pay attention to visibility, wind speed and direction, and any potential hazards like thunderstorms or icing conditions.",
    "emergency": "In case of emergency, follow your aircraft's emergency procedures. Maintain control of the aircraft, communicate your situation to ATC, and prepare for an emergency landing if necessary.",
    "safety": "Aviation safety is paramount. Always perform pre-flight checks, maintain situational awareness, and follow standard operating procedures to ensure a safe flight.",
    "default": "As a flight safety assistant, I can provide information about aviation safety, landing procedures, and flight operations. What specific information do you need?"
};

// Function to get a relevant response from the knowledge base
const getKnowledgeBaseResponse = (message) => {
    const lowerMessage = message.toLowerCase();
    
    // Check for keywords in the message
    for (const [key, response] of Object.entries(aviationKnowledgeBase)) {
        if (lowerMessage.includes(key)) {
            return response;
        }
    }
    
    // If no specific keyword is found, return the default response
    return aviationKnowledgeBase.default;
};

router.post('/', async (req, res) => {
    console.log('Received chat request:', {
        body: req.body,
        headers: req.headers
    });

    if (!req.body || !req.body.message) {
        console.log('Missing message in request body');
        return res.status(400).json({ error: 'Message is required' });
    }

    try {
        const { message } = req.body;
        console.log('Processing message:', message);

        // Check if we should use Hugging Face API or fallback to knowledge base
        const useHuggingFace = process.env.USE_HUGGING_FACE === 'true';
        const huggingFaceApiKey = process.env.HUGGING_FACE_API_KEY;
        
        if (useHuggingFace && huggingFaceApiKey) {
            try {
                console.log('Using Hugging Face API');
                
                // Call Hugging Face Inference API
                const response = await fetch(
                    "https://api-inference.huggingface.co/models/facebook/blenderbot-400M-distill",
                    {
                        headers: { 
                            Authorization: `Bearer ${huggingFaceApiKey}`,
                            "Content-Type": "application/json"
                        },
                        method: "POST",
                        body: JSON.stringify({ 
                            inputs: `You are a helpful flight safety assistant. ${message}`,
                            parameters: {
                                max_length: 100,
                                temperature: 0.7
                            }
                        }),
                    }
                );
                
                if (!response.ok) {
                    throw new Error(`Hugging Face API error: ${response.status}`);
                }
                
                const result = await response.json();
                console.log('Hugging Face API response:', result);
                
                // Extract the generated text from the response
                let aiResponse = '';
                if (result && result[0] && result[0].generated_text) {
                    aiResponse = result[0].generated_text;
                } else {
                    throw new Error('Invalid response format from Hugging Face API');
                }
                
                return res.json({ 
                    response: aiResponse,
                    status: 'success',
                    source: 'huggingface'
                });
            } catch (huggingFaceError) {
                console.error('Hugging Face API Error:', huggingFaceError);
                
                // If Hugging Face API fails, use knowledge base
                const knowledgeBaseResponse = getKnowledgeBaseResponse(message);
                console.log('Using knowledge base due to Hugging Face API error');
                
                return res.json({ 
                    response: knowledgeBaseResponse,
                    status: 'success',
                    source: 'knowledge_base',
                    error: huggingFaceError.message
                });
            }
        } else {
            // Use knowledge base directly
            console.log('Using knowledge base directly');
            const knowledgeBaseResponse = getKnowledgeBaseResponse(message);
            
            return res.json({ 
                response: knowledgeBaseResponse,
                status: 'success',
                source: 'knowledge_base'
            });
        }
    } catch (error) {
        console.error('Chat Error:', error);
        console.error('Full error details:', JSON.stringify(error, null, 2));
        
        // Use fallback response in case of any error
        const fallbackResponse = getRandomFallbackResponse();
        
        return res.status(500).json({ 
            response: fallbackResponse,
            status: 'success',
            source: 'fallback',
            error: error.message
        });
    }
});

module.exports = router; 