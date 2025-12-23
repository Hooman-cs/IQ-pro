// client/src/components/Footer.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    /* mt-auto is the key here; it pushes the footer to the bottom of a flex container */
    <footer className="bg-gray-800 text-white py-8 md:py-10 mt-auto border-t border-gray-700 w-full">
      <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
        
        {/* Navigation Links */}
        <div className="flex flex-wrap justify-center gap-y-3 gap-x-6 text-xs md:text-sm mb-8 font-medium">
          <Link to="/about" className="text-gray-400 hover:text-white transition duration-200">About Us</Link>
          <Link to="/faq" className="text-gray-400 hover:text-white transition duration-200">FAQ</Link>
          <Link to="/contact" className="text-gray-400 hover:text-white transition duration-200">Contact Us</Link>
          <Link to="/privacy-policy" className="text-gray-400 hover:text-white transition duration-200">Privacy Policy</Link>
          <Link to="/terms" className="text-gray-400 hover:text-white transition duration-200">Terms & Conditions</Link>
        </div>

        {/* Divider for mobile */}
        <div className="w-12 h-px bg-gray-700 mx-auto mb-6 md:hidden"></div>

        {/* Copyright */}
        <p className="text-gray-500 text-[11px] md:text-sm tracking-wide">
          IQ Test Platform &copy; {new Date().getFullYear()} IQScaler.com. All rights reserved.
        </p>

        {/* Disclaimer */}
        <p className="text-[9px] md:text-xs text-gray-600 mt-4 max-w-2xl mx-auto leading-relaxed px-4">
            Disclaimer: The test provided is for informational and self-assessment purposes only and is not a substitute for professional evaluation.
        </p>

      </div>
    </footer>
  );
};

export default Footer;