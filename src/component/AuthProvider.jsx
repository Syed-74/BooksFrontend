import React, { createContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import axios from "axios";
export const AuthContext = createContext(null)
const AuthProvider = ({ children }) => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [isLoginOpen, setIsLoginOpen] = useState(false);
    const [isRegisterOpen, setIsRegisterOpen] = useState(false);
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [allBooks, setAllBooks] = useState([]);
    const [searchQuery, setSearchQuery] = useState('') // Search input state

    useEffect(() => {
        const token = localStorage.getItem("token");
        setIsLoggedIn(!!token);
    }, [loading]);

    const handleSuccessLogin = () => {
        setIsLoggedIn(true);
    }
    const handleLoginfailure = () => {
        setIsLoggedIn(false);
    }

    const handleSearchQuery = (searchQuery) => {
        setSearchQuery(searchQuery)
    }

    const Login = async (email, password, onClose, onLoginSuccess) => {
        console.log(email, password)
        console.log(onClose, 'onClose')
        if (!email || !password) {
            alert("Please enter email and password");
            return;
        }

        try {
            setLoading(true);
            const response = await axios.post("https://books-hlyv.onrender.com/api/auth/login", { email, password });

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


            navigate(role === "admin" ? "/admin" : "/");

        } catch (error) {
            console.error("❌ Login failed:", error.response?.data || error.message);
            alert("❌ Invalid credentials. Please try again.");
        } finally {
            setLoading(false);
        }
    }

    // register
    const Register = async (email, password, confirmPassword, onClose, onOpenLogin, isOpen) => {

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

    // Logout funtion
    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        setIsLoggedIn(false);
        navigate("/"); // Redirect to home after logout
    };

    // TODO Retrieve all Books
    useEffect(() => {
        axios
            .get(`https://books-hlyv.onrender.com/v2/allbooks`)
            .then((res) => {
                setAllBooks(Array.isArray(res.data) ? res.data : []);
            })
            .catch((err) => {
                console.error("Error fetching books:", err);
                setAllBooks([]);
            });
    }, []);


    const value = {
        Login, loading, handleLogout,
        isLoggedIn,
        isLoginOpen, Register, handleSuccessLogin,
        handleLoginfailure, allBooks,handleSearchQuery,searchQuery
    }
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthProvider