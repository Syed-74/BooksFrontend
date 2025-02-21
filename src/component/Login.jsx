// import React from "react";

// const Login = ({ isOpen, onClose, onOpenRegister }) => {
//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-10">
//       <div className="bg-white p-6 rounded-lg shadow-lg w-180 relative">
//         {/* Close Button (X) */}
//         <button onClick={onClose} className="absolute top-2 right-2 font-bold px-4 py-2 rounded-md">
//           X
//         </button>

//         <h2 className="text-2xl font-bold mb-4">Login</h2>

//         {/* 🔹 Email Input */}
//         <input type="email" placeholder="Enter email" className="w-full px-3 py-2 mb-2 border rounded-md" />

//         {/* 🔹 Password Input */}
//         <input type="password" placeholder="Enter password" className="w-full px-3 py-2 mb-2 border rounded-md" />

//         {/* 🔹 Buttons */}
//         <div className="flex justify-between mt-4">
//           <button className="bg-blue-500 text-white px-4 py-2 rounded-md w-full">Login</button>
//         </div>

//         {/* 🔹 Sign-Up Link (Now opens Register popup) */}
//         <p className="mt-4 text-center">
//           Don't have an account?  
//           <button onClick={onOpenRegister} className="text-blue-500 text-x ml-2">
//             Sign Up
//           </button>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;


import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = ({ isOpen, onClose, onOpenRegister, onLoginSuccess }) => {
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // Prevent rendering if modal is closed
  if (!isOpen) return null;

  // Handle login
  const handleLogin = async () => {
    const { email, password } = loginData;

    if (!email || !password) {
      alert("Please enter email and password");
      return;
    }

    try {
      setLoading(true);
      const response = await axios.post("http://localhost:7000/api/auth/login", { email, password });

      const { token, role } = response.data;
      console.log("User Role:", role);

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);

      alert("✅ Login successful!");

      // Call parent function to handle login state
      if (onLoginSuccess) {
        onLoginSuccess(role);
      }

      onClose(); // Close modal

      // Navigate based on role
      navigate(role === "admin" ? "/admin" : "/");

    } catch (error) {
      console.error("❌ Login failed:", error.response?.data || error.message);
      alert("❌ Invalid credentials. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96 relative h-[400px]">

        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-gray-600 hover:text-red-500 transition duration-300"
        >
          ❌
        </button>

        <h2 className="text-2xl font-bold mb-6 text-center text-[#271138]">Login</h2>

        {/* Email Input */}
        <div className="mb-4">
          <label className="block font-semibold text-[#271138] text-sm mb-1">Email</label>
          <input
            type="email"
            placeholder="Enter email"
            value={loginData.email}
            onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#f79c29] transition"
          />
        </div>

        {/* Password Input */}
        <div className="mb-4 relative">
          <label className="block font-semibold text-[#271138] text-sm mb-1">Password</label>
          <input
            type="password"
            placeholder="Enter password"
            value={loginData.password}
            onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#f79c29] transition"
          />
          <h1 className="absolute right-0 text-blue-600">Forgotten Password?</h1>
        </div>

        {/* Login Button */}
        <button
          onClick={handleLogin}
          className={`w-full text-white font-semibold py-2 mt-7 rounded-md transition ${loading ? "bg-[#271138]" : "bg-[#f79c29] hover:bg-[#271138]"}`}
          disabled={loading}
        >
          {loading ? "Logging in..." : "Login"}
        </button>

        {/* Sign Up Link */}
        <p className="mt-4 text-center text-[#271138] font-semibold">
          Don't have an account?{" "}
          <button onClick={onOpenRegister} className="text-[#f79c29] hover:underline font-semibold">
            Sign Up
          </button>
        </p>
      </div>
    </div>
  );
};

export default Login;
