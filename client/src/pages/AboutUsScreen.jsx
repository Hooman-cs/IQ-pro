import React from 'react';

const AboutUsScreen = () => {
  const styles = {
    container: {
      maxWidth: '800px',
      margin: '0 auto',
      padding: '20px',
      lineHeight: '1.6',
    },
    h2: {
      color: '#007bff',
      borderBottom: '2px solid #eee',
      paddingBottom: '10px',
      marginBottom: '20px',
    },
    section: {
      marginBottom: '30px',
    },
    h3: {
      color: '#343a40',
      marginBottom: '10px',
    },
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.h2}>About the IQ Testing Platform</h2>
      
      <div style={styles.section}>
        <h3 style={styles.h3}>Our Mission</h3>
        <p>
          Our mission is to provide an accessible, scientifically-backed tool for individuals worldwide to measure and understand their cognitive abilities. We believe self-awareness of intellectual strengths is the first step toward personal and professional growth.
        </p>
      </div>

      <div style={styles.section}>
        <h3 style={styles.h3}>Test Development</h3>
        <p>
          The test content was developed by a team of cognitive psychologists and psychometricians. It uses adaptive algorithms to ensure accuracy and reliability, providing you with a result that is both meaningful and comparable to international standards.
        </p>
      </div>

      <div style={styles.section}>
        <h3 style={styles.h3}>Commitment to Privacy</h3>
        <p>
          We are committed to protecting your data. All test results and personal information are stored securely and kept confidential. We use anonymized data strictly for enhancing our test accuracy.
        </p>
      </div>
    </div>
  );
};

export default AboutUsScreen;