import React, { useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { AuthContext } from '../authContext';
import { FiLogOut } from 'react-icons/fi';

const AdminSidebar = ({ isMobile = false, closeMobileMenu = () => {} }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  // Handle logout action
  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  // Define navigation with paths and check current route
  const navigation = [
    { 
      name: 'Dashboard', 
      path: '/admin-dashboard',
      icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6', 
      current: location.pathname === '/admin-dashboard' || location.pathname === '/admin-dashboard/'
    },
    { 
      name: 'Farmers', 
      path: '/admin-dashboard/farmers',
      icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z', 
      current: location.pathname.includes('/admin-dashboard/farmers')
    },
    { 
      name: 'Customers', 
      path: '/admin-dashboard/customers',
      icon: 'M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z', 
      current: location.pathname.includes('/admin-dashboard/customers')
    },
    { 
      name: 'Products', 
      path: '/admin-dashboard/products',
      icon: 'M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z', 
      current: location.pathname.includes('/admin-dashboard/products')
    },
    { 
      name: 'Analytics', 
      path: '/admin-dashboard/analytics',
      icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z', 
      current: location.pathname.includes('/admin-dashboard/analytics')
    },
  ];

  // Handle navigation click with optional mobile menu closing
  const handleNavClick = (path) => {
    if (isMobile) {
      closeMobileMenu();
    }
    navigate(path);
  };

  return (
    <div className="flex flex-col h-0 flex-1 bg-gray-800">
      {!isMobile && (
        <div className="flex items-center flex-shrink-0 px-4 py-4">
          <span className="text-white text-xl font-bold">Farmer Helper</span>
        </div>
      )}
      <div className="flex-1 flex flex-col pt-5 pb-4 overflow-y-auto">
        <nav className="mt-5 flex-1 px-2 space-y-1">
          {navigation.map((item) => (
            <button
              key={item.name}
              onClick={() => handleNavClick(item.path)}
              className={`${
                item.current
                  ? 'bg-gray-900 text-white'
                  : 'text-gray-300 hover:bg-gray-700 hover:text-white'
              } group flex items-center px-2 py-2 text-sm font-medium rounded-md w-full text-left`}
            >
              <svg
                className={`${
                  item.current ? 'text-gray-300' : 'text-gray-400 group-hover:text-gray-300'
                } mr-3 h-6 w-6`}
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={item.icon} />
              </svg>
              {item.name}
            </button>
          ))}
        </nav>
      </div>
      <div className="flex-shrink-0 flex bg-gray-700 p-4">
        <div className="flex items-center">
          <div>
            <div className="h-9 w-9 rounded-full bg-gray-500 flex items-center justify-center text-white font-bold">
              A
            </div>
          </div>
          <div className="ml-3">
            <p className="text-sm font-medium text-white">Admin User</p>
            <button 
              onClick={handleLogout}
              className="text-xs font-medium text-gray-300 hover:text-white flex items-center"
            >
              <FiLogOut className="mr-1" />
              Log out
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminSidebar;