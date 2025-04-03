import React from 'react';
import { FiMapPin, FiSearch } from 'react-icons/fi';

const WeatherSearch = ({ location, setLocation, handleSearch, suggestions, showSuggestions, handleSuggestionClick, suggestionsRef }) => {
  return (
    <div className="mb-6">
      <form onSubmit={handleSearch} className="flex relative">
        <div className="relative flex-grow">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <FiMapPin className="text-gray-400" />
          </div>
          <input
            type="text"
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            placeholder="Search location..."
            className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
          />
          {showSuggestions && suggestions.length > 0 && (
            <div 
              className="absolute z-10 mt-1 w-full bg-white rounded-md shadow-lg border border-gray-200"
              ref={suggestionsRef}
            >
              <ul className="max-h-60 overflow-auto">
                {suggestions.map((suggestion, index) => (
                  <li 
                    key={index} 
                    className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                    onClick={() => handleSuggestionClick(suggestion)}
                  >
                    <FiMapPin className="mr-2 text-gray-500" />
                    <span>
                      {suggestion.name}, {suggestion.state ? `${suggestion.state}, ` : ''}{suggestion.country}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
        <button
          type="submit"
          className="bg-green-600 px-4 py-2 text-white rounded-r-md hover:bg-green-700 transition-colors flex items-center"
        >
          <FiSearch className="mr-1" />
          <span>Search</span>
        </button>
      </form>
    </div>
  );
};

export default WeatherSearch;