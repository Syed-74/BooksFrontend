import React, { createContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from "axios";
export const AuthContext = createContext(null)
const AuthProvider = ({ children, isOpen, onClose, onOpenRegister, onLoginSuccess }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isRegisterOpen, setIsRegisterOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    console.log(isLoginOpen, 'isLogin')


    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token);
    }, []);

    const handleLoginSuccess = () => {
        setIsLoggedIn(true);
        setIsLoginOpen(false); // Close login modal after successful login
    };

    // const onClose = () => {
    //     setIsLoginOpen(false)
    // }

    // const isOpen = () => {
    //     setIsLoggedIn(true)
    // }

    const Login = async (email, password) => {
        console.log(email, password)

        if (!email || !password) {
            alert("Please enter email and password");
            return;
        }

        try {
            setLoading(true);
            const  response  = await axios.post("https://books-hlyv.onrender.com/api/auth/login", { email, password });

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
    }
    // Logout funtion
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        setIsLoggedIn(false);
        navigate("/"); // Redirect to home after logout
    };


    const value = {
        Login, loading, handleLogout,
        isLoggedIn, 
        isLoginOpen, 
    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider