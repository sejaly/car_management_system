import React from 'react';
import './Home.css'; // Ensure this file contains the updated CSS

const Home = () => {
  return (
    <div className="relative h-screen overflow-hidden">
      {/* Background Image Slider */}
      <div className="absolute inset-0 slider-container">
        <div className="slider">
          <div className="slide" style={{ backgroundImage: 'url(/assets/1.jpg)' }}></div>
          <div className="slide" style={{ backgroundImage: 'url(/assets/2.jpeg)' }}></div>
          <div className="slide" style={{ backgroundImage: 'url(/assets/w.jpeg)' }}></div>
        </div>
      </div>

      {/* Quote Overlay */}
      <div className="absolute inset-0 flex items-center justify-center text-center text-white">
        <div className="p-6 bg-black bg-opacity-50 rounded">
          <h1 className="text-4xl font-bold mb-4">"Cars turn every drive into a mini adventure." </h1>
          <p className="text-xl">- Peter Drucker</p>
        </div>
      </div>
      
    </div>

    
  );
}

export default Home;
