//client/src/components/Header.jsx

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../slices/authSlice';

const Header = () => {
const { userInfo } = useSelector((state) => state.auth);
const dispatch = useDispatch();
const navigate = useNavigate();

const logoutHandler = () => {
 dispatch(logout());
 navigate('/'); 
};

// Reusable Tailwind classes for navigation links
const baseNavLinkClasses = 'text-gray-300 hover:text-white transition duration-200 text-sm font-medium';
const dropdownItemClasses = 'text-gray-700 px-4 py-3 text-sm block hover:bg-gray-100 transition duration-150 cursor-pointer border-b border-gray-200 last:border-b-0';


// Function to render dropdown items with onClick handlers
const renderDropdownItem = (to, label, onClick = null) => (
 <div 
  key={label}
  onClick={() => {
   if (onClick) {
    onClick();
   } else {
    navigate(to);
   }
  }}
  className={dropdownItemClasses}
 >
  {label}
 </div>
);

return (
 <header className="bg-gray-800 py-4 text-white sticky top-0 z-50 shadow-xl border-b border-gray-700">
 <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center space-x-8">
  
  {/* --- 1. BRAND LOGO (Left) --- */}
  <Link to='/' className="text-white text-2xl font-extrabold tracking-wider flex-shrink-0">
  IQ Testing Platform
  </Link>
  
  {/* --- 2. MAIN NAVIGATION & START TEST (Central) --- */}
  <nav className="flex items-center space-x-6">
   <Link to='/' className={baseNavLinkClasses}>Home</Link>
   <Link to='/faq' className={baseNavLinkClasses}>FAQ</Link>
   <Link to='/about' className={baseNavLinkClasses}>About Us</Link>
   <Link to='/contact' className={baseNavLinkClasses}>Contact Us</Link>

   <Link 
    to={userInfo ? '/quiz' : '/login'} 
    className="text-sm font-semibold border border-green-500 rounded-lg px-4 py-2 bg-green-500 text-gray-800 hover:bg-green-600 hover:text-white transition duration-300 shadow-md"
   >
    Start Test
   </Link>
  </nav>

   {/* --- 3. AUTHENTICATION (Far Right) --- */}
   {userInfo ? (
    <div 
     // Parent container for robust group-hover boundary
     className="relative inline-block group ml-auto" // Use ml-auto to push it right
    >
     {/* User Name Trigger with Hover Effect */}
     <span className="text-white font-medium px-3 py-2 flex items-center cursor-pointer rounded-md hover:bg-gray-700 transition duration-150">
      
      	<svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"></path>
        </svg>
      	{userInfo.username} 
      	<svg 
      	 className="w-4 h-4 ml-2 transition-transform duration-200 group-hover:rotate-180" 
      	 xmlns="http://www.w3.org/2000/svg" 
      	 viewBox="0 0 20 20" 
      	 fill="currentColor"
      	>
      	 <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
      	</svg>
     </span>
     
     {/* Dropdown Content - FIXED classes */}
     <div 
      className={`
      	absolute top-full right-0 mt-3 
      	bg-white min-w-[180px] rounded-lg 
      	shadow-2xl z-20 // Increased shadow and z-index
      	transition-all duration-300 ease-out 
      	origin-top-right

        // Robust Visibility/Scaling Fix
        invisible opacity-0 transform scale-95
        group-hover:visible group-hover:opacity-100 group-hover:scale-100
      `}
     >
      {renderDropdownItem('/dashboard', 'Dashboard')}
      {renderDropdownItem('/history', 'Test History')}
      
      {userInfo.isAdmin && (
       renderDropdownItem('/admin', 'Admin Dashboard')
      )}
      
      {renderDropdownItem('#logout', 'Logout', logoutHandler)}
     </div>
    </div>
   ) : (
    // Show Sign In/Sign Up links when logged out
    <div className="flex space-x-4 ml-auto">
     <Link to='/login' className={baseNavLinkClasses}>Sign In</Link>
     <Link to='/register' className={baseNavLinkClasses + ' border border-gray-400 px-3 py-1 rounded'}>Sign Up</Link>
    </div>
   )}
  </div>
 </header>
);
};

export default Header;

// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { logout } from '../slices/authSlice';

// const Header = () => {
//  const { userInfo } = useSelector((state) => state.auth);
//  const dispatch = useDispatch();
//  const navigate = useNavigate();

//  const logoutHandler = () => {
//   dispatch(logout());
//   // Redirect to the public home page after logout
//   navigate('/'); 
//  };

