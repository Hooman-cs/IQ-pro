// client/src/pages/RegisterScreen.jsx

import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { registerUser } from '../slices/authSlice';

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
    <div className="p-6 max-w-md mx-auto my-10 bg-white rounded-xl shadow-lg border border-gray-100">
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Register</h1>
      
      {/* Show error/success messages */}
      {message && (
        <p className="text-red-700 bg-red-100 border border-red-400 p-3 rounded-md mb-4 text-center">
          {message}
        </p>
      )}

      <form onSubmit={submitHandler} className="flex flex-col space-y-4">
        {/* Username Field */}
        <div>
          <label htmlFor='username' className="block text-gray-700 font-medium mb-1">Username</label>
          <input
            id='username'
            type='text'
            placeholder='Enter username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
          />
        </div>

        {/* Email Field */}
        <div>
          <label htmlFor='email' className="block text-gray-700 font-medium mb-1">Email Address</label>
          <input
            id='email'
            type='email'
            placeholder='Enter email'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
          />
        </div>

        {/* Password Field */}
        <div>
          <label htmlFor='password' className="block text-gray-700 font-medium mb-1">Password</label>
          <input
            id='password'
            type='password'
            placeholder='Enter password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
          />
        </div>

        {/* Confirm Password Field */}
        <div>
          <label htmlFor='confirmPassword' className="block text-gray-700 font-medium mb-1">Confirm Password</label>
          <input
            id='confirmPassword'
            type='password'
            placeholder='Confirm password'
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
            className="w-full p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-150"
          />
        </div>

        {/* Submit Button */}
        <button 
          type='submit' 
          className="w-full py-3 mt-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-4 focus:ring-blue-300"
        >
          Register
        </button>
      </form>
    </div>
  );
};

export default RegisterScreen;