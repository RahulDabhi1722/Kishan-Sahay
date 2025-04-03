import React from 'react';
import { FiShoppingBag, FiMapPin, FiUsers, FiTruck, FiHeart } from 'react-icons/fi';
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

const Services = () => {
  return (
    <section className="py-16 px-4 bg-gray-200 border-t border-gray-300" id="services">
      <div className="container mx-auto">
        <h2 className="text-3xl font-bold text-center mb-4">Our Services</h2>
        <p className="text-gray-600 text-center max-w-2xl mx-auto mb-12">
          Connecting consumers directly with farmers for fresher food, better prices, and a more sustainable food system.
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <FeatureCard 
            icon={<FiShoppingBag size={40} />}
            title="Direct From Farmers"
            description="Purchase fresh produce directly from local farmers, cutting out middlemen for better prices and fresher food."
            link="/shop"
          />
          <FeatureCard 
            icon={<FiMapPin size={40} />}
            title="Find Local Produce"
            description="Discover nearby farmers offering seasonal crops, organic vegetables and artisanal food products."
            link="/local-map"
          />
          <FeatureCard 
            icon={<FiHeart size={40} />}
            title="Seasonal Favorites"
            description="Explore and learn about trending seasonal produce, specialty crops, and ways to incorporate them in your meals."
            link="/seasonal"
          />
          <FeatureCard 
            icon={<FiTruck size={40} />}
            title="Home Delivery"
            description="Get fresh farm produce delivered to your doorstep with our convenient delivery options from local farmers."
            link="/delivery"
          />
        </div>
        
        <div className="mt-16 bg-white p-8 rounded-lg shadow-md">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="md:w-2/3 mb-6 md:mb-0 md:pr-8">
              <h3 className="text-2xl font-bold mb-4">Why Buy Directly From Farmers?</h3>
              <ul className="space-y-2 text-gray-700">
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span> 
                  <span>Fresher produce with better taste and higher nutritional value</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span> 
                  <span>Better prices by eliminating middlemen and reducing food miles</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span> 
                  <span>Support local farming communities and sustainable agriculture</span>
                </li>
                <li className="flex items-start">
                  <span className="text-green-500 mr-2">✓</span> 
                  <span>Know exactly where your food comes from and how it was grown</span>
                </li>
              </ul>
            </div>
            <div className="md:w-1/3 flex justify-center">
              <Link 
                to="/register" 
                className="bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg text-center transition-colors"
              >
                Join Our Community
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Services;