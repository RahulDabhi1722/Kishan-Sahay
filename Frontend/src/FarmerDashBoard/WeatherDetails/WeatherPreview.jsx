import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { FiCheckCircle, FiAlertTriangle } from 'react-icons/fi';

import WeatherSearch from './WeatherSearch';
import CurrentWeather from './CurrentWeather';
import FarmingAdvice from './FarmingAdvice';
import Forecast from './Forecast';
import AgriculturalImpact from './AgriculturalImpact';
import FarmerNavbar from '../NavBar/NavBar';
import Footer from '../../components/Common/Footer/Footer';

// Use the backend proxy instead of direct API calls
const API_BASE_URL = 'http://localhost:5000/api/weather';

const WeatherDetails = () => {
  const [location, setLocation] = useState('');
  const [searchedLocation, setSearchedLocation] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [forecast, setForecast] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [unit, setUnit] = useState('metric'); // 'metric' for Celsius, 'imperial' for Fahrenheit
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  
  const suggestionsRef = useRef(null);

  useEffect(() => {
    const defaultCity = "New Delhi"; // Default to a location in India
    
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        position => {
          fetchWeatherByCoords(position.coords.latitude, position.coords.longitude);
        },
        err => {
          console.log("Geolocation error:", err);
          setLoading(false);
          fetchWeatherByCity(defaultCity);
        },
        { timeout: 10000 }
      );
    } else {
      setLoading(false);
      fetchWeatherByCity(defaultCity);
    }
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (suggestionsRef.current && !suggestionsRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    if (searchedLocation) {
      fetchWeatherByCity(searchedLocation);
    }
  }, [searchedLocation]);

  useEffect(() => {
    if (location.length < 3) {
      setSuggestions([]);
      setShowSuggestions(false);
      return;
    }

    const delayDebounceFn = setTimeout(async () => {
      try {
        // Use the backend proxy for location suggestions
        const res = await axios.get(
          `${API_BASE_URL}/locations?query=${location}`
        );
        setSuggestions(res.data.data); // Access the data through .data.data
        setShowSuggestions(true);
      } catch (err) {
        console.error('Error fetching location suggestions:', err);
        setSuggestions([]);
      }
    }, 500);

    return () => clearTimeout(delayDebounceFn);
  }, [location]);

  const formatTemp = (temp) => {
    if (unit === 'metric') {
      return `${Math.round(temp)}°C`;
    } else {
      return `${Math.round(temp)}°F`;
    }
  };

  const getWeatherIcon = (iconCode) => {
    // Your icon mapping logic...
    return iconCode ? <span>{iconCode}</span> : <span>🌤️</span>;
  };

  const formatDay = (timestamp) => {
    const date = new Date(timestamp * 1000);
    const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return days[date.getDay()];
  };

  const formatTime = (timestamp) => {
    const date = new Date(timestamp * 1000);
    let hours = date.getHours();
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // hour '0' should be '12'
    return `${hours}:${minutes} ${ampm}`;
  };

  const handleSuggestionClick = (suggestion) => {
    setLocation(`${suggestion.name}, ${suggestion.country}`);
    setShowSuggestions(false);
    fetchWeatherByCoords(suggestion.lat, suggestion.lon);
  };

  const fetchWeatherByCoords = async (lat, lon) => {
    try {
      setLoading(true);
      setError(null);
      
      // Use the backend proxy for current weather
      const currentRes = await axios.get(
        `${API_BASE_URL}/current?lat=${lat}&lon=${lon}&units=${unit}`, 
        {
          timeout: 10000 // 10 second timeout
        }
      );

      // Use the backend proxy for forecast
      const forecastRes = await axios.get(
        `${API_BASE_URL}/forecast?lat=${lat}&lon=${lon}&units=${unit}`, 
        {
          timeout: 10000 // 10 second timeout
        }
      );
      
      // Access the data through .data.data
      setWeatherData(currentRes.data.data);
      
      // Access the data through .data.data.list
      const dailyForecast = forecastRes.data.data.list
        .filter(item => item.dt_txt && item.dt_txt.includes('12:00'))
        .slice(0, 3); // Get 3 days forecast
      
      setForecast(dailyForecast);
      setLocation(`${currentRes.data.data.name}, ${currentRes.data.data.sys.country}`);
      setLoading(false);
    } catch (err) {
      console.error('Error in fetchWeatherByCoords:', err);
      setError('Failed to fetch weather data. Please try again later.');
      setLoading(false);
    }
  };

  const fetchWeatherByCity = async (city) => {
    try {
      setLoading(true);
      setError(null);
      
      // Use the backend proxy for current weather
      const currentRes = await axios.get(
        `${API_BASE_URL}/city?city=${city}&units=${unit}`, 
        {
          timeout: 10000 // 10 second timeout
        }
      );

      // Use the backend proxy for forecast
      const forecastRes = await axios.get(
        `${API_BASE_URL}/forecast?q=${city}&units=${unit}`, 
        {
          timeout: 10000 // 10 second timeout
        }
      );
      
      // Access the data through .data.data
      setWeatherData(currentRes.data.data);
      
      // Access the data through .data.data.list
      const dailyForecast = forecastRes.data.data.list
        .filter(item => item.dt_txt && item.dt_txt.includes('12:00'))
        .slice(0, 3); // Get 3 days forecast
      
      setForecast(dailyForecast);
      setLocation(`${currentRes.data.data.name}, ${currentRes.data.data.sys.country}`);
      setLoading(false);
    } catch (err) {
      console.error('Error in fetchWeatherByCity:', err);
      setError(err.response?.data?.message || 'Failed to fetch weather data');
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (location.trim()) {
      setSearchedLocation(location);
      setShowSuggestions(false);
    }
  };

  const toggleUnit = () => {
    const newUnit = unit === 'metric' ? 'imperial' : 'metric';
    setUnit(newUnit);
    
    if (weatherData) {
      if (weatherData.coord) {
        fetchWeatherByCoords(weatherData.coord.lat, weatherData.coord.lon);
      } else if (searchedLocation) {
        fetchWeatherByCity(searchedLocation);
      }
    }
  };

  const getFarmingAdvice = () => {
    if (!weatherData) return null;
    
    const temp = weatherData.main.temp;
    const humidity = weatherData.main.humidity;
    const windSpeed = weatherData.wind.speed;
    const description = weatherData.weather[0].main.toLowerCase();
    
    const highTemp = unit === 'metric' ? 30 : 86;
    const midTemp = unit === 'metric' ? 15 : 59;
    const windThreshold = unit === 'metric' ? 10 : 22; // m/s vs mph
    
    if (description.includes('rain') || description.includes('drizzle')) {
      return "Heavy rain expected - consider postponing outdoor activities like spraying and harvesting. Good time for planting if not excessive.";
    } else if (description.includes('storm')) {
      return "Thunderstorm alert - secure equipment and livestock. Avoid open fields and tall structures.";
    } else if (description.includes('snow')) {
      return "Protect crops from frost damage. Ensure livestock has shelter.";
    } else if (description.includes('clear') && temp > highTemp) {
      return "High temperature alert - increase irrigation, consider shading for sensitive crops. Work during cooler hours.";
    } else if (windSpeed > windThreshold) {
      return "Strong winds expected - delay spraying operations and secure structures.";
    } else if (humidity > 80) {
      return "High humidity - monitor for disease development in susceptible crops.";
    } else if (description.includes('clear') && temp > midTemp && temp < highTemp) {
      return "Ideal conditions for most field operations. Good day for planting, spraying, or harvesting.";
    }
    
    return "Check detailed forecast for planning your farming activities.";
  };

  return (
    <>
      <FarmerNavbar />
      <section className="py-12 bg-gradient-to-br from-green-50 to-amber-50 px-4">
        <div className="container mx-auto mt-14">
          <h2 className="text-3xl font-bold text-center">Agricultural Weather Forecast</h2>
          <div className="flex flex-col md:flex-row justify-between items-center mb-8 mt-7">
            <div className="flex items-center">
              <div className="flex items-center text-green-600 mr-3">
                <FiCheckCircle className="mr-1" />
                <span className="text-xs">Live Weather</span>
              </div>
              <button 
                onClick={toggleUnit}
                className="bg-green-600 text-white px-3 py-1 rounded-md text-sm mr-4 hover:bg-green-700 transition-colors"
              >
                Switch to {unit === 'metric' ? 'Fahrenheit (°F)' : 'Celsius (°C)'}
              </button>
              <Link to="/weather" className="text-green-600 hover:underline flex items-center">
                <span>Detailed forecast</span>
                <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                </svg>
              </Link>
            </div>
          </div>

          <div className="mb-4 text-center">
            <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700">
              Currently showing temperatures in: {unit === 'metric' ? 'Celsius (°C)' : 'Fahrenheit (°F)'}
            </span>
          </div>

          <WeatherSearch 
            location={location}
            setLocation={setLocation}
            handleSearch={handleSearch}
            suggestions={suggestions}
            showSuggestions={showSuggestions}
            handleSuggestionClick={handleSuggestionClick}
            suggestionsRef={suggestionsRef}
          />

          {error && (
            <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-4 mb-6">
              <div className="flex">
                <FiAlertTriangle className="h-5 w-5 mr-2 text-red-500" />
                <p>{error}</p>
              </div>
            </div>
          )}

          {loading ? (
            <div className="flex justify-center items-center py-12">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
            </div>
          ) : weatherData && (
            <>
              <CurrentWeather 
                location={location}
                weatherData={weatherData}
                unit={unit}
                formatTemp={formatTemp}
                getWeatherIcon={getWeatherIcon}
                formatTime={formatTime}
              />

              <FarmingAdvice advice={getFarmingAdvice()} />

              <Forecast 
                forecast={forecast}
                formatDay={formatDay}
                formatTemp={formatTemp}
                getWeatherIcon={getWeatherIcon}
                unit={unit}
              />

              <AgriculturalImpact 
                weatherData={weatherData}
                unit={unit}
              />
            </>
          )}
        </div>
        <Footer />
      </section>
    </>
  );
};

export default WeatherDetails;