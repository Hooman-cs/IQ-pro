import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom'; 
import { authUser } from '../slices/authSlice';

const LoginScreen = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setError] = useState(null); // For error messages

  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Check if user is already logged in
  const { userInfo } = useSelector((state) => state.auth);

  useEffect(() => {
    // If the user is logged in, redirect them to the home page
    if (userInfo) {
      navigate('/'); 
    }
  }, [navigate, userInfo]);

  const submitHandler = async (e) => {
    e.preventDefault();
    setError(null);

    try {
      // 1. Dispatch the authUser thunk, passing the email and password object.
      // We don't need 'await' here since the thunk handles the async logic internally.
      // However, to ensure proper loading/error handling, dispatching the thunk is the key step.
      await dispatch(authUser({ email, password })).unwrap(); 
      
      // Navigate only upon successful completion of the thunk
      navigate('/');
      
    } catch (err) {
      // The thunk handles setting the error state, but catching the error here 
      // is good practice if you want to log or handle the rejected promise.
      // If we await the dispatch, we can get the error here:
      const errorMessage = err || 'Login failed.'; 
      setError(errorMessage); 
    }
  };

  return (
    <div style={{ padding: '20px', maxWidth: '400px', margin: '0 auto' }}>
      <h1>Sign In</h1>
      
      {/* Show error message */}
      {message && <p style={{ color: 'red', border: '1px solid red', padding: '10px' }}>{message}</p>}

      <form onSubmit={submitHandler} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
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

        <button type='submit' style={{ padding: '10px', background: '#333', color: 'white', border: 'none', cursor: 'pointer' }}>
          Sign In
        </button>
      </form>

      <div style={{ marginTop: '15px', textAlign: 'center' }}>
        <Link to='/forgotpassword' style={{ textDecoration: 'none', color: '#007bff' }}>
          Forgot Password?
        </Link>
      </div>
    </div>
  );
};

export default LoginScreen;