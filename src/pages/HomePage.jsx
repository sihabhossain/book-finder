import React, { useState, useEffect } from "react";
import AnimatedBookCard from "../components/AnimatedBookCard"; // Import the new component
import Loading from "../components/Loading";

const HomePage = () => {
  const [books, setBooks] = useState([]);
  const [search, setSearch] = useState("");
  const [genre, setGenre] = useState("");
  const [loading, setLoading] = useState(true);
  const [genres, setGenres] = useState([]);
  const [nextPage, setNextPage] = useState(null);
  const [prevPage, setPrevPage] = useState(null);

  // Function to extract unique genres from subjects
  const extractGenres = (books) => {
    const genreSet = new Set();
    books.forEach((book) => {
      book.subjects.forEach((subject) => {
        genreSet.add(subject);
      });
    });
    return Array.from(genreSet);
  };

  const fetchBooks = async (url) => {
    setLoading(true);
    try {
      const response = await fetch(url);
      const data = await response.json();
      setBooks(data.results);
      setNextPage(data.next);
      setPrevPage(data.previous);

      // Extract unique genres from the fetched books and set them
      const extractedGenres = extractGenres(data.results);
      setGenres(extractedGenres);

      // Cache the books and genres in localStorage
      localStorage.setItem("booksCache", JSON.stringify(data.results));
      localStorage.setItem("nextPageCache", data.next);
      localStorage.setItem("prevPageCache", data.previous);
      localStorage.setItem("genresCache", JSON.stringify(extractedGenres));
    } catch (error) {
      console.error("Error fetching books:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const cachedBooks = localStorage.getItem("booksCache");
    const cachedNextPage = localStorage.getItem("nextPageCache");
    const cachedPrevPage = localStorage.getItem("prevPageCache");
    const cachedGenres = localStorage.getItem("genresCache");

    if (cachedBooks && cachedGenres) {
      // Use cached data if available
      setBooks(JSON.parse(cachedBooks));
      setNextPage(cachedNextPage);
      setPrevPage(cachedPrevPage);
      setGenres(JSON.parse(cachedGenres));
      setLoading(false);
    } else {
      fetchBooks("https://gutendex.com/books");
    }
  }, []);

  const handleNextPage = () => {
    if (nextPage) {
      fetchBooks(nextPage);
    }
  };

  const handlePrevPage = () => {
    if (prevPage) {
      fetchBooks(prevPage);
    }
  };

  // Filter books based on search and genre
  const filteredBooks = books.filter(
    (book) =>
      book.title.toLowerCase().includes(search.toLowerCase()) &&
      (genre === "" || book.subjects.some((subject) => subject.includes(genre))) // Use .some() to check for genre
  );

  if (loading) {
    return <Loading />;
  }

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
          className="w-full md:w-2/3 px-4 py-2 border rounded-md focus:outline-none focus:border-purple-500"
        />
        <select
          value={genre}
          onChange={(e) => setGenre(e.target.value)}
          className="w-full md:w-1/3 px-4 py-2 border rounded-md focus:outline-none focus:border-purple-500"
        >
          <option value="">All Genres</option>
          {genres.map((genre, index) => (
            <option key={index} value={genre}>
              {genre.length > 20 ? `${genre.substring(0, 20)}...` : genre}
            </option>
          ))}
        </select>
      </div>

      {/* Book list */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredBooks.length > 0 ? (
          filteredBooks.map((book) => (
            <AnimatedBookCard key={book.id} book={book} />
          ))
        ) : (
          <p className="text-gray-500">No books found</p>
        )}
      </div>

      {/* Pagination buttons */}
      <div className="flex justify-between mt-8">
        <button
          onClick={handlePrevPage}
          disabled={!prevPage}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={handleNextPage}
          disabled={!nextPage}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default HomePage;
