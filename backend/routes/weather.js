const express = require('express');
const router = express.Router();
const fetch = require('node-fetch');

router.post('/', async (req, res) => {
  try {
    const { city } = req.body;
    if (!city) {
      return res.status(400).json({ error: 'City name is required' });
    }

    const apiKey = process.env.OPENWEATHERMAP_API_KEY;
    if (!apiKey) {
      console.error('OpenWeatherMap API key is missing');
      return res.status(500).json({ error: 'Weather API key is not configured' });
    }

    // Using the correct OpenWeatherMap API endpoint
    const weatherUrl = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;
    console.log('Fetching weather data from:', weatherUrl);
    
    const response = await fetch(weatherUrl);
    const data = await response.json();
    
    if (!response.ok) {
      console.error('OpenWeatherMap API error:', data);
      throw new Error(data.message || 'Failed to fetch weather data');
    }

    // Log successful response for debugging
    console.log('Weather data received:', {
      city: data.name,
      temperature: data.main.temp,
      windSpeed: data.wind.speed,
      visibility: data.visibility,
      weather: data.weather[0].main
    });

    res.json(data);
  } catch (error) {
    console.error('Weather API error:', error);
    res.status(500).json({ 
      error: error.message || 'Failed to fetch weather data',
      details: error.message
    });
  }
});

module.exports = router; 