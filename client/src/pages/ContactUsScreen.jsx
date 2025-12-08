//client/src/pages/ContactUsScreen.jsx

import React, { useState } from 'react';
import api from '../utils/api';

const ContactUsScreen = () => {
const [formData, setFormData] = useState({ name: '', email: '', message: '' });
const [loading, setLoading] = useState(false);
const [success, setSuccess] = useState(null);

// The 'styles' object is removed, and all styling is replaced with Tailwind classes.

const handleChange = (e) => {
 setFormData({ ...formData, [e.target.id]: e.target.value });
 setSuccess(null);
};

const handleSubmit = async (e) => {
 e.preventDefault();
 setLoading(true);
 setSuccess(null);

 try {
 const { data } = await api.post('/contact', formData);
 setSuccess({ type: 'success', message: data.message });
 setFormData({ name: '', email: '', message: '' });
 } catch (error) {
 const message = 
  error.response && error.response.data.message
  ? error.response.data.message
  : 'Failed to send message. Please check your connection.';
 setSuccess({ type: 'error', message });
 } finally {
 setLoading(false);
 }
};

// Dynamic Tailwind classes for the success/error message
const messageClasses = success 
 ? success.type === 'success' 
 ? 'bg-green-100 text-green-800 border-green-400' 
 : 'bg-red-100 text-red-800 border-red-400' 
 : '';

return (
 <div className="max-w-xl mx-auto my-10 p-6 sm:p-8 bg-white rounded-lg shadow-xl border border-gray-100">
 <h2 className="text-3xl font-bold text-blue-600 border-b-2 border-gray-200 pb-3 mb-8 text-center">
  Get In Touch With Our Team
 </h2>
 
 {/* Contact Info Section */}
 <div className="mb-6 p-4 text-center bg-blue-50 rounded-md border border-blue-200">
  <p className="text-gray-700 mb-2">
  <b>Have a question, suggestion, or technical issue?</b> We’re here to help you improve your testing experience.
  </p>
  <p className="font-bold text-blue-700 text-lg">
  Support Email: support@yourdomain.com
  </p>
  <p className="text-sm text-gray-500 mt-1">
  Typical Response Time: Within 24 hours.
  </p>
 </div>

 {/* Success/Error Message */}
 {success && (
  <div className={`p-3 rounded-md mb-6 text-center font-medium border ${messageClasses}`}>
  {success.message}
  </div>
 )}

 <form onSubmit={handleSubmit}>
  <div className="mb-4">
  <label htmlFor="name" className="block mb-1 font-semibold text-gray-700">Name</label>
  <input 
   type="text" 
   id="name" 
   required 
   className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition duration-150 disabled:bg-gray-200 disabled:cursor-not-allowed" 
   value={formData.name} 
   onChange={handleChange} 
   disabled={loading} 
  />
  </div>
  <div className="mb-4">
  <label htmlFor="email" className="block mb-1 font-semibold text-gray-700">Email</label>
  <input 
   type="email" 
   id="email" 
   required 
   className="w-full p-2 border border-gray-300 rounded-md focus:ring-blue-500 focus:border-blue-500 transition duration-150 disabled:bg-gray-200 disabled:cursor-not-allowed" 
   value={formData.email} 
   onChange={handleChange} 
   disabled={loading} 
  />
  </div>
  <div className="mb-6">
  <label htmlFor="message" className="block mb-1 font-semibold text-gray-700">Message</label>
  <textarea 
   id="message" 
   rows="5" 
   required 
   className="w-full p-2 border border-gray-300 rounded-md resize-y focus:ring-blue-500 focus:border-blue-500 transition duration-150 disabled:bg-gray-200 disabled:cursor-not-allowed" 
   value={formData.message} 
   onChange={handleChange} 
   disabled={loading}
  ></textarea>
  </div>
  <button 
   type="submit" 
   className="w-full py-2 bg-green-600 text-white font-semibold rounded-md hover:bg-green-700 transition duration-300 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-opacity-50 disabled:opacity-60 disabled:cursor-not-allowed" 
   disabled={loading}
  >
  {loading ? 'Sending...' : 'Send Message'}
  </button>
 </form>
 </div>
);
};

export default ContactUsScreen;