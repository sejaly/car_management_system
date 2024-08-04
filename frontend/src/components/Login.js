import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Login = ({ setUser }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('https://car-management-system-6nrm.onrender.com/api/auth/login', { email, password });
      const { token, user } = response.data;

      // Store token in localStorage
      localStorage.setItem('authToken', token);

      // Check if the response contains both user and token
      if (user && token) {
        localStorage.setItem('token', token);
        setUser(user); // Update user state

        // Redirect based on role
        if (user.role === 'admin') {
          navigate('/dashboard');
        } else {
          navigate('/cars');
        }
      } else {
        // Handle unexpected response format
        setError('Login failed: Response is missing user or token.');
      }
    } catch (error) {
      if (error.response) {
        console.error('Login error response:', error.response);
        setError(`Login failed: ${error.response.data.msg || 'An unexpected error occurred.'}`);
      } else if (error.request) {
        console.error('Login error request:', error.request);
        setError('Login failed: No response from server.');
      } else {
        console.error('Login error message:', error.message);
        setError(`Login failed: ${error.message}`);
      }
    }
  };

  return (
    <div className="flex flex-col md:flex-row h-screen">
      {/* Image Section */}
      <div
        className="w-full md:w-1/2 bg-cover bg-center"
        style={{
          backgroundImage: 'url(/assets/signup.gif)',
          backgroundSize: 'contain', // Adjusts the size of the background image
          backgroundRepeat: 'no-repeat', // Ensures the image does not repeat
          backgroundPosition: 'center center', // Centers the image
        }}
      >
        {/* You can add content here if needed */}
      </div>

      {/* Login Form Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
          
          <h2 className="text-2xl font-semibold text-black mb-4 text-center">Log In to Your Account (Quadiro Technologies LLP Assignment)</h2>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <form onSubmit={handleLogin}>
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 text-sm font-medium mb-2">Email</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-black bg-white text-black placeholder-gray-500"
                required
                placeholder="Enter your email"
              />
            </div>
            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700 text-sm font-medium mb-2">Password</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-black bg-white text-black placeholder-gray-500"
                required
                placeholder="Enter your password"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-black text-white py-2 rounded-md hover:bg-gray-800 transition duration-200"
            >
              Log In
            </button>
          </form>
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Don't have an account?{' '}
              <a href="/signup" className="text-black hover:underline">
                Sign Up
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
