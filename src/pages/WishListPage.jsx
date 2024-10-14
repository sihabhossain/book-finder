import React, { useState } from "react";
import { motion } from "framer-motion";

const WishlistPage = () => {
  const initialWishlist = JSON.parse(localStorage.getItem("wishlist")) || [];
  const [wishlistedBooks, setWishlistedBooks] = useState(initialWishlist);

  const handleRemoveFromWishlist = (bookId) => {
    const updatedWishlist = wishlistedBooks.filter(
      (book) => book.id !== bookId
    );
    setWishlistedBooks(updatedWishlist); 
    localStorage.setItem("wishlist", JSON.stringify(updatedWishlist)); 
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
        Your Wishlist
      </h1>
      {wishlistedBooks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlistedBooks.map((book) => (
            <motion.div
              key={book.id}
              className="bg-white p-4 rounded-lg shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 20 }}
              transition={{ duration: 0.3 }}
            >
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
              <p className="text-gray-400 text-sm">
                Genres:{" "}
                {book.subjects.length > 0
                  ? `${book.subjects.join(", ").slice(0, 30)}${
                      book.subjects.join(", ").length > 30 ? "..." : ""
                    }`
                  : "N/A"}
              </p>
              <button
                onClick={() => handleRemoveFromWishlist(book.id)}
                className="mt-4 px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-600 transition duration-300"
              >
                Remove
              </button>
            </motion.div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center">Your wishlist is empty!</p>
      )}
    </div>
  );
};

export default WishlistPage;
