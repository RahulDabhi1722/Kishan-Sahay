// Backend route in your Express server
// filepath: d:\PROJECTS\Farmer-Helper\Backend\routes\weatherRoutes.js
const express = require('express');
const axios = require('axios');
const router = express.Router();

const API_KEY = process.env.OPENWEATHERMAP_API_KEY;
const BASE_URL = 'https://api.openweathermap.org/data/2.5';
const GEO_URL = 'https://api.openweathermap.org/geo/1.0';

// Get current weather by coords
router.get('/current', async (req, res) => {
  try {
    const { lat, lon, units = 'metric' } = req.query;
    
    if (!lat || !lon) {
      return res.status(400).json({ 
        success: false, 
        message: 'Latitude and longitude are required' 
      });
    }
    
    const response = await axios.get(
      `${BASE_URL}/weather?lat=${lat}&lon=${lon}&units=${units}&appid=${API_KEY}`
    );
    
    res.json({
      success: true,
      data: response.data
    });
  } catch (error) {
    console.error('Weather API error:', error.response?.data || error.message);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching weather data',
      error: error.response?.data?.message || error.message
    });
  }
});

// Get forecast by coords
// Update the forecast route to handle queries by city name

// Get forecast by coords or city
router.get('/forecast', async (req, res) => {
    try {
      const { lat, lon, q, units = 'metric' } = req.query;
      
      let url;
      if (lat && lon) {
        url = `${BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=${units}&appid=${API_KEY}`;
      } else if (q) {
        url = `${BASE_URL}/forecast?q=${q}&units=${units}&appid=${API_KEY}`;
      } else {
        return res.status(400).json({ 
          success: false, 
          message: 'Either coordinates (lat/lon) or city name (q) are required' 
        });
      }
      
      const response = await axios.get(url);
      
      res.json({
        success: true,
        data: response.data
      });
    } catch (error) {
      console.error('Weather API error:', error.response?.data || error.message);
      res.status(500).json({ 
        success: false, 
        message: 'Error fetching forecast data',
        error: error.response?.data?.message || error.message
      });
    }
  });
// Get current weather by city
router.get('/city', async (req, res) => {
  try {
    const { city, units = 'metric' } = req.query;
    
    if (!city) {
      return res.status(400).json({ 
        success: false, 
        message: 'City name is required' 
      });
    }
    
    const response = await axios.get(
      `${BASE_URL}/weather?q=${city}&units=${units}&appid=${API_KEY}`
    );
    
    res.json({
      success: true,
      data: response.data
    });
  } catch (error) {
    console.error('Weather API error:', error.response?.data || error.message);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching weather data',
      error: error.response?.data?.message || error.message
    });
  }
});

// Get location suggestions
router.get('/locations', async (req, res) => {
  try {
    const { query } = req.query;
    
    if (!query) {
      return res.status(400).json({ 
        success: false, 
        message: 'Search query is required' 
      });
    }
    
    const response = await axios.get(
      `${GEO_URL}/direct?q=${query}&limit=5&appid=${API_KEY}`
    );
    
    res.json({
      success: true,
      data: response.data
    });
  } catch (error) {
    console.error('Weather API error:', error.response?.data || error.message);
    res.status(500).json({ 
      success: false, 
      message: 'Error fetching location data',
      error: error.response?.data?.message || error.message
    });
  }
});

module.exports = router;