import { useState, useEffect } from "react";
import axios from "axios";

export default function Technology() {
  const [books, setBooks] = useState([]);
  const category = "Technology";

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

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h2 className="text-2xl font-bold text-center mb-6">📚 {category} Books</h2>
      <div className="flex space-x-6 overflow-x-auto scrollbar-hide no-scrollbar p-4">
        {books.length > 0 ? books.map((book) => (
          <div 
            key={book._id} 
            className="w-64 bg-white shadow-lg rounded-lg p-4 flex-shrink-0 border border-gray-200 hover:shadow-xl transition"
          >
            {book.image ? (
              <img 
                src={`http://localhost:7000/${book.image}`} 
                alt={book.bookName} 
                className="w-full h-40 object-cover rounded-md mb-3"
              />
            ) : (
              <p className="text-gray-500">No Image</p>
            )}
            <h2 className="text-lg font-semibold text-gray-800">{book.bookName}</h2>
            <p className="text-gray-600 text-sm mb-2">by {book.authorName}</p>
            <p className="text-gray-500 text-sm mb-3">{book.description || "No description available."}</p>
            {book.pdf && (
              <a 
                href={`http://localhost:7000/${book.pdf}`} 
                className="w-full block text-center bg-blue-500 text-white py-2 rounded-md hover:bg-blue-600 transition"
                target="_blank" 
                rel="noopener noreferrer"
              >
                Read Now
              </a>
            )}
          </div>
        )) : (
          <p className="text-gray-500 text-center">No books available</p>
        )}
      </div>
    </div>
  );
}