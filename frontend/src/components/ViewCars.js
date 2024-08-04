import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const CarListing = () => {
  const [cars, setCars] = useState([]);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCars = async () => {
      try {
        const response = await axios.get('https://car-management-system-6nrm.onrender.com/api/cars');
        setCars(response.data);
      } catch (err) {
        setError('Failed to fetch cars');
      }
    };

    // Check if the user is authenticated and has the 'user' role
    const checkUserRole = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          navigate('/login');
          return;
        }
        
        const response = await axios.get('http://localhost:5000/api/auth/role', {
          headers: { Authorization: `Bearer ${token}` }
        });
        
        if (response.data.role !== 'user') {
          navigate('/login');
          return;
        }

        fetchCars();
      } catch (err) {
        navigate('/login');
      }
    };

    checkUserRole();
  }, [navigate]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold mb-6">All Cars</h1>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cars.length > 0 ? (
          cars.map((car) => (
            <div key={car._id} className="bg-white rounded-lg shadow-md overflow-hidden">
              <img
                src={`http://localhost:5000/${car.image}`} // Update URL to your image endpoint
                alt={car.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{car.name}</h2>
                <p className="text-gray-700 mb-2">Model: {car.model}</p>
                <p className="text-gray-700 mb-2">Year: {car.year}</p>
                <p className="text-gray-700 mb-2">Price: ${car.price}</p>
                <p className="text-gray-700 mb-2">Color: {car.color}</p>
              </div>
            </div>
          ))
        ) : (
          <p>No cars available.</p>
        )}
      </div>
    </div>
  );
};

export default CarListing;
