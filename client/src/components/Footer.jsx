import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-6 mt-10 border-t border-gray-700">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        
        {/* Navigation Links */}
        <div className="flex justify-center space-x-6 text-sm mb-4">
          <Link to="/about" className="text-gray-400 hover:text-white transition duration-200">
            About Us
          </Link>
          <Link to="/faq" className="text-gray-400 hover:text-white transition duration-200">
            FAQ
          </Link>
          <Link to="/contact" className="text-gray-400 hover:text-white transition duration-200">
            Contact Us
          </Link>
          {/* NEW LINKS */}
          <Link to="/privacy-policy" className="text-gray-400 hover:text-white transition duration-200">
            Privacy Policy
          </Link>
          <Link to="/terms" className="text-gray-400 hover:text-white transition duration-200">
            Terms & Conditions
          </Link>
        </div>

        {/* Copyright */}
        <p className="text-gray-500 text-sm">
          IQ Test Platform &copy; {new Date().getFullYear()} IQScaler.com. All rights reserved.
        </p>

        {/* Disclaimer */}
        <p className="text-xs text-gray-600 mt-2">
            Disclaimer: The test provided is for informational and self-assessment purposes only and is not a substitute for professional evaluation.
        </p>

      </div>
    </footer>
  );
};

export default Footer;

// import React from 'react';

// const Footer = () => {
//   return (
//     <footer style={{ textAlign: 'center', padding: '10px', borderTop: '1px solid #ccc' }}>
//       <p>IQ Test Platform &copy; 2025</p>
//     </footer>
//   );
// };

// export default Footer;