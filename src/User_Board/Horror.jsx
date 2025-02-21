import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom"; // For redirection
import Login from "../component/Login";
import Register from "../component/Register";

export default function History() {
  const [books, setBooks] = useState([]);
  const [isLoginOpen, setIsLoginOpen] = useState(false);
  const [isRegisterOpen, setIsRegisterOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("token"));
  const [message, setMessage] = useState("");
  const category = "Horror";
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`http://localhost:7000/books/${category}`)
      .then((res) => {
        setBooks(Array.isArray(res.data) ? res.data : []);
      })
      .catch((err) => {
        console.error("Error fetching books:", err);
        setBooks([]);
      });
  }, []);

  // Ensure UI updates when login state changes
  useEffect(() => {
    const handleStorageChange = () => {
      setIsLoggedIn(!!localStorage.getItem("token"));
    };

    window.addEventListener("storage", handleStorageChange);
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, []);

  const handleReadNowClick = (pdf) => {
    const token = localStorage.getItem("token");

    if (token) {
      window.open(`http://localhost:7000/books/pdf/${pdf}`, "_blank");
    } else {
      setIsLoginOpen(true);
    }
  };

  const handleLoginSuccess = () => {
    localStorage.setItem("token", "your-login-token"); // Ensure token is stored
    setIsLoggedIn(true);
    setMessage("Successfully logged in!");
    setTimeout(() => setMessage(""), 3000);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setMessage("Successfully logged out!");
    setTimeout(() => setMessage(""), 3000);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {message && <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">{message}</div>}
      {/* <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">📚 {category} Books</h2>
        {isLoggedIn ? (
          <button 
            onClick={handleLogout} 
            className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
            Logout
          </button>
        ) : (
          <button 
            onClick={() => setIsLoginOpen(true)} 
            className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
            Login
          </button>
        )}
      </div> */}

      <div className="flex space-x-6 overflow-x-auto scrollbar-hide no-scrollbar p-4 ">
        {books.length > 0 ? books.map((book) => (
          <div 
            key={book._id} 
            className="w-64 bg-white shadow-lg rounded-lg p-4 flex-shrink-0 border border-gray-200 hover:shadow-xl transition transform hover:scale-105 hover:rotate-2"
          >
            {book.image ? (
              <img 
                src={`http://localhost:7000/uploads/${book.image}`}  
                alt={book.bookName} 
                className="w-full h-40 object-contain rounded-md mb-3"
              />
            ) : (
              <p className="text-gray-500">No Image</p>
            )}
            <h2 className="text-lg font-semibold text-[#271138]">{book.bookName}</h2>
            <p className="text-[#f79c29] text-sm mb-2">by {book.authorName}</p>
            {book.pdf && (
              <button 
                onClick={() => handleReadNowClick(book.pdf)}
                className="w-full block text-center bg-[#f79c29] text-white py-2 rounded-md hover:bg-[#271138] transition"
              >
                Read Now
              </button>
            )}
          </div>
        )) : (
          <p className="text-[#271138] text-center">No books available</p>
        )}
      </div>

      {isLoginOpen && <Login isOpen={isLoginOpen} onClose={() => setIsLoginOpen(false)} onLoginSuccess={handleLoginSuccess} onOpenRegister={() => { setIsLoginOpen(false); setIsRegisterOpen(true); }} />}
      {isRegisterOpen && <Register isOpen={isRegisterOpen} onClose={() => setIsRegisterOpen(false)} onOpenLogin={() => { setIsRegisterOpen(false); setIsLoginOpen(true); }} />}
    </div>
  );
}
