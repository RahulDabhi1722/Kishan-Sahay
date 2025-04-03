import React from 'react';
import { FiFilter, FiSearch } from 'react-icons/fi';

const Filters = ({ 
  states, 
  crops, 
  markets, 
  selectedState, 
  setSelectedState, 
  selectedCrop, 
  setSelectedCrop, 
  selectedMarket, 
  setSelectedMarket, 
  searchTerm, 
  setSearchTerm 
}) => {
  return (
    <div className="mb-8 p-4 bg-gray-200 rounded-lg shadow-md">
      <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-4 md:space-y-0 md:space-x-4">
        <div className="flex items-center">
          <FiFilter className="mr-2 text-green-600" />
          <span className="font-semibold">Filters:</span>
        </div>
        
        <div className="flex flex-wrap gap-4">
          {/* State filter */}
          <div>
            <select
              value={selectedState}
              onChange={(e) => setSelectedState(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="all">All States</option>
              {states.map((state, index) => (
                <option key={index} value={state}>{state}</option>
              ))}
            </select>
          </div>
          
          {/* Crop filter */}
          <div>
            <select
              value={selectedCrop}
              onChange={(e) => setSelectedCrop(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="all">All Crops</option>
              {crops.map((crop, index) => (
                <option key={index} value={crop}>{crop}</option>
              ))}
            </select>
          </div>
          
          {/* Market filter */}
          <div>
            <select
              value={selectedMarket}
              onChange={(e) => setSelectedMarket(e.target.value)}
              className="border border-gray-300 rounded-md px-3 py-2 bg-white focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="all">All Markets</option>
              {markets.map((market, index) => (
                <option key={index} value={market}>{market}</option>
              ))}
            </select>
          </div>
          
          {/* Search */}
          <div className="relative flex-1 min-w-[200px]">
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search..."
              className="border border-gray-300 rounded-md pl-10 pr-3 py-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
            />
            <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Filters;