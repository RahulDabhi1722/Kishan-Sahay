import React, { useState, useEffect } from 'react'
import CustomerNavbar from '../CustomerNavbar'
import Footer from '../../components/Common/Footer/Footer'


const Seasonal = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [currentSeason, setCurrentSeason] = useState('')
  const [seasonalProducts, setSeasonalProducts] = useState([])
  const [featuredRecipes, setFeaturedRecipes] = useState([])
  const [harvestCalendar, setHarvestCalendar] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('all')

  useEffect(() => {
    // Determine current season based on month
    const determineCurrentSeason = () => {
      const month = new Date().getMonth()
      // 0-2: Winter, 3-5: Spring, 6-8: Summer, 9-11: Fall
      const seasons = ["Winter", "Winter", "Spring", "Spring", "Spring", "Summer", "Summer", "Summer", "Fall", "Fall", "Fall", "Winter"]
      return seasons[month]
    }

    // Fetch seasonal data
    const fetchSeasonalData = async () => {
      setIsLoading(true)
      try {
        // Replace with actual API calls
        // const productsResponse = await fetch('/api/products/seasonal')
        // const recipesResponse = await fetch('/api/recipes/seasonal')
        // const calendarResponse = await fetch('/api/harvest-calendar')
        
        const season = determineCurrentSeason()
        setCurrentSeason(season)
        
        // Mock seasonal products data
        setTimeout(() => {
          // Products data
          const mockProducts = [
            {
              id: 1,
              name: "Fresh Strawberries",
              category: "Fruits",
              price: 120,
              unit: "box",
              farmer: "Himachal Farms",
              farmerId: 4,
              description: "Sweet and juicy strawberries, perfect for desserts and smoothies.",
              image: "https://images.unsplash.com/photo-1464965911861-746a04b4bca6?auto=format&fit=crop&w=500&q=80",
              availability: "March to May",
              season: "Spring",
              nutritionalInfo: "Rich in vitamin C and antioxidants",
              isSeasonal: true
            },
            {
              id: 2,
              name: "Organic Spinach",
              category: "Vegetables",
              price: 40,
              unit: "bundle",
              farmer: "Green Valley",
              farmerId: 2,
              description: "Fresh, crisp spinach leaves. Great for salads and cooking.",
              image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=500&q=80",
              availability: "Year-round with peak in Spring",
              season: "Spring",
              nutritionalInfo: "High in iron, vitamins A and C",
              isSeasonal: true
            },
            {
              id: 3,
              name: "Green Peas",
              category: "Vegetables",
              price: 60,
              unit: "kg",
              farmer: "Organic Haven",
              farmerId: 5,
              description: "Sweet, tender green peas. Freshly picked at perfect ripeness.",
              image: "https://images.unsplash.com/photo-1615485290382-441e4d049cb5?auto=format&fit=crop&w=500&q=80",
              availability: "February to April",
              season: "Spring",
              nutritionalInfo: "Good source of protein, fiber and vitamins",
              isSeasonal: true
            },
            {
              id: 4,
              name: "Spring Onions",
              category: "Vegetables",
              price: 30,
              unit: "bundle",
              farmer: "Anjali Farms",
              farmerId: 1,
              description: "Mild and aromatic spring onions, perfect for garnishing and Asian cuisine.",
              image: "https://images.unsplash.com/photo-1580294672675-74c4a5ff6968?auto=format&fit=crop&w=500&q=80",
              availability: "March to May",
              season: "Spring",
              nutritionalInfo: "Contains vitamins K, C and fiber",
              isSeasonal: true
            },
            {
              id: 5,
              name: "Fresh Mint",
              category: "Herbs",
              price: 25,
              unit: "bundle",
              farmer: "Organic Haven",
              farmerId: 5,
              description: "Aromatic mint leaves, perfect for teas, drinks and cooking.",
              image: "https://images.unsplash.com/photo-1586346921357-2a535d0f6d7e?auto=format&fit=crop&w=500&q=80",
              availability: "March to October with peak in Spring",
              season: "Spring",
              nutritionalInfo: "Contains menthol, antioxidants and vitamins",
              isSeasonal: true
            },
            {
              id: 6,
              name: "Asparagus",
              category: "Vegetables",
              price: 90,
              unit: "bundle",
              farmer: "Green Valley",
              farmerId: 2,
              description: "Tender asparagus spears, excellent grilled or steamed.",
              image: "https://images.unsplash.com/photo-1574015974293-817f0ebf0e95?auto=format&fit=crop&w=500&q=80",
              availability: "February to June",
              season: "Spring",
              nutritionalInfo: "Rich in folate, fiber and vitamins A, C, E and K",
              isSeasonal: true
            },
          ]
          
          // Featured recipes
          const mockRecipes = [
            {
              id: 1,
              title: "Spring Vegetable Risotto",
              description: "Creamy risotto with fresh spring vegetables like asparagus, peas and spring onions.",
              image: "https://images.unsplash.com/photo-1476124369491-e7addf5db371?auto=format&fit=crop&w=500&q=80",
              chef: "Priya Sharma",
              prepTime: "30 min",
              cookTime: "25 min",
              difficulty: "Medium",
              ingredients: ["Arborio rice", "Asparagus", "Green peas", "Spring onions", "Vegetable broth", "Parmesan"],
              season: "Spring"
            },
            {
              id: 2,
              title: "Strawberry Spinach Salad",
              description: "Fresh spring salad with strawberries, spinach and a honey balsamic dressing.",
              image: "https://images.unsplash.com/photo-1623428187969-5da2dcea5ebf?auto=format&fit=crop&w=500&q=80",
              chef: "Rahul Patel",
              prepTime: "15 min",
              cookTime: "0 min",
              difficulty: "Easy",
              ingredients: ["Fresh spinach", "Strawberries", "Feta cheese", "Walnuts", "Honey", "Balsamic vinegar"],
              season: "Spring"
            },
            {
              id: 3,
              title: "Mint Lemonade",
              description: "Refreshing homemade lemonade with fresh mint leaves. Perfect for spring afternoons.",
              image: "https://images.unsplash.com/photo-1523677011781-c91d1bbe2f9e?auto=format&fit=crop&w=500&q=80",
              chef: "Amit Singh",
              prepTime: "10 min",
              cookTime: "0 min",
              difficulty: "Easy",
              ingredients: ["Lemons", "Fresh mint", "Sugar", "Water", "Ice"],
              season: "Spring"
            },
          ]
          
          // Harvest calendar
          const mockHarvestCalendar = [
            { month: "January", crops: ["Carrots", "Radishes", "Turnips", "Winter Greens"] },
            { month: "February", crops: ["Mustard Greens", "Spinach", "Early Peas", "Radishes"] },
            { month: "March", crops: ["Spinach", "Green Peas", "Spring Onions", "Early Herbs"] },
            { month: "April", crops: ["Asparagus", "Strawberries", "Spring Garlic", "Lettuce"] },
            { month: "May", crops: ["Strawberries", "Mint", "Coriander", "Green Beans"] },
            { month: "June", crops: ["Cucumbers", "Early Tomatoes", "Summer Squash", "Eggplant"] },
            { month: "July", crops: ["Tomatoes", "Peppers", "Sweet Corn", "Watermelon"] },
            { month: "August", crops: ["Okra", "Tomatoes", "Beans", "Chillies"] },
            { month: "September", crops: ["Apples", "Pears", "Pumpkins", "Broccoli"] },
            { month: "October", crops: ["Pumpkins", "Sweet Potatoes", "Apples", "Cauliflower"] },
            { month: "November", crops: ["Cauliflower", "Cabbage", "Sweet Potatoes", "Ginger"] },
            { month: "December", crops: ["Carrots", "Turnips", "Winter Squash", "Radishes"] },
          ]
          
          // Filter based on current season
          const filteredProducts = mockProducts.filter(
            product => product.season === season
          )
          
          const filteredRecipes = mockRecipes.filter(
            recipe => recipe.season === season
          )
          
          setSeasonalProducts(filteredProducts)
          setFeaturedRecipes(filteredRecipes)
          setHarvestCalendar(mockHarvestCalendar)
          setIsLoading(false)
        }, 1000)
      } catch (error) {
        console.error("Failed to fetch seasonal data:", error)
        setIsLoading(false)
      }
    }

    fetchSeasonalData()
  }, [])

  // Filter products by category
  const filteredProducts = selectedCategory === 'all' 
    ? seasonalProducts 
    : seasonalProducts.filter(product => product.category === selectedCategory)

  // Get unique categories
  const categories = ['all', ...new Set(seasonalProducts.map(product => product.category))]

  // Get current month
  const currentMonth = new Date().toLocaleString('default', { month: 'long' })
  const currentMonthHarvest = harvestCalendar.find(item => item.month === currentMonth)

  return (<>
  <CustomerNavbar />
    <div className="min-h-screen bg-gray-50">
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-10">
        {/* Hero Section */}
        <div className="bg-gradient-to-r from-green-500 to-teal-400 rounded-xl shadow-lg overflow-hidden mb-8">
          <div className="md:flex">
            <div className="p-8 md:w-1/2">
              <h1 className="text-3xl font-bold text-white mb-4">
                {currentSeason} Harvest
              </h1>
              <p className="text-green-50 text-lg mb-6">
                Discover what's in season right now. Fresh, local, and at its peak flavor.
              </p>
              <div className="bg-white bg-opacity-20 rounded-lg p-4 backdrop-blur-sm">
                <h3 className="text-white font-medium mb-2">Currently Harvesting:</h3>
                {currentMonthHarvest && (
                  <div className="flex flex-wrap gap-2">
                    {currentMonthHarvest.crops.map((crop, index) => (
                      <span key={index} className="px-3 py-1 bg-white bg-opacity-30 rounded-full text-white text-sm">
                        {crop}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
            <div className="md:w-1/2 relative">
              <img 
                src="https://images.unsplash.com/photo-1620706857370-e1b9770e8bb1?auto=format&fit=crop&w=800&q=80" 
                alt="Seasonal harvest"
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-l from-transparent to-green-500 opacity-30"></div>
            </div>
          </div>
        </div>
        
        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
          </div>
        ) : (
          <>
            {/* Category Filters */}
            <div className="mb-8">
              <h2 className="text-xl font-bold text-gray-800 mb-4">
                {currentSeason} Seasonal Products
              </h2>
              <div className="flex flex-wrap gap-2">
                {categories.map((category, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                      selectedCategory === category
                        ? 'bg-green-600 text-white'
                        : 'bg-white text-gray-700 hover:bg-gray-100'
                    }`}
                  >
                    {category === 'all' ? 'All Categories' : category}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Seasonal Products Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
              {filteredProducts.map(product => (
                <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={product.image} 
                      alt={product.name}
                      className="w-full h-full object-cover transition-transform hover:scale-105"
                    />
                  </div>
                  <div className="p-5">
                    <div className="flex justify-between items-start">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800">{product.name}</h3>
                        <p className="text-sm text-gray-500">by {product.farmer}</p>
                      </div>
                      <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                        {product.category}
                      </span>
                    </div>
                    
                    <p className="mt-2 text-sm text-gray-600">{product.description}</p>
                    
                    <div className="mt-3">
                      <span className="text-xs text-teal-600 font-medium">
                        Season: {product.availability}
                      </span>
                      <div className="text-xs text-gray-500 mt-1">
                        {product.nutritionalInfo}
                      </div>
                    </div>
                    
                    <div className="mt-4 flex justify-between items-center">
                      <span className="text-lg font-bold text-gray-800">₹{product.price}/{product.unit}</span>
                      <button className="px-3 py-1 bg-green-600 text-white text-sm rounded-md hover:bg-green-700">
                        Add to Cart
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Seasonal Recipes Section */}
            <div className="mb-12">
              <h2 className="text-xl font-bold text-gray-800 mb-6">
                Seasonal Recipes
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {featuredRecipes.map(recipe => (
                  <div key={recipe.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow">
                    <div className="h-48 overflow-hidden">
                      <img 
                        src={recipe.image} 
                        alt={recipe.title}
                        className="w-full h-full object-cover transition-transform hover:scale-105"
                      />
                    </div>
                    <div className="p-5">
                      <h3 className="text-lg font-semibold text-gray-800">{recipe.title}</h3>
                      <p className="text-sm text-gray-500 mt-1">by Chef {recipe.chef}</p>
                      
                      <p className="mt-2 text-sm text-gray-600">{recipe.description}</p>
                      
                      <div className="mt-3 flex space-x-4 text-xs text-gray-500">
                        <span className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                          </svg>
                          Prep: {recipe.prepTime}
                        </span>
                        <span className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 18.657A8 8 0 016.343 7.343S7 9 9 10c0-2 .5-5 2.986-7C14 5 16.09 5.777 17.656 7.343A7.975 7.975 0 0120 13a7.975 7.975 0 01-2.343 5.657z" />
                          </svg>
                          Cook: {recipe.cookTime}
                        </span>
                        <span className="flex items-center">
                          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                          </svg>
                          {recipe.difficulty}
                        </span>
                      </div>
                      
                      <div className="mt-3">
                        <h4 className="text-xs font-medium text-gray-600">Main Ingredients:</h4>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {recipe.ingredients.slice(0, 4).map((ingredient, index) => (
                            <span 
                              key={index}
                              className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full"
                            >
                              {ingredient}
                            </span>
                          ))}
                          {recipe.ingredients.length > 4 && (
                            <span className="px-2 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full">
                              +{recipe.ingredients.length - 4} more
                            </span>
                          )}
                        </div>
                      </div>
                      
                      <button className="mt-4 w-full py-2 border border-green-600 text-green-600 rounded-md hover:bg-green-50 transition-colors">
                        View Recipe
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Harvest Calendar Section */}
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-6">
                Annual Harvest Calendar
              </h2>
              <div className="bg-white rounded-lg shadow-md p-6">
                <div className="overflow-x-auto">
                  <table className="min-w-full">
                    <thead className="border-b">
                      <tr>
                        {harvestCalendar.map((item, index) => (
                          <th key={index} 
                            className={`px-4 py-2 text-left text-xs font-medium uppercase tracking-wider ${
                              item.month === currentMonth 
                                ? 'text-green-700 bg-green-50'
                                : 'text-gray-500'
                            }`}
                          >
                            {item.month}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {[0, 1, 2, 3].map(rowIndex => (
                        <tr key={rowIndex} className="border-b hover:bg-gray-50">
                          {harvestCalendar.map((month, colIndex) => (
                            <td 
                              key={colIndex} 
                              className={`px-4 py-3 text-sm ${
                                month.month === currentMonth
                                  ? 'text-green-700 bg-green-50'
                                  : 'text-gray-600'
                              }`}
                            >
                              {month.crops[rowIndex] || '-'}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-4 text-sm text-gray-500">
                  <p>
                    This calendar shows when various crops are typically harvested in India. 
                    Actual harvest times may vary based on specific regions and climate conditions.
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </main>
    </div>
    <Footer/>
    </>
  )
}

export default Seasonal