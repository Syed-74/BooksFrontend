import React, { useEffect, useState } from "react";
import Horror from "../User_Board/Horror";
import Motivational from "../User_Board/Motivational";
import History from "../User_Board/History";
import Biography from "../User_Board/Biography";
import Technology from "../User_Board/Technology";
import Communication from "../User_Board/Communication";
import axios from 'axios';
const Home = () => {

  const [searchQuery, setSearchQuery] = useState(""); // Search input state
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    fetchImages();
  }, []);

  useEffect(() => {
    if (images.length > 0) {
      const interval = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
      }, 5000); // Auto-slide every 5 seconds
      return () => clearInterval(interval);
    }
  }, [images.length]);

  const fetchImages = async () => {
    try {
      const { data } = await axios.get('http://localhost:7000/images');
      setImages(data.map(img => img.url));
    } catch (error) {
      console.error("Error fetching images:", error);
    } 
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* 🔹 Auto-Sliding Templates */}
      <div className="overflow-hidden relative w-full h-80 bg-white shadow-lg rounded-lg flex items-center justify-center mt-4">
        {images.length > 0 ? (
          <img src={images[currentIndex]} alt="Slideshow" className="w-full h-full object-contain rounded-lg" />
        ) : (
          <p className="text-gray-500">No images available</p>
        )}
      </div>

      {/* 🔹 Search Bar (Centered) */}
      {/* <div className="flex justify-center my-6">
        <input
          type="text"
          placeholder="Search books..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-1/2 px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div> */}

      {/* 🔹 Books Sections with Search Filter */}
      <History />
      {/* <Horror /> */}
      {/* <Motivational /> */}
      {/* <Biography />
      <Technology />
      <Communication /> */}
    </div>
  );
};

export default Home;
