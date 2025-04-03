import React, { useState } from 'react';
import { FiBox, FiEdit2, FiFilter, FiMapPin, FiPlus, FiTrash2 } from 'react-icons/fi';
import { categoriesList } from './constant.js';

const MyListingsTab = ({ listings, loading, onAddNew, onEdit, onDelete }) => {
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  
  // Filter listings based on category and status
  const filteredListings = listings.filter(listing => {
    const categoryMatch = categoryFilter === 'all' || listing.category === categoryFilter;
    const statusMatch = statusFilter === 'all' || listing.status === statusFilter;
    return categoryMatch && statusMatch;
  });

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-xl font-semibold">My Product Listings</h2>
        <button
          onClick={onAddNew}
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors flex items-center"
        >
          <FiPlus className="mr-2" />
          Add New Listing
        </button>
      </div>

      {/* Filters */}
      <div className="bg-white p-4 rounded-lg shadow-sm mb-6">
        <div className="flex flex-col sm:flex-row sm:items-center space-y-3 sm:space-y-0 sm:space-x-4">
          <div className="flex items-center">
            <FiFilter className="mr-2 text-gray-400" />
            <span className="text-sm text-gray-600">Filters:</span>
          </div>
          <div className="flex flex-wrap gap-3">
            <select
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
              className="bg-white border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="all">All Categories</option>
              {categoriesList.map((category) => (
                <option key={category.value} value={category.value}>
                  {category.label}
                </option>
              ))}
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-white border border-gray-300 rounded-md px-3 py-1 text-sm focus:outline-none focus:ring-2 focus:ring-green-500"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      {/* Listings Grid */}
      {loading ? (
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-green-500"></div>
        </div>
      ) : filteredListings.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredListings.map((listing) => (
            <ListingCard 
              key={listing.id} 
              listing={listing} 
              onEdit={onEdit}
              onDelete={onDelete}
            />
          ))}
        </div>
      ) : (
        <EmptyListingsState onAddNew={onAddNew} noListings={listings.length === 0} />
      )}
    </div>
  );
};

// Listing Card Component
const ListingCard = ({ listing, onEdit, onDelete }) => {
  const getCategoryLabel = (value) => {
    const category = categoriesList.find(cat => cat.value === value);
    return category ? category.label : value;
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden">
      <div className="relative">
        <img
          src="4.jpg"
          alt={listing.title}
          className="w-full h-48 object-cover"
        />
        <div className="absolute top-2 left-2">
          <span className={`px-2 py-1 text-xs font-semibold rounded ${
            listing.status === 'active' ? 'bg-green-500 text-white' : 'bg-gray-500 text-white'
          }`}>
            {listing.status === 'active' ? 'Active' : 'Inactive'}
          </span>
        </div>
        {listing.organic && (
          <div className="absolute top-2 right-2">
            <span className="px-2 py-1 bg-green-100 text-green-800 text-xs font-semibold rounded">
              Organic
            </span>
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-semibold mb-1">{listing.title}</h3>
          <div className="flex space-x-1">
            <button 
              onClick={() => onEdit(listing)} 
              className="text-blue-500 hover:text-blue-700"
            >
              <FiEdit2 />
            </button>
            <button 
              onClick={() => onDelete(listing.id)}
              className="text-red-500 hover:text-red-700"
            >
              <FiTrash2 />
            </button>
          </div>
        </div>
        <p className="text-sm text-gray-500 mb-2">{getCategoryLabel(listing.category)}</p>
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center">
            <FiMapPin className="text-gray-400 mr-1" />
            <span className="text-sm text-gray-600">{listing.location}</span>
          </div>
          <span className="text-sm text-gray-500">{listing.dateCreated}</span>
        </div>
        <div className="flex justify-between items-center mb-3">
          <span className="text-green-600 font-bold">₹{listing.price}/{listing.unit}</span>
          <span className="text-sm text-gray-600">Qty: {listing.quantity} {listing.unit}</span>
        </div>
        <div className="flex items-center justify-between text-xs text-gray-500">
          <span>{listing.views} views</span>
          <span>{listing.inquiries} inquiries</span>
        </div>
      </div>
    </div>
  );
};

// Empty State Component
const EmptyListingsState = ({ onAddNew, noListings }) => {
  return (
    <div className="text-center py-12 bg-white rounded-lg shadow-sm">
      <FiBox className="mx-auto h-12 w-12 text-gray-400" />
      <h3 className="mt-2 text-lg font-medium text-gray-900">No listings found</h3>
      <p className="mt-1 text-sm text-gray-500">
        {noListings 
          ? "Get started by adding your first product listing" 
          : "No listings match your current filters"}
      </p>
      <div className="mt-6">
        <button
          onClick={onAddNew}
          className="bg-green-600 text-white px-4 py-2 rounded-md hover:bg-green-700 transition-colors flex items-center mx-auto"
        >
          <FiPlus className="mr-2" />
          Add New Listing
        </button>
      </div>
    </div>
  );
};

export default MyListingsTab;