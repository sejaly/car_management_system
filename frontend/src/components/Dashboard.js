import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CreateCarModal from './CreateCarModal';
import UpdateCarModal from './UpdateCarModal';

const Dashboard = () => {
  const [cars, setCars] = useState([]);
  const [totalCount, setTotalCount] = useState(0);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedCarId, setSelectedCarId] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [carsPerPage] = useState(10);

  // Fetch cars from the server
  const fetchCars = async (page) => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        console.error('No authentication token found');
        // Optionally redirect to login page or show a message
        return;
      }

      const response = await axios.get(`http://localhost:5000/api/cars?page=${page}&limit=${carsPerPage}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setCars(response.data.cars);
      setTotalCount(response.data.totalCount);
    } catch (err) {
      console.error('Error fetching cars:', err);
      // Handle token expiration or redirect to login page if needed
    }
  };

  useEffect(() => {
    fetchCars(currentPage); // Fetch cars when component mounts or page changes
  }, [currentPage]);

  // Handle car addition
  const handleCarAdded = () => {
    fetchCars(currentPage); // Refresh the car list
    setIsCreateModalOpen(false); // Close the modal
  };

  // Handle car update
  const handleCarUpdated = () => {
    fetchCars(currentPage); // Refresh the car list
    setIsUpdateModalOpen(false); // Close the modal
  };

  // Handle car deletion
  const handleDelete = async (carId) => {
    try {
      const token = localStorage.getItem('authToken');
      if (!token) {
        console.error('No authentication token found');
        // Optionally redirect to login page or show a message
        return;
      }

      await axios.delete(`http://localhost:5000/api/cars/${carId}`, {
        headers: { Authorization: `Bearer ${token}` }
      });

      setCars(cars.filter(car => car._id !== carId)); // Remove the car from the list
      setTotalCount(totalCount - 1); // Update the total count
    } catch (err) {
      console.error('Error deleting car:', err);
    }
  };

  // Pagination controls
  const totalPages = Math.ceil(totalCount / carsPerPage);

  return (
    <div className="flex flex-col h-screen p-4 bg-gray-100">
      <div className="flex items-center justify-between bg-white p-4 shadow-md rounded-md mb-4">
        <h2 className="text-2xl font-semibold">Total Cars: {totalCount}</h2>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-black-600"
        >
          Create Car
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {cars.length === 0 ? (
          <p className="text-center">No cars available</p>
        ) : (
          cars.map(car => (
            <div key={car._id} className="bg-white p-4 rounded-md shadow-md">
              <div className="flex flex-col items-center">
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
                <div className="flex justify-between w-full">
                  <button
                    onClick={() => {
                      setSelectedCarId(car._id);
                      setIsUpdateModalOpen(true);
                    }}
                    className="bg-yellow-500 text-white py-1 px-3 rounded-md hover:bg-yellow-600"
                  >
                    Update
                  </button>
                  <button
                    onClick={() => handleDelete(car._id)}
                    className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))
        )}
      </div>

      {/* Pagination controls */}
      <div className="flex justify-between items-center mt-4">
        <button
          onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
          className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
          disabled={currentPage === 1}
        >
          Previous
        </button>
        <span className="text-lg">{`Page ${currentPage} of ${totalPages}`}</span>
        <button
          onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
          className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600"
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      {isCreateModalOpen && <CreateCarModal onCarAdded={handleCarAdded} onClose={() => setIsCreateModalOpen(false)} />}
      {isUpdateModalOpen && selectedCarId && (
        <UpdateCarModal
          carId={selectedCarId}
          onCarUpdated={handleCarUpdated}
          onClose={() => setIsUpdateModalOpen(false)}
        />
      )}
    </div>
  );
};

export default Dashboard;
