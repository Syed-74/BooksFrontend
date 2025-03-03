import axios from "axios";
import React, { useState } from "react";

const Register = ({ isOpen, onClose, onOpenLogin }) => {
  // Define the state to store user input
  const [userRegister, setUserRegister] = useState({
    email: '',
    password: '',
    confirmPassword: ''
  });

  if (!isOpen) return null;

  // Handle user registration logic
  const handleRegister = async () => {
    const { email, password, confirmPassword } = userRegister;
  
    // Simple validation
    if (!email || !password || !confirmPassword) {
      alert("All fields are required");
      return;
    }
  
    if (password !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
  
    try {
      // Call your backend API here to register the user
      await axios.post('https://books-hlyv.onrender.com/api/auth/register', {
        email,
        password,
        confirmPassword 
      });
  
      console.log("User registered successfully:", userRegister);
  
      // Close the sign-up modal and open the login modal
      onClose();
      onOpenLogin();
    } catch (error) {
      console.error("Registration failed:", error);
      alert("Registration failed. Please try again.");
    }
  };
  
  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserRegister({
      ...userRegister,
      [name]: value
    });
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50  z-10">
      <div className="bg-white p-6 rounded-lg shadow-lg h-[400px] w-96 relative flex gap-2 flex-col items-center justify-center">
        {/* Close Button (X) */}
        <button onClick={onClose} className="absolute top-2 right-2  px-3 py-1 rounded-md">
          ❌
        </button>

        <h2 className="text-2xl font-bold mb-4 text-[#271138]">Sign Up</h2>

        {/* Email Input */}
        <input
          type="email"
          name="email"
          placeholder="Enter email"
          value={userRegister.email}
          onChange={handleInputChange}
          className="w-full px-3 py-2 mb-2 border rounded-md"
        />

        {/* Password Input */}
        <input
          type="password"
          name="password"
          placeholder="Enter password"
          value={userRegister.password}
          onChange={handleInputChange}
          className="w-full px-3 py-2 mb-2 border rounded-md"
        />

        {/* Confirm Password Input */}
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm password"
          value={userRegister.confirmPassword}
          onChange={handleInputChange}
          className="w-full px-3 py-2 mb-2 border rounded-md"
        />

        {/* Sign-Up Button */}
        <button onClick={handleRegister} className="bg-[#3F5678] hover:bg-[#CCD7E6] mt-6 text-white font-semibold px-4 py-2 rounded-md w-full">
          Sign Up
        </button>

        {/* Login Link (opens Login popup) */}
        <p className="mt-4 text-center text-[#271138]">
          Already have an account?
          <button onClick={onOpenLogin} className="text-[#3F5678] font-semibold ml-1">
            Log In
          </button>
        </p>
      </div>
    </div>
  );
};

export default Register;
