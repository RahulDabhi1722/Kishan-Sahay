import React from 'react';

const Analytics = () => {
  return (
    <div className="flex-1 p-8 bg-gray-100">
      <h1 className="text-2xl font-semibold text-gray-900 mb-6">Analytics</h1>
      
      {/* Time Period Selector */}
      <div className="mb-6 bg-white p-4 rounded-lg shadow">
        <div className="flex flex-col md:flex-row md:items-end space-y-3 md:space-y-0 md:space-x-4">
          <div>
            <label htmlFor="period" className="block text-sm font-medium text-gray-700">Time Period</label>
            <select
              id="period"
              name="period"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="7days">Last 7 Days</option>
              <option value="30days">Last 30 Days</option>
              <option value="90days">Last 90 Days</option>
              <option value="12months">Last 12 Months</option>
            </select>
          </div>
          
          <div>
            <label htmlFor="compare" className="block text-sm font-medium text-gray-700">Compare To</label>
            <select
              id="compare"
              name="compare"
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
            >
              <option value="previous">Previous Period</option>
              <option value="sameprevious">Same Period Last Year</option>
              <option value="none">No Comparison</option>
            </select>
          </div>
          
          <button
            type="button"
            className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Apply
          </button>
        </div>
      </div>
      
      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium text-gray-900 mb-2">Total Revenue</h2>
          <p className="text-3xl font-bold text-indigo-600">$24,521</p>
          <div className="flex items-center mt-2">
            <span className="text-green-500 mr-1">↑ 12%</span>
            <span className="text-sm text-gray-500">vs previous period</span>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium text-gray-900 mb-2">Orders</h2>
          <p className="text-3xl font-bold text-indigo-600">342</p>
          <div className="flex items-center mt-2">
            <span className="text-green-500 mr-1">↑ 8%</span>
            <span className="text-sm text-gray-500">vs previous period</span>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium text-gray-900 mb-2">New Farmers</h2>
          <p className="text-3xl font-bold text-indigo-600">21</p>
          <div className="flex items-center mt-2">
            <span className="text-red-500 mr-1">↓ 5%</span>
            <span className="text-sm text-gray-500">vs previous period</span>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h2 className="text-lg font-medium text-gray-900 mb-2">New Customers</h2>
          <p className="text-3xl font-bold text-indigo-600">78</p>
          <div className="flex items-center mt-2">
            <span className="text-green-500 mr-1">↑ 15%</span>
            <span className="text-sm text-gray-500">vs previous period</span>
          </div>
        </div>
      </div>
      
      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Revenue Over Time</h3>
          <div className="h-80 bg-gray-50 flex items-center justify-center border border-gray-200 rounded">
            <div className="text-center p-4">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
              </svg>
              <p className="mt-2 text-sm text-gray-500">
                Line chart showing revenue trends over the selected time period.
              </p>
              <p className="mt-1 text-xs text-gray-400">
                (Chart visualization would be implemented with a charting library like Chart.js or Recharts)
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Product Categories</h3>
          <div className="h-80 bg-gray-50 flex items-center justify-center border border-gray-200 rounded">
            <div className="text-center p-4">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 3.055A9.001 9.001 0 1020.945 13H11V3.055z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20.488 9H15V3.512A9.025 9.025 0 0120.488 9z" />
              </svg>
              <p className="mt-2 text-sm text-gray-500">
                Pie chart showing sales distribution across product categories.
              </p>
              <p className="mt-1 text-xs text-gray-400">
                (Chart visualization would be implemented with a charting library like Chart.js or Recharts)
              </p>
            </div>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Top Products</h3>
          <div className="space-y-4">
            {[
              { name: 'Organic Fertilizer', percent: 85 },
              { name: 'Tomato Seeds', percent: 75 },
              { name: 'Irrigation System Kit', percent: 65 },
              { name: 'Garden Hoe', percent: 55 },
              { name: 'Pest Control Spray', percent: 45 },
            ].map((product, index) => (
              <div key={index}>
                <div className="flex justify-between mb-1">
                  <span className="text-sm font-medium text-gray-700">{product.name}</span>
                  <span className="text-sm font-medium text-gray-700">{product.percent}%</span>
                </div>
                <div className="overflow-hidden h-2 text-xs flex rounded bg-gray-200">
                  <div
                    style={{ width: `${product.percent}%` }}
                    className="shadow-none flex flex-col text-center whitespace-nowrap text-white justify-center bg-indigo-500"
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow">
          <h3 className="text-lg font-medium text-gray-900 mb-4">Geographical Distribution</h3>
          <div className="h-80 bg-gray-50 flex items-center justify-center border border-gray-200 rounded">
            <div className="text-center p-4">
              <svg className="mx-auto h-12 w-12 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              <p className="mt-2 text-sm text-gray-500">
                Map showing customer and farmer distribution by region.
              </p>
              <p className="mt-1 text-xs text-gray-400">
                (Map visualization would be implemented with a mapping library like Leaflet or Google Maps API)
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;