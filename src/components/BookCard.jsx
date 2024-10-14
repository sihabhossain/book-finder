import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const BookCard = ({ book }) => {
  const [isWishlisted, setIsWishlisted] = useState(false);

  useEffect(() => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
    const isInWishlist = wishlist.some((item) => item.id === book.id);
    setIsWishlisted(isInWishlist);
  }, [book.id]);

  const toggleWishlist = () => {
    const wishlist = JSON.parse(localStorage.getItem("wishlist")) || [];

    if (isWishlisted) {
      const updatedWishlist = wishlist.filter((item) => item.id !== book.id);
      localStorage.setItem("wishlist", JSON.stringify(updatedWishlist));
    } else {
      if (!wishlist.some((item) => item.id === book.id)) {
        wishlist.push(book);
        localStorage.setItem("wishlist", JSON.stringify(wishlist));
      }
    }

    toast("Book added to your wishlist");

    setIsWishlisted(!isWishlisted);
  };

  // Function to truncate genre text
  const truncateText = (text, maxLength) => {
    if (text.length > maxLength) {
      return text.slice(0, maxLength) + "...";
    }
    return text;
  };

  return (
    <div className="w-full p-4">
      <div className="bg-white p-4 rounded-lg shadow-lg flex flex-col justify-between relative cursor-pointer transition-transform transform hover:scale-105">
        <Link to={`/book/${book.id}`} className="flex-1 flex flex-col">
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

          {/* Genre (Subjects) with truncation */}
          {book.subjects && book.subjects.length > 0 && (
            <p className="text-gray-400 text-sm">
              Genre: {truncateText(book.subjects.join(", "), 30)}{" "}
              {/* Limit to 30 characters */}
            </p>
          )}

          {/* Book ID */}
          <p className="text-gray-400 text-sm">ID: {book.id}</p>
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
