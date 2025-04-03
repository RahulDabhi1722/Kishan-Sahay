import React from 'react';
import { FiDroplet, FiTrendingUp, FiShoppingBag, FiSun } from 'react-icons/fi';
import { Link } from 'react-router-dom';

const FeatureCard = ({ icon, title, description, link }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
      <div className="text-green-600 mb-4">{icon}</div>
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <Link to={link} className="text-green-600 font-semibold hover:underline flex items-center">
        Learn more
        <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
        </svg>
      </Link>
    </div>
  );
};

const FeaturedServices = () => {
  return (
    <section className="py-12 px-4 bg-gray-200 border-t border-gray-300">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <FeatureCard 
            icon={<FiDroplet size={40} />}
            title="Weather Forecasts"
            description="Access real-time weather data tailored for farmers to plan your activities."
            link="/weather"
          />
          <FeatureCard 
            icon={<FiTrendingUp size={40} />}
            title="Market Trends"
            description="Stay updated with the latest market trends and crop prices."
            link="/marketprice"
          />
          <FeatureCard 
            icon={<FiShoppingBag size={40} />}
            title="Sell Your Produce"
            description="Connect directly with buyers and get the best prices for your produce."
            link="/sell-goods"
          />
          <FeatureCard 
            icon={<FiSun size={40} />}
            title="Crop Recommendations"
            description="Get personalized recommendations for your soil type and climate."
            link="/crops"
          />
        </div>
      </div>
    </section>
  );
};

export default FeaturedServices;