import React, { useState, useEffect } from 'react';
import { FiAlertCircle, FiCheck } from 'react-icons/fi';
// Import mock data service
import {  loadMockOrders } from '../mockDataService.js';
import SellGoodsHeader from './sellGoodsHeader.jsx';
import SellGoodsTabs from './sellGoodsTab.jsx';
import MyListingsTab from '../MyListingTab.jsx';
import OrdersTab from '../OrderTab.jsx';
import BuyersTab from '../BuyerTab.jsx';
import NewListingModal from '../NewListingModel.jsx';
import EditListingModal from '../EditListingTab.jsx';
import FarmerNavbar from '../../NavBar/NavBar.jsx';
import Footer from '../../../components/Common/Footer/Footer.jsx';


const mockListings = [
  {
    id: 1,
    title: 'Fresh Organic Tomatoes',
    category: 'Vegetables',
    quantity: '500 kg',
    price: 35,
    unit: 'kg',
    description: 'Premium organic tomatoes grown without pesticides',
    location: 'Ahmedabad, Gujarat',
    status: 'active',
    dateCreated: '2025-03-15',
    views: 45,
    inquiries: 3,
    images: ['https://images.unsplash.com/photo-1592924357228-91225d344559?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80']
  },
  // Add more listings...
];

const SellGoodsContainer = () => {
  // State management
  const [myListings, setMyListings] = useState([]);
  const [activeTab, setActiveTab] = useState('myListings');
  const [showNewListing, setShowNewListing] = useState(false);
  const [showEditListing, setShowEditListing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(null);
  const [currentListing, setCurrentListing] = useState(null);
  const [orders, setOrders] = useState([]);
  
  // Load data on component mount
  useEffect(() => {
    loadMyListingsData();
    loadMyOrdersData();
  }, []);

  // Functions to load data
  const loadMyListingsData = async () => {
    setLoading(true);
    setError(null);
    
    try {
      // Simulate API call with the mock data
      await new Promise(resolve => setTimeout(resolve, 500));
      setMyListings(mockListings);
    } catch (error) {
      console.error('Error loading listings:', error);
      setError('Failed to load your listings');
    } finally {
      setLoading(false);
    }
  };
  
  const loadMyOrdersData = async () => {
    try {
      const data = await loadMockOrders();
      setOrders(data);
    } catch (err) {
      console.error('Error loading orders:', err);
    }
  };

  // Functions for CRUD operations
  const addNewListing = (listing) => {
    setLoading(true);
    
    // In a real app, this would be an API call
    setTimeout(() => {
      const createdListing = {
        ...listing,
        id: myListings.length + 1,
        status: 'active',
        dateCreated: new Date().toISOString().split('T')[0],
        views: 0,
        inquiries: 0
      };
      
      setMyListings(prev => [createdListing, ...prev]);
      setShowNewListing(false);
      setSuccess('Your listing has been created successfully!');
      setLoading(false);
      
      // Clear success message after 5 seconds
      setTimeout(() => setSuccess(null), 5000);
    }, 800);
  };
  
  const updateListing = (updatedListing) => {
    setLoading(true);
    
    // In a real app, this would be an API call
    setTimeout(() => {
      const updatedListings = myListings.map(listing => 
        listing.id === updatedListing.id ? updatedListing : listing
      );
      
      setMyListings(updatedListings);
      setShowEditListing(false);
      setSuccess('Your listing has been updated successfully!');
      setLoading(false);
      
      setTimeout(() => setSuccess(null), 5000);
    }, 800);
  };
  
  const deleteListing = (id) => {
    if (window.confirm('Are you sure you want to delete this listing?')) {
      setLoading(true);
      
      // In a real app, this would be an API call
      setTimeout(() => {
        const updatedListings = myListings.filter(listing => listing.id !== id);
        setMyListings(updatedListings);
        setSuccess('Your listing has been deleted successfully!');
        setLoading(false);
        
        setTimeout(() => setSuccess(null), 5000);
      }, 800);
    }
  };
  
  const updateOrderStatus = (orderId, newStatus) => {
    const updatedOrders = orders.map(order => 
      order.id === orderId ? { ...order, status: newStatus } : order
    );
    setOrders(updatedOrders);
    setSuccess(`Order status updated to ${newStatus}`);
    
    setTimeout(() => setSuccess(null), 5000);
  };
  
  // Handle edit listing
  const handleEditListing = (listing) => {
    setCurrentListing(listing);
    setShowEditListing(true);
  };

  return (
    <>
    <FarmerNavbar/>
    <div className="py-12 px-4 bg-gradient-to-br from-green-50 to-amber-50 min-h-screen ">
      <div className="container mx-auto">
        {/* Header */}
        <SellGoodsHeader />
        
        {/* Success Message */}
        {success && (
          <div className="mb-6 bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded-r">
            <div className="flex items-center">
              <FiCheck className="h-5 w-5 mr-2 text-green-500" />
              <p>{success}</p>
            </div>
          </div>
        )}
        
        {/* Error Message */}
        {error && (
          <div className="mb-6 bg-red-100 border-l-4 border-red-500 text-red-700 p-4 rounded-r">
            <div className="flex items-center">
              <FiAlertCircle className="h-5 w-5 mr-2 text-red-500" />
              <p>{error}</p>
            </div>
          </div>
        )}

        {/* Tabs */}
        <SellGoodsTabs 
          activeTab={activeTab} 
          setActiveTab={setActiveTab}
          pendingOrdersCount={orders.filter(order => order.status === 'pending').length}
        />

        {/* Tab Content */}
        {activeTab === 'myListings' && (
          <MyListingsTab
            listings={myListings}
            loading={loading}
            onAddNew={() => setShowNewListing(true)}
            onEdit={handleEditListing}
            onDelete={deleteListing}
          />
        )}
        
        {activeTab === 'orders' && (
          <OrdersTab 
            orders={orders}
            onUpdateStatus={updateOrderStatus}
          />
        )}
        
        {activeTab === 'buyers' && (
          <BuyersTab />
        )}

        {/* Modals */}
        {showNewListing && (
          <NewListingModal
            onClose={() => setShowNewListing(false)}
            onSubmit={addNewListing}
            loading={loading}
          />
        )}
        
        {showEditListing && currentListing && (
          <EditListingModal
            listing={currentListing}
            onClose={() => setShowEditListing(false)}
            onSubmit={updateListing}
            loading={loading}
          />
        )}
      </div>
    </div>
    <Footer/>
    </>
  );
};

export default SellGoodsContainer;