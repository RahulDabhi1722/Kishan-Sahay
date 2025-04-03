import React from 'react';
import { FiMapPin } from 'react-icons/fi';
import { WiHumidity, WiStrongWind, WiBarometer, WiRaindrops, WiSunrise, WiSunset } from 'react-icons/wi';

const CurrentWeather = ({ location, weatherData, unit, formatTemp, getWeatherIcon, formatTime }) => {
  return (
    <div className="mb-8 bg-white rounded-lg shadow-md overflow-hidden">
      <div className="bg-gray-600 text-white p-4">
        <h3 className="text-xl font-semibold flex items-center">
          <FiMapPin className="mr-2" />
          {location}
        </h3>
      </div>
      <div className="p-6">
        <div className="flex flex-col sm:flex-row justify-between">
          <div className="flex items-center mb-4 sm:mb-0">
            {getWeatherIcon(weatherData.weather[0].icon)}
            <div className="ml-4">
              <p className="text-3xl font-bold">{formatTemp(weatherData.main.temp)}</p>
              <p className="text-lg text-gray-600 capitalize">{weatherData.weather[0].description}</p>
            </div>
          </div>
          <div className="flex flex-wrap sm:grid sm:grid-cols-2 gap-4">
            <div className="flex items-center">
              <WiHumidity size={28} className="text-blue-500 mr-2" />
              <div>
                <p className="text-sm text-gray-600">Humidity</p>
                <p className="font-semibold">{weatherData.main.humidity}%</p>
              </div>
            </div>
            <div className="flex items-center">
              <WiStrongWind size={28} className="text-gray-500 mr-2" />
              <div>
                <p className="text-sm text-gray-600">Wind</p>
                <p className="font-semibold">{Math.round(weatherData.wind.speed)} {unit === 'metric' ? 'm/s' : 'mph'}</p>
              </div>
            </div>
            <div className="flex items-center">
              <WiBarometer size={28} className="text-gray-600 mr-2" />
              <div>
                <p className="text-sm text-gray-600">Pressure</p>
                <p className="font-semibold">{weatherData.main.pressure} hPa</p>
              </div>
            </div>
            <div className="flex items-center">
              <WiRaindrops size={28} className="text-blue-400 mr-2" />
              <div>
                <p className="text-sm text-gray-600">Precipitation</p>
                <p className="font-semibold">{weatherData.rain ? `${weatherData.rain['1h']} mm` : '0 mm'}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div className="mt-6 flex flex-col sm:flex-row justify-between border-t pt-4 border-gray-200">
          <div className="mb-3 sm:mb-0">
            <div className="flex items-center">
              <WiSunrise size={24} className="text-yellow-500 mr-2" />
              <div>
                <p className="text-sm text-gray-600">Sunrise</p>
                <p className="font-semibold">{formatTime(weatherData.sys.sunrise)}</p>
              </div>
            </div>
          </div>
          <div>
            <div className="flex items-center">
              <WiSunset size={24} className="text-orange-500 mr-2" />
              <div>
                <p className="text-sm text-gray-600">Sunset</p>
                <p className="font-semibold">{formatTime(weatherData.sys.sunset)}</p>
              </div>
            </div>
          </div>
        </div>
        
        {/* Temperature range */}
        <div className="mt-4 border-t pt-4 border-gray-200">
          <div className="flex justify-between items-center">
            <div>
              <span className="text-sm text-gray-500">Min</span>
              <p className="font-bold">{formatTemp(weatherData.main.temp_min)}</p>
            </div>
            <div className="flex-1 mx-4 h-2 bg-gray-200 rounded-full">
              <div 
                className="h-full bg-gradient-to-r from-blue-400 to-red-400 rounded-full" 
                style={{ 
                  width: `${Math.min(100, Math.max(0, 
                    ((weatherData.main.temp - weatherData.main.temp_min) / 
                    (weatherData.main.temp_max - weatherData.main.temp_min)) * 100
                  ))}%` 
                }}
              ></div>
            </div>
            <div className="text-right">
              <span className="text-sm text-gray-500">Max</span>
              <p className="font-bold">{formatTemp(weatherData.main.temp_max)}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;