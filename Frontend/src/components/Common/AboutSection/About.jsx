import React from 'react';
import { Link } from 'react-router-dom';

const AboutSection = () => {
  return (
    <section className="py-12 bg-gray-200 border-t border-gray-300">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-8 md:mb-0">
            <img 
              src="/4.jpg" 
              alt="Farmer in field" 
              className="rounded-lg shadow-md w-full h-auto object-cover"
            />
          </div>
          <div className="md:w-1/2 md:pl-10">
            <h2 className="text-3xl font-bold mb-4">About Farmer Helper</h2>
            <p className="text-gray-600 mb-6">
              At Farmer Helper, we believe in empowering farmers with the right tools and information. 
              Our platform connects farmers with resources, markets, and technology to improve 
              productivity and profitability.
            </p>
            <p className="text-gray-600 mb-6">
              Founded by a team of agricultural experts and tech enthusiasts, we understand 
              the challenges faced by modern farmers and are dedicated to providing solutions.
            </p>
            <Link 
              to="/about" 
              className="bg-green-600 text-white px-6 py-3 rounded-md hover:bg-green-700 transition-colors inline-block"
            >
              Learn More About Us
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;