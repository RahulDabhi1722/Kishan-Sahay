import React from 'react';
import { FiBarChart2, FiTrendingUp, FiTrendingDown } from 'react-icons/fi';

const MarketTable = ({ filteredData, handleSortChange, cropProductionCosts, handleProfitInfoClick, sortBy, sortDirection }) => {
  return (
    <div className="overflow-x-auto bg-gray-200">
      <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-md">
        <thead className="bg-green-600 text-white">
          <tr>
            <th onClick={() => handleSortChange('crop')} className="px-6 py-3 cursor-pointer hover:bg-green-700 transition-colors">
              <div className="flex items-center space-x-1">
                <span>Crop</span>
                {sortBy === 'crop' && (
                  <span>{sortDirection === 'asc' ? '↑' : '↓'}</span>
                )}
              </div>
            </th>
            <th onClick={() => handleSortChange('state')} className="px-6 py-3 cursor-pointer hover:bg-green-700 transition-colors">
              <div className="flex items-center space-x-1">
                <span>State</span>
                {sortBy === 'state' && (
                  <span>{sortDirection === 'asc' ? '↑' : '↓'}</span>
                )}
              </div>
            </th>
            <th onClick={() => handleSortChange('price')} className="px-6 py-3 cursor-pointer hover:bg-green-700 transition-colors">
              <div className="flex items-center space-x-1">
                <span>Modal Price (₹)</span>
                {sortBy === 'price' && (
                  <span>{sortDirection === 'asc' ? '↑' : '↓'}</span>
                )}
              </div>
            </th>
            <th className="px-6 py-3">Min-Max Price (₹)</th>
            <th className="px-6 py-3">Market</th>
            <th onClick={() => handleSortChange('profitability')} className="px-6 py-3 cursor-pointer hover:bg-green-700 transition-colors">
              <div className="flex items-center space-x-1">
                <span>Profitability</span>
                {sortBy === 'profitability' && (
                  <span>{sortDirection === 'asc' ? '↑' : '↓'}</span>
                )}
              </div>
            </th>
            <th className="px-6 py-3">Details</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-200">
          {filteredData.map((item) => {
            // Calculate profitability
            const cropInfo = cropProductionCosts[item.crop] || { cost: 50000, yield: 50 };
            const revenue = item.modalPrice * cropInfo.yield;
            const profit = revenue - cropInfo.cost;
            const roi = (profit / cropInfo.cost) * 100;
            
            // Determine profitability class and icon
            let profitClass = 'text-gray-500';
            let profitIcon = <FiBarChart2 />;
            
            if (roi > 25) {
              profitClass = 'text-green-600';
              profitIcon = <FiTrendingUp />;
            } else if (roi > 0) {
              profitClass = 'text-green-500';
              profitIcon = <FiTrendingUp />;
            } else {
              profitClass = 'text-red-500';
              profitIcon = <FiTrendingDown />;
            }
            
            return (
              <tr key={item.id} className="hover:bg-gray-50">
                <td className="px-6 py-4">{item.crop}</td>
                <td className="px-6 py-4">{item.state}</td>
                <td className="px-6 py-4 font-semibold">₹{item.modalPrice}</td>
                <td className="px-6 py-4">₹{item.minPrice} - ₹{item.maxPrice}</td>
                <td className="px-6 py-4">{item.market}</td>
                <td className={`px-6 py-4 font-semibold ${profitClass} flex items-center`}>
                  <span className="mr-1">{profitIcon}</span>
                  <span>{roi.toFixed(1)}% ROI</span>
                </td>
                <td className="px-6 py-4">
                  <button 
                    onClick={() => handleProfitInfoClick(item.crop)}
                    className="bg-green-100 text-green-700 px-2 py-1 rounded-md hover:bg-green-200 transition-colors text-sm"
                  >
                    View Analysis
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default MarketTable;