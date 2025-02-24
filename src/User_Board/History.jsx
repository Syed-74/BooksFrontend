import { useState, useEffect, useMemo } from "react";
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
  const category = "History";
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState(""); // Search input state
  const [allBooks, setAllBooks] = useState([]);

  useEffect(() => {
    axios
      .get(`http://localhost:7000/books/${category}`)
      .then((res) => {
        setBooks(Array.isArray(res.data) ? res.data : []);
      })
      .catch((err) => {
        console.error("Error fetching books:", err);
        setBooks([]);
      });
  }, []);

  // TODO Retrieve all Books
  useEffect(() => {
    axios
      .get(`http://localhost:7000/v2/allbooks`)
      .then((res) => {
        setAllBooks(Array.isArray(res.data) ? res.data : []);
      })
      .catch((err) => {
        console.error("Error fetching books:", err);
        setAllBooks([]);
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

  // Generic filter function that returns items for a given category using the search query
  const filterBooksByCategory = (cat) =>
    allBooks.filter(
      (item) =>
        item.category === cat &&
        (searchQuery.trim() === "" ||
          item.bookName.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.authorName.toLowerCase().includes(searchQuery.toLowerCase()))
    );

  // Compute filtered lists for each category using useMemo
  const historyBooks = useMemo(() => filterBooksByCategory("History"), [
    allBooks,
    searchQuery,
  ]);
  const motivationalBooks = useMemo(
    () => filterBooksByCategory("Motivational"),
    [allBooks, searchQuery]
  );
  const horrorBooks = useMemo(() => filterBooksByCategory("Horror"), [
    allBooks,
    searchQuery,
  ]);
  const communicationBooks = useMemo(
    () => filterBooksByCategory("Communication"),
    [allBooks, searchQuery]
  );
  const biographyBooks = useMemo(() => filterBooksByCategory("Biography"), [
    allBooks,
    searchQuery,
  ]);
  const technologyBooks = useMemo(() => filterBooksByCategory("Technology"), [
    allBooks,
    searchQuery,
  ]);
  const otherBooks = useMemo(() => filterBooksByCategory("others"), [
    allBooks,
    searchQuery,
  ]);

  return (
    <div className="p-0 md:p-6 bg-gray-100 flex flex-col gap-5">
      <div className="flex justify-center my-6">
        <input
          type="text"
          placeholder="Search books..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full lg:w-1/2 px-4 py-3 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
      {message && (
        <div className="mb-4 p-3 bg-green-100 text-green-700 rounded">
          {message}
        </div>
      )}
      {historyBooks.length > 0 && <><h2 className="text-2xl font-bold">📚 {category} Books</h2>

        <div className="flex space-x-6 overflow-x-auto scrollbar-hide no-scrollbar p-4 h-[360px] w-[100%]">
          {historyBooks.length > 0 ? (
            historyBooks.map((book) => (
              <div
                key={book._id}
                className="w-64 bg-white shadow-lg rounded-lg p-4 flex-shrink-0 border border-gray-200 hover:shadow-xl transition duration-500 transform hover:scale-105 hover:rotate"
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
                <h2 className="text-lg font-semibold text-[#271138] line-clamp-2">
                  {book.bookName}
                </h2>
                <h1 className="text-[#f79c29] text-sm mb-2 line-clamp-2">
                  {book.authorName}
                </h1>
                {book.pdf && (
                  <button
                    onClick={() => handleReadNowClick(book.pdf)}
                    className="w-full absolute bottom-3 left-3 w-[224.5px] block text-center bg-[#f79c29] text-white py-2 rounded-md hover:bg-[#271138] transition"
                  >
                    Read Now
                  </button>
                )}
              </div>
            ))
          ) : (
            <p className="text-[#271138] text-center">No books available</p>
          )}
        </div>
      </>}
      {motivationalBooks.length > 0 && <>
        <h2 className="text-2xl font-bold">📚 Motivational Books</h2>
        <div className="flex space-x-6 overflow-x-auto scrollbar-hide no-scrollbar p-4 h-[360px] w-[100%]">
          {motivationalBooks.length > 0 ? (
            motivationalBooks.map((book) => (
              <div
                key={book._id}
                className="w-64 bg-white shadow-lg rounded-lg p-4 flex-shrink-0 border border-gray-200 hover:shadow-xl transition duration-500 transform hover:scale-105 hover:rotate"
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
                <h2 className="text-lg font-semibold text-[#271138] line-clamp-2">
                  {book.bookName}
                </h2>
                <h1 className="text-[#f79c29] text-sm mb-2 line-clamp-2">
                  {book.authorName}
                </h1>
                {book.pdf && (
                  <button
                    onClick={() => handleReadNowClick(book.pdf)}
                    className="w-full absolute bottom-3 left-3 w-[224.5px] block text-center bg-[#f79c29] text-white py-2 rounded-md hover:bg-[#271138] transition"
                  >
                    Read Now
                  </button>
                )}
              </div>
            ))
          ) : (
            <p className="text-[#271138] text-center">No books available</p>
          )}
        </div>
      </>}

      {horrorBooks.length > 0 && <><h2 className="text-2xl font-bold">📚 Horror Books</h2>
        <div className="flex space-x-6 overflow-x-auto scrollbar-hide no-scrollbar p-4 h-[360px] w-[100%]">
          {horrorBooks.length > 0 ? (
            horrorBooks.map((book) => (
              <div
                key={book._id}
                className="w-64 bg-white shadow-lg rounded-lg p-4 flex-shrink-0 border border-gray-200 hover:shadow-xl transition duration-500 transform hover:scale-105 hover:rotate"
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
                <h2 className="text-lg font-semibold text-[#271138] line-clamp-2">
                  {book.bookName}
                </h2>
                <h1 className="text-[#f79c29] text-sm mb-2 line-clamp-2">
                  {book.authorName}
                </h1>
                {book.pdf && (
                  <button
                    onClick={() => handleReadNowClick(book.pdf)}
                    className="w-full absolute bottom-3 left-3 w-[224.5px] block text-center bg-[#f79c29] text-white py-2 rounded-md hover:bg-[#271138] transition"
                  >
                    Read Now
                  </button>
                )}
              </div>
            ))
          ) : (
            <p className="text-[#271138] text-center">No books available</p>
          )}
        </div></>}

      {communicationBooks.length > 0 && (
        <>
          <h2 className="text-2xl font-bold">📚 Communication Books</h2>
          <div className="flex space-x-6 overflow-x-auto scrollbar-hide no-scrollbar p-4 h-[360px] w-[100%]">
            {communicationBooks.length > 0 ? (
              communicationBooks.map((book) => (
                <div
                  key={book._id}
                  className="w-64 bg-white shadow-lg rounded-lg p-4 flex-shrink-0 border border-gray-200 hover:shadow-xl transition duration-500 transform hover:scale-105 hover:rotate"
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
                  <h2 className="text-lg font-semibold text-[#271138] line-clamp-2">
                    {book.bookName}
                  </h2>
                  <h1 className="text-[#f79c29] text-sm mb-2 line-clamp-2">
                    {book.authorName}
                  </h1>
                  {book.pdf && (
                    <button
                      onClick={() => handleReadNowClick(book.pdf)}
                      className="w-full absolute bottom-3 left-3 w-[224.5px] block text-center bg-[#f79c29] text-white py-2 rounded-md hover:bg-[#271138] transition"
                    >
                      Read Now
                    </button>
                  )}
                </div>
              ))
            ) : (
              <p className="text-[#271138] text-center">No books available</p>
            )}
          </div>
        </>
      )}
      {biographyBooks.length > 0 && (
        <>
          <h2 className="text-2xl font-bold">📚 Biography Books</h2>
          <div className="flex space-x-6 overflow-x-auto scrollbar-hide no-scrollbar p-4 h-[360px] w-[100%]">
            {biographyBooks.length > 0 ? (
              biographyBooks.map((book) => (
                <div
                  key={book._id}
                  className="w-64 bg-white shadow-lg rounded-lg p-4 flex-shrink-0 border border-gray-200 hover:shadow-xl transition duration-500 transform hover:scale-105 hover:rotate"
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
                  <h2 className="text-lg font-semibold text-[#271138] line-clamp-2">
                    {book.bookName}
                  </h2>
                  <h1 className="text-[#f79c29] text-sm mb-2 line-clamp-2">
                    {book.authorName}
                  </h1>
                  {book.pdf && (
                    <button
                      onClick={() => handleReadNowClick(book.pdf)}
                      className="w-full absolute bottom-3 left-3 w-[224.5px] block text-center bg-[#f79c29] text-white py-2 rounded-md hover:bg-[#271138] transition"
                    >
                      Read Now
                    </button>
                  )}
                </div>
              ))
            ) : (
              <p className="text-[#271138] text-center">No books available</p>
            )}
          </div>
        </>
      )}
      {technologyBooks.length > 0 && (
        <>
          <h2 className="text-2xl font-bold">📚 Technology Books</h2>
          <div className="flex space-x-6 overflow-x-auto scrollbar-hide no-scrollbar p-4 h-[360px] w-[100%]">
            {technologyBooks.length > 0 ? (
              technologyBooks.map((book) => (
                <div
                  key={book._id}
                  className="w-64 bg-white shadow-lg rounded-lg p-4 flex-shrink-0 border border-gray-200 hover:shadow-xl transition duration-500 transform hover:scale-105 hover:rotate"
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
                  <h2 className="text-lg font-semibold text-[#271138] line-clamp-2">
                    {book.bookName}
                  </h2>
                  <h1 className="text-[#f79c29] text-sm mb-2 line-clamp-2">
                    {book.authorName}
                  </h1>
                  {book.pdf && (
                    <button
                      onClick={() => handleReadNowClick(book.pdf)}
                      className="w-full absolute bottom-3 left-3 w-[224.5px] block text-center bg-[#f79c29] text-white py-2 rounded-md hover:bg-[#271138] transition"
                    >
                      Read Now
                    </button>
                  )}
                </div>
              ))
            ) : (
              <p className="text-[#271138] text-center">No books available</p>
            )}
          </div>
        </>
      )}
      {otherBooks.length > 0 && (
        <>
          <h2 className="text-2xl font-bold">📚 Other Books</h2>
          <div className="flex space-x-6 overflow-x-auto scrollbar-hide no-scrollbar p-4 h-[360px] w-[100%]">
            {otherBooks.length > 0 ? (
              otherBooks.map((book) => (
                <div
                  key={book._id}
                  className="w-64 bg-white shadow-lg rounded-lg p-4 flex-shrink-0 border border-gray-200 hover:shadow-xl transition duration-500 transform hover:scale-105 hover:rotate"
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
                  <h2 className="text-lg font-semibold text-[#271138] line-clamp-2">
                    {book.bookName}
                  </h2>
                  <h1 className="text-[#f79c29] text-sm mb-2 line-clamp-2">
                    {book.authorName}
                  </h1>
                  {book.pdf && (
                    <button
                      onClick={() => handleReadNowClick(book.pdf)}
                      className="w-full absolute bottom-3 left-3 w-[224.5px] block text-center bg-[#f79c29] text-white py-2 rounded-md hover:bg-[#271138] transition"
                    >
                      Read Now
                    </button>
                  )}
                </div>
              ))
            ) : (
              <p className="text-[#271138] text-center">No books available</p>
            )}
          </div>
        </>
      )}
      {isLoginOpen && (
        <Login
          isOpen={isLoginOpen}
          onClose={() => setIsLoginOpen(false)}
          onLoginSuccess={handleLoginSuccess}
          onOpenRegister={() => {
            setIsLoginOpen(false);
            setIsRegisterOpen(true);
          }}
        />
      )}
      {isRegisterOpen && (
        <Register
          isOpen={isRegisterOpen}
          onClose={() => setIsRegisterOpen(false)}
          onOpenLogin={() => {
            setIsRegisterOpen(false);
            setIsLoginOpen(true);
          }}
        />
      )}
    </div>
  );
}
