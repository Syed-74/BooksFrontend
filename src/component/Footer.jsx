import React, { useState } from "react";

const Footer = () => {
  const [form, setForm] = useState({ name: "", email: "", feedback: "", bookSuggestion: "" });
  const [message, setMessage] = useState({ error: "", success: "" });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    setMessage({ error: "", success: "" });

    if (!form.name || !form.email) return setMessage({ error: "Name and email are required." });
    if (!form.feedback && !form.bookSuggestion) return setMessage({ error: "Enter feedback or a book suggestion." });

    try {
      const res = await fetch("https://books-hlyv.onrender.com/api/send-feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      res.ok ? setMessage({ success: "Thank you for your feedback!" }) : setMessage({ error: data.error || "Failed to send feedback." });
      if (res.ok) setForm({ name: "", email: "", feedback: "", bookSuggestion: "" });
    } catch {
      setMessage({ error: "Something went wrong. Please try again." });
    }
  };

  return (
    <footer className="bg-[#CCD7E6] text-white py-5 text-center">
      <h2 className="text-2xl font-bold text-black">📖 Read Books</h2>
      <p className="text-black">Expand your knowledge, one book at a time.</p>

      <div className="bg-[#3F5678] p-6 rounded-lg shadow-lg max-w-lg mx-auto mt-4">
        <h3 className="text-lg font-semibold">📢 Feedback & Suggestions</h3>
        {["name", "email", "feedback", "bookSuggestion"].map((field) => (
          <input
            key={field}
            name={field}
            type={field === "email" ? "email" : "text"}
            placeholder={`Enter your ${field}...`}
            value={form[field]}
            onChange={handleChange}
            className="w-full p-2 my-2 rounded-md bg-white text-black focus:ring-2 focus:ring-[#f79c29] focus:outline-none"
          />
        ))}
        {message.error && <p className="text-red-400 text-sm">{message.error}</p>}
        {message.success && <p className="text-green-400 text-sm">{message.success}</p>}
        <button onClick={handleSubmit} className="bg-[#f79c29] px-4 py-2 mt-2 rounded-md text-black w-full">Submit</button>
      </div>

      <p className="text-black text-sm mt-4">© {new Date().getFullYear()} Read Books. All rights reserved.</p>
    </footer>
  );
};

export default Footer;
