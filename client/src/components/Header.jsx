import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../slices/authSlice';

const Header = () => {
  const { userInfo } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const logoutHandler = () => {
    dispatch(logout());
    navigate('/login');
  };

  const styles = {
    header: {
      backgroundColor: '#343a40', // Dark background
      padding: '10px 0',
      color: 'white',
    },
    container: {
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '0 20px',
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
    },
    brand: {
      color: 'white',
      textDecoration: 'none',
      fontSize: '1.5em',
      fontWeight: 'bold',
    },
    nav: {
      display: 'flex',
      alignItems: 'center',
      gap: '15px',
    },
    navLink: {
      color: '#adb5bd', // Light gray color
      textDecoration: 'none',
      padding: '5px 10px',
      fontSize: '1em',
    },
    // Simple dropdown styling
    dropdown: {
      position: 'relative',
      display: 'inline-block',
      cursor: 'pointer',
    },
    dropdownContent: {
      display: 'none',
      position: 'absolute',
      backgroundColor: '#f9f9f9',
      minWidth: '160px',
      boxShadow: '0px 8px 16px 0px rgba(0,0,0,0.2)',
      zIndex: 1,
      right: 0,
    },
    dropdownItem: {
      color: 'black',
      padding: '12px 16px',
      textDecoration: 'none',
      display: 'block',
      borderBottom: '1px solid #eee',
    },
    // The hover state needs to be managed via state or a simple CSS class 
    // for pure inline styling, but for simplicity here, we'll rely on the click action.
  };

  const [showDropdown, setShowDropdown] = useState(false);

  // Function to render dropdown items with onClick handlers
  const renderDropdownItem = (to, label, onClick = null) => (
    <div 
        key={label}
        onClick={() => {
            setShowDropdown(false); 
            if (onClick) {
                onClick();
            } else {
                navigate(to);
            }
        }}
        style={styles.dropdownItem}
    >
        {label}
    </div>
  );

  return (
    <header style={styles.header}>
      <div style={styles.container}>
        <Link to='/' style={styles.brand}>
          IQ Testing Platform
        </Link>
        
        <nav style={styles.nav}>
            {/* --- 1. START TEST BUTTON --- */}
            {userInfo && (
                <Link to='/quiz' style={{ ...styles.navLink, color: '#28a745', fontWeight: 'bold' }}>
                    Start Test
                </Link>
            )}

            {userInfo ? (
                <div 
                    style={styles.dropdown} 
                    onMouseEnter={() => setShowDropdown(true)}
                    onMouseLeave={() => setShowDropdown(false)}
                >
                    <span style={{ ...styles.navLink, color: 'white' }}>
                        {userInfo.username} ▼
                    </span>
                    
                    {/* Dropdown Content */}
                    <div 
                        style={{ 
                            ...styles.dropdownContent, 
                            display: showDropdown ? 'block' : 'none' 
                        }}
                    >
                        {/* --- 2. HISTORY LINK --- */}
                        {/* CHANGE: Link to Dashboard as the primary profile page */}
                        {renderDropdownItem('/dashboard', 'Dashboard')}

                        {renderDropdownItem('/history', 'Test History')}
                        
                        {userInfo.isAdmin && (
                            renderDropdownItem('/admin', 'Admin Dashboard')
                        )}
                        
                        {renderDropdownItem('#logout', 'Logout', logoutHandler)}
                    </div>
                </div>
            ) : (
                <>
                    <Link to='/login' style={styles.navLink}>
                        Sign In
                    </Link>
                    <Link to='/register' style={styles.navLink}>
                        Sign Up
                    </Link>
                </>
            )}
        </nav>
      </div>
    </header>
  );
};

export default Header;