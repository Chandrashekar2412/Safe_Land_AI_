import { useState } from 'react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { Card } from './ui/card';
import { MessageSquare, X, AlertCircle, Info } from 'lucide-react';
import axios from 'axios';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  source?: 'huggingface' | 'knowledge_base' | 'fallback';
}

export function ChatBot() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [showFallbackWarning, setShowFallbackWarning] = useState(false);
  const [showInfoBanner, setShowInfoBanner] = useState(true);

  const handleSendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);
    setShowFallbackWarning(false);

    try {
      console.log('Sending message to backend:', input);
      const response = await axios.post('/api/chat', {
        message: input
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log('Received response from backend:', response.data);

      const assistantMessage: Message = {
        role: 'assistant',
        content: response.data.response || 'Sorry, I could not process your request.',
        source: response.data.source
      };

      // Show warning if using fallback response
      if (response.data.source === 'fallback') {
        setShowFallbackWarning(true);
      }

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error: any) {
      console.error('Chat error details:', {
        status: error.response?.status,
        data: error.response?.data,
        message: error.message
      });

      let errorMessage = 'Sorry, there was an error processing your request.';
      
      if (error.response?.status === 429) {
        errorMessage = 'Rate limit exceeded. Please try again in a few moments.';
      } else if (error.response?.status === 401) {
        errorMessage = 'Authentication error. Please try logging in again.';
      } else if (error.response?.data?.error) {
        errorMessage = error.response.data.error;
      }

      setMessages(prev => [...prev, {
        role: 'assistant',
        content: errorMessage
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <>
      {/* Floating Assistive Ball */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="fixed bottom-8 right-8 bg-blue-600 text-white p-4 rounded-full shadow-lg hover:bg-blue-700 transition-all duration-300 z-50"
          aria-label="Open chat assistant"
        >
          <MessageSquare className="h-6 w-6" />
        </button>
      )}

      {/* Chat Interface */}
      {isOpen && (
        <div className="fixed bottom-8 right-8 w-[350px] bg-white rounded-lg shadow-xl z-50">
          {/* Chat Header */}
          <div className="flex justify-between items-center p-4 border-b bg-blue-600 text-white rounded-t-lg">
            <h3 className="font-semibold">Flight Safety Assistant</h3>
            <button
              onClick={() => setIsOpen(false)}
              className="p-1 hover:bg-blue-700 rounded-full transition-colors"
              aria-label="Close chat"
            >
              <X className="h-5 w-5" />
            </button>
          </div>

          {/* Info Banner */}
          {showInfoBanner && (
            <div className="bg-blue-50 border-l-4 border-blue-400 p-3 text-blue-700 text-sm flex items-start">
              <Info className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-medium">Free AI Assistant</p>
                <p className="text-xs mt-1">This assistant uses a free AI model and a knowledge base to provide aviation safety information.</p>
                <button 
                  onClick={() => setShowInfoBanner(false)}
                  className="text-xs text-blue-600 hover:underline mt-1"
                >
                  Dismiss
                </button>
              </div>
            </div>
          )}

          {/* Fallback Warning */}
          {showFallbackWarning && (
            <div className="bg-yellow-50 border-l-4 border-yellow-400 p-3 text-yellow-700 text-sm flex items-start">
              <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
              <p>The AI service is currently experiencing issues. You're receiving a fallback response.</p>
            </div>
          )}

          {/* Messages Container */}
          <div className="h-[400px] overflow-y-auto p-4 space-y-4">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-[80%] rounded-lg p-3 ${
                    message.role === 'user'
                      ? 'bg-blue-500 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {message.content}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-gray-100 rounded-lg p-3 text-gray-800">
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-100" />
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce delay-200" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input Form */}
          <div className="p-4 border-t">
            <div className="flex space-x-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
                placeholder="Type your message..."
                disabled={isLoading}
              />
              <Button onClick={handleSendMessage} disabled={isLoading}>
                Send
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
} 