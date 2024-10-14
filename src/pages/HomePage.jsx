// pages/HomePage.js
import React, { useState, useEffect } from "react";

const HomePage = () => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("");

  useEffect(() => {
    // Fetch books data from the public API
    fetch("https://gutendex.com/books")
      .then((response) => response.json())
      .then((data) => setBooks(data.results));
  }, []);

  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(search.toLowerCase()) &&
      (genre === "" || book.subjects.includes(genre))
  );

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
        Discover Books
      </h1>

      {/* Search bar and Filter */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-8 space-y-4 md:space-y-0">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by title..."
          className="w-full md:w-1/2 px-4 py-2 border rounded-md focus:outline-none focus:border-gray-500"
        />
        <select
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          className="w-full md:w-1/4 px-4 py-2 border rounded-md focus:outline-none focus:border-gray-500"
        >
          <option value="">All Genres</option>
          <option value="Science Fiction">Science Fiction</option>
          <option value="Fantasy">Fantasy</option>
          <option value="Biography">Biography</option>
          <option value="History">History</option>
        </select>
      </div>

      {/* Book list */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <div key={book.id} className="bg-white p-4 rounded-lg shadow-lg">
              <img
                src={book.formats["image/jpeg"]}
                alt={book.title}
                className="h-64 w-full object-cover rounded-md mb-4"
              />
              <h2 className="text-lg font-semibold text-gray-700">
                {book.title}
              </h2>
              <p className="text-gray-500">
                by {book.authors.map((author) => author.name).join(", ")}
              </p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No books found</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
