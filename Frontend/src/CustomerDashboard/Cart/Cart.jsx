import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FiMinus, FiPlus, FiTrash2, FiArrowLeft, FiCheckCircle, FiCreditCard, FiTruck } from 'react-icons/fi';
import CustomerNavbar from '../CustomerNavbar';
import Footer from '../../components/Common/Footer/Footer';

const CartPage = () => {
  // Default cart items for demonstration
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Fresh Organic Tomatoes",
      price: 35,
      quantity: 2,
      unit: "kg",
      image: "https://images.unsplash.com/photo-1592924357228-91225d344559?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      farmer: {
        id: 101,
        name: "Rajesh Kumar",
        location: "Gujarat"
      }
    },
    {
      id: 2,
      name: "Premium Basmati Rice",
      price: 85,
      quantity: 5,
      unit: "kg",
      image: "https://images.unsplash.com/photo-1586201375761-83865001e8ac?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      farmer: {
        id: 102,
        name: "Harpreet Singh",
        location: "Punjab"
      }
    },
    {
      id: 3,
      name: "Organic Honey",
      price: 220,
      quantity: 1,
      unit: "bottle",
      image: "https://images.unsplash.com/photo-1587049352851-8d4e89133924?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80",
      farmer: {
        id: 103,
        name: "Anita Desai",
        location: "Uttarakhand"
      }
    }
  ]);
  
  const [couponCode, setCouponCode] = useState('');
  const [couponApplied, setCouponApplied] = useState(false);
  const [discount, setDiscount] = useState(0);
  const [deliveryFee] = useState(40);
  
  // Update cart count in localStorage for navbar
  useEffect(() => {
    localStorage.setItem('cartCount', cartItems.length);
  }, [cartItems]);
  
  // Calculate subtotal
  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  
  // Calculate total
  const total = subtotal + deliveryFee - discount;
  
  // Handle quantity change
  const handleQuantityChange = (id, newQuantity) => {
    if (newQuantity <= 0) return;
    
    setCartItems(cartItems.map(item => 
      item.id === id ? { ...item, quantity: newQuantity } : item
    ));
  };
  
  // Remove item from cart
  const removeItem = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };
  
  // Apply coupon code
  const applyCoupon = () => {
    // Demo coupon logic - in a real app, you'd validate with backend
    if (couponCode.toUpperCase() === 'FRESH20') {
      setCouponApplied(true);
      setDiscount(Math.round(subtotal * 0.2)); // 20% discount
    } else {
      alert('Invalid coupon code');
    }
  };
  
  // Clear coupon
  const clearCoupon = () => {
    setCouponApplied(false);
    setDiscount(0);
    setCouponCode('');
  };

  return (
    <>
      <CustomerNavbar />
      <div className="bg-gray-50 pt-20 pb-12 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center mb-6">
            <Link to="/customer/marketplace" className="text-green-600 hover:text-green-700 flex items-center">
              <FiArrowLeft className="mr-2" />
              <span>Continue Shopping</span>
            </Link>
            <h1 className="text-2xl font-bold text-gray-800 ml-auto">Your Cart ({cartItems.length} items)</h1>
          </div>

          {cartItems.length === 0 ? (
            <div className="bg-white shadow-md rounded-lg p-6 text-center">
              <div className="text-gray-500 text-8xl mx-auto w-24 h-24 mb-4">🛒</div>
              <h2 className="text-2xl font-bold text-gray-700 mb-2">Your cart is empty</h2>
              <p className="text-gray-600 mb-6">Browse our marketplace to find fresh products directly from farmers</p>
              <Link 
                to="/customer/marketplace" 
                className="inline-block bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-lg"
              >
                Explore Marketplace
              </Link>
            </div>
          ) : (
            <div className="flex flex-col lg:flex-row gap-8">
              {/* Cart Items Section */}
              <div className="lg:w-2/3">
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-lg font-medium text-gray-800">Shopping Cart</h2>
                  </div>
                  
                  <ul className="divide-y divide-gray-200">
                    {cartItems.map(item => (
                      <li key={item.id} className="px-6 py-4">
                        <div className="flex flex-col sm:flex-row">
                          <div className="flex-shrink-0 h-24 w-24 rounded-md overflow-hidden">
                            <img src={item.image} alt={item.name} className="h-full w-full object-cover" />
                          </div>
                          
                          <div className="sm:ml-6 sm:flex-1 mt-4 sm:mt-0">
                            <div className="flex justify-between">
                              <div>
                                <h3 className="text-base font-medium text-gray-900">{item.name}</h3>
                                <p className="mt-1 text-sm text-gray-500">
                                  Sold by: <Link to={`/customer/farmerinfo/${item.farmer.id}`} className="text-green-600 hover:underline">{item.farmer.name}</Link>
                                </p>
                                <p className="mt-1 text-sm text-gray-500">
                                  From: {item.farmer.location}
                                </p>
                              </div>
                              <div className="flex flex-col items-end">
                                <p className="text-base font-medium text-gray-900">₹{item.price} / {item.unit}</p>
                                <p className="text-sm font-medium text-gray-900 mt-1">
                                  Subtotal: ₹{item.price * item.quantity}
                                </p>
                              </div>
                            </div>
                            
                            <div className="flex items-center justify-between mt-4">
                              <div className="flex items-center border border-gray-300 rounded-md">
                                <button 
                                  onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                                  className="px-3 py-1 text-gray-600 hover:text-gray-700 focus:outline-none"
                                >
                                  <FiMinus />
                                </button>
                                <span className="px-3 py-1 border-l border-r border-gray-300">{item.quantity}</span>
                                <button 
                                  onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                                  className="px-3 py-1 text-gray-600 hover:text-gray-700 focus:outline-none"
                                >
                                  <FiPlus />
                                </button>
                              </div>
                              
                              <button 
                                onClick={() => removeItem(item.id)}
                                className="text-red-500 hover:text-red-700 flex items-center"
                              >
                                <FiTrash2 className="mr-1" />
                                <span>Remove</span>
                              </button>
                            </div>
                          </div>
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
                
                <div className="mt-8 bg-white shadow-md rounded-lg overflow-hidden">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-lg font-medium text-gray-800">Delivery Options</h2>
                  </div>
                  
                  <div className="p-6">
                    <div className="flex items-center mb-4">
                      <input
                        id="delivery-standard"
                        name="delivery-option"
                        type="radio"
                        className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                        defaultChecked
                      />
                      <label htmlFor="delivery-standard" className="ml-3 block text-sm font-medium text-gray-700 flex-1">
                        <div className="flex justify-between">
                          <div>
                            <span className="font-medium">Standard Delivery (1-3 days)</span>
                            <p className="text-gray-500">Delivery by local logistics partners</p>
                          </div>
                          <span className="font-medium">₹{deliveryFee}</span>
                        </div>
                      </label>
                    </div>
                    
                    <div className="flex items-center">
                      <input
                        id="delivery-express"
                        name="delivery-option"
                        type="radio"
                        className="h-4 w-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                      />
                      <label htmlFor="delivery-express" className="ml-3 block text-sm font-medium text-gray-700 flex-1">
                        <div className="flex justify-between">
                          <div>
                            <span className="font-medium">Express Delivery (Same day)</span>
                            <p className="text-gray-500">Available for orders before 2 PM</p>
                          </div>
                          <span className="font-medium">₹90</span>
                        </div>
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Order Summary Section */}
              <div className="lg:w-1/3">
                <div className="bg-white shadow-md rounded-lg overflow-hidden sticky top-24">
                  <div className="px-6 py-4 border-b border-gray-200">
                    <h2 className="text-lg font-medium text-gray-800">Order Summary</h2>
                  </div>
                  
                  <div className="p-6 space-y-4">
                    <div className="flex justify-between text-base text-gray-700">
                      <p>Subtotal</p>
                      <p>₹{subtotal}</p>
                    </div>
                    
                    <div className="flex justify-between text-base text-gray-700">
                      <p>Delivery Fee</p>
                      <p>₹{deliveryFee}</p>
                    </div>
                    
                    {discount > 0 && (
                      <div className="flex justify-between text-base text-green-600">
                        <p>Discount</p>
                        <p>-₹{discount}</p>
                      </div>
                    )}
                    
                    <div className="pt-4 border-t border-gray-200">
                      <div className="flex justify-between text-lg font-bold text-gray-900">
                        <p>Total</p>
                        <p>₹{total}</p>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">Including GST</p>
                    </div>
                    
                    {/* Coupon code section */}
                    {!couponApplied ? (
                      <div className="pt-4">
                        <label htmlFor="coupon" className="block text-sm font-medium text-gray-700 mb-1">
                          Apply Coupon Code
                        </label>
                        <div className="flex space-x-2">
                          <input
                            type="text"
                            id="coupon"
                            placeholder="Enter coupon code"
                            value={couponCode}
                            onChange={(e) => setCouponCode(e.target.value)}
                            className="flex-1 border border-gray-300 rounded-md px-3 py-2 text-sm focus:ring-green-500 focus:border-green-500"
                          />
                          <button
                            onClick={applyCoupon}
                            className="bg-green-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-green-700 focus:outline-none"
                          >
                            Apply
                          </button>
                        </div>
                        <p className="text-xs text-gray-500 mt-1">Try FRESH20 for 20% off</p>
                      </div>
                    ) : (
                      <div className="pt-4">
                        <div className="flex items-center justify-between bg-green-50 p-3 rounded-md border border-green-200">
                          <div className="flex items-center">
                            <FiCheckCircle className="text-green-500 mr-2" />
                            <span className="text-sm font-medium text-green-800">
                              Coupon <span className="font-bold">{couponCode}</span> applied!
                            </span>
                          </div>
                          <button
                            onClick={clearCoupon}
                            className="text-xs text-green-700 hover:text-green-800 underline"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    )}
                    
                    <div className="pt-4">
                      <button
                        className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 px-4 rounded-lg flex items-center justify-center"
                      >
                        <FiCreditCard className="mr-2" />
                        Proceed to Checkout
                      </button>
                      
                      <div className="mt-4">
                        <div className="flex items-center justify-center text-sm text-gray-500 space-x-4">
                          <div className="flex items-center">
                            <FiTruck className="mr-1" />
                            <span>Free delivery over ₹999</span>
                          </div>
                          <div className="flex items-center">
                            <FiCheckCircle className="mr-1" />
                            <span>Quality guarantee</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CartPage;