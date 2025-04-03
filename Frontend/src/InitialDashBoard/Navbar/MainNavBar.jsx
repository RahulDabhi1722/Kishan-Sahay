import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FiMenu, FiX, FiLogIn, FiLogOut, FiUser } from 'react-icons/fi';
import { AuthContext } from '../../authContext';

const MainNavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { currentUser, logout } = useContext(AuthContext);
  const navigate = useNavigate();

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

  // Handle logout
  const handleLogout = () => {
    logout();
    // Close menu if open
    if (isOpen) setIsOpen(false);
    navigate('/');
  };

  return (
    <nav className={`fixed w-full z-10 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-md' : 'bg-white bg-opacity-95'
    }`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          {/* Left: Brand Name */}
          <div className="flex items-center">
            <Link to="/" className="text-black  font-bold text-xl">
              Farmer Helper
            </Link>
          </div>
          
          {/* Center: Navigation Links (Desktop) */}
          <div className="hidden md:flex items-center justify-center flex-1">
            <div className="flex space-x-8">
              <NavLink to="/">Home</NavLink>
              <NavLink to="/farmerguide">Farmer Guide</NavLink>
              <NavLink to="/customerguide">Customer Guide</NavLink>
              <NavLink to="/sell">Privacy Policy</NavLink>
            </div>
          </div>
          
          {/* Right: Login Button */}
          <div className="flex items-center">
            {currentUser ? (
              <button
                onClick={handleLogout}
                className="hidden md:flex items-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700"
              >
                <FiLogOut className="mr-2" />
                Logout
              </button>
            ) : (
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
            <MobileNavLink to="/" onClick={toggleMenu}>Home</MobileNavLink>
            <MobileNavLink to="/farmerguide" onClick={toggleMenu}>Farmer Guide</MobileNavLink>
            <MobileNavLink to="/customerguide" onClick={toggleMenu}>Customer Guide</MobileNavLink>
            <MobileNavLink to="/" onClick={toggleMenu}>Privacy Policy</MobileNavLink>
            
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

export default MainNavBar;