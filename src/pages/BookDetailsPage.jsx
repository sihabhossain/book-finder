// pages/BookDetailsPage.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Loading from "../components/Loading";

const BookDetailsPage = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    fetch(`https://gutendex.com/books?ids=${id}`)
      .then((response) => response.json())
      .then((data) => setBook(data.results[0]))
      .catch((error) => console.error("Error fetching book details:", error));
  }, [id]);

  if (!book) {
    return <Loading />;
  }

  // Extract additional details
  const authors = book.authors.map((author) => (
    <div key={author.name}>
      <span>{author.name}</span>
      {author.birth_year && author.death_year && (
        <span>
          {" ("}
          {author.birth_year} - {author.death_year}
          {")"}
        </span>
      )}
    </div>
  ));

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <img
          src={book.formats["image/jpeg"]}
          alt={book.title}
          className="h-96 w-full object-cover rounded-md mb-4"
        />
        <h1 className="text-4xl font-bold text-gray-800 mb-4">{book.title}</h1>
        <div className="text-lg text-gray-600 mb-2">
          <strong>Authors:</strong> {authors}
        </div>
        <div className="text-lg text-gray-600 mb-2">
          <strong>Genre:</strong> {book.subjects.join(", ")}
        </div>
        <div className="text-lg text-gray-600 mb-2">
          <strong>Bookshelves:</strong> {book.bookshelves.join(", ")}
        </div>
        <p className="text-gray-600 mt-4">{book.description}</p>

        {/* Link to read the book */}
        <div className="mt-4">
          <a
            href={book.formats["text/html"]}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
          >
            Read Online
          </a>
        </div>
      </div>
    </div>
  );
};

export default BookDetailsPage;
