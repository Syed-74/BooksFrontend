import React from "react";
import { Link } from "react-router-dom";
// import { FaFacebook, FaTwitter, FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-8">
      <div className="container mx-auto px-6 md:px-12">
        {/* 🔹 Logo & Description */}
        <div className="text-center mb-6">
          <h2 className="text-3xl font-bold">Read Books</h2>
          <p className="text-gray-400 mt-2">Expand your knowledge, one book at a time.</p>
        </div>

        {/* 🔹 Navigation Links */}
        <div className="flex justify-center space-x-6 mb-6 text-gray-300">
          <Link to="/" className="hover:text-white">Home</Link>
          <Link to="/books" className="hover:text-white">Books</Link>
          <Link to="/about" className="hover:text-white">About</Link>
          <Link to="/contact" className="hover:text-white">Contact</Link>
        </div>

        {/* 🔹 Newsletter Subscription */}
        <div className="flex flex-col items-center mb-6">
          <p className="text-gray-300 mb-2">Subscribe to our newsletter</p>
          <div className="flex">
            <input
              type="email"
              placeholder="Enter your email"
              className="px-4 py-2 rounded-l-md focus:outline-none"
            />
            <button className="bg-blue-500 px-4 py-2 rounded-r-md text-white hover:bg-blue-600">
              Subscribe
            </button>
          </div>
        </div>

        {/* 🔹 Social Media Icons */}
        <div className="flex justify-center space-x-6 mb-6 text-gray-300">
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-500 text-2xl">
            {/* <FaFacebook /> */}
          </a>
          <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-blue-400 text-2xl">
            {/* <FaTwitter /> */}
          </a>
          <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="hover:text-pink-400 text-2xl">
            {/* <FaInstagram /> */}
          </a>
        </div>

        {/* 🔹 Copyright */}
        <p className="text-center text-gray-500 text-sm">© {new Date().getFullYear()} Read Books. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
