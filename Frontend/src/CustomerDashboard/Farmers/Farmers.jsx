import React, { useState, useEffect } from 'react'
import CustomerNavbar from '../CustomerNavbar'
import Footer from '../../components/Common/Footer/Footer'

const Farmers = () => {
  const [farmers, setFarmers] = useState([])
  const [filteredFarmers, setFilteredFarmers] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchQuery, setSearchQuery] = useState('')
  const [locations, setLocations] = useState([])
  const [selectedLocation, setSelectedLocation] = useState('all')
  const [sortBy, setSortBy] = useState('rating')
  const [savedFarmers, setSavedFarmers] = useState([])

  useEffect(() => {
    // Fetch farmers data
    const fetchFarmers = async () => {
      setIsLoading(true)
      try {
        // Replace with your actual API call
        // const response = await fetch('/api/farmers')
        // const data = await response.json()
        
        // Simulated farmers data
        setTimeout(() => {
          const mockFarmers = [
            {
              id: 1,
              name: "Anjali Farms",
              owner: "Anjali Sharma",
              description: "Organic farm specializing in vegetables and herbs. We use sustainable farming practices to grow the freshest produce.",
              location: "Pune, Maharashtra",
              products: 24,
              rating: 4.8,
              memberSince: "2019",
              image: "https://images.unsplash.com/photo-1595413031356-fda4f8aac91b?auto=format&fit=crop&w=600&q=80",
              profileImage: "https://randomuser.me/api/portraits/women/44.jpg",
              specialties: ["Tomatoes", "Spinach", "Bell Peppers"]
            },
            {
              id: 2,
              name: "Green Valley",
              owner: "Rajesh Patel",
              description: "Family-run farm focused on traditional farming methods. We grow a variety of seasonal vegetables.",
              location: "Nashik, Maharashtra",
              products: 18,
              rating: 4.6,
              memberSince: "2020",
              image: "https://images.unsplash.com/photo-1585150841375-76fa8c07dfd4?auto=format&fit=crop&w=600&q=80",
              profileImage: "https://randomuser.me/api/portraits/men/22.jpg",
              specialties: ["Potatoes", "Onions", "Cauliflower"]
            },
            {
              id: 3,
              name: "Punjab Farms",
              owner: "Gurpreet Singh",
              description: "Large-scale farm specialized in grains and pulses. Our fields are cultivated using minimal chemical interventions.",
              location: "Amritsar, Punjab",
              products: 32,
              rating: 4.9,
              memberSince: "2018",
              image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&w=600&q=80",
              profileImage: "https://randomuser.me/api/portraits/men/32.jpg",
              specialties: ["Wheat", "Rice", "Lentils"]
            },
            {
              id: 4,
              name: "Himachal Orchards",
              owner: "Vikram Thakur",
              description: "Mountain orchard growing apples, pears and other fruits. Pure mountain air and water give our fruits distinctive flavor.",
              location: "Shimla, Himachal Pradesh",
              products: 15,
              rating: 4.7,
              memberSince: "2021",
              image: "https://images.unsplash.com/photo-1475734442097-59d6dfb37eb1?auto=format&fit=crop&w=600&q=80",
              profileImage: "https://randomuser.me/api/portraits/men/42.jpg",
              specialties: ["Apples", "Pears", "Plums"]
            },
            {
              id: 5,
              name: "Organic Haven",
              owner: "Meena Kapoor",
              description: "Certified organic farm with diverse crops. We focus on biodiversity and soil health.",
              location: "Lonavala, Maharashtra",
              products: 28,
              rating: 4.5,
              memberSince: "2017",
              image: "https://images.unsplash.com/photo-1500651230702-0e2d8a49d4ad?auto=format&fit=crop&w=600&q=80",
              profileImage: "https://randomuser.me/api/portraits/women/28.jpg",
              specialties: ["Carrots", "Beans", "Leafy Greens"]
            },
            {
              id: 6,
              name: "Nature's Nectar",
              owner: "Ravi Kumar",
              description: "Specialized in honey production and processing. Our bees forage in pristine forest areas.",
              location: "Coorg, Karnataka",
              products: 8,
              rating: 4.9,
              memberSince: "2019",
              image: "https://images.unsplash.com/photo-1471193945509-9ad0617afabf?auto=format&fit=crop&w=600&q=80",
              profileImage: "https://randomuser.me/api/portraits/men/65.jpg",
              specialties: ["Honey", "Beeswax", "Propolis"]
            },
          ]
          
          setFarmers(mockFarmers)
          setFilteredFarmers(mockFarmers)
          
          // Extract unique locations
          const uniqueLocations = [...new Set(mockFarmers.map(farmer => 
            farmer.location.split(', ')[1]  // Extract state from "City, State"
          ))]
          setLocations(uniqueLocations)
          
          // Simulate saved farmers
          setSavedFarmers([1, 3, 5])  // IDs of saved farmers
          
          setIsLoading(false)
        }, 1000)
      } catch (error) {
        console.error("Failed to fetch farmers:", error)
        setIsLoading(false)
      }
    }

    fetchFarmers()
  }, [])

  // Filter farmers when filters change
  useEffect(() => {
    let result = [...farmers]
    
    // Filter by location
    if (selectedLocation !== 'all') {
      result = result.filter(farmer => 
        farmer.location.includes(selectedLocation)
      )
    }
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(farmer => 
        farmer.name.toLowerCase().includes(query) || 
        farmer.description.toLowerCase().includes(query) ||
        farmer.owner.toLowerCase().includes(query) ||
        farmer.location.toLowerCase().includes(query) ||
        farmer.specialties.some(specialty => 
          specialty.toLowerCase().includes(query)
        )
      )
    }
    
    // Sort farmers
    switch(sortBy) {
      case 'name':
        result.sort((a, b) => a.name.localeCompare(b.name))
        break
      case 'products':
        result.sort((a, b) => b.products - a.products)
        break
      case 'rating':
      default:
        result.sort((a, b) => b.rating - a.rating)
        break
    }
    
    setFilteredFarmers(result)
  }, [selectedLocation, sortBy, searchQuery, farmers])

  // Toggle save farmer
  const toggleSaveFarmer = (farmerId) => {
    if (savedFarmers.includes(farmerId)) {
      setSavedFarmers(savedFarmers.filter(id => id !== farmerId))
    } else {
      setSavedFarmers([...savedFarmers, farmerId])
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <CustomerNavbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Our Farmers</h1>
          <div className="flex items-center">
            <div className="relative">
              <input
                type="text"
                placeholder="Search farmers..."
                className="w-64 pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              <div className="absolute left-3 top-2.5 text-gray-400">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>
        </div>
        
        <div className="bg-green-50 p-6 rounded-lg shadow-sm mb-8">
          <h2 className="text-lg font-semibold text-green-800 mb-2">Connect With Local Farmers</h2>
          <p className="text-green-700">
            Discover the farmers behind your food. Get to know their stories, farming practices, and build direct relationships for the freshest produce.
          </p>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters sidebar */}
          <div className="w-full md:w-64 bg-white p-4 rounded-lg shadow-md h-fit">
            <div className="mb-6">
              <h3 className="text-md font-medium text-gray-800 mb-3">Location</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    id="location-all"
                    type="radio"
                    name="location"
                    value="all"
                    checked={selectedLocation === 'all'}
                    onChange={() => setSelectedLocation('all')}
                    className="h-4 w-4 text-green-600 focus:ring-green-500"
                  />
                  <label htmlFor="location-all" className="ml-2 text-sm text-gray-700">
                    All Locations
                  </label>
                </div>
                
                {locations.map(location => (
                  <div key={location} className="flex items-center">
                    <input
                      id={`location-${location}`}
                      type="radio"
                      name="location"
                      value={location}
                      checked={selectedLocation === location}
                      onChange={() => setSelectedLocation(location)}
                      className="h-4 w-4 text-green-600 focus:ring-green-500"
                    />
                    <label htmlFor={`location-${location}`} className="ml-2 text-sm text-gray-700">
                      {location}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            <div>
              <h3 className="text-md font-medium text-gray-800 mb-3">Sort By</h3>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="rating">Top Rated</option>
                <option value="products">Most Products</option>
                <option value="name">Name (A-Z)</option>
              </select>
            </div>
          </div>
          
          {/* Farmers grid */}
          <div className="flex-1">
            {isLoading ? (
              <div className="flex justify-center items-center h-96">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
              </div>
            ) : filteredFarmers.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-96 bg-white rounded-lg shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="mt-4 text-lg font-medium text-gray-900">No farmers found</h3>
                <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter criteria.</p>
                <button 
                  onClick={() => {
                    setSelectedLocation('all')
                    setSearchQuery('')
                    setSortBy('rating')
                  }}
                  className="mt-4 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {filteredFarmers.map(farmer => (
                  <div key={farmer.id} className="bg-white rounded-lg shadow-md overflow-hidden">
                    <div className="relative h-40 overflow-hidden">
                      <img 
                        src={farmer.image} 
                        alt={farmer.name}
                        className="w-full h-full object-cover"
                      />
                      <button 
                        onClick={() => toggleSaveFarmer(farmer.id)}
                        className={`absolute top-3 right-3 p-2 rounded-full ${
                          savedFarmers.includes(farmer.id) 
                            ? 'bg-red-500 text-white' 
                            : 'bg-white text-gray-400 hover:text-red-500'
                        }`}
                      >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill={savedFarmers.includes(farmer.id) ? "currentColor" : "none"} viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </button>
                    </div>
                    <div className="p-5">
                      <div className="flex items-start">
                        <img 
                          src={farmer.profileImage} 
                          alt={farmer.owner}
                          className="h-12 w-12 rounded-full object-cover border-2 border-white shadow-sm"
                        />
                        <div className="ml-4">
                          <h3 className="text-lg font-semibold text-gray-800">{farmer.name}</h3>
                          <div className="flex items-center">
                            <svg className="h-4 w-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <span className="ml-1 text-sm text-gray-600">{farmer.rating} • {farmer.products} products</span>
                          </div>
                          <p className="text-sm text-gray-500 mt-1">{farmer.location}</p>
                        </div>
                      </div>
                      
                      <p className="mt-3 text-sm text-gray-600">{farmer.description}</p>
                      
                      <div className="mt-4">
                        <h4 className="text-sm font-medium text-gray-700">Specialties:</h4>
                        <div className="flex flex-wrap gap-2 mt-1">
                          {farmer.specialties.map((specialty, index) => (
                            <span 
                              key={index}
                              className="px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full"
                            >
                              {specialty}
                            </span>
                          ))}
                        </div>
                      </div>
                      
                      <div className="mt-4 flex justify-between items-center">
                        <span className="text-xs text-gray-500">Member since {farmer.memberSince}</span>
                        <div className="flex space-x-2">
                          <button className="px-3 py-1.5 border border-gray-300 text-gray-700 text-sm rounded-md hover:bg-gray-50">
                            Message
                          </button>
                          <button className="px-3 py-1.5 bg-green-600 text-white text-sm rounded-md hover:bg-green-700">
                            View Products
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}

export default Farmers