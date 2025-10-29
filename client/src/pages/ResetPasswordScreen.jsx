import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../utils/api'; 

const ResetPasswordScreen = () => {
  const { resettoken } = useParams(); // Get the token from the URL path
  const navigate = useNavigate();

  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [error, setError] = useState(null);

  const submitHandler = async (e) => {
    e.preventDefault();
    
    if (password !== confirmPassword) {
      setError('Passwords do not match.');
      return;
    }
    
    setLoading(true);
    setMessage(null);
    setError(null);

    try {
      // Send the new password and the token to the backend
      const { data } = await api.put(`/users/resetpassword/${resettoken}`, { password });
      
      setMessage(data.message);
      // Optional: Navigate to login after a short delay
      setTimeout(() => navigate('/login'), 3000);
      
    } catch (err) {
      const errMessage = 
        err.response && err.response.data.message 
          ? err.response.data.message 
          : 'Password reset failed. Invalid or expired token.';
      setError(errMessage);
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = { width: '100%', padding: '10px', marginTop: '5px', boxSizing: 'border-box' };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
      <h1>Reset Password</h1>
      <p>Enter your new password below.</p>

      {loading && <p>Processing request...</p>}
      {error && <p style={{ color: 'red' }}>Error: {error}</p>}
      {message && <p style={{ color: 'green' }}>Success: {message}</p>}

      <form onSubmit={submitHandler}>
        <div>
          <label htmlFor='password'>New Password</label>
          <input
            id='password'
            type='password'
            placeholder='Enter new password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={inputStyle}
          />
        </div>
        
        <div style={{ marginTop: '15px' }}>
          <label htmlFor='confirmPassword'>Confirm Password</label>
          <input
            id='confirmPassword'
            type='password'
            placeholder='Confirm new password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            style={inputStyle}
          />
        </div>

        <button 
          type='submit' 
          disabled={loading}
          style={{ padding: '10px', background: 'blue', color: 'white', border: 'none', cursor: 'pointer', marginTop: '15px' }}
        >
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPasswordScreen;