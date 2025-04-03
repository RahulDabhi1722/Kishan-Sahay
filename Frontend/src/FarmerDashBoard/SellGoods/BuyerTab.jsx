import React from 'react';
import { FiBox, FiCheck, FiHelpCircle, FiMessageCircle, FiStar } from 'react-icons/fi';

// Mock buyer profiles
const buyerProfiles = [
  { id: 1, name: 'Agro Processors Ltd.', type: 'Processor', purchases: 125, rating: 4.8, verified: true },
  { id: 2, name: 'Fresh Market Chain', type: 'Retailer', purchases: 87, rating: 4.6, verified: true },
  { id: 3, name: 'Organic Food Co-op', type: 'Co-operative', purchases: 56, rating: 4.9, verified: true },
  { id: 4, name: 'Mumbai Food Exporters', type: 'Exporter', purchases: 210, rating: 4.7, verified: true },
  { id: 5, name: 'Delhi Restaurant Supplies', type: 'Distributor', purchases: 143, rating: 4.5, verified: true }
];

const BuyersTab = () => {
  return (
    <div>
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">Potential Buyers in Your Area</h2>
        <p className="text-gray-600 text-sm">
          Connect directly with these verified buyers who are actively looking for products like yours
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {buyerProfiles.map((buyer) => (
          <BuyerCard key={buyer.id} buyer={buyer} />
        ))}
      </div>
      
      <BuyerHelpBox />
    </div>
  );
};

// Buyer Card Component
const BuyerCard = ({ buyer }) => {
  return (
    <div className="bg-white rounded-lg shadow-md p-4">
      <div className="flex items-start justify-between">
        <div>
          <h3 className="font-semibold text-lg">{buyer.name}</h3>
          <p className="text-sm text-gray-500">{buyer.type}</p>
        </div>
        {buyer.verified && (
          <span className="bg-blue-100 text-blue-800 text-xs px-2 py-1 rounded-full flex items-center">
            <FiCheck className="mr-1" /> Verified
          </span>
        )}
      </div>
      <div className="mt-4 space-y-2">
        <div className="flex items-center">
          <FiStar className="text-yellow-500 mr-1" />
          <span className="text-sm">{buyer.rating} Rating</span>
        </div>
        <div className="flex items-center">
          <FiBox className="text-gray-500 mr-1" />
          <span className="text-sm">{buyer.purchases} Purchases</span>
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-gray-100 flex space-x-2">
        <button className="bg-green-600 text-white px-3 py-1 rounded-md text-sm flex-1 hover:bg-green-700 flex items-center justify-center">
          <FiMessageCircle className="mr-1" /> Contact
        </button>
        <button className="bg-gray-200 text-gray-800 px-3 py-1 rounded-md text-sm hover:bg-gray-300 flex items-center justify-center">
          View Profile
        </button>
      </div>
    </div>
  );
};

// Help Box Component
const BuyerHelpBox = () => {
  return (
    <div className="mt-8 bg-green-50 p-4 rounded-lg border border-green-200 flex items-start">
      <FiHelpCircle className="text-green-600 mr-3 mt-1 flex-shrink-0" />
      <div>
        <h4 className="font-medium text-green-800 mb-1">How to Connect with Buyers?</h4>
        <p className="text-sm text-green-700">
          Contact potential buyers directly to discuss your products. Make sure your listings are complete with accurate details about quality, 
          quantity, and delivery options to attract serious buyers. You can also promote your listings to these buyers for better visibility.
        </p>
      </div>
    </div>
  );
};

export default BuyersTab;