//  const styles = {
//   header: {
//    backgroundColor: '#343a40', // Dark background
//    padding: '10px 0',
//    color: 'white',
//   },
//   container: {
//    maxWidth: '1200px',
//    margin: '0 auto',
//    padding: '0 20px',
//    display: 'flex',
//    justifyContent: 'space-between',
//    alignItems: 'center',
//   },
//   brand: {
//    color: 'white',
//    textDecoration: 'none',
//    fontSize: '1.5em',
//    fontWeight: 'bold',
//   },
//   nav: {
//    display: 'flex',
//    alignItems: 'center',
//    gap: '15px',
//   },
//   navLink: {
//    color: '#adb5bd', // Light gray color
//    textDecoration: 'none',
//    padding: '5px 10px',
//    fontSize: '1em',
//    transition: 'color 0.3s',
//    // Using a data attribute or class would be better for hover, but using inline for consistency
//    ':hover': {
//     color: 'white',
//    },
//   },
//   // Simple dropdown styling
//   dropdown: {
//    position: 'relative',
//    display: 'inline-block',
//    cursor: 'pointer',
//   },
//   dropdownContent: {
//    display: 'none',
//    position: 'absolute',
//    backgroundColor: '#f9f9f9',
//    minWidth: '160px',
//    boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)',
//    zIndex: 1,
//    right: 0,
//   },
//   dropdownItem: {
//    color: 'black',
//    padding: '12px 16px',
//    textDecoration: 'none',
//    display: 'block',
//    borderBottom: '1px solid #eee',
//    transition: 'background-color 0.3s',
//    ':hover': {
//     backgroundColor: '#ddd',
//    },
//   },
//  };

//  const [showDropdown, setShowDropdown] = useState(false);

//  // Function to render dropdown items with onClick handlers
//  const renderDropdownItem = (to, label, onClick = null) => (
//   <div 
//     key={label}
//     onClick={() => {
//       setShowDropdown(false); 
//       if (onClick) {
//         onClick();
//       } else {
//         navigate(to);
//       }
//     }}
//     style={styles.dropdownItem}
//   >
//     {label}
//   </div>
//  );

//  return (
//   <header style={styles.header}>
//    <div style={styles.container}>
//     <Link to='/' style={styles.brand}>
//      IQ Testing Platform
//     </Link>
    
//     <nav style={styles.nav}>
//       {/* --- 1. PUBLIC NAVIGATION LINKS (NEW) --- */}
//       <Link to='/faq' style={styles.navLink}>
//         FAQ
//       </Link>
//       <Link to='/about' style={styles.navLink}>
//         About Us
//       </Link>
//       <Link to='/contact' style={styles.navLink}>
//         Contact Us
//       </Link>

//       {/* --- 2. START TEST BUTTON (Conditional) --- */}
//       <Link 
//         to={userInfo ? '/quiz' : '/login'} 
//         style={{ 
//           ...styles.navLink, 
//           color: '#28a745', 
//           fontWeight: 'bold',
//           border: '1px solid #28a745',
//           borderRadius: '5px',
//           padding: '5px 12px' 
//         }}
//       >
//         Start Test
//       </Link>

//       {/* --- 3. AUTHENTICATION (Right-aligned) --- */}
//       {userInfo ? (
//         <div 
//           style={styles.dropdown} 
//           onMouseEnter={() => setShowDropdown(true)}
//           onMouseLeave={() => setShowDropdown(false)}
//         >
//           <span style={{ ...styles.navLink, color: 'white' }}>
//             {userInfo.username} ▼
//           </span>
          
//           {/* Dropdown Content */}
//           <div 
//             style={{ 
//               ...styles.dropdownContent, 
//               display: showDropdown ? 'block' : 'none' 
//             }}
//           >
//             {renderDropdownItem('/dashboard', 'Dashboard')}
//             {renderDropdownItem('/history', 'Test History')}
            
//             {userInfo.isAdmin && (
//               renderDropdownItem('/admin', 'Admin Dashboard')
//             )}
            
//             {renderDropdownItem('#logout', 'Logout', logoutHandler)}
//           </div>
//         </div>
//       ) : (
//         // Show Sign In/Sign Up links when logged out
//         <>
//           <Link to='/login' style={styles.navLink}>
//             Sign In
//           </Link>
//           <Link to='/register' style={styles.navLink}>
//             Sign Up
//           </Link>
//         </>
//       )}
//     </nav>
//    </div>
//   </header>
//  );
// };

// export default Header;