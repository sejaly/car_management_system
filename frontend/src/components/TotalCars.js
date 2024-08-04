import React, { useEffect, useState } from 'react';
import axios from 'axios';

const TotalCars = () => {
  const [total, setTotal] = useState(0);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchTotalCars = async () => {
      try {
        const response = await axios.get('https://car-management-system-6nrm.onrender.com/api/cars/count');
        setTotal(response.data.total);
      } catch (err) {
        setError('Failed to fetch total cars');
      }
    };

    fetchTotalCars();
  }, []);

  return (
    <div>
      <h2 className="text-2xl font-semibold mb-4">Total Cars</h2>
      {error && <p className="text-red-500 mb-4">{error}</p>}
      <p className="text-xl">Total number of cars: {total}</p>
    </div>
  );
};

export default TotalCars;
