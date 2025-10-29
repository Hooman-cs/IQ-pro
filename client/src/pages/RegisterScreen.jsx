import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUser  } from '../slices/authSlice';

const RegisterScreen = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setError] = useState(null); // For showing success/error messages

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get user info from the Redux state
  const { userInfo } = useSelector((state) => state.auth);

  // If user is already logged in, redirect them away from the register page
  useEffect(() => {
    if (userInfo) {
      navigate('/'); // Redirect to home or dashboard
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setError(null);

    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }

    try {
      // 1. Dispatch the registerUser thunk, passing the complete user object.
      await dispatch(registerUser({ username, email, password })).unwrap(); 
      
      // Navigate only upon successful completion of the thunk
      navigate('/');
      
    } catch (err) {
      const errorMessage = err || 'Registration failed.'; 
      setError(errorMessage);
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
      <h1>Register</h1>
      
      {/* Show error/success messages */}
      {message && <p style={{ color: 'red', border: '1px solid red', padding: '10px' }}>{message}</p>}

      <form onSubmit={submitHandler} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div>
          <label htmlFor='username'>Username</label>
          <input
            id='username'
            type='text'
            placeholder='Enter username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            style={{ width: '100%', padding: '10px', marginTop: '5px' }}
          />
        </div>

        <div>
          <label htmlFor='email'>Email Address</label>
          <input
            id='email'
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            style={{ width: '100%', padding: '10px', marginTop: '5px' }}
          />
        </div>

        <div>
          <label htmlFor='password'>Password</label>
          <input
            id='password'
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '10px', marginTop: '5px' }}
          />
        </div>

        <div>
          <label htmlFor='confirmPassword'>Confirm Password</label>
          <input
            id='confirmPassword'
            type='password'
            placeholder='Confirm password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            style={{ width: '100%', padding: '10px', marginTop: '5px' }}
          />
        </div>

        <button type='submit' style={{ padding: '10px', background: '#333', color: 'white', border: 'none', cursor: 'pointer' }}>
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterScreen;