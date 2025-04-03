import React, { useState } from 'react';
import Footer from '../../components/Common/Footer/Footer';
import MainNavBar from '../Navbar/MainNavBar';
import {Link} from 'react-router-dom';

const CustomerGuide = () => {
  const [activeTab, setActiveTab] = useState('browse');

  const guides = [
    {
      id: 'browse',
      title: 'Browse Farmers',
      icon: '👨‍🌾',
      color: 'from-amber-500 to-yellow-600',
      description: 'Discover local farmers and their available produce',
      steps: [
        {
          title: 'Create Your Account',
          description: 'Sign up with your basic information to start browsing farmers in your area and their available products.',
          icon: '👤'
        },
        {
          title: 'Explore Farmer Profiles',
          description: 'View detailed profiles of farmers including their farming practices, product specialties, and customer reviews.',
          icon: '🔍'
        },
        {
          title: 'Filter by Location',
          description: 'Find farmers closest to you for the freshest produce and lower delivery costs or convenient pickup options.',
          icon: '📍'
        },
        {
          title: 'Follow Favorite Farmers',
          description: 'Save your favorite farmers to get notified when they list new products or have special offers available.',
          icon: '⭐'
        }
      ]
    },
    {
      id: 'purchase',
      title: 'Direct Purchase',
      icon: '🛒',
      color: 'from-green-500 to-emerald-600',
      description: 'Buy fresh produce directly from farmers with no middlemen',
      steps: [
        {
          title: 'Add to Cart',
          description: 'Select the quality and quantity of products you want to purchase from one or multiple farmers.',
          icon: '🛍️'
        },
        {
          title: 'Choose Delivery/Pickup',
          description: 'Select between home delivery or farm pickup options, with available time slots based on farmer availability.',
          icon: '🚚'
        },
        {
          title: 'Secure Payment',
          description: 'Pay safely through our platform using multiple payment options including cards, UPI, and cash on delivery.',
          icon: '💳'
        },
        {
          title: 'Rate & Review',
          description: 'Share your experience and provide feedback to help farmers improve and help other customers make informed decisions.',
          icon: '✍️'
        }
      ]
    },
    {
      id: 'trending',
      title: 'Popular Products',
      icon: '🔥',
      color: 'from-red-500 to-rose-600',
      description: 'Discover what other customers are buying right now',
      steps: [
        {
          title: 'Trending Products',
          description: 'See what products are currently most popular among customers in your region and nationwide.',
          icon: '📈'
        },
        {
          title: 'Best Value Deals',
          description: 'Find products with the best price-to-quality ratio based on customer ratings and market analysis.',
          icon: '💯'
        },
        {
          title: 'New Arrivals',
          description: 'Discover newly listed products from farmers to be among the first to try fresh harvests.',
          icon: '🆕'
        },
        {
          title: 'Community Favorites',
          description: 'Browse products that have consistently received high ratings from our community of customers.',
          icon: '❤️'
        }
      ]
    },
    {
      id: 'seasonal',
      title: 'Seasonal Produce',
      icon: '🍎',
      color: 'from-purple-500 to-indigo-600',
      description: 'Find what\'s currently in season for maximum freshness',
      steps: [
        {
          title: 'Seasonal Calendar',
          description: 'View our interactive seasonal calendar to see what produce is currently in season in your region.',
          icon: '📅'
        },
        {
          title: 'Regional Specialties',
          description: 'Explore region-specific seasonal products that might not be available year-round or in other areas.',
          icon: '🌍'
        },
        {
          title: 'Seasonal Recipes',
          description: 'Get curated recipes and preparation tips specifically for seasonal produce to make the most of your purchase.',
          icon: '📝'
        },
        {
          title: 'Pre-order Upcoming Produce',
          description: 'Reserve upcoming seasonal produce before harvest to ensure you don\'t miss out on limited availability items.',
          icon: '⏱️'
        }
      ]
    }
  ];

  return (
    <>
    <MainNavBar/>
    <section className="bg-gradient-to-br from-green-50 to-amber-50 py-16 px-4 font-['Montserrat']">
      <div className="max-w-7xl mx-auto mt-14">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold text-green-900 mb-4">Customer's Guide</h2>
          <p className="text-lg text-green-700 max-w-3xl mx-auto">
            Your complete guide to buying farm-fresh produce directly from local farmers. 
            Get the freshest food while supporting sustainable agriculture.
          </p>
        </div>

        {/* Navigation Tabs */}
        <div className="flex flex-wrap justify-center gap-2 md:gap-4 mb-8">
          {guides.map((guide) => (
            <button
              key={guide.id}
              onClick={() => setActiveTab(guide.id)}
              className={`flex items-center px-5 py-3 rounded-full transition-all duration-300 ${
                activeTab === guide.id 
                  ? `bg-gradient-to-r ${guide.color} text-white shadow-lg`
                  : 'bg-white/80 text-gray-700 hover:bg-white hover:shadow-md'
              }`}
            >
              <span className="mr-2 text-xl">{guide.icon}</span>
              <span className="font-medium">{guide.title}</span>
            </button>
          ))}
        </div>

        {/* Content Container */}
        <div className="bg-white/90 backdrop-blur-sm rounded-2xl shadow-xl p-6 md:p-8">
          {guides.map((guide) => (
            <div 
              key={guide.id} 
              className={`transition-all duration-500 ${
                activeTab === guide.id ? 'opacity-100' : 'hidden opacity-0'
              }`}
            >
              <div className="flex flex-col md:flex-row gap-6 mb-8">
                <div className={`w-16 h-16 md:w-24 md:h-24 rounded-full bg-gradient-to-br ${guide.color} flex items-center justify-center text-3xl md:text-4xl text-white shadow-lg`}>
                  {guide.icon}
                </div>
                <div className="md:flex-1">
                  <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-2">{guide.title}</h3>
                  <p className="text-gray-600 text-lg">{guide.description}</p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6 mt-8">
                {guide.steps.map((step, index) => (
                  <div key={index} className="bg-gray-50 rounded-xl p-6 transition-all duration-300 hover:shadow-md hover:bg-gray-100/80">
                    <div className="flex items-start">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-xl text-white mr-4 shadow-md flex-shrink-0">
                        {step.icon}
                      </div>
                      <div>
                        <h4 className="text-xl font-semibold text-gray-800 mb-2">{step.title}</h4>
                        <p className="text-gray-600">{step.description}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {guide.id === 'browse' && (
                <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-6">
                  {[
                    {
                      name: "Green Valley Organics",
                      location: "Anand, Gujarat",
                      image: "https://images.unsplash.com/photo-1500937386664-56d1dfef3854?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
                      specialty: "Organic Vegetables",
                      rating: 4.8
                    },
                    {
                      name: "Sunshine Orchard",
                      location: "Nashik, Maharashtra",
                      image: "https://images.unsplash.com/photo-1585438775626-30c830b89d1d?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
                      specialty: "Fresh Fruits",
                      rating: 4.9
                    },
                    {
                      name: "Pure Dairy Farm",
                      location: "Karnal, Haryana",
                      image: "https://images.unsplash.com/photo-1514792368985-f80e9d482a02?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
                      specialty: "Organic Dairy",
                      rating: 4.7
                    }
                  ].map((farmer, idx) => (
                    <div key={idx} className="relative overflow-hidden rounded-xl shadow-md group">
                      <div className="h-48 overflow-hidden">
                        <img 
                          src={farmer.image} 
                          alt={farmer.name} 
                          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                        />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-70"></div>
                      <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                        <div className="flex justify-between items-center mb-2">
                          <h5 className="font-bold text-lg">{farmer.name}</h5>
                          <div className="flex items-center bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full">
                            <span className="text-amber-300 mr-1">★</span>
                            <span className="text-sm">{farmer.rating}</span>
                          </div>
                        </div>
                        <p className="text-white/80 text-sm flex items-center">
                          <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                          </svg>
                          {farmer.location}
                        </p>
                        <div className="mt-2 flex justify-between items-center">
                          <span className="bg-green-600/70 text-white text-xs px-2 py-1 rounded-full">
                            {farmer.specialty}
                          </span>
                          <button className="text-white/90 hover:text-white text-sm underline">
                            View Profile
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {guide.id === 'purchase' && (
                <div className="mt-10 bg-green-50 border border-green-200 rounded-lg overflow-hidden">
                  <div className="bg-green-100 p-4 border-b border-green-200">
                    <h4 className="text-green-800 font-semibold">Sample Order Process</h4>
                  </div>
                  <div className="p-6">
                    <div className="flex flex-col md:flex-row gap-6">
                      <div className="md:w-2/3">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
                          {[
                            {
                              name: "Organic Tomatoes",
                              price: "₹60/kg",
                              farm: "Green Valley Organics",
                              image: "https://images.unsplash.com/photo-1524593166156-312f362cada0?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
                            },
                            {
                              name: "Fresh Spinach",
                              price: "₹40/bundle",
                              farm: "Nature's Basket Farm",
                              image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
                            },
                            {
                              name: "Alphonso Mangoes",
                              price: "₹350/dozen",
                              farm: "Sunshine Orchard",
                              image: "https://images.unsplash.com/photo-1591073113125-e46713c829ed?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
                            },
                            {
                              name: "Organic Milk",
                              price: "₹70/liter",
                              farm: "Pure Dairy Farm",
                              image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?ixlib=rb-1.2.1&auto=format&fit=crop&w=200&q=80"
                            }
                          ].map((product, idx) => (
                            <div key={idx} className="flex bg-white rounded-lg overflow-hidden shadow-sm">
                              <div className="w-1/3">
                                <img 
                                  src={product.image} 
                                  alt={product.name} 
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div className="w-2/3 p-3">
                                <h5 className="font-medium text-gray-800 mb-1">{product.name}</h5>
                                <p className="text-green-700 font-semibold">{product.price}</p>
                                <p className="text-gray-500 text-xs mt-1">{product.farm}</p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                      <div className="md:w-1/3 bg-white p-4 rounded-lg shadow-sm">
                        <h5 className="font-semibold text-gray-800 mb-3 pb-2 border-b border-gray-100">Order Summary</h5>
                        <div className="space-y-2 mb-4">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Subtotal (4 items)</span>
                            <span className="text-gray-800">₹520</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Delivery Fee</span>
                            <span className="text-gray-800">₹50</span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Platform Fee</span>
                            <span className="text-gray-800">₹20</span>
                          </div>
                        </div>
                        <div className="flex justify-between font-semibold border-t border-gray-100 pt-2 mb-4">
                          <span>Total</span>
                          <span className="text-green-700">₹590</span>
                        </div>
                        <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded-lg transition-colors">
                          Proceed to Checkout
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {guide.id === 'trending' && (
                <div className="mt-10">
                  <div className="bg-red-50 rounded-xl p-4 mb-6">
                    <h4 className="flex items-center text-lg font-semibold text-red-800 mb-3">
                      <span className="mr-2">🔥</span> Top Trending Products
                    </h4>
                    <p className="text-red-700 mb-3">
                      These products are currently trending in your region based on recent purchases and customer interest.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                    {[
                      {
                        name: "Kesar Mangoes",
                        price: "₹450/dozen",
                        trending: "#1 in Fruits",
                        image: "https://images.unsplash.com/photo-1590502593747-42a996133562?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
                        change: "+32%"
                      },
                      {
                        name: "Organic Brown Rice",
                        price: "₹120/kg",
                        trending: "#1 in Grains",
                        image: "https://images.unsplash.com/photo-1586201375761-83865001e8ac?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
                        change: "+24%"
                      },
                      {
                        name: "Fresh Paneer",
                        price: "₹350/kg",
                        trending: "#1 in Dairy",
                        image: "https://images.unsplash.com/photo-1631885133130-199857c82a1b?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
                        change: "+15%"
                      },
                      {
                        name: "Red Bell Peppers",
                        price: "₹180/kg",
                        trending: "#1 in Vegetables",
                        image: "https://images.unsplash.com/photo-1592924357228-91a4daadcfea?ixlib=rb-1.2.1&auto=format&fit=crop&w=400&q=80",
                        change: "+47%"
                      }
                    ].map((product, idx) => (
                      <div key={idx} className="bg-white rounded-xl shadow-md overflow-hidden relative group">
                        <div className="absolute top-2 right-2 z-10">
                          <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                            {product.change}
                          </span>
                        </div>
                        <div className="h-36 overflow-hidden">
                          <img 
                            src={product.image} 
                            alt={product.name} 
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                        <div className="p-3">
                          <h5 className="font-medium text-gray-800 truncate">{product.name}</h5>
                          <p className="text-green-700 font-semibold">{product.price}</p>
                          <div className="flex items-center mt-2">
                            <span className="text-xs text-red-600 bg-red-50 px-2 py-1 rounded-full">
                              {product.trending}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  
                  <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-amber-50 rounded-lg p-4 flex items-center">
                      <div className="w-12 h-12 rounded-full bg-amber-100 flex items-center justify-center text-2xl mr-4">
                        🔍
                      </div>
                      <div>
                        <h5 className="font-medium text-amber-800 mb-1">Most Searched</h5>
                        <p className="text-amber-700 text-sm">Organic vegetables, seasonal fruits, honey</p>
                      </div>
                    </div>
                    <div className="bg-blue-50 rounded-lg p-4 flex items-center">
                      <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center text-2xl mr-4">
                        🛒
                      </div>
                      <div>
                        <h5 className="font-medium text-blue-800 mb-1">Most Purchased</h5>
                        <p className="text-blue-700 text-sm">Mangoes, milk, tomatoes, onions</p>
                      </div>
                    </div>
                    <div className="bg-purple-50 rounded-lg p-4 flex items-center">
                      <div className="w-12 h-12 rounded-full bg-purple-100 flex items-center justify-center text-2xl mr-4">
                        ⭐
                      </div>
                      <div>
                        <h5 className="font-medium text-purple-800 mb-1">Top Rated</h5>
                        <p className="text-purple-700 text-sm">Alphonso mangoes, organic honey</p>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              {guide.id === 'seasonal' && (
                <div className="mt-10">
                  <div className="mb-8 text-center">
                    <div className="inline-block text-4xl mb-3">📅</div>
                    <h4 className="text-xl font-semibold text-gray-800 mb-2">April 2025 - Current Season</h4>
                    <p className="text-gray-600">
                      Here's what's fresh and in season right now. Buying seasonal produce ensures the best quality, 
                      flavor, and nutritional value while supporting sustainable farming practices.
                    </p>
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    {[
                      {
                        name: "Fruits",
                        items: ["Mangoes", "Watermelon", "Lychee", "Jackfruit"],
                        icon: "🍎",
                        color: "bg-red-50 border-red-200"
                      },
                      {
                        name: "Vegetables",
                        items: ["Bottle Gourd", "Ridge Gourd", "Cucumber", "Okra"],
                        icon: "🥦",
                        color: "bg-green-50 border-green-200"
                      },
                      {
                        name: "Grains",
                        items: ["Amaranth", "Bajra", "Maize", "Ragi"],
                        icon: "🌾",
                        color: "bg-amber-50 border-amber-200"
                      },
                      {
                        name: "Herbs & Spices",
                        items: ["Mint", "Coriander", "Curry Leaves", "Green Chillies"],
                        icon: "🌿",
                        color: "bg-emerald-50 border-emerald-200"
                      }
                    ].map((category, idx) => (
                      <div key={idx} className={`rounded-xl p-5 border ${category.color}`}>
                        <div className="flex items-center mb-4">
                          <span className="text-2xl mr-3">{category.icon}</span>
                          <h5 className="text-lg font-semibold text-gray-800">{category.name}</h5>
                        </div>
                        <ul className="space-y-2">
                          {category.items.map((item, i) => (
                            <li key={i} className="flex items-center text-gray-700">
                              <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                              {item}
                            </li>
                          ))}
                        </ul>
                        <button className="w-full mt-4 text-sm text-center py-2 bg-white rounded-lg border border-gray-200 hover:bg-gray-50 text-gray-700">
                          Browse All {category.name}
                        </button>
                      </div>
                    ))}
                  </div>

                  <div className="bg-indigo-50 rounded-xl p-6 mb-8">
                    <h4 className="text-xl font-semibold text-indigo-800 mb-4">Seasonal Recipe Suggestions</h4>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      {[
                        {
                          name: "Mango Lassi",
                          ingredients: "Mangoes, Yogurt, Cardamom",
                          image: "https://images.unsplash.com/photo-1527626649788-8e9e76b14cc2?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
                          time: "10 min"
                        },
                        {
                          name: "Bhindi Masala",
                          ingredients: "Okra, Onions, Tomatoes, Spices",
                          image: "https://images.unsplash.com/photo-1601565960311-172820606442?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
                          time: "30 min"
                        },
                        {
                          name: "Watermelon Mint Cooler",
                          ingredients: "Watermelon, Mint Leaves, Lemon",
                          image: "https://images.unsplash.com/photo-1528826542659-27db5adea13c?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
                          time: "15 min"
                        }
                      ].map((recipe, idx) => (
                        <div key={idx} className="bg-white rounded-lg overflow-hidden shadow-sm group">
                          <div className="h-32 overflow-hidden">
                            <img 
                              src={recipe.image} 
                              alt={recipe.name} 
                              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                            />
                          </div>
                          <div className="p-4">
                            <div className="flex justify-between items-start mb-2">
                              <h5 className="font-medium text-gray-800">{recipe.name}</h5>
                              <span className="bg-indigo-100 text-indigo-600 text-xs px-2 py-1 rounded-full">
                                {recipe.time}
                              </span>
                            </div>
                            <p className="text-gray-600 text-sm">{recipe.ingredients}</p>
                            <button className="mt-3 text-indigo-600 text-sm font-medium hover:text-indigo-700">
                              View Recipe
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-gradient-to-r from-amber-100 to-amber-200 rounded-lg p-5 flex flex-col md:flex-row items-center justify-between">
                    <div className="mb-4 md:mb-0">
                      <h4 className="text-xl font-semibold text-amber-800 mb-2">Coming Next Month</h4>
                      <p className="text-amber-700">
                        Pre-order next month's seasonal produce at special early bird prices.
                      </p>
                    </div>
                    <div className="flex items-center space-x-6">
                      <div className="text-center">
                        <div className="text-3xl mb-1">🥭</div>
                        <div className="text-amber-800 text-sm">Dasheri</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl mb-1">🍈</div>
                        <div className="text-amber-800 text-sm">Muskmelon</div>
                      </div>
                      <div className="text-center">
                        <div className="text-3xl mb-1">🥝</div>
                        <div className="text-amber-800 text-sm">Kiwi</div>
                      </div>
                    </div>
                    <button className="mt-4 md:mt-0 bg-white text-amber-700 hover:bg-amber-50 px-5 py-2 rounded-full shadow-sm font-medium">
                      Pre-order Now
                    </button>
                  </div>
                </div>
              )}
              
              <div className="mt-10 text-center">
                <button className="inline-flex items-center justify-center bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-medium py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <span className="mr-2">Start Shopping for {guide.title}</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Benefits Section */}
        <div className="mt-16 bg-white/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-lg">
          <div className="text-center mb-10">
            <h3 className="font-['Playfair_Display'] text-2xl md:text-3xl font-bold text-green-900 mb-3">Why Buy Direct from Farmers?</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Discover the benefits of cutting out the middleman and supporting local agriculture.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-green-50 rounded-xl p-6 text-center">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-2xl mx-auto mb-4">
                🥗
              </div>
              <h4 className="text-lg font-semibold text-green-800 mb-3">Fresher Produce</h4>
              <p className="text-green-700">
                Products come directly from the farm to your table, often harvested within 24 hours of delivery.
              </p>
            </div>

            <div className="bg-blue-50 rounded-xl p-6 text-center">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-2xl mx-auto mb-4">
                💰
              </div>
              <h4 className="text-lg font-semibold text-blue-800 mb-3">Better Value</h4>
              <p className="text-blue-700">
                Pay fair prices that benefit both you and the farmer without retail markups.
              </p>
            </div>

            <div className="bg-amber-50 rounded-xl p-6 text-center">
              <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center text-2xl mx-auto mb-4">
                🌱
              </div>
              <h4 className="text-lg font-semibold text-amber-800 mb-3">Sustainability</h4>
              <p className="text-amber-700">
                Support environmentally friendly farming practices and reduce transportation emissions.
              </p>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="mt-16 mb-8">
          <h3 className="font-['Playfair_Display'] text-2xl md:text-3xl font-bold text-green-900 text-center mb-10">
            What Our Customers Say
          </h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Priya Sharma",
                location: "Mumbai",
                image: "https://randomuser.me/api/portraits/women/33.jpg",
                text: "The produce I get from this platform is incredibly fresh. I love knowing exactly which farm my food comes from and how it was grown."
              },
              {
                name: "Aditya Patel",
                location: "Bangalore",
                image: "https://randomuser.me/api/portraits/men/54.jpg",
                text: "Being able to buy seasonal fruits directly from farmers has completely changed how my family eats. The quality is unmatched and prices are better than supermarkets."
              },
              {
                name: "Meera Reddy",
                location: "Chennai",
                image: "https://randomuser.me/api/portraits/women/79.jpg",
                text: "I appreciate the transparency this platform provides. I can chat with farmers, learn about their practices, and make informed choices about the food I buy."
              }
            ].map((testimonial, idx) => (
              <div key={idx} className="bg-white rounded-xl shadow-lg p-6 relative">
                <div className="absolute -top-8 left-1/2 transform -translate-x-1/2">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.name} 
                    className="w-16 h-16 rounded-full border-4 border-white shadow-md"
                  />
                </div>
                <div className="pt-8 text-center">
                  <h4 className="text-lg font-semibold text-gray-800">{testimonial.name}</h4>
                  <p className="text-gray-500 text-sm mb-4">{testimonial.location}</p>
                  <div className="text-amber-400 mb-3">★★★★★</div>
                  <p className="text-gray-600 italic">"{testimonial.text}"</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* FAQ Section */}
        <div className="mt-16">
          <h3 className="font-['Playfair_Display'] text-2xl md:text-3xl font-bold text-green-900 text-center mb-8">
            Frequently Asked Questions
          </h3>
          
          <div className="space-y-4 max-w-3xl mx-auto">
            {[
              {
                question: "How fresh is the produce I'll receive?",
                answer: "Most produce is harvested within 24 hours of delivery or pickup. Some items like root vegetables or certain fruits may be harvested slightly earlier for optimal flavor and ripeness."
              },
              {
                question: "Are there any delivery charges?",
                answer: "Delivery charges vary based on your location and order size. Orders above ₹1,000 typically qualify for free delivery within city limits. You can also choose farm pickup to avoid delivery charges."
              },
              {
                question: "How do I know if the produce is truly organic?",
                answer: "Farmers on our platform who claim organic certification must upload their certification documents, which our team verifies. You can view these certificates on the farmer's profile page."
              },
              {
                question: "What if I'm not satisfied with the quality of products?",
                answer: "We have a 100% satisfaction guarantee. If you're not happy with the quality of any product, simply report it within 24 hours of delivery, and we'll issue a refund or replacement."
              }
            ].map((faq, idx) => (
              <div key={idx} className="bg-white rounded-lg shadow-md overflow-hidden">
                <details className="group">
                  <summary className="flex justify-between items-center p-5 cursor-pointer">
                    <h5 className="font-medium text-gray-800">{faq.question}</h5>
                    <span className="text-green-600 group-open:rotate-180 transition-transform duration-300">
                      ▼
                    </span>
                  </summary>
                  <div className="p-5 pt-0 border-t border-gray-100">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                </details>
              </div>
            ))}
          </div>
        </div>

        {/* Get Started */}
        <div className="mt-16 bg-gradient-to-r from-green-600 to-green-700 rounded-2xl p-8 md:p-10 text-white text-center shadow-xl">
          <h3 className="font-['Playfair_Display'] text-3xl md:text-4xl font-bold mb-4">Ready to Eat Fresh?</h3>
          <p className="text-green-100 max-w-2xl mx-auto mb-8">
            Join thousands of satisfied customers who have discovered the joy of farm-fresh produce delivered directly to their doorstep.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link to="/signup"><button className="bg-white text-green-700 hover:bg-green-50 font-semibold py-3 px-8 rounded-full shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              Create Your Account
            </button></Link>
            <button className="bg-transparent border-2 border-white text-white hover:bg-white/10 font-semibold py-3 px-8 rounded-full shadow-lg transition-all duration-300 transform hover:-translate-y-1">
              Browse Products
            </button>
          </div>
          <Link to="/login">
          <p className="text-green-200 mt-6 text-sm">
            Already have an account? <a href="#login" className="text-white underline">Log in here</a>
          </p></Link>
        </div>
      </div>
    </section>
    <Footer/>
    </>
  );
};

export default CustomerGuide;