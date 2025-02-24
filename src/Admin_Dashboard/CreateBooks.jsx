import React, { useState } from "react";
import axios from "axios";

const CreateBooks = () => {
  const [bookName, setBookName] = useState("");
  const [authorName, setAuthorName] = useState("");
  const [category, setCategory] = useState("");
  const [image, setImage] = useState(null);
  const [pdf, setPdf] = useState(null);
  const [message, setMessage] = useState("");
  console.log(category)
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("bookName", bookName);
    formData.append("authorName", authorName);
    formData.append("category", category);
    if (image) formData.append("image", image);
    if (pdf) formData.append("pdf", pdf);

    try {
      await axios.post("http://localhost:7000/books", formData);
      setMessage("Book added successfully!");
    } catch (error) {
      setMessage("Error adding book.");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto m-8 bg-white shadow-md rounded-md">
      <h2 className="text-xl font-bold mb-4">Add a New Book</h2>
      {message && <p className="text-green-500">{message}</p>}
      <form onSubmit={handleSubmit} className="space-y-4">
        <input type="text" placeholder="Book Name" value={bookName} onChange={(e) => setBookName(e.target.value)} className="w-full p-2 border rounded" />
        <input type="text" placeholder="Author Name" value={authorName} onChange={(e) => setAuthorName(e.target.value)} className="w-full p-2 border rounded" />

        {/* <input type="text" placeholder="Category" value={category} onChange={(e) => setCategory(e.target.value)} className="w-full p-2 border rounded" /> */}
        <div className="w-full p-2 border rounded">
          <select className="w-full  border rounded border-white " value={category}
            onChange={(e) => setCategory(e.target.value)}>
            <option value="select" defaultValue='select' disabled>select book type</option>
            <option value="Horror">Horror</option>
            <option value="Motivational">Motivational</option>
            <option value="History">History</option>
            <option value="Biography">Biography</option>
            <option value="Communication">Communication</option>
            <option value="Technology">Technology</option>
            <option value="others">others</option>
          </select>
        </div>
        <input type="file" onChange={(e) => setImage(e.target.files[0])} className="w-full p-2 border rounded" />
        <input type="file" onChange={(e) => setPdf(e.target.files[0])} className="w-full p-2 border rounded" />
        <button type="submit" className="w-full p-2 bg-green-500 text-white rounded">Add Book</button>
      </form>
    </div>
  );
};

export default CreateBooks;
