import React, { useState } from 'react';
import axios from 'axios';

const CreateCarModal = ({ onCarAdded, onClose }) => {
  const [name, setName] = useState('');
  const [model, setModel] = useState('');
  const [year, setYear] = useState('');
  const [price, setPrice] = useState('');
  const [color, setColor] = useState('');
  const [image, setImage] = useState(null);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    const formData = new FormData();
    formData.append('name', name);
    formData.append('model', model);
    formData.append('year', year);
    formData.append('price', price);
    formData.append('color', color);
    if (image) formData.append('image', image);

    try {
      await axios.post('https://car-management-system-6nrm.onrender.com/api/cars', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      onCarAdded(); // Notify parent component to re-fetch cars
    } catch (err) {
      console.error('Error adding car:', err);
    }
  };

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 flex items-center justify-center">
      <div className="bg-white p-6 rounded-md w-1/2">
        <h2 className="text-2xl font-semibold mb-4">Add New Car</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="block w-full mb-2 p-2 border border-gray-300 rounded-md"
            required
          />
          <input
            type="text"
            placeholder="Model"
            value={model}
            onChange={(e) => setModel(e.target.value)}
            className="block w-full mb-2 p-2 border border-gray-300 rounded-md"
            required
          />
          <input
            type="number"
            placeholder="Year"
            value={year}
            onChange={(e) => setYear(e.target.value)}
            className="block w-full mb-2 p-2 border border-gray-300 rounded-md"
            required
          />
          <input
            type="number"
            placeholder="Price"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            className="block w-full mb-2 p-2 border border-gray-300 rounded-md"
            required
          />
          <input
            type="text"
            placeholder="Color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            className="block w-full mb-2 p-2 border border-gray-300 rounded-md"
            required
          />
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
            className="block w-full mb-2"
          />
          <button
            type="submit"
            className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600"
          >
            Add Car
          </button>
          <button
            type="button"
            onClick={onClose}
            className="bg-gray-500 text-white py-2 px-4 rounded-md hover:bg-gray-600 mt-2"
          >
            Close
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateCarModal;
