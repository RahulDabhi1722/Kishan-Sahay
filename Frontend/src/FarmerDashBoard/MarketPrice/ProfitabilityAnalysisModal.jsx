import React from 'react';
import { Line } from 'react-chartjs-2';
import { FiCheckCircle, FiAlertCircle, FiDownload } from 'react-icons/fi';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

// Register ChartJS components
ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ProfitabilityAnalysisModal = ({ selectedCropForChart, profitabilityData, priceHistory, marketData, setShowProfitInfo }) => {
  if (!selectedCropForChart) return null;
  
  const cropData = profitabilityData.find(item => item.crop === selectedCropForChart);
  if (!cropData) return null;
  
  const { production } = cropData;
  const cropPriceHistory = priceHistory[selectedCropForChart];
  
  const chartData = {
    labels: cropPriceHistory?.dates || [],
    datasets: [
      {
        label: `${selectedCropForChart} Price`,
        data: cropPriceHistory?.prices || [],
        borderColor: 'rgb(75, 192, 192)',
        backgroundColor: 'rgba(75, 192, 192, 0.5)',
        tension: 0.2
      },
      {
        label: 'Break-even Price',
        data: Array(cropPriceHistory?.dates.length).fill(production.cost / production.yield),
        borderColor: 'rgb(255, 99, 132)',
        backgroundColor: 'rgba(255, 99, 132, 0.5)',
        borderDash: [5, 5]
      }
    ],
  };
  
  const chartOptions = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      title: {
        display: true,
        text: 'Price Trend (Last 30 Days)',
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        title: {
          display: true,
          text: 'Price per Quintal (₹)'
        }
      }
    }
  };
  
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div className="p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold text-green-700">
              {selectedCropForChart} - Profitability Analysis
            </h2>
            <button
              onClick={() => setShowProfitInfo(false)}
              className="text-gray-500 hover:text-gray-700"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>
          </div>
          
          {/* Chart */}
          <div className="mb-6 h-64">
            <Line options={chartOptions} data={chartData} />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Cost Breakdown */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-lg mb-3">Cost & Revenue Analysis (per Hectare)</h3>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span className="text-gray-600">Production Cost:</span>
                  <span className="font-medium">₹{production.cost.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Average Yield:</span>
                  <span className="font-medium">{production.yield} quintals</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Current Market Price:</span>
                  <span className="font-medium">₹{cropData.modalPrice} per quintal</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Estimated Revenue:</span>
                  <span className="font-medium">₹{production.revenue.toLocaleString()}</span>
                </div>
                <div className="border-t pt-2 flex justify-between">
                  <span className="font-semibold">Estimated Profit:</span>
                  <span className={`font-bold ${production.profit > 0 ? 'text-green-600' : 'text-red-600'}`}>
                    ₹{production.profit.toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
            
            {/* Profitability Indicators */}
            <div className="bg-gray-50 p-4 rounded-lg">
              <h3 className="font-semibold text-lg mb-3">Profitability Indicators</h3>
              <div className="space-y-4">
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-600">Return on Investment (ROI):</span>
                    <span className={`font-bold ${production.roi > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {production.roi.toFixed(1)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className={`h-2.5 rounded-full ${production.roi > 25 ? 'bg-green-600' : production.roi > 0 ? 'bg-green-400' : 'bg-red-500'}`} 
                      style={{ width: `${Math.min(Math.max(production.roi, 0), 100)}%` }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-600">Profit Margin:</span>
                    <span className={`font-bold ${production.profitMargin > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {production.profitMargin.toFixed(1)}%
                    </span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2.5">
                    <div 
                      className={`h-2.5 rounded-full ${production.profitMargin > 20 ? 'bg-green-600' : production.profitMargin > 0 ? 'bg-green-400' : 'bg-red-500'}`} 
                      style={{ width: `${Math.min(Math.max(production.profitMargin, 0), 100)}%` }}
                    ></div>
                  </div>
                </div>
                
                <div>
                  <div className="flex justify-between mb-1">
                    <span className="text-gray-600">Break-even Price:</span>
                    <span className="font-medium">₹{(production.cost / production.yield).toFixed(2)} per quintal</span>
                  </div>
                  <div className="text-sm text-gray-500 mt-1">
                    {cropData.modalPrice > (production.cost / production.yield) ? (
                      <div className="flex items-center text-green-600">
                        <FiCheckCircle className="mr-1" />
                        <span>Current price is {((cropData.modalPrice / (production.cost / production.yield) - 1) * 100).toFixed(1)}% above break-even</span>
                      </div>
                    ) : (
                      <div className="flex items-center text-red-600">
                        <FiAlertCircle className="mr-1" />
                        <span>Current price is {((1 - cropData.modalPrice / (production.cost / production.yield)) * 100).toFixed(1)}% below break-even</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          {/* Market Insights */}
          <div className="mt-6 bg-green-50 p-4 rounded-lg">
            <h3 className="font-semibold text-lg mb-3">Market Insights</h3>
            <div className="space-y-2">
              <p className="text-sm">
                <span className="font-medium">Price Range: </span>
                ₹{cropData.minPrice} - ₹{cropData.maxPrice} per quintal 
                <span className="text-gray-600"> (Last updated: {cropData.lastUpdated})</span>
              </p>
              
              <p className="text-sm">
                <span className="font-medium">Markets with Highest Prices: </span>
                {marketData
                  .filter(item => item.crop === selectedCropForChart)
                  .sort((a, b) => b.modalPrice - a.modalPrice)
                  .slice(0, 3)
                  .map(item => `${item.market} (₹${item.modalPrice})`)
                  .join(', ')}
              </p>
              
              <p className="text-sm">
                <span className="font-medium">Markets with Lowest Prices: </span>
                {marketData
                  .filter(item => item.crop === selectedCropForChart)
                  .sort((a, b) => a.modalPrice - b.modalPrice)
                  .slice(0, 3)
                  .map(item => `${item.market} (₹${item.modalPrice})`)
                  .join(', ')}
              </p>
              
              <p className="text-sm mt-3">
                {production.roi > 20 ? (
                  <span className="text-green-700 font-medium">
                    This crop is currently highly profitable with strong market demand.
                  </span>
                ) : production.roi > 0 ? (
                  <span className="text-green-600 font-medium">
                    This crop is currently providing positive returns but with moderate profitability.
                  </span>
                ) : (
                  <span className="text-red-600 font-medium">
                    This crop is currently selling below the break-even price. Consider alternative markets or value-adding options.
                  </span>
                )}
              </p>
            </div>
          </div>
          
          <div className="mt-6 flex justify-end">
            <button
              onClick={() => setShowProfitInfo(false)}
              className="px-4 py-2 bg-gray-200 rounded-md hover:bg-gray-300 mr-2"
            >
              Close
            </button>
            <button
              className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 flex items-center"
            >
              <FiDownload className="mr-1" />
              Download Report
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfitabilityAnalysisModal;