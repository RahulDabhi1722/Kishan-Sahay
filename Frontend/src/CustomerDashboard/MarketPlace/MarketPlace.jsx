import React, { useState, useEffect } from 'react'
import CustomerNavbar from '../CustomerNavbar'
import Footer from '../../components/Common/Footer/Footer'

const Marketplace = () => {
  const [products, setProducts] = useState([])
  const [filteredProducts, setFilteredProducts] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [categories, setCategories] = useState([])
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortBy, setSortBy] = useState('featured')
  const [priceRange, setPriceRange] = useState([0, 1000])
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    // Fetch products data
    const fetchProducts = async () => {
      setIsLoading(true)
      try {
        // Replace with your actual API call
        // const response = await fetch('/api/products')
        // const data = await response.json()
        
        // Simulated product data
        setTimeout(() => {
          const mockProducts = [
            {
              id: 1,
              name: "Organic Tomatoes",
              description: "Fresh organic tomatoes grown without pesticides",
              price: 60,
              unit: "kg",
              stock: 150,
              category: "vegetables",
              farmer: "Anjali Farms",
              location: "Pune, Maharashtra",
              rating: 4.8,
              image: "https://images.unsplash.com/photo-1524593166156-312f362cada0?auto=format&fit=crop&w=600&q=80"
            },
            {
              id: 2,
              name: "Fresh Potatoes",
              description: "Farm fresh potatoes, perfect for cooking",
              price: 40,
              unit: "kg",
              stock: 200,
              category: "vegetables",
              farmer: "Green Valley",
              location: "Nashik, Maharashtra",
              rating: 4.6,
              image: "https://images.unsplash.com/photo-1518977676601-b53f82aba655?auto=format&fit=crop&w=600&q=80"
            },
            {
              id: 3,
              name: "Basmati Rice",
              description: "Premium quality aged basmati rice",
              price: 120,
              unit: "kg",
              stock: 500,
              category: "grains",
              farmer: "Punjab Farms",
              location: "Amritsar, Punjab",
              rating: 4.9,
              image: "https://images.unsplash.com/photo-1586201375761-83865001e8c7?auto=format&fit=crop&w=600&q=80"
            },
            {
              id: 4,
              name: "Fresh Apples",
              description: "Crisp and juicy apples from the hills",
              price: 180,
              unit: "kg",
              stock: 120,
              category: "fruits",
              farmer: "Himachal Orchards",
              location: "Shimla, Himachal Pradesh",
              rating: 4.7,
              image: "https://images.unsplash.com/photo-1560806887-1e4cd0b6cbd6?auto=format&fit=crop&w=600&q=80"
            },
            {
              id: 5,
              name: "Organic Carrots",
              description: "Fresh organic carrots rich in nutrients",
              price: 50,
              unit: "kg",
              stock: 100,
              category: "vegetables",
              farmer: "Organic Haven",
              location: "Lonavala, Maharashtra",
              rating: 4.5,
              image: "https://images.unsplash.com/photo-1598170845058-32b9d6a5da37?auto=format&fit=crop&w=600&q=80"
            },
            {
              id: 6,
              name: "Raw Honey",
              description: "Pure unprocessed honey from forest beehives",
              price: 450,
              unit: "liter",
              stock: 50,
              category: "dairy",
              farmer: "Nature's Nectar",
              location: "Coorg, Karnataka",
              rating: 4.9,
              image: "https://images.unsplash.com/photo-1587049352851-8d4e89133924?auto=format&fit=crop&w=600&q=80"
            },
            {
              id: 7,
              name: "Fresh Spinach",
              description: "Freshly harvested spinach leaves",
              price: 30,
              unit: "bunch",
              stock: 80,
              category: "vegetables",
              farmer: "Green Fields",
              location: "Pune, Maharashtra",
              rating: 4.3,
              image: "https://images.unsplash.com/photo-1576045057995-568f588f82fb?auto=format&fit=crop&w=600&q=80"
            },
            {
              id: 8,
              name: "Organic Milk",
              description: "Fresh organic milk from grass-fed cows",
              price: 60,
              unit: "liter",
              stock: 100,
              category: "dairy",
              farmer: "Happy Cows Dairy",
              location: "Satara, Maharashtra",
              rating: 4.7,
              image: "https://images.unsplash.com/photo-1550583724-b2692b85b150?auto=format&fit=crop&w=600&q=80"
            }
          ]
          
          setProducts(mockProducts)
          setFilteredProducts(mockProducts)
          
          // Extract unique categories
          const uniqueCategories = [...new Set(mockProducts.map(product => product.category))]
          setCategories(uniqueCategories)
          
          setIsLoading(false)
        }, 1000)
      } catch (error) {
        console.error("Failed to fetch products:", error)
        setIsLoading(false)
      }
    }

    fetchProducts()
  }, [])

  // Filter products when filters change
  useEffect(() => {
    let result = [...products]
    
    // Filter by category
    if (selectedCategory !== 'all') {
      result = result.filter(product => product.category === selectedCategory)
    }
    
    // Filter by price range
    result = result.filter(product => 
      product.price >= priceRange[0] && product.price <= priceRange[1]
    )
    
    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase()
      result = result.filter(product => 
        product.name.toLowerCase().includes(query) || 
        product.description.toLowerCase().includes(query) ||
        product.farmer.toLowerCase().includes(query)
      )
    }
    
    // Sort products
    switch(sortBy) {
      case 'price-low':
        result.sort((a, b) => a.price - b.price)
        break
      case 'price-high':
        result.sort((a, b) => b.price - a.price)
        break
      case 'rating':
        result.sort((a, b) => b.rating - a.rating)
        break
      default:
        // 'featured' or default - no specific sorting
        break
    }
    
    setFilteredProducts(result)
  }, [selectedCategory, sortBy, priceRange, searchQuery, products])

  // Handle price range change
  const handlePriceChange = (e) => {
    const value = parseInt(e.target.value)
    setPriceRange([0, value])
  }

  // Add to cart function
  const handleAddToCart = (product) => {
    console.log(`Added to cart: ${product.name}`)
    // Implement your cart logic here
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <CustomerNavbar />
      
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Marketplace</h1>
          <div className="flex items-center">
            <div className="relative">
              <input
                type="text"
                placeholder="Search products..."
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
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filters sidebar */}
          <div className="w-full md:w-64 bg-white p-4 rounded-lg shadow-md h-fit">
            <div className="mb-6">
              <h3 className="text-md font-medium text-gray-800 mb-3">Categories</h3>
              <div className="space-y-2">
                <div className="flex items-center">
                  <input
                    id="category-all"
                    type="radio"
                    name="category"
                    value="all"
                    checked={selectedCategory === 'all'}
                    onChange={() => setSelectedCategory('all')}
                    className="h-4 w-4 text-green-600 focus:ring-green-500"
                  />
                  <label htmlFor="category-all" className="ml-2 text-sm text-gray-700 capitalize">
                    All Products
                  </label>
                </div>
                
                {categories.map(category => (
                  <div key={category} className="flex items-center">
                    <input
                      id={`category-${category}`}
                      type="radio"
                      name="category"
                      value={category}
                      checked={selectedCategory === category}
                      onChange={() => setSelectedCategory(category)}
                      className="h-4 w-4 text-green-600 focus:ring-green-500"
                    />
                    <label htmlFor={`category-${category}`} className="ml-2 text-sm text-gray-700 capitalize">
                      {category}
                    </label>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="mb-6">
              <h3 className="text-md font-medium text-gray-800 mb-3">Price Range</h3>
              <div className="flex items-center">
                <span className="text-sm text-gray-600">₹0</span>
                <input
                  type="range"
                  min="0"
                  max="1000"
                  step="10"
                  value={priceRange[1]}
                  onChange={handlePriceChange}
                  className="mx-2 w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                />
                <span className="text-sm text-gray-600">₹{priceRange[1]}</span>
              </div>
              <p className="text-sm text-gray-600 mt-2">Up to ₹{priceRange[1]}</p>
            </div>
            
            <div>
              <h3 className="text-md font-medium text-gray-800 mb-3">Sort By</h3>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
              >
                <option value="featured">Featured</option>
                <option value="price-low">Price: Low to High</option>
                <option value="price-high">Price: High to Low</option>
                <option value="rating">Customer Rating</option>
              </select>
            </div>
          </div>
          
          {/* Products grid */}
          <div className="flex-1">
            {isLoading ? (
              <div className="flex justify-center items-center h-96">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
              </div>
            ) : filteredProducts.length === 0 ? (
              <div className="flex flex-col items-center justify-center h-96 bg-white rounded-lg shadow-md">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <h3 className="mt-4 text-lg font-medium text-gray-900">No products found</h3>
                <p className="mt-1 text-sm text-gray-500">Try adjusting your search or filter to find what you're looking for.</p>
                <button 
                  onClick={() => {
                    setSelectedCategory('all')
                    setPriceRange([0, 1000])
                    setSearchQuery('')
                    setSortBy('featured')
                  }}
                  className="mt-4 px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <>
                <p className="mb-4 text-sm text-gray-600">{filteredProducts.length} products found</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProducts.map(product => (
                    <div key={product.id} className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300">
                      <div className="h-48 overflow-hidden">
                        <img 
                          src={product.image} 
                          alt={product.name}
                          className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                        />
                      </div>
                      <div className="p-4">
                        <div className="flex justify-between">
                          <h3 className="text-lg font-medium text-gray-800">{product.name}</h3>
                          <div className="flex items-center">
                            <svg className="h-4 w-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                            <span className="ml-1 text-sm text-gray-600">{product.rating}</span>
                          </div>
                        </div>
                        <p className="text-sm text-gray-500 mt-1">{product.description.substring(0, 60)}...</p>
                        <div className="mt-2 flex items-center text-sm text-gray-500">
                          <span>by {product.farmer}</span>
                          <span className="mx-1">•</span>
                          <span>{product.location}</span>
                        </div>
                        <div className="mt-3 flex justify-between items-center">
                          <span className="text-lg font-bold text-gray-800">₹{product.price}/{product.unit}</span>
                          <button 
                            onClick={() => handleAddToCart(product)}
                            className="px-4 py-2 bg-green-600 text-white text-sm rounded-md hover:bg-green-700 transition-colors"
                          >
                            Add to Cart
                          </button>
                        </div>
                        <div className="mt-2 text-xs text-gray-500">
                          {product.stock > 20 ? 
                            <span className="text-green-600">In Stock</span> : 
                            <span className="text-orange-500">Only {product.stock} left</span>
                          }
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </>
            )}
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  )
}

export default Marketplace