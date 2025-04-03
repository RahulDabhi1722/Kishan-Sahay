import React, { useState, useEffect, useContext } from 'react';
import { Link} from 'react-router-dom';
import { FiMenu, FiX, FiLogIn, FiLogOut, FiUser, FiChevronDown } from 'react-icons/fi';
import { AuthContext } from '../../authContext';

const FarmerNavbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
  const { currentUser, logout } = useContext(AuthContext);
 

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Toggle mobile menu
  const toggleMenu = () => setIsOpen(!isOpen);
  
  // Toggle profile dropdown
  const toggleProfileMenu = (e) => {
    e.stopPropagation();
    setIsProfileMenuOpen(!isProfileMenuOpen);
  };
  
  // Close profile menu if clicked outside
  useEffect(() => {
    const closeProfileMenu = () => setIsProfileMenuOpen(false);
    if (isProfileMenuOpen) {
      document.addEventListener('click', closeProfileMenu);
      return () => document.removeEventListener('click', closeProfileMenu);
    }
  }, [isProfileMenuOpen]);

  // Handle logout
  const handleLogout = () => {
    logout();
    // Close menus
    setIsProfileMenuOpen(false);
    if (isOpen) setIsOpen(false);
    
  };

  return (
    <nav className={`fixed w-full z-10 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-md' : 'bg-white bg-opacity-95'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Left: Brand Name */}
          <div className="flex items-center">
            <Link to="/" className="text-green-700 font-bold text-xl">
              Farmer Helper
            </Link>
          </div>
          
          {/* Center: Navigation Links (Desktop) */}
          <div className="hidden md:flex items-center justify-center flex-1">
            <div className="flex space-x-8">
              <NavLink to="/farmer-dashboard">Home</NavLink>
              <NavLink to="/farmer/marketprize">Market Prices</NavLink>
              <NavLink to="/farmer/weather">Weather</NavLink>
              <NavLink to="/farmer/sell">Sell Goods</NavLink>
            </div>
          </div>
          
          {/* Right: User Profile (replacing Login Button) */}
          <div className="flex items-center">
            {currentUser ? (
              // User is logged in - show profile menu
              <div className="hidden md:block relative">
                <button
                  onClick={toggleProfileMenu}
                  className="flex items-center space-x-2 text-gray-700 hover:text-green-600 focus:outline-none"
                >
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                    <FiUser className="h-4 w-4 text-green-700" />
                  </div>
                  <span className="font-medium">{currentUser.name?.split(' ')[0] || 'User'}</span>
                  <FiChevronDown className={`h-4 w-4 transition-transform ${isProfileMenuOpen ? 'transform rotate-180' : ''}`} />
                </button>
                
                {/* Profile Dropdown */}
                {isProfileMenuOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10 ring-1 ring-black ring-opacity-5">
                    <Link
                      to="/farmer-dashboard"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Dashboard
                    </Link>
                    <Link
                      to="/farmer/profile"
                      className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Profile
                    </Link>
                    <button
                      onClick={handleLogout}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </div>
            ) : (
              // User is not logged in - show login button
              <Link 
                to="/login" 
                className="hidden md:flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
              >
                <FiLogIn className="mr-2" />
                Login
              </Link>
            )}
            
            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-md text-gray-600 hover:text-gray-800 hover:bg-gray-100"
              >
                {isOpen ? (
                  <FiX className="block h-6 w-6" />
                ) : (
                  <FiMenu className="block h-6 w-6" />
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="md:hidden bg-white shadow-lg">
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
            {/* User info on mobile (if logged in) */}
            {currentUser && (
              <div className="px-3 py-2 border-b border-gray-200 mb-2">
                <div className="flex items-center space-x-3">
                  <div className="w-8 h-8 rounded-full bg-green-100 flex items-center justify-center">
                    <FiUser className="h-4 w-4 text-green-700" />
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-700">{currentUser.name || 'User'}</p>
                    <p className="text-xs text-gray-500">{currentUser.email}</p>
                  </div>
                </div>
              </div>
            )}
            
            {/* Navigation Links */}
            <MobileNavLink to="/" onClick={toggleMenu}>Home</MobileNavLink>
            <MobileNavLink to="/marketprice" onClick={toggleMenu}>Market Prices</MobileNavLink>
            <MobileNavLink to="/weather" onClick={toggleMenu}>Weather</MobileNavLink>
            <MobileNavLink to="/sell" onClick={toggleMenu}>Sell Goods</MobileNavLink>
            
            {/* Dashboard link if logged in */}
            {currentUser && (
              <MobileNavLink 
                to="/farmer-dashboard" 
                onClick={toggleMenu}
              >
                Dashboard
              </MobileNavLink>
            )}
            
            {/* Auth button */}
            <div className="pt-4 pb-3 border-t border-gray-200">
              {currentUser ? (
                <button
                  onClick={handleLogout}
                  className="flex items-center justify-center w-full px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
                >
                  <FiLogOut className="mr-2" />
                  Logout
                </button>
              ) : (
                <Link
                  to="/login"
                  className="flex items-center justify-center w-full px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700"
                  onClick={toggleMenu}
                >
                  <FiLogIn className="mr-2" />
                  Login
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

// Desktop Navigation Link Component
const NavLink = ({ to, children }) => {
  return (
    <Link
      to={to}
      className="px-3 py-2 text-gray-700 hover:text-green-600 font-medium"
    >
      {children}
    </Link>
  );
};

// Mobile Navigation Link Component
const MobileNavLink = ({ to, onClick, children }) => {
  return (
    <Link
      to={to}
      className="block px-3 py-2 text-base font-medium text-gray-700 hover:bg-gray-50 hover:text-green-600 rounded-md"
      onClick={onClick}
    >
      {children}
    </Link>
  );
};

export default FarmerNavbar;