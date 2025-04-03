import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FiTruck, FiUsers, FiBarChart2, FiPackage, FiCreditCard, FiSmartphone, FiArrowRight, FiCalendar } from 'react-icons/fi';
import MainNavBar from '../../InitialDashBoard/Navbar/MainNavBar';

const FarmerInfo = () => {
  const [activeTab, setActiveTab] = useState('howitworks');

  return (
    <>
    <MainNavBar/>
    <div className="bg-gray-50 py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 sm:text-4xl mt-5">
            Sell Direct, Earn More
          </h2>
          <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">
            Connect directly with customers and maximize your profits. Our platform helps you sell your produce without middlemen, giving you control over pricing and distribution.
          </p>
        </div>
        
        {/* Tabs */}
        <div className="flex flex-wrap justify-center mb-8 border-b border-gray-200">
          <button 
            onClick={() => setActiveTab('howitworks')}
            className={`px-6 py-3 text-lg font-medium ${
              activeTab === 'howitworks' 
                ? 'text-green-600 border-b-2 border-green-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            How It Works
          </button>
          <button 
            onClick={() => setActiveTab('benefits')}
            className={`px-6 py-3 text-lg font-medium ${
              activeTab === 'benefits' 
                ? 'text-green-600 border-b-2 border-green-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Benefits
          </button>
          <button 
            onClick={() => setActiveTab('success')}
            className={`px-6 py-3 text-lg font-medium ${
              activeTab === 'success' 
                ? 'text-green-600 border-b-2 border-green-600' 
                : 'text-gray-500 hover:text-gray-700'
            }`}
          >
            Success Stories
          </button>
        </div>
        
        {/* How It Works Content */}
        {activeTab === 'howitworks' && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-white rounded-lg shadow-md p-6 transition-transform hover:transform hover:scale-105">
              <div className="bg-green-100 text-green-600 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <FiUsers className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Create Your Profile</h3>
              <p className="text-gray-600">
                Sign up as a farmer and create your detailed profile. Showcase your farm, practices, specialties, and the story behind your produce.
              </p>
              <div className="mt-4 flex items-center text-sm text-green-600">
                <span className="font-medium">Step 1</span>
                <div className="ml-2 w-8 h-0.5 bg-green-600"></div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 transition-transform hover:transform hover:scale-105">
              <div className="bg-green-100 text-green-600 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <FiPackage className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">List Your Products</h3>
              <p className="text-gray-600">
                Add your available produce with descriptions, quantities, pricing, and high-quality photos. Update inventory in real-time as you harvest.
              </p>
              <div className="mt-4 flex items-center text-sm text-green-600">
                <span className="font-medium">Step 2</span>
                <div className="ml-2 w-8 h-0.5 bg-green-600"></div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 transition-transform hover:transform hover:scale-105">
              <div className="bg-green-100 text-green-600 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <FiCalendar className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Set Availability</h3>
              <p className="text-gray-600">
                Define your delivery zones, pickup options, and schedule. Let customers know when and where they can access your fresh produce.
              </p>
              <div className="mt-4 flex items-center text-sm text-green-600">
                <span className="font-medium">Step 3</span>
                <div className="ml-2 w-8 h-0.5 bg-green-600"></div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 transition-transform hover:transform hover:scale-105">
              <div className="bg-green-100 text-green-600 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <FiSmartphone className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Receive Orders</h3>
              <p className="text-gray-600">
                Get notified instantly when customers place orders. Review order details and confirm availability before accepting.
              </p>
              <div className="mt-4 flex items-center text-sm text-green-600">
                <span className="font-medium">Step 4</span>
                <div className="ml-2 w-8 h-0.5 bg-green-600"></div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 transition-transform hover:transform hover:scale-105">
              <div className="bg-green-100 text-green-600 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <FiTruck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Fulfill & Deliver</h3>
              <p className="text-gray-600">
                Prepare orders with care, ensuring quality and freshness. Deliver directly to customers or prepare for scheduled pickup from your farm.
              </p>
              <div className="mt-4 flex items-center text-sm text-green-600">
                <span className="font-medium">Step 5</span>
                <div className="ml-2 w-8 h-0.5 bg-green-600"></div>
              </div>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 transition-transform hover:transform hover:scale-105">
              <div className="bg-green-100 text-green-600 w-12 h-12 rounded-full flex items-center justify-center mb-4">
                <FiCreditCard className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Get Paid Securely</h3>
              <p className="text-gray-600">
                Receive payments directly into your account. Our secure payment system ensures you get paid promptly for every order.
              </p>
              <div className="mt-4 flex items-center text-sm text-green-600">
                <span className="font-medium">Step 6</span>
                <div className="ml-2 w-8 h-0.5 bg-green-600"></div>
              </div>
            </div>
          </div>
        )}
        
        {/* Benefits Content */}
        {activeTab === 'benefits' && (
          <div className="mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
              <div className="overflow-hidden rounded-lg">
                <img 
                  src="https://images.unsplash.com/photo-1500937386664-56d1dfef3854?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
                  alt="Farmer with produce" 
                  className="w-full h-full object-cover rounded-lg shadow-md"
                />
              </div>
              
              <div>
                <h3 className="text-2xl font-bold text-gray-800 mb-6">Why Sell Directly to Consumers?</h3>
                
                <div className="space-y-4">
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white">
                        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-medium text-gray-900">Higher Profits</h4>
                      <p className="mt-2 text-base text-gray-600">
                        Eliminate middlemen and keep more of the sale price. Set your own prices based on your production costs and market demand.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white">
                        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-medium text-gray-900">Reduced Risk</h4>
                      <p className="mt-2 text-base text-gray-600">
                        Secure pre-orders and develop a loyal customer base. Reduce dependence on wholesale markets and price fluctuations.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white">
                        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 12l3-3 3 3 4-4M8 21l4-4 4 4M3 4h18M4 4h16v12a1 1 0 01-1 1H5a1 1 0 01-1-1V4z" />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-medium text-gray-900">Growth Insights</h4>
                      <p className="mt-2 text-base text-gray-600">
                        Access detailed analytics on your most popular products, customer preferences, and sales patterns to optimize your farming strategy.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white">
                        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-medium text-gray-900">Flexible Schedule</h4>
                      <p className="mt-2 text-base text-gray-600">
                        Control your own delivery and pickup times. Work with a schedule that fits your farming operations and personal life.
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex">
                    <div className="flex-shrink-0">
                      <div className="flex items-center justify-center h-12 w-12 rounded-md bg-green-500 text-white">
                        <svg className="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>
                      </div>
                    </div>
                    <div className="ml-4">
                      <h4 className="text-lg font-medium text-gray-900">Direct Customer Relationships</h4>
                      <p className="mt-2 text-base text-gray-600">
                        Build direct connections with the people who enjoy your produce. Get immediate feedback to improve your offerings.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Success Stories */}
        {activeTab === 'success' && (
          <div className="mb-12">
            <div className="grid grid-cols-1 gap-8">
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="md:flex">
                  <div className="md:flex-shrink-0 md:w-1/3">
                    <img 
                      src="https://images.unsplash.com/photo-1595132770168-2bfaa2479ddf?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=400&q=80" 
                      alt="Farmer" 
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="p-8">
                    <div className="flex items-center">
                      <h3 className="text-xl font-bold text-gray-900">Anand Patel</h3>
                      <div className="ml-4 flex space-x-1 text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                    <p className="mt-2 text-gray-600">Organic Vegetable Farmer, Gujarat</p>
                    
                    <p className="mt-4 text-gray-600 italic">
                      "Before joining this platform, I was selling my organic vegetables to wholesalers at low prices. Now I connect directly with families who appreciate quality organic produce and are willing to pay fair prices. My income has increased by 65% in just 6 months."
                    </p>
                    
                    <div className="mt-6 flex flex-wrap gap-4">
                      <div className="bg-green-50 rounded-lg p-3">
                        <div className="font-bold text-green-600 text-xl">65%</div>
                        <div className="text-sm text-green-700">Income Increase</div>
                      </div>
                      <div className="bg-green-50 rounded-lg p-3">
                        <div className="font-bold text-green-600 text-xl">120+</div>
                        <div className="text-sm text-green-700">Regular Customers</div>
                      </div>
                      <div className="bg-green-50 rounded-lg p-3">
                        <div className="font-bold text-green-600 text-xl">4.9/5</div>
                        <div className="text-sm text-green-700">Customer Rating</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="md:flex">
                  <div className="md:flex-shrink-0 md:w-1/3">
                    <img 
                      src="https://images.unsplash.com/photo-1569880153113-76e33fc52d5f?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=400&q=80" 
                      alt="Farmer" 
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="p-8">
                    <div className="flex items-center">
                      <h3 className="text-xl font-bold text-gray-900">Lakshmi Devi</h3>
                      <div className="ml-4 flex space-x-1 text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                    <p className="mt-2 text-gray-600">Fruit Orchard Owner, Karnataka</p>
                    
                    <p className="mt-4 text-gray-600 italic">
                      "As a female farmer, I faced many challenges selling my fruits in traditional markets. Through this platform, I've built a trusted brand. The direct feedback from customers has helped me improve my growing practices, and I've expanded my orchard with the increased profits."
                    </p>
                    
                    <div className="mt-6 flex flex-wrap gap-4">
                      <div className="bg-green-50 rounded-lg p-3">
                        <div className="font-bold text-green-600 text-xl">70%</div>
                        <div className="text-sm text-green-700">Less Wastage</div>
                      </div>
                      <div className="bg-green-50 rounded-lg p-3">
                        <div className="font-bold text-green-600 text-xl">2x</div>
                        <div className="text-sm text-green-700">Orchard Size</div>
                      </div>
                      <div className="bg-green-50 rounded-lg p-3">
                        <div className="font-bold text-green-600 text-xl">₹12,000+</div>
                        <div className="text-sm text-green-700">Weekly Sales</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white rounded-lg shadow-md overflow-hidden">
                <div className="md:flex">
                  <div className="md:flex-shrink-0 md:w-1/3">
                    <img 
                      src="https://images.unsplash.com/photo-1623113562225-694f6e4ddd87?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&h=400&q=80" 
                      alt="Farmer" 
                      className="h-full w-full object-cover"
                    />
                  </div>
                  <div className="p-8">
                    <div className="flex items-center">
                      <h3 className="text-xl font-bold text-gray-900">Vikas Singh</h3>
                      <div className="ml-4 flex space-x-1 text-yellow-400">
                        {[...Array(5)].map((_, i) => (
                          <svg key={i} className="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                    <p className="mt-2 text-gray-600">Dairy Farmer, Punjab</p>
                    
                    <p className="mt-4 text-gray-600 italic">
                      "Starting with just 8 cows, I was struggling to make ends meet selling milk to processors. Through this platform, I now sell premium dairy products directly to over 200 families. The analytics tools helped me understand which products were most profitable, allowing me to focus my production effectively."
                    </p>
                    
                    <div className="mt-6 flex flex-wrap gap-4">
                      <div className="bg-green-50 rounded-lg p-3">
                        <div className="font-bold text-green-600 text-xl">85%</div>
                        <div className="text-sm text-green-700">Profit Margin</div>
                      </div>
                      <div className="bg-green-50 rounded-lg p-3">
                        <div className="font-bold text-green-600 text-xl">200+</div>
                        <div className="text-sm text-green-700">Weekly Orders</div>
                      </div>
                      <div className="bg-green-50 rounded-lg p-3">
                        <div className="font-bold text-green-600 text-xl">24</div>
                        <div className="text-sm text-green-700">Cows Now</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
        
        {/* Farmer Tools & Resources */}
        <div className="mb-12">
          <h2 className="text-2xl font-bold text-gray-800 mb-6">Tools & Resources for Farmers</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-blue-500">
              <div className="text-blue-500 mb-3">
                <FiBarChart2 className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Sales Analytics</h3>
              <p className="text-gray-600">
                Track your sales performance, identify your best-selling products, and understand customer preferences with detailed analytics.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-purple-500">
              <div className="text-purple-500 mb-3">
                <FiUsers className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Customer Management</h3>
              <p className="text-gray-600">
                Build and manage your customer relationships, create customer segments, and send targeted updates about new harvests.
              </p>
            </div>
            
            <div className="bg-white rounded-lg shadow-md p-6 border-t-4 border-orange-500">
              <div className="text-orange-500 mb-3">
                <FiTruck className="h-8 w-8" />
              </div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Delivery Management</h3>
              <p className="text-gray-600">
                Optimize your delivery routes, schedule pickups, and manage your logistics efficiently to save time and reduce costs.
              </p>
            </div>
          </div>
        </div>
        
        {/* Call to Action - Login/Register */}
        <div className="bg-gradient-to-r from-green-600 to-green-500 rounded-xl shadow-xl overflow-hidden">
          <div className="md:flex items-center">
            <div className="p-8 md:w-2/3">
              <h2 className="text-2xl font-bold text-white mb-4">
                Ready to Grow Your Farm Business?
              </h2>
              <p className="text-green-100 mb-6">
                Join thousands of successful farmers who are selling directly to consumers and increasing their profits. Create your account today to start listing your products and connecting with customers.
              </p>
              <div className="flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4">
                <Link 
                  to="/login" 
                  className="px-6 py-3 bg-white text-green-600 font-medium rounded-md shadow hover:bg-gray-50 transition-colors flex items-center justify-center"
                >
                  Login
                  <FiArrowRight className="ml-2" />
                </Link>
                <Link 
                  to="/register" 
                  className="px-6 py-3 bg-green-700 text-white font-medium rounded-md shadow hover:bg-green-800 transition-colors flex items-center justify-center"
                >
                  Create Farmer Account
                  <FiArrowRight className="ml-2" />
                </Link>
              </div>
            </div>
            <div className="hidden md:block md:w-1/3 p-8">
              <div className="bg-white p-6 rounded-lg shadow-inner">
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Login to Your Account</h3>
                <form className="space-y-4">
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
                    <input 
                      type="email" 
                      id="email" 
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                      placeholder="your@email.com"
                    />
                  </div>
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
                    <input 
                      type="password" 
                      id="password" 
                      className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                      placeholder="••••••••"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <input 
                        id="remember_me" 
                        type="checkbox" 
                        className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                      />
                      <label htmlFor="remember_me" className="ml-2 block text-sm text-gray-700">
                        Remember me
                      </label>
                    </div>
                    <a href="#" className="text-sm text-green-600 hover:text-green-800">
                      Forgot password?
                    </a>
                  </div>
                  <button 
                    type="submit" 
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                  >
                    Sign in
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};

export default FarmerInfo;