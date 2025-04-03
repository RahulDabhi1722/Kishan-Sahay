import React, { useState } from 'react';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';
import AdminSidebar from './AdminSidebar';
import { FiMenu, FiX, FiUser } from 'react-icons/fi';

const AdminDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  // Determine current section name
  const getCurrentSectionName = () => {
    const path = location.pathname;
    if (path === '/admin-dashboard' || path === '/admin-dashboard/') {
      return 'Dashboard';
    }
    if (path.includes('/admin-dashboard/farmers')) {
      return 'Farmers';
    }
    if (path.includes('/admin-dashboard/customers')) {
      return 'Customers';
    }
    if (path.includes('/admin-dashboard/products')) {
      return 'Products';
    }
    if (path.includes('/admin-dashboard/analytics')) {
      return 'Analytics';
    }
    return 'Admin Dashboard';
  };

  // Mobile sidebar for responsive design
  const MobileSidebar = () => {
    if (!sidebarOpen) return null;
    
    return (
      <div className="md:hidden fixed inset-0 flex z-40">
        <div 
          className="fixed inset-0 bg-gray-600 bg-opacity-75" 
          onClick={() => setSidebarOpen(false)}
        ></div>
        
        <div className="relative flex-1 flex flex-col max-w-xs w-full bg-gray-800">
          <div className="absolute top-0 right-0 -mr-12 pt-2">
            <button
              className="ml-1 flex items-center justify-center h-10 w-10 rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
              onClick={() => setSidebarOpen(false)}
            >
              <span className="sr-only">Close sidebar</span>
              <FiX className="h-6 w-6 text-white" />
            </button>
          </div>
          {/* Mobile sidebar content */}
          <div className="px-2 py-4 text-white font-bold text-xl">
            Farmer Helper
          </div>
          <div className="flex-1">
            <AdminSidebar isMobile={true} closeMobileMenu={() => setSidebarOpen(false)} />
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="h-screen flex overflow-hidden bg-gray-100">
      {/* Mobile sidebar overlay */}
      <MobileSidebar />
      
      {/* Desktop sidebar */}
      <div className="hidden md:flex md:flex-shrink-0">
        <div className="flex flex-col w-64">
          <AdminSidebar />
        </div>
      </div>
      
      {/* Main content area */}
      <div className="flex flex-col w-0 flex-1 overflow-hidden">
        {/* Top navigation */}
        <header className="z-10 py-4 bg-white shadow-sm">
          <div className="px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <div className="flex items-center">
              <button
                className="md:hidden mr-2 flex-shrink-0 text-gray-600 hover:text-gray-900"
                onClick={() => setSidebarOpen(true)}
              >
                <span className="sr-only">Open sidebar</span>
                <FiMenu className="h-6 w-6" />
              </button>
              <h1 className="text-xl font-semibold text-gray-900">{getCurrentSectionName()}</h1>
            </div>
            
            <div className="flex items-center">
              <div className="relative">
                <button className="flex items-center text-sm focus:outline-none">
                  <span className="h-8 w-8 rounded-full bg-gray-200 flex items-center justify-center">
                    <FiUser className="h-5 w-5 text-gray-600" />
                  </span>
                  <span className="ml-2 text-gray-700 hidden sm:block">Admin User</span>
                </button>
              </div>
            </div>
          </div>
        </header>
        
        {/* Main content */}
        <main className="flex-1 relative overflow-y-auto focus:outline-none">
          <div className="py-6">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
              {/* This is where child routes render */}
              <Outlet />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
};

export default AdminDashboard;