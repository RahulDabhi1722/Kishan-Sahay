import React from 'react';
import { Link } from 'react-router-dom';
import { FiFacebook, FiTwitter, FiInstagram, FiMail, FiPhone, FiMapPin } from 'react-icons/fi';

const Footer = () => {
  return (
    <footer className=" text-black bg-gray-200 border-t border-gray-300">
      {/* Top Section with Info */}
      <div className="container mx-auto p-6 grid grid-cols-1 md:grid-cols-3 gap-8">
        {/* About Section */}
        <div>
          <h2 className="text-2xl font-bold mb-4">Farmer Helper</h2>
          <p className="mb-4">Helping farmers with better farming techniques, selling goods, and weather information.</p>
          <div className="flex items-center mb-2">
            <FiPhone className="mr-2" />
            <span>+1 (555) 123-4567</span>
          </div>
          <div className="flex items-center mb-2">
            <FiMail className="mr-2" />
            <span>contact@farmerhelper.com</span>
          </div>
          <div className="flex items-center">
            <FiMapPin className="mr-2" />
            <span>123 Farm Road, Countryside, CO</span>
          </div>
        </div>

        {/* Quick Links */}
        <div>
          <h3 className="text-xl font-bold mb-4 text-center">Quick Links</h3>
          <ul className="space-y-2 text-center">
            <li><Link to="/" className=" hover:text-gray-400">Home</Link></li>
            <li><Link to="/marketprize" className=" hover:text-gray-400">Market</Link></li>
            <li><Link to="/sell" className=" hover:text-gray-400">Sell Goods</Link></li>
            <li><Link to="/weather" className=" hover:text-gray-400">Weather</Link></li>
            <li><Link to="/about" className=" hover:text-gray-400">About Us</Link></li>
            <li><Link to="/contact" className=" hover:text-gray-400">Contact</Link></li>
          </ul>
        </div>

        {/* Newsletter */}
        <div>
          <h3 className="text-xl font-bold mb-4">Stay Updated</h3>
          <p className="mb-4">Subscribe to our newsletter for the latest farming tips and market updates.</p>
          <div className="flex">
            <input 
              type="email" 
              placeholder="Your Email" 
              className="p-2 w-full border border-gray-400 rounded-l text-black focus:outline-none hover:border-gray-600" 
            />
            <button className="bg-white border border-bg-gray-200 px-4 py-2 rounded-r">
              Subscribe
            </button>
          </div>
          <div className="mt-4">
            <h4 className="font-semibold mb-2">Follow Us</h4>
            <div className="flex space-x-4">
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" 
                 className="hover:text-green-200 transition-colors">
                <FiFacebook size={24} />
              </a>
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" 
                 className="hover:text-green-200 transition-colors">
                <FiTwitter size={24} />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" 
                 className="hover:text-green-200 transition-colors">
                <FiInstagram size={24} />
              </a>
            </div>
          </div>
        </div>
      </div>
      
      {/* Bottom Section with Copyright */}
      <div className="border-t border-green-500">
        <div className="container mx-auto py-4 px-6 flex flex-col md:flex-row justify-between items-center">
          <p>&copy; 2025 Farmer Helper. All rights reserved.</p>
          <div className="mt-2 md:mt-0">
            <Link to="/privacy" className="hover:underline mr-4">Privacy Policy</Link>
            <Link to="/terms" className="hover:underline">Terms of Service</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;