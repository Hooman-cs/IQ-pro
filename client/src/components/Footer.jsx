// client/src/components/Footer.jsx

import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    /* mt-auto: Keeps the footer at the bottom.
       bg-gray-50: Light gray background to show the logo clearly.
       border-t: Subtle separator from the main content.
    */
    <footer className="bg-gray-200 text-gray-700 py-12 mt-auto border-t border-gray-200 w-full">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        
        {/* Main Footer Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 mb-10">
          
          {/* Column 1: Logo and Brief About */}
          <div className="flex flex-col items-center md:items-start space-y-4">
            <Link to="/">
              {/* Pointing to the logo in your public directory */}
              <img 
                src="/IQ-logo.ico" 
                alt="IQScaler Logo" 
                className="h-12 w-auto grayscale-0 hover:opacity-80 transition-opacity" 
              />
            </Link>
            <p className="text-sm text-gray-500 text-center md:text-left leading-relaxed max-w-xs">
              Empowering individuals with scientifically grounded cognitive assessments. 
              We bring clarity to intelligence measurement through modern, accessible psychometrics.
            </p>
          </div>

          {/* Column 2: Navigation Links */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-bold text-gray-900 mb-4 uppercase tracking-widest text-xs">Platform</h4>
            <nav className="flex flex-col space-y-3 text-sm font-medium items-center md:items-start">
              <Link to="/about" className="text-gray-600 hover:text-blue-600 transition-colors">About Us</Link>
              <Link to="/faq" className="text-gray-600 hover:text-blue-600 transition-colors">FAQ</Link>
              <Link to="/contact" className="text-gray-600 hover:text-blue-600 transition-colors">Contact Us</Link>
            </nav>
          </div>

          {/* Column 3: Legal Links */}
          <div className="flex flex-col items-center md:items-start">
            <h4 className="font-bold text-gray-900 mb-4 uppercase tracking-widest text-xs">Legal</h4>
            <nav className="flex flex-col space-y-3 text-sm font-medium items-center md:items-start">
              <Link to="/privacy-policy" className="text-gray-600 hover:text-blue-600 transition-colors">Privacy Policy</Link>
              <Link to="/terms" className="text-gray-600 hover:text-blue-600 transition-colors">Terms & Conditions</Link>
            </nav>
          </div>
        </div>

        {/* Divider */}
        <div className="w-full h-px bg-gray-500 mb-8"></div>

        {/* Bottom Section: Copyright & Disclaimer */}
        <div className="text-center">
          <p className="text-gray-500 text-xs md:text-sm tracking-wide font-medium">
            IQ Test Platform &copy; {new Date().getFullYear()} IQScaler.com. All rights reserved.
          </p>
          <p className="text-[10px] md:text-xs text-gray-400 mt-4 max-w-3xl mx-auto leading-relaxed italic">
            Disclaimer: The test provided is for informational and self-assessment purposes only and is not a substitute for professional clinical evaluation.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;



// // client/src/components/Footer.jsx

// import React from 'react';
// import { Link } from 'react-router-dom';

// const Footer = () => {
//   return (
//     /* mt-auto is the key here; it pushes the footer to the bottom of a flex container */
//     <footer className="bg-gray-800 text-white py-8 md:py-10 mt-auto border-t border-gray-700 w-full">
//       <div className="max-w-7xl mx-auto px-6 lg:px-8 text-center">
        
//         {/* Navigation Links */}
//         <div className="flex flex-wrap justify-center gap-y-3 gap-x-6 text-xs md:text-sm mb-8 font-medium">
//           <Link to="/about" className="text-gray-400 hover:text-white transition duration-200">About Us</Link>
//           <Link to="/faq" className="text-gray-400 hover:text-white transition duration-200">FAQ</Link>
//           <Link to="/contact" className="text-gray-400 hover:text-white transition duration-200">Contact Us</Link>
//           <Link to="/privacy-policy" className="text-gray-400 hover:text-white transition duration-200">Privacy Policy</Link>
//           <Link to="/terms" className="text-gray-400 hover:text-white transition duration-200">Terms & Conditions</Link>
//         </div>

//         {/* Divider for mobile */}
//         <div className="w-12 h-px bg-gray-700 mx-auto mb-6 md:hidden"></div>

//         {/* Copyright */}
//         <p className="text-gray-500 text-[11px] md:text-sm tracking-wide">
//           IQ Test Platform &copy; {new Date().getFullYear()} IQScaler.com. All rights reserved.
//         </p>

//         {/* Disclaimer */}
//         <p className="text-[9px] md:text-xs text-gray-600 mt-4 max-w-2xl mx-auto leading-relaxed px-4">
//             Disclaimer: The test provided is for informational and self-assessment purposes only and is not a substitute for professional evaluation.
//         </p>

//       </div>
//     </footer>
//   );
// };

// export default Footer;