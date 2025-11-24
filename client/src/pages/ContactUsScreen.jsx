import React, { useState } from 'react';
import api from '../utils/api'; // <-- NEW IMPORT: for making API calls

const ContactUsScreen = () => {
 const [formData, setFormData] = useState({ name: '', email: '', message: '' });
 const [loading, setLoading] = useState(false); // NEW STATE: for loading indicator
 const [success, setSuccess] = useState(null); // NEW STATE: for success/error messages

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
   opacity: loading ? 0.6 : 1, // Disable button visually when loading
  },
  message: {
   padding: '10px',
   borderRadius: '4px',
   marginBottom: '15px',
   textAlign: 'center',
  },
 };

 const handleChange = (e) => {
  setFormData({ ...formData, [e.target.id]: e.target.value });
  setSuccess(null); // Clear messages on input change
 };

 const handleSubmit = async (e) => {
  e.preventDefault();
  setLoading(true);
  setSuccess(null);

  try {
   const { data } = await api.post('/contact', formData); // <-- API CALL TO NEW ENDPOINT
   setSuccess({ type: 'success', message: data.message });
   setFormData({ name: '', email: '', message: '' }); // Clear form on success
  } catch (error) {
   const message = 
    error.response && error.response.data.message
     ? error.response.data.message
     : 'Failed to send message. Please try again later.';
   setSuccess({ type: 'error', message });
  } finally {
   setLoading(false);
  }
 };

 return (
  <div style={styles.container}>
   <h2 style={styles.h2}>Get In Touch</h2>
   
   <div style={styles.contactInfo}>
    <p>If you have any questions, feedback, or need support, please contact us:</p>
    <p>Email: **support@iqtestingplatform.org**</p>
    <p>Phone: **+1 (555) 123-4567**</p>
   </div>

   {/* Success/Error Message Display */}
   {success && (
    <div style={{ 
      ...styles.message, 
      backgroundColor: success.type === 'success' ? '#d4edda' : '#f8d7da',
      color: success.type === 'success' ? '#155724' : '#721c24'
    }}>
     {success.message}
    </div>
   )}

   <form onSubmit={handleSubmit}>
    <div style={styles.formGroup}>
     <label htmlFor="name" style={styles.label}>Name</label>
     <input type="text" id="name" required style={styles.input} value={formData.name} onChange={handleChange} disabled={loading} />
    </div>
    <div style={styles.formGroup}>
     <label htmlFor="email" style={styles.label}>Email</label>
     <input type="email" id="email" required style={styles.input} value={formData.email} onChange={handleChange} disabled={loading} />
    </div>
    <div style={styles.formGroup}>
     <label htmlFor="message" style={styles.label}>Message</label>
     <textarea id="message" rows="5" required style={styles.textarea} value={formData.message} onChange={handleChange} disabled={loading}></textarea>
    </div>
    <button type="submit" style={styles.button} disabled={loading}>
     {loading ? 'Sending...' : 'Send Message'}
    </button>
   </form>
  </div>
 );
};

export default ContactUsScreen;