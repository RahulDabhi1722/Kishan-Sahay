import React from 'react';

const AgriculturalImpact = ({ weatherData, unit }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h3 className="text-xl font-bold mb-4 text-center">Agricultural Weather Impact</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="border rounded-lg p-4">
          <h4 className="font-semibold text-green-700 mb-2 text-xl text-center">Crop Operations</h4>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              {(unit === 'metric' && weatherData.main.temp > 30) || 
               (unit === 'imperial' && weatherData.main.temp > 86) ? (
                <span className="text-red-600">Too hot for most spraying operations</span>
              ) : (unit === 'metric' && weatherData.wind.speed > 10) || 
                 (unit === 'imperial' && weatherData.wind.speed > 22) ? (
                <span className="text-red-600">Wind too high for spraying</span>
              ) : weatherData.weather[0].main.toLowerCase().includes('rain') ? (
                <span className="text-red-600">Rain will wash off sprays</span>
              ) : (
                <span className="text-green-600">Good conditions for spraying</span>
              )}
            </li>
            <li>
              {weatherData.main.humidity > 80 ? (
                <span className="text-orange-600">High disease risk due to humidity</span>
              ) : (
                <span className="text-green-600">Normal disease risk</span>
              )}
            </li>
            <li>
              {weatherData.weather[0].main.toLowerCase().includes('rain') ? (
                <span className="text-green-600">Good soil moisture for planting</span>
              ) : (
                <span className="text-orange-600">May need irrigation for new plantings</span>
              )}
            </li>
          </ul>
        </div>
        <div className="border rounded-lg p-4">
          <h4 className="font-semibold text-green-700 mb-2 text-xl text-center">Irrigation Planning</h4>
          {(() => {
            const temp = weatherData.main.temp;
            const humidity = weatherData.main.humidity;
            const windSpeed = weatherData.wind.speed;
            
            // Adjust calculation based on unit
            let et;
            if (unit === 'metric') {
              // For Celsius
              et = (((0.0023 * temp * (temp + 17.8) * Math.sqrt(100 - humidity)) / 100) * (2.5 + 0.5 * windSpeed)).toFixed(2);
            } else {
              // For Fahrenheit - convert to Celsius first
              const tempCelsius = (temp - 32) * 5/9;
              et = (((0.0023 * tempCelsius * (tempCelsius + 17.8) * Math.sqrt(100 - humidity)) / 100) * (2.5 + 0.5 * windSpeed * 0.44704)).toFixed(2);
            }
            
            return (
              <>
                <p className="mb-2">
                  <span className="font-medium">Est. Evapotranspiration:</span>{" "}
                  <span className="text-blue-600 font-medium">{et} mm/day</span>
                </p>
                <p className="mb-2">
                  <span className="font-medium">Irrigation Need:</span>{" "}
                  {Number(et) > 5 ? (
                    <span className="text-red-600 font-medium">High</span>
                  ) : Number(et) > 3 ? (
                    <span className="text-orange-600 font-medium">Moderate</span>
                  ) : (
                    <span className="text-green-600 font-medium">Low</span>
                  )}
                </p>
              </>
            );
          })()}
          <p className="text-sm text-gray-600 mt-3">
            {weatherData.weather[0].main.toLowerCase().includes('rain') ? 
              "Natural rainfall expected. Adjust irrigation accordingly." : 
              "No significant rainfall expected in next 24 hours."}
          </p>
        </div>
      </div>
    </div>
  );
};

export default AgriculturalImpact;