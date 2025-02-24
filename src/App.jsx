import React, { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Navbar from "./component/Navbar";
import Home from "./component/Home";
import Login from "./component/Login";
import Register from "./component/Register";
import Footer from "./component/Footer";
import Admin from "./Admin_Dashboard/Admin";
import User from "./component/Home";
import Templates from "./Admin_Dashboard/Templates";
import CreateBooks from "./Admin_Dashboard/CreateBooks";
import Pagenotfound from "./component/Pagenotfound";
import MyPdfViewer from "./User_Board/PdfFile_Viewer";

const App = () => {
  const [userRole, setUserRole] = useState(localStorage.getItem("role"));

  useEffect(() => {
    setUserRole(localStorage.getItem("role"));
  }, []);

  const handleLoginSuccess = (role) => {
    setUserRole(role);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    setUserRole(null);
  };

  return (
    <BrowserRouter>
      <Navbar onLogout={handleLogout} />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
        <Route path="/register" element={<Register />} />
        
        {/* Protected Routes for Admin and User */}
        <Route path="/*" element={<Pagenotfound />} />
        <Route path="/admin" element={userRole === "admin" ? <Admin onLogout={handleLogout} /> : <Navigate to="/admin" />} />
        <Route path="/" element={userRole === "user" ? <User onLogout={handleLogout} /> : <Navigate to="/" />} />
        <Route path="/templates" element={<Templates />} />
        <Route path="/MyPdfViewer" element={<MyPdfViewer />} />
        <Route path="/createBooks" element={<CreateBooks />} /> 
      </Routes>

      <Footer />
    </BrowserRouter>
  );
};

export default App;
