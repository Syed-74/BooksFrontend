import React, { useEffect, useState } from "react";
import axios from 'axios';
import BooksDashboard from "../User_Board/BooksDashboard";
import './Home.css'
const Home = () => {

  const [searchQuery, setSearchQuery] = useState(""); // Search input state
  const [images, setImages] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [imgLoading, setImgLoading] = useState(false)
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
    setImgLoading(true)
    try {
      const { data } = await axios.get('https://books-hlyv.onrender.com/images');
      setImgLoading(false)
      setImages(data.map(img => img.url));
    } catch (error) {
      setImgLoading(false)
      console.error("Error fetching images:", error);
    }
  };

  if (imgLoading) {
    return (
      <div className="w-[100%] h-screen ">
        <div class="loader"></div>
      </div>

    )

  }

  return (
    <div className="p-6 bg-white min-h-screen">
      {/* 🔹 Auto-Sliding Templates */}
      <div className="overflow-hidden relative w-full h-40 xs:h-48 sm:h-56 md:h-64 lg:h-72 xl:h-80 bg-white shadow-lg rounded-lg flex items-center justify-center mt-2 sm:mt-4">
        {images.length > 0 ? (
          <img
            src={images[currentIndex]}
            alt="Slideshow"
            className="w-full h-full object-cover rounded-lg"
          />
        ) : (
          <p className="text-gray-500 text-center text-xs sm:text-sm md:text-base">
            No images available
          </p>
        )}
      </div>




      {/* 🔹 Books Sections with Search Filter */}
      <BooksDashboard />
    </div>
  );
};

export default Home;
