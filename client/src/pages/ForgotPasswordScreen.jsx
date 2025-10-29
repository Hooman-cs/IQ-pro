import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../utils/api'; 

const ForgotPasswordScreen = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    setError(null);

    try {
      // NOTE: We use the base '/api' route because the request will be proxied by Vite
      const { data } = await api.post('/users/forgotpassword', { email });
      
      setMessage(data.message);
      
    } catch (err) {
      const errMessage = 
        err.response && err.response.data.message 
          ? err.response.data.message 
          : 'Failed to send reset email. Check server console.';
      setError(errMessage);
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = { width: '100%', padding: '10px', marginTop: '5px', boxSizing: 'border-box' };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
      <h1>Forgot Password</h1>
      <p>Enter the email address associated with your account. We will send you a password reset link.</p>

      {loading && <p>Processing request...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {message && <p style={{ color: 'green' }}>Success: {message}</p>}

      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor='email'>Email Address</label>
          <input
            id='email'
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={inputStyle}
          />
        </div>

        <button 
          type='submit' 
          disabled={loading}
          style={{ padding: '10px', background: '#333', color: 'white', border: 'none', cursor: 'pointer', marginTop: '15px' }}
        >
          Request Reset Link
        </button>
      </form>
    </div>
  );
};

export default ForgotPasswordScreen;