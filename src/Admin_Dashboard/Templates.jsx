import React, { useState, useEffect } from 'react';
import { FaArrowLeft, FaSave } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Templates = () => {
  const [images, setImages] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const { data } = await axios.get('https://books-hlyv.onrender.com/images');
      setImages(data.map(img => img.url));
    } catch (error) {
      console.error("Error fetching images:", error);
    }
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedImage(file);
    } else {
      alert('Please select a valid image file.');
    }
  };

  const handleSaveImage = async () => {
    if (!selectedImage) {
      alert('No image selected to save.');
      return;
    }

    const formData = new FormData();
    formData.append('image', selectedImage);

    try {
      await axios.post('https://books-hlyv.onrender.com/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setSelectedImage(null);
      fetchImages();
    } catch (error) {
      alert('Error uploading image');
      console.error(error);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* 🔹 Back Button */}
      <button onClick={() => navigate(-1)} className="mb-4 flex items-center px-4 py-2 bg-gray-100 text-gray-800 rounded-md">
        <FaArrowLeft className="mr-2" /> Back
      </button>

      {/* 🔹 Upload Section */}
      <div className="p-4 max-w-md mx-auto bg-white shadow-lg rounded-lg">
        <h2 className="text-xl font-semibold mb-4">Upload an Image</h2>
        <input 
          type="file" 
          accept="image/*" 
          onChange={handleImageChange} 
          className="mb-4 file:py-2 file:px-4 file:rounded-lg file:bg-blue-50 file:text-blue-700" 
        />

        {selectedImage && (
          <button 
            onClick={handleSaveImage} 
            className="mb-4 flex items-center px-4 py-2 bg-green-500 text-white rounded-md"
          >
            <FaSave className="mr-2" /> Save Image
          </button>
        )}
      </div>

      {/* 🔹 Uploaded Images Gallery */}
      <h3 className="text-lg font-medium mt-6">Uploaded Images</h3>
      <div className="grid grid-cols-3 gap-2 mt-2">
        {images.map((img, index) => (
          <div key={index} className="relative">
            <img src={img} alt={`Uploaded ${index}`} className="w-full h-auto rounded-md" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Templates;
