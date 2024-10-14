import React, { useState } from "react";
import { Link } from "react-router-dom";

const BookCard = ({ book }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);

  const toggleWishlist = () => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    if (isWishlisted) {
      const updatedWishlist = wishlist.filter((item) => item.id !== book.id);
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    } else {
      wishlist.push(book);
      localStorage.setItem("wishlist", JSON.stringify(wishlist));
    }
    setIsWishlisted(!isWishlisted);
  };

  return (
    <div className="w-full p-4">
      <div className="bg-white p-4 rounded-lg shadow-lg flex flex-col justify-between relative cursor-pointer transition-transform transform hover:scale-105">
        <Link to={`/book/:${book?.id}`} className="flex-1 flex flex-col">
          {/* Image with responsive height */}
          <img
            src={book.formats["image/jpeg"]}
            alt={book.title}
            className="h-48 w-full object-cover rounded-md mb-4"
          />

          {/* Title with truncation */}
          <h2 className="text-lg font-semibold text-gray-700 truncate">
            {book.title}
          </h2>

          {/* Author names */}
          <p className="text-gray-500 truncate">
            by {book.authors.map((author) => author.name).join(", ")}
          </p>
        </Link>

        {/* Wishlist button */}
        <button
          onClick={toggleWishlist}
          className="absolute top-4 right-4 text-2xl hover:scale-110 transition-transform"
        >
          {isWishlisted ? "💖" : "🤍"}
        </button>
      </div>
    </div>
  );
};

export default BookCard;
