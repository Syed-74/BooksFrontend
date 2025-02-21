import React, { useState } from "react";
import { Link, Outlet } from "react-router-dom";
import { FaUsers, FaChartPie, FaClipboardList, FaPlus, FaBars, FaBook } from "react-icons/fa";

const Admin= () => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <aside
        className={`fixed md:static inset-y-0 left-0 z-20 w-64 bg-blue-600 text-white p-6 transform ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
          } md:translate-x-0 transition-transform duration-300 ease-in-out`}
      >
        <h1 className="text-2xl font-bold mb-6 text-center">Admin Dashboard</h1>

        <ul className="space-y-4">
          <li className="flex items-center space-x-2 cursor-pointer hover:text-gray-300">
            <FaPlus />
            <Link to="/templates">ADD Templates</Link>
          </li>
          <li className="flex items-center space-x-2 cursor-pointer hover:text-gray-300">
            <FaPlus />
            <Link to="/createBooks">Create Books</Link>
          </li>
        </ul>
      </aside>

      {/* Overlay for mobile sidebar */}
      {isSidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-10 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Main Content */}
      <main className="flex-1 p-6">
        {/* Navbar for Mobile */}
        <div className="md:hidden flex justify-between items-center mb-4">
          <button
            onClick={() => setSidebarOpen(!isSidebarOpen)}
            className="text-blue-600 text-2xl"
          >
            <FaBars />
          </button>
          <h2 className="text-2xl font-bold text-gray-700">Dashboard</h2>
        </div>

        {/* Dashboard Overview */}
        <h2 className="text-3xl font-bold text-gray-700 hidden md:block">
          Dashboard Overview
        </h2>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-6">
          <div className="bg-white p-6 rounded-lg shadow-lg flex items-center">
            <FaUsers className="text-blue-500 text-3xl mr-4" />
            <div>
              <p className="text-gray-600">Total Users</p>
              <h3 className="text-xl font-bold">1,245</h3>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg flex items-center">
            <FaClipboardList className="text-green-500 text-3xl mr-4" />
            <div>
              <p className="text-gray-600">Pending Reports</p>
              <h3 className="text-xl font-bold">38</h3>
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-lg flex items-center">
            <FaChartPie className="text-purple-500 text-3xl mr-4" />
            <div>
              <p className="text-gray-600">Revenue</p>
              <h3 className="text-xl font-bold">$12,340</h3>
            </div>
          </div>
        </div>

        {/* Dynamic Content */}
        <Outlet /> {/* This is where the dynamic content (category) will be rendered */}
      </main>
    </div>
  );
};

export default Admin;
