import React from 'react';
import { Link } from 'react-router-dom'; // Import Link

const HomeScreen = () => {
 
 const styles = {
  container: {
   padding: '40px 20px',
   maxWidth: '900px',
   margin: '0 auto',
   textAlign: 'center',
  },
  hero: {
   marginBottom: '40px',
  },
  h1: {
   fontSize: '3em',
   color: '#007bff',
   marginBottom: '10px',
  },
  p: {
   fontSize: '1.2em',
   color: '#555',
   marginBottom: '30px',
  },
  ctaButton: {
   display: 'inline-block',
   padding: '15px 30px',
   fontSize: '1.5em',
   backgroundColor: '#28a745',
   color: 'white',
   textDecoration: 'none',
   borderRadius: '8px',
   transition: 'background-color 0.3s',
   boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
   cursor: 'pointer',
  },
  infoSection: {
   marginTop: '40px',
   borderTop: '1px solid #eee',
   paddingTop: '20px',
   color: '#666',
  }
 };

 return (
  <div style={styles.container}>
   <div style={styles.hero}>
    <h1 style={styles.h1}>Unlock Your Potential. Take the IQ Test Now!</h1>
    <p style={styles.p}>
     Test your cognitive abilities, measure your logical reasoning, and gain insight into your intellectual strengths. Get your certified results and track your performance over time.
    </p>
    
    {/* The main call-to-action links to the quiz. PrivateRoute will handle redirection if the user is logged out. */}
    <Link to='/quiz' style={styles.ctaButton}>
     Start Test Now &rarr;
    </Link>
   </div>

   <div style={styles.infoSection}>
    <p>
     *You must be logged in to start the test. Click 'Sign In' in the header to continue.
    </p>
   </div>
  </div>
 );
};

export default HomeScreen;






// import React from 'react';

// const HomeScreen = () => {
//   return (
//     <div style={{ padding: '20px', textAlign: 'center' }}>
//       <h1>Welcome to the Online IQ Testing Platform!</h1>
//       <p>Test your cognitive abilities and track your results over time.</p>
//     </div>
//   );
// };

// export default HomeScreen;