import React from "react";
import { Link } from "react-router-dom";

const Pagenotfound = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-100 text-center px-4">
      <h1 className="text-7xl font-bold text-[#271138]">404</h1>
      <h2 className="text-2xl font-semibold text-[#271138] mt-4">Oops! Page Not Found</h2>
      <p className="text-[#271138] mt-2">The page you're looking for doesn't exist.</p>
      <Link to="/" className="mt-6 px-6 py-3 bg-[#271138] text-white rounded-lg shadow-md hover:bg-[#f79c29] transition">
        Go Back Home
      </Link>
    </div>
  );
};

export default Pagenotfound;
