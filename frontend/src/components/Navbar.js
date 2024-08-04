

import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Navbar = ({ user, onLogout }) => {
  const navigate = useNavigate(); // Hook for programmatic navigation

  const handleLogout = () => {
    onLogout(); // Call the logout function passed as a prop
    navigate('/'); // Redirect to the home page
  };

  return (
    <nav className="bg-black p-4 flex justify-between items-center">
      {/* Logo */}
      <div className="text-white text-2xl font-bold">
        <Link to="/">CMS</Link>
      </div>

      {/* Navigation Links */}
      <div className="flex items-center space-x-4">
        <Link to="/" className="text-white hover:bg-gray-800 px-3 py-2 rounded">Home</Link>
        <Link to="/cars" className="text-white hover:bg-gray-800 px-3 py-2 rounded">Cars</Link>

        {user ? (
          <>
            {user.role === 'admin' && (
              <Link to="/dashboard" className="text-white hover:bg-gray-800 px-3 py-2 rounded">Dashboard</Link>
            )}
            <button onClick={handleLogout} className="text-white hover:bg-gray-800 px-3 py-2 rounded">Logout</button>
          </>
        ) : (
          <>
            <Link to="/login" className="text-white hover:bg-gray-800 px-3 py-2 rounded">Login</Link>
            <Link to="/register" className="text-white hover:bg-gray-800 px-3 py-2 rounded">Sign Up</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

