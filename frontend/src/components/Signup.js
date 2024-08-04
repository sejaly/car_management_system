import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Signup = ({ setUser }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user'); // Default role
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSignup = async (e) => {
    e.preventDefault();

    try {
      const userData = {
        name,
        email,
        password,
        role
      };

      const response = await axios.post('https://car-management-system-6nrm.onrender.com/api/auth/register', userData);
      const { token } = response.data;

      // Store token in localStorage
      localStorage.setItem('authToken', token);

      // Log entire response to check the structure
      console.log('Signup response:', response.data);

      // Check if the response contains both user and token
      if (response.data && response.data.user && response.data.token) {
        const registeredUser = response.data.user;
        localStorage.setItem('token', response.data.token);
        setUser(registeredUser); // Update user state

        // Redirect based on role
        if (registeredUser.role === 'admin') {
          navigate('/dashboard');
        } else {
          navigate('/cars');
        }
      } else {
        // Handle unexpected response format
        setError('Signup failed: Response is missing user or token.');
      }
    } catch (error) {
      if (error.response) {
        console.error('Signup error response:', error.response);
        setError(`Signup failed: ${error.response.data.msg || 'An unexpected error occurred.'}`);
      } else if (error.request) {
        console.error('Signup error request:', error.request);
        setError('Signup failed: No response from server.');
      } else {
        console.error('Signup error message:', error.message);
        setError(`Signup failed: ${error.message}`);
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

      {/* Signup Form Section */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-white">
        <div className="w-full max-w-md p-8 bg-white rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold text-black mb-4 text-center">Create an Account(Quadiro Technologies LLP Assignment)</h2>
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
          <form onSubmit={handleSignup}>
            {/* Role Selection Slider */}
            <div className="mb-6">
              <div className="flex items-center justify-center">
                <label
                  className={`flex-1 cursor-pointer py-2 text-center rounded-l-md ${
                    role === 'user' ? 'bg-white text-black' : 'bg-black text-white'
                  } transition-colors duration-200`}
                >
                  <input
                    type="radio"
                    name="role"
                    value="user"
                    checked={role === 'user'}
                    onChange={() => setRole('user')}
                    className="hidden"
                  />
                  User
                </label>
                <label
                  className={`flex-1 cursor-pointer py-2 text-center rounded-r-md ${
                    role === 'admin' ? 'bg-white text-black' : 'bg-black text-white'
                  } transition-colors duration-200`}
                >
                  <input
                    type="radio"
                    name="role"
                    value="admin"
                    checked={role === 'admin'}
                    onChange={() => setRole('admin')}
                    className="hidden"
                  />
                  Admin
                </label>
              </div>
            </div>

            <div className="mb-4">
              <label htmlFor="name" className="block text-gray-700 text-sm font-medium mb-2">Name</label>
              <input
                id="name"
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-black bg-white text-black placeholder-gray-500"
                required
                placeholder="Enter your name"
              />
            </div>
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
              Sign Up
            </button>
          </form>
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{' '}
              <a href="/login" className="text-black hover:underline">
                Log In
              </a>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
