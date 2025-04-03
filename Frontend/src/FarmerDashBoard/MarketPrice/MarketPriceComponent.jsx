import React, { useState, useEffect } from 'react';
import { FiRefreshCw, FiAlertCircle, FiInfo } from 'react-icons/fi';
import Filters from './Filters';
import MarketTable from './MarketTable';
import PriceComparisonChart from './PriceComparisonChart';
import ProfitabilityAnalysisModal from './ProfitabilityAnalysisModal';
import Footer from '../../components/Common/Footer/Footer';
import FarmerNavbar from '../NavBar/NavBar';

const MarketPrice = () => {
  const [marketData, setMarketData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Filter states
  const [states, setStates] = useState([]);
  const [crops, setCrops] = useState([]);
  const [markets, setMarkets] = useState([]);
  const [selectedState, setSelectedState] = useState('all');
  const [selectedCrop, setSelectedCrop] = useState('all');
  const [selectedMarket, setSelectedMarket] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  // Sorting state
  const [sortBy, setSortBy] = useState('crop');
  const [sortDirection, setSortDirection] = useState('asc');

  // Modal state for profitability analysis
  const [showProfitInfo, setShowProfitInfo] = useState(false);
  const [selectedCropForChart, setSelectedCropForChart] = useState(null);
  
  // Sample price history data (for chart)
  const [priceHistory, setPriceHistory] = useState({});
  
  // Sample profitability data
  const [profitabilityData, setProfitabilityData] = useState([]);

  // Sample crop production costs data
  const cropProductionCosts = {
    'Rice': { cost: 45000, yield: 60, timeToHarvest: '4 months' },
    'Wheat': { cost: 30000, yield: 40, timeToHarvest: '5 months' },
    'Potato': { cost: 60000, yield: 200, timeToHarvest: '3 months' },
    'Tomato': { cost: 70000, yield: 250, timeToHarvest: '3 months' },
    'Onion': { cost: 55000, yield: 180, timeToHarvest: '4 months' },
    'Corn': { cost: 35000, yield: 65, timeToHarvest: '3 months' },
    'Soybean': { cost: 40000, yield: 30, timeToHarvest: '4 months' },
    'Cotton': { cost: 50000, yield: 25, timeToHarvest: '6 months' },
    'Sugarcane': { cost: 65000, yield: 700, timeToHarvest: '12 months' },
    'Chili': { cost: 80000, yield: 100, timeToHarvest: '3 months' }
  };

  // Fetch market price data
  useEffect(() => {
    const fetchMarketPrices = async () => {
      setLoading(true);
      try {
        // In a real app, this would be your API endpoint
        // const response = await axios.get('http://localhost:5000/api/market-prices');
        
        // For demo purposes, we'll use sample data
        const sampleData = [
          { id: 1, crop: 'Rice', state: 'Punjab', market: 'Amritsar', modalPrice: 2100, minPrice: 1950, maxPrice: 2200 },
          { id: 2, crop: 'Wheat', state: 'Haryana', market: 'Karnal', modalPrice: 1950, minPrice: 1850, maxPrice: 2050 },
          { id: 3, crop: 'Potato', state: 'Uttar Pradesh', market: 'Agra', modalPrice: 1200, minPrice: 1000, maxPrice: 1400 },
          { id: 4, crop: 'Tomato', state: 'Karnataka', market: 'Bangalore', modalPrice: 1800, minPrice: 1600, maxPrice: 2000 },
          { id: 5, crop: 'Onion', state: 'Maharashtra', market: 'Nasik', modalPrice: 1500, minPrice: 1300, maxPrice: 1700 },
          { id: 6, crop: 'Corn', state: 'Bihar', market: 'Patna', modalPrice: 1650, minPrice: 1500, maxPrice: 1800 },
          { id: 7, crop: 'Soybean', state: 'Madhya Pradesh', market: 'Indore', modalPrice: 3800, minPrice: 3600, maxPrice: 4000 },
          { id: 8, crop: 'Cotton', state: 'Gujarat', market: 'Rajkot', modalPrice: 5500, minPrice: 5200, maxPrice: 5800 },
          { id: 9, crop: 'Sugarcane', state: 'Uttar Pradesh', market: 'Meerut', modalPrice: 350, minPrice: 320, maxPrice: 380 },
          { id: 10, crop: 'Chili', state: 'Andhra Pradesh', market: 'Guntur', modalPrice: 7500, minPrice: 7000, maxPrice: 8000 }
        ];
        
        // Add profitability data
        const dataWithProfitability = sampleData.map(item => {
          const cropInfo = cropProductionCosts[item.crop] || { cost: 50000, yield: 50 };
          const revenue = item.modalPrice * cropInfo.yield;
          const profit = revenue - cropInfo.cost;
          const roi = (profit / cropInfo.cost) * 100;
          
          return {
            ...item,
            profitability: roi
          };
        });
        
        setMarketData(dataWithProfitability);
        
        // Extract unique values for filters
        setStates([...new Set(sampleData.map(item => item.state))]);
        setCrops([...new Set(sampleData.map(item => item.crop))]);
        setMarkets([...new Set(sampleData.map(item => item.market))]);
        
        // Create price history data for charts
        const historyData = {};
        sampleData.forEach(item => {
          if (!historyData[item.crop]) {
            // Generate 30 days of price history
            const dates = Array.from({ length: 30 }, (_, i) => {
              const date = new Date();
              date.setDate(date.getDate() - (29 - i));
              return date.toISOString().split('T')[0];
            });
            
            // Generate prices with some randomness around the modal price
            const basePrice = item.modalPrice;
            const prices = dates.map((_, i) => {
              // Create some trend pattern
              const trendFactor = i / 30; // 0 to almost 1
              const randomFactor = Math.random() * 0.2 - 0.1; // -10% to +10%
              return basePrice * (0.9 + trendFactor * 0.2 + randomFactor);
            });
            
            historyData[item.crop] = { dates, prices };
          }
        });
        setPriceHistory(historyData);
        
        // Create profitability analysis data
        const today = new Date().toISOString().split('T')[0];
        const profitData = sampleData.map(item => {
          const cropInfo = cropProductionCosts[item.crop];
          const production = {
            cost: cropInfo?.cost || 50000,
            yield: cropInfo?.yield || 50,
            timeToHarvest: cropInfo?.timeToHarvest || '4 months',
            revenue: item.modalPrice * (cropInfo?.yield || 50),
            profit: (item.modalPrice * (cropInfo?.yield || 50)) - (cropInfo?.cost || 50000),
          };
          
          production.roi = (production.profit / production.cost) * 100;
          production.profitMargin = (production.profit / production.revenue) * 100;
          
          return {
            crop: item.crop,
            modalPrice: item.modalPrice,
            minPrice: item.minPrice,
            maxPrice: item.maxPrice,
            lastUpdated: today,
            production
          };
        });
        setProfitabilityData(profitData);
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching market data:', err);
        setError('Failed to load market prices. Please try again later.');
        setLoading(false);
      }
    };

    fetchMarketPrices();
  }, []);

  // Handle sort change
  const handleSortChange = (field) => {
    if (sortBy === field) {
      // Toggle direction if clicking the same field
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      // Set new field and reset direction to ascending
      setSortBy(field);
      setSortDirection('asc');
    }
  };

  // Handle profit info click
  const handleProfitInfoClick = (crop) => {
    setSelectedCropForChart(crop);
    setShowProfitInfo(true);
  };

  // Apply filters and sorting
  const filteredAndSortedData = marketData
    .filter(item => {
      return (
        (selectedState === 'all' || item.state === selectedState) &&
        (selectedCrop === 'all' || item.crop === selectedCrop) &&
        (selectedMarket === 'all' || item.market === selectedMarket) &&
        (
          searchTerm === '' || 
          item.crop.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.state.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.market.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    })
    .sort((a, b) => {
      const fieldA = typeof a[sortBy] === 'string' ? a[sortBy].toLowerCase() : a[sortBy];
      const fieldB = typeof b[sortBy] === 'string' ? b[sortBy].toLowerCase() : b[sortBy];
      
      if (sortDirection === 'asc') {
        return fieldA < fieldB ? -1 : fieldA > fieldB ? 1 : 0;
      } else {
        return fieldA > fieldB ? -1 : fieldA < fieldB ? 1 : 0;
      }
    });

  // Render loading state
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
      </div>
    );
  }

  // Render error state
  if (error) {
    return (
        
      <div className="flex justify-center items-center h-screen bg-gray-100">
        <div className="bg-red-50 border-l-4 border-red-400 p-4 max-w-md">
          <div className="flex">
            <div className="flex-shrink-0">
              <FiAlertCircle className="h-5 w-5 text-red-400" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-red-700">{error}</p>
              <button
                onClick={() => window.location.reload()}
                className="mt-2 flex items-center text-sm font-medium text-red-700 hover:text-red-600"
              >
                <FiRefreshCw className="mr-1 h-4 w-4" />
                Try Again
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <>
    <FarmerNavbar/>
    <div className="bg-gradient-to-br from-green-50 to-amber-50 min-h-screen">
      <div className="container mx-auto px-4 py-8 ">
        <div className="flex justify-between items-center mb-6 mt-14">
          <div>
            <h1 className="text-3xl font-bold text-gray-800">Market Prices</h1>
            <p className="text-gray-600 mt-1">
              Current agricultural commodity prices across different markets
            </p>
          </div>
          
          <div className="bg-green-50 border-l-4 border-green-400 p-3 hidden md:block">
            <div className="flex">
              <div className="flex-shrink-0">
                <FiInfo className="h-5 w-5 text-green-500" />
              </div>
              <div className="ml-3">
                <p className="text-sm text-green-700">
                  These prices are updated daily from various agricultural markets (APMCs).
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Filters Section */}
        <Filters 
          states={states}
          crops={crops}
          markets={markets}
          selectedState={selectedState}
          setSelectedState={setSelectedState}
          selectedCrop={selectedCrop}
          setSelectedCrop={setSelectedCrop}
          selectedMarket={selectedMarket}
          setSelectedMarket={setSelectedMarket}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
        />

        {/* Results counter */}
        <div className="mb-4 text-gray-600">
          Showing {filteredAndSortedData.length} of {marketData.length} results
        </div>

        {/* Market Table */}
        <MarketTable 
          filteredData={filteredAndSortedData}
          handleSortChange={handleSortChange}
          cropProductionCosts={cropProductionCosts}
          handleProfitInfoClick={handleProfitInfoClick}
          sortBy={sortBy}
          sortDirection={sortDirection}
        />

        {/* Price Comparison Chart */}
        <div className="mt-12">
          <PriceComparisonChart crops={crops} marketData={marketData} />
        </div>

        {/* Information Section */}
        <div className="mt-8 bg-white shadow-md rounded-lg p-6">
          <h3 className="text-xl font-bold mb-4 text-gray-800">How to Use Market Price Data</h3>
          <div className="prose max-w-none">
            <p>
              Market price information is a valuable tool for farmers to make informed decisions about when and where to sell their produce. Here are some tips on how to effectively use this data:
            </p>
            <ul className="list-disc pl-5 mt-2 space-y-2">
              <li>
                <strong>Compare Different Markets:</strong> Prices can vary significantly between markets. Use the filters to compare prices across different locations.
              </li>
              <li>
                <strong>Track Price Trends:</strong> Use the price history charts to understand price movements and identify the best time to sell.
              </li>
              <li>
                <strong>Calculate Profitability:</strong> Use the ROI indicators to assess the potential profitability of different crops. Click "View Analysis" for detailed profitability information.
              </li>
              <li>
                <strong>Plan Your Harvest:</strong> Time your harvest based on market trends to maximize returns.
              </li>
              <li>
                <strong>Explore New Markets:</strong> Consider traveling to markets with better prices if the price difference justifies the transportation costs.
              </li>
            </ul>
          </div>
        </div>
      </div>
      
      {/* Profitability Analysis Modal */}
      {showProfitInfo && (
        <ProfitabilityAnalysisModal 
          selectedCropForChart={selectedCropForChart}
          profitabilityData={profitabilityData}
          priceHistory={priceHistory}
          marketData={marketData}
          setShowProfitInfo={setShowProfitInfo}
        />
      )}
    </div>
    <Footer/>
    </>
  );
};

export default MarketPrice