import React, { useState } from 'react';
import Footer from '../../components/Common/Footer/Footer';
import MainNavBar from '../Navbar/MainNavBar';

const FarmerGuide = () => {
  const [activeTab, setActiveTab] = useState('sell');

  const guides = [
    {
      id: 'sell',
      title: 'Sell Your Produce',
      icon: '🌾',
      color: 'from-amber-500 to-yellow-600',
      description: 'List your harvest and connect with buyers directly',
      steps: [
        {
          title: 'Create Your Farm Profile',
          description: 'Set up your farm details including location, size, and the types of crops you grow. A complete profile builds trust with potential buyers.',
          icon: '👨‍🌾'
        },
        {
          title: 'List Your Products',
          description: 'Add your available produce with details such as quantity, quality grade, harvest date, and your asking price.',
          icon: '📝'
        },
        {
          title: 'Manage Orders',
          description: 'Once buyers place orders, you can review and accept them through your dashboard. Set pickup times or arrange for delivery.',
          icon: '📦'
        },
        {
          title: 'Receive Secure Payments',
          description: 'Get paid directly to your bank account once the transaction is complete, with no hidden fees or delayed payments.',
          icon: '💰'
        }
      ]
    },
    {
      id: 'weather',
      title: 'Weather Forecasts',
      icon: '☀️',
      color: 'from-sky-400 to-blue-600',
      description: 'Plan your farm activities with accurate weather predictions',
      steps: [
        {
          title: 'Hyperlocal Forecasts',
          description: "Access weather predictions specific to your farm's exact location, not just the nearest city or region.",
          icon: '📍'
        },
        {
          title: 'Advanced Warnings',
          description: 'Receive alerts about upcoming extreme weather events like hailstorms, frost, or heavy rainfall that could affect your crops.',
          icon: '⚠️'
        },
        {
          title: 'Seasonal Outlooks',
          description: 'View long-term forecasts to help with crop planning and rotation decisions for the upcoming seasons.',
          icon: '🗓️'
        },
        {
          title: 'Weather History',
          description: 'Access historical weather data for your area to analyze patterns and make more informed growing decisions.',
          icon: '📊'
        }
      ]
    },
    {
      id: 'prices',
      title: 'Market Prices',
      icon: '📈',
      color: 'from-green-500 to-emerald-600',
      description: 'Stay updated with real-time agricultural commodity prices',
      steps: [
        {
          title: 'Live Price Tracking',
          description: 'Monitor current market prices for your crops across different markets and exchanges in real-time.',
          icon: '⏱️'
        },
        {
          title: 'Price Comparison',
          description: 'Compare prices across different buyers, markets, and regions to find the best deal for your produce.',
          icon: '🔍'
        },
        {
          title: 'Price Alerts',
          description: 'Set up notifications to alert you when prices for your crops reach your desired threshold.',
          icon: '🔔'
        },
        {
          title: 'Price Trends & Analysis',
          description: 'View historical price data and expert analysis to help predict future market movements and plan your selling strategy.',
          icon: '📊'
        }
      ]
    },
    {
      id: 'dealers',
      title: 'Connect with Dealers',
      icon: '🤝',
      color: 'from-purple-500 to-indigo-600',
      description: 'Build direct relationships with trusted agricultural dealers',
      steps: [
        {
          title: 'Find Verified Dealers',
          description: 'Browse our database of pre-verified dealers, distributors, and processors who are actively looking for produce like yours.',
          icon: '✅'
        },
        {
          title: 'Instant Messaging',
          description: 'Communicate directly with dealers through our secure messaging system to discuss quantities, quality, and pricing.',
          icon: '💬'
        },
        {
          title: 'Contract Management',
          description: 'Create, negotiate, and sign contracts digitally, with all terms clearly documented for both parties.',
          icon: '📄'
        },
        {
          title: 'Dealer Reviews',
          description: 'Read reviews from other farmers or leave your own feedback to help build a trustworthy community of traders.',
          icon: '⭐'
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
          <h2 className="font-['Playfair_Display'] text-4xl md:text-5xl font-bold text-green-900 mb-4">Farmer's Guide</h2>
          <p className="text-lg text-green-700 max-w-3xl mx-auto">
            Everything you need to know about maximizing your farm's potential with our platform. 
            From selling produce to accessing critical agricultural information.
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

              {guide.id === 'sell' && (
                <div className="mt-10 bg-green-50 border border-green-200 rounded-lg p-6">
                  <h4 className="flex items-center text-lg font-semibold text-green-800 mb-3">
                    <span className="mr-2">💡</span> Pro Tip
                  </h4>
                  <p className="text-green-700">
                    High-quality photos of your produce can increase your sales by up to 40%. Take clear, well-lit pictures that accurately represent your products' quality and freshness.
                  </p>
                </div>
              )}

              {guide.id === 'weather' && (
                <div className="mt-10 p-6 bg-blue-50 border border-blue-200 rounded-lg">
                  <div className="flex justify-between items-center flex-wrap gap-4">
                    <h4 className="text-lg font-semibold text-blue-800">Today's Weather Preview</h4>
                    <span className="bg-white py-1 px-3 rounded-full text-sm text-blue-700 shadow-sm">
                      Your Farm Location
                    </span>
                  </div>
                  
                  <div className="flex items-center justify-center gap-8 mt-4 flex-wrap">
                    <div className="text-center">
                      <div className="text-5xl mb-2">☀️</div>
                      <div className="text-blue-800 font-medium">28°C</div>
                      <div className="text-blue-600 text-sm">Morning</div>
                    </div>
                    <div className="text-center">
                      <div className="text-5xl mb-2">⛅</div>
                      <div className="text-blue-800 font-medium">32°C</div>
                      <div className="text-blue-600 text-sm">Afternoon</div>
                    </div>
                    <div className="text-center">
                      <div className="text-5xl mb-2">🌙</div>
                      <div className="text-blue-800 font-medium">24°C</div>
                      <div className="text-blue-600 text-sm">Evening</div>
                    </div>
                    <div className="text-center">
                      <div className="text-blue-800 font-medium">10%</div>
                      <div className="text-blue-600 text-sm">Precipitation</div>
                    </div>
                    <div className="text-center">
                      <div className="text-blue-800 font-medium">15 km/h</div>
                      <div className="text-blue-600 text-sm">Wind Speed</div>
                    </div>
                  </div>
                </div>
              )}

              {guide.id === 'prices' && (
                <div className="mt-10 overflow-hidden rounded-lg border border-green-200">
                  <div className="bg-green-50 p-4 border-b border-green-200">
                    <h4 className="text-green-800 font-semibold">Today's Market Highlights</h4>
                  </div>
                  <div className="divide-y divide-gray-100">
                    {[
                      { crop: 'Wheat', price: '₹2,240/quintal', change: '+1.5%', trend: 'up' },
                      { crop: 'Rice (Basmati)', price: '₹3,850/quintal', change: '+0.8%', trend: 'up' },
                      { crop: 'Corn', price: '₹1,820/quintal', change: '-0.3%', trend: 'down' },
                      { crop: 'Soybeans', price: '₹3,640/quintal', change: '+2.1%', trend: 'up' },
                    ].map((item, idx) => (
                      <div key={idx} className="flex justify-between items-center p-4 hover:bg-gray-50">
                        <span className="font-medium text-gray-800">{item.crop}</span>
                        <div className="flex items-center">
                          <span className="mr-3">{item.price}</span>
                          <span className={`px-2 py-1 rounded-full text-xs ${
                            item.trend === 'up' ? 'bg-green-100 text-green-600' : 'bg-red-100 text-red-600'
                          }`}>
                            {item.change}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="bg-green-50 p-4 text-center">
                    <a href="#full-market-report" className="text-green-600 font-medium hover:text-green-700 text-sm">
                      View Full Market Report →
                    </a>
                  </div>
                </div>
              )}

              {guide.id === 'dealers' && (
                <div className="mt-10 grid grid-cols-1 md:grid-cols-3 gap-4">
                  {[
                    { name: 'Agarwal Traders', type: 'Grain Wholesaler', rating: 4.8, deals: 235 },
                    { name: 'Patel Agro Products', type: 'Fruits & Vegetables', rating: 4.7, deals: 189 },
                    { name: 'Green Earth Exports', type: 'Organic Produce', rating: 4.9, deals: 124 },
                  ].map((dealer, idx) => (
                    <div key={idx} className="bg-white border border-gray-200 rounded-lg p-5 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-3">
                        <h5 className="font-semibold text-gray-800">{dealer.name}</h5>
                        <span className="bg-purple-100 text-purple-700 px-2 py-1 rounded-full text-xs">
                          Top Dealer
                        </span>
                      </div>
                      <p className="text-gray-500 text-sm mb-3">{dealer.type}</p>
                      <div className="flex items-center mb-4">
                        <div className="text-amber-400 mr-1">★</div>
                        <span className="text-gray-700 font-medium">{dealer.rating}</span>
                        <span className="text-gray-400 text-sm ml-2">({dealer.deals} deals)</span>
                      </div>
                      <button className="w-full bg-purple-600 hover:bg-purple-700 text-white py-2 rounded-lg transition-colors">
                        Contact Dealer
                      </button>
                    </div>
                  ))}
                </div>
              )}
              
              <div className="mt-10 text-center">
                <button className="inline-flex items-center justify-center bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-medium py-3 px-8 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                  <span className="mr-2">Get Started with {guide.title}</span>
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7l5 5m0 0l-5 5m5-5H6"></path>
                  </svg>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-16 bg-white/80 backdrop-blur-sm rounded-2xl p-6 md:p-8 shadow-lg">
          <div className="text-center mb-8">
            <h3 className="font-['Playfair_Display'] text-2xl md:text-3xl font-bold text-green-900 mb-3">Need Help Getting Started?</h3>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our dedicated farmer support team is available to assist you with any questions about using our platform.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <div className="flex flex-col items-center p-5 bg-amber-50 rounded-xl">
              <div className="w-16 h-16 rounded-full bg-amber-100 flex items-center justify-center text-2xl mb-4">
                📱
              </div>
              <h4 className="text-lg font-semibold text-amber-800 mb-2">Call Us</h4>
              <p className="text-amber-700 text-center">
                Speak directly with our farmer support specialists
              </p>
              <a href="tel:+919876543210" className="mt-4 font-medium text-amber-600 hover:text-amber-700">
                +91 98765 43210
              </a>
            </div>

            <div className="flex flex-col items-center p-5 bg-green-50 rounded-xl">
              <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center text-2xl mb-4">
                💬
              </div>
              <h4 className="text-lg font-semibold text-green-800 mb-2">WhatsApp Support</h4>
              <p className="text-green-700 text-center">
                Send us your questions through WhatsApp anytime
              </p>
              <a href="https://wa.me/919876543210" className="mt-4 font-medium text-green-600 hover:text-green-700">
                Message Us
              </a>
            </div>

            <div className="flex flex-col items-center p-5 bg-blue-50 rounded-xl">
              <div className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center text-2xl mb-4">
                📧
              </div>
              <h4 className="text-lg font-semibold text-blue-800 mb-2">Email Support</h4>
              <p className="text-blue-700 text-center">
                Send a detailed inquiry and get a response within 24 hours
              </p>
              <a href="mailto:farmers@example.com" className="mt-4 font-medium text-blue-600 hover:text-blue-700">
                farmers@example.com
              </a>
            </div>
          </div>
        </div>

        {/* Testimonials */}
        <div className="mt-16 mb-8">
          <h3 className="font-['Playfair_Display'] text-2xl md:text-3xl font-bold text-green-900 text-center mb-10">
            What Farmers Are Saying
          </h3>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "Rajesh Patel",
                location: "Gujarat",
                image: "https://randomuser.me/api/portraits/men/44.jpg",
                text: "Since joining this platform, I've increased my profits by cutting out middlemen. The weather forecasts have also helped me plan my harvests more effectively."
              },
              {
                name: "Lakshmi Devi",
                location: "Andhra Pradesh",
                image: "https://randomuser.me/api/portraits/women/68.jpg",
                text: "The market price information helped me negotiate better deals with buyers. I've also connected with dealers who pay premium prices for organic produce."
              },
              {
                name: "Gurpreet Singh",
                location: "Punjab",
                image: "https://randomuser.me/api/portraits/men/32.jpg",
                text: "I was skeptical at first, but after my first transaction through the platform, I was convinced. The process is simple and the support team is always helpful."
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
                question: "Is there a fee to join the platform?",
                answer: "No, creating an account and listing your produce is completely free. We only charge a small transaction fee when you successfully sell your products."
              },
              {
                question: "How accurate are the weather forecasts?",
                answer: "Our weather data comes from multiple meteorological sources and is localized to your specific farm location, offering up to 90% accuracy for 7-day forecasts."
              },
              {
                question: "Can I sell any type of agricultural produce?",
                answer: "Yes, our platform supports all types of agricultural products including grains, fruits, vegetables, dairy, poultry, and specialty crops like organic or heirloom varieties."
              },
              {
                question: "How do I receive payment for my sales?",
                answer: "Payments are processed through our secure system and transferred directly to your registered bank account within 2-3 business days after the buyer receives the produce."
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
      </div>
    </section>
    <Footer/>
    </>
  );
};

export default FarmerGuide;