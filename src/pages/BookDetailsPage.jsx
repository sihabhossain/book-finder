// pages/BookDetailsPage.js
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const BookDetailsPage = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);

  useEffect(() => {
    fetch(`https://gutendex.com/books?ids=${id}`)
      .then((response) => response.json())
      .then((data) => setBook(data.results[0]));
  }, [id]);

  if (!book) {
    return <p>Loading...</p>;
  }

  return (
    <div className="container mx-auto p-4">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <img
          src={book.formats["image/jpeg"]}
          alt={book.title}
          className="h-96 w-full object-cover rounded-md mb-4"
        />
        <h1 className="text-4xl font-bold text-gray-800 mb-4">{book.title}</h1>
        <p className="text-lg text-gray-600">
          Author: {book.authors.map((author) => author.name).join(", ")}
        </p>
        <p className="text-lg text-gray-600 mt-2">
          Genre: {book.subjects.join(", ")}
        </p>
        <p className="text-gray-600 mt-4">{book.description}</p>
      </div>
    </div>
  );
};

export default BookDetailsPage;
