import React from 'react';

const Forecast = ({ forecast, formatDay, formatTemp, getWeatherIcon, unit }) => {
  return (
    <div>
      <h3 className="text-2xl font-bold mb-4">3-Day Forecast</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        {forecast.length > 0 ? (
          forecast.map((item, index) => (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 flex flex-col items-center">
              <p className="text-lg font-semibold mb-2">
                {index === 0 ? 'Tomorrow' : formatDay(item.dt)}
              </p>
              {getWeatherIcon(item.weather[0].icon)}
              <p className="text-2xl font-bold my-2">{formatTemp(item.main.temp)}</p>
              <p className="text-gray-600 capitalize">{item.weather[0].description}</p>
              <div className="w-full mt-4 pt-4 border-t border-gray-200 grid grid-cols-2 gap-2 text-sm">
                <div>
                  <p className="text-gray-500">Humidity</p>
                  <p className="font-medium">{item.main.humidity}%</p>
                </div>
                <div>
                  <p className="text-gray-500">Wind</p>
                  <p className="font-medium">{Math.round(item.wind.speed)} {unit === 'metric' ? 'm/s' : 'mph'}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-gray-500">Precipitation</p>
                  <p className="font-medium">{item.rain ? `${item.rain['3h']} mm` : '0 mm'}</p>
                </div>
                <div className="col-span-2">
                  <p className="text-gray-500">Min/Max</p>
                  <p className="font-medium">
                    {formatTemp(item.main.temp_min)} / {formatTemp(item.main.temp_max)}
                  </p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-3 text-center text-gray-500">
            Forecast data not available
          </div>
        )}
      </div>
    </div>
  );
};

export default Forecast;