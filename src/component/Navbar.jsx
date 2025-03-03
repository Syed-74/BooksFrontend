import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Login from "./Login";
import Register from "./Register";
import { FaSignOutAlt, FaBars } from "react-icons/fa";

const Navbar = () => {
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const navigate = useNavigate();

  // Check login status on page load
  useEffect(() => {
    const token = localStorage.getItem("token");  
    setIsLoggedIn(!!token);
  }, []);

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    setIsLoginOpen(false); // Close login modal after successful login
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setIsLoggedIn(false);
    navigate("/"); // Redirect to home after logout
  };

  return (
    <>
      <nav className="flex items-center justify-between bg-[#CCD7E6] h-20 shadow-md px-4 md:px-16">
        {/* 🔹 Mobile Menu Button */}
        <button
          className="md:hidden text-gray-700 text-2xl"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          <FaBars />
        </button>

        {/* 🔹 Logo */}
        <img
          src="/Reading-book-logo-by-nuranitalutfiana92-removebg-preview.png"
          alt="Logo"
          className="w-28 h-16 md:w-36 md:h-20 bg-[#CCD7E6]"
        />

        {/* 🔹 Centered Text (Hidden on Small Screens) */}
        <h1 className="hidden md:block text-xl md:text-2xl font-semibold text-black">
          Welcome to Our Website
        </h1>

        {/* 🔹 Login/Logout Button */}
        <div className="hidden md:block">
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 bg-red-500 hover:bg-red-800 px-5 py-2 rounded-md text-white transition"
            >
              <FaSignOutAlt />
              {/* <span>Logout</span> */}
            </button>
          ) : (
            <button
              onClick={() => {
                setIsLoginOpen(true);
                setIsRegisterOpen(false);
              }}
              className="flex items-center space-x-2 bg-[green-500] hover:bg-[#3F5678] px-5 py-2 rounded-md  transition"
            >
              <FaSignOutAlt />
              <span className="font-bold">Login</span>
            </button>
          )}
        </div>
      </nav>

      {/* 🔹 Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-md flex flex-col items-center py-4 space-y-4">
          <h1 className="text-lg font-semibold text-gray-700">Welcome to Our Website</h1>
          {isLoggedIn ? (
            <button
              onClick={handleLogout}
              className="flex items-center space-x-2 bg-red-500 hover:bg-red-600 px-5 py-2 rounded-md text-white transition"
            >
              <FaSignOutAlt />
              {/* <span>Logout</span> */}
            </button>
          ) : (
            <button
              onClick={() => {
                setIsLoginOpen(true);
                setIsRegisterOpen(false);
              }}
              className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 px-5 py-2 rounded-md text-white transition"
            >
              <FaSignOutAlt />
              <span>Login</span>
            </button>
          )}
        </div>
      )}

      {/* 🔹 Login & Register Popups */}
      <Login
        isOpen={isLoginOpen}
        onClose={() => setIsLoginOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        onOpenRegister={() => {
          setIsRegisterOpen(true);
          setIsLoginOpen(false);
        }}
      />

      <Register
        isOpen={isRegisterOpen}
        onClose={() => setIsRegisterOpen(false)}
        onOpenLogin={() => {
          setIsLoginOpen(true);
          setIsRegisterOpen(false);
        }}
      />
    </>
  );
};

export default Navbar;