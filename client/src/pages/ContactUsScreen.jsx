import React from 'react';

const ContactUsScreen = () => {
  const styles = {
    container: {
      maxWidth: '600px',
      margin: '0 auto',
      padding: '20px',
      lineHeight: '1.6',
      backgroundColor: '#f8f9fa',
      borderRadius: '8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
    },
    h2: {
      color: '#007bff',
      borderBottom: '2px solid #dee2e6',
      paddingBottom: '10px',
      marginBottom: '20px',
      textAlign: 'center',
    },
    contactInfo: {
      marginBottom: '30px',
      textAlign: 'center',
    },
    formGroup: {
      marginBottom: '15px',
    },
    label: {
      display: 'block',
      marginBottom: '5px',
      fontWeight: 'bold',
    },
    input: {
      width: '100%',
      padding: '10px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      boxSizing: 'border-box',
    },
    textarea: {
      width: '100%',
      padding: '10px',
      border: '1px solid #ccc',
      borderRadius: '4px',
      resize: 'vertical',
      boxSizing: 'border-box',
    },
    button: {
      width: '100%',
      padding: '10px',
      backgroundColor: '#28a745',
      color: 'white',
      border: 'none',
      borderRadius: '4px',
      cursor: 'pointer',
      fontSize: '1em',
    }
  };

  // NOTE: This is a placeholder for the form submission logic
  const handleSubmit = (e) => {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you shortly.');
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.h2}>Get In Touch</h2>
      
      <div style={styles.contactInfo}>
        <p>If you have any questions, feedback, or need support, please contact us:</p>
        <p>Email: **support@iqtestingplatform.org**</p>
        <p>Phone: **+1 (555) 123-4567**</p>
      </div>

      <form onSubmit={handleSubmit}>
        <div style={styles.formGroup}>
          <label htmlFor="name" style={styles.label}>Name</label>
          <input type="text" id="name" required style={styles.input} />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="email" style={styles.label}>Email</label>
          <input type="email" id="email" required style={styles.input} />
        </div>
        <div style={styles.formGroup}>
          <label htmlFor="message" style={styles.label}>Message</label>
          <textarea id="message" rows="5" required style={styles.textarea}></textarea>
        </div>
        <button type="submit" style={styles.button}>Send Message</button>
      </form>
    </div>
  );
};

export default ContactUsScreen;