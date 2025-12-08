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
   await dispatch(authUser({ email, password })).unwrap(); 
   
   // Navigate only upon successful completion of the thunk
   navigate('/');
   
  } catch (err) {
   // Handle login failure error
   const errorMessage = err || 'Login failed.'; 
   setError(errorMessage); 
  }
 };

 return (
  <div className="p-6 max-w-md mx-auto my-10 bg-white rounded-xl shadow-lg border border-gray-100">
   <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">Sign In</h1>
   
   {/* Show error message */}
   {message && (
    <p className="text-red-700 bg-red-100 border border-red-400 p-3 rounded-md mb-4 text-center">
    {message}
    </p>
   )}

   <form onSubmit={submitHandler} className="flex flex-col space-y-4">
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

    <button 
     type='submit' 
     className="w-full py-3 mt-2 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 transition duration-200 focus:outline-none focus:ring-4 focus:ring-blue-300"
    >
     Sign In
    </button>
   </form>

   <div className="mt-4 text-center">
    <Link to='/forgotpassword' className="text-blue-600 hover:text-blue-800 transition duration-150 text-sm">
     Forgot Password?
    </Link>
   </div>
  </div>
 );
};

export default LoginScreen;