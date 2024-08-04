import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CarsPage = () => {
  const [cars, setCars] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [carsPerPage, setCarsPerPage] = useState(10); // Number of cars per page

  // Fetch cars data from the server
  const fetchCars = async (page) => {
    try {
      const response = await axios.get(`http://localhost:5000/api/cars?page=${page}&limit=${carsPerPage}`);
      setCars(response.data.cars);
      setTotalCount(response.data.totalCount);
    } catch (err) {
      console.error('Error fetching cars:', err);
    }
  };

  useEffect(() => {
    fetchCars(currentPage); // Fetch cars when component mounts or page changes
  }, [currentPage]);

  // Handle page change
  const handlePageChange = (page) => {
    setCurrentPage(page);
    fetchCars(page);
  };

  // Calculate total pages
  const totalPages = Math.ceil(totalCount / carsPerPage);

  return (
    <div className="p-4 bg-gray-100">
      <h1 className="text-3xl font-semibold mb-4">All Cars</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {cars.map(car => (
          <div key={car._id} className="bg-white p-4 rounded-md shadow-md">
            <div className="flex flex-col items-center">
              {/* Display image */}
              {car.image && (
                <img 
                  src={`http://localhost:5000/uploads/${car.image}`} 
                  alt={car.name} 
                  className="w-full h-48 object-cover mb-2" 
                />
              )}
              <h3 className="text-xl font-semibold mb-2">{car.name}</h3>
              <p className="text-gray-600 mb-2">Model: {car.model}</p>
              <p className="text-gray-600 mb-2">Price: ${car.price}</p>
              <p className="text-gray-600 mb-2">Year: {car.year}</p>
              <p className="text-gray-600 mb-2">Color: {car.color}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination controls */}
      <div className="flex justify-center mt-4">
        <button 
          onClick={() => handlePageChange(currentPage - 1)} 
          disabled={currentPage === 1} 
          className="px-4 py-2 mx-1 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
        >
          Previous
        </button>
        {Array.from({ length: totalPages }, (_, index) => (
          <button 
            key={index + 1} 
            onClick={() => handlePageChange(index + 1)} 
            className={`px-4 py-2 mx-1 rounded-lg ${currentPage === index + 1 ? 'bg-gray-800 text-white' : 'bg-gray-600 text-gray-300'}`}
          >
            {index + 1}
          </button>
        ))}
        <button 
          onClick={() => handlePageChange(currentPage + 1)} 
          disabled={currentPage === totalPages} 
          className="px-4 py-2 mx-1 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default CarsPage;
