import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Login from './components/Login';
import Register from './components/Signup';
import Cars from './components/CarsPage';
import Dashboard from './components/Dashboard';
import ViewCar from './components/ViewCars';

function App() {
  const [user, setUser] = useState(null);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setUser(null);
  };

  return (
    <Router>
      <Navbar user={user} onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login setUser={setUser} />} />
        <Route path="/register" element={<Register setUser={setUser} />} />
        <Route path="/cars" element={<Cars />} />
        {user && user.role === 'admin' && (
          <Route path="/dashboard" element={<Dashboard />} />
        )}
        <Route path="/viewCar" element={<ViewCar />} />
      </Routes>
    </Router>
  );
}

export default App;
