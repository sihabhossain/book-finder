import React, { useState, useEffect } from "react";
import BookCard from "../components/BookCard";

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
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-8 text-center">
        Discover Books
      </h1>

      {/* Search bar and Filter */}
      <div className="flex flex-col md:flex-row items-center justify-between mb-8 space-y-4 md:space-y-0 md:space-x-4">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search by title..."
          className="w-full md:w-2/3 px-4 py-2 border rounded-md focus:outline-none focus:border-gray-500"
        />
        <select
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          className="w-full md:w-1/3 px-4 py-2 border rounded-md focus:outline-none focus:border-gray-500"
        >
          <option value="">All Genres</option>
          <option value="Science Fiction">Science Fiction</option>
          <option value="Fantasy">Fantasy</option>
          <option value="Biography">Biography</option>
          <option value="History">History</option>
        </select>
      </div>

      {/* Book list */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => <BookCard key={book.id} book={book} />)
        ) : (
          <p className="text-gray-500">No books found</p>
        )}
      </div>
    </div>
  );
};

export default HomePage;
