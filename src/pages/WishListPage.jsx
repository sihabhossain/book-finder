import React from "react";

const WishlistPage = () => {
  const wishlistedBooks = JSON.parse(localStorage.getItem("wishlist")) || [];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-4xl font-bold text-gray-800 mb-8 text-center">
        Your Wishlist
      </h1>
      {wishlistedBooks.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {wishlistedBooks.map((book) => (
            <div key={book.id} className="bg-white p-4 rounded-lg shadow-lg">
              <img
                src={book.formats["image/jpeg"]}
                alt={book.title}
                className="h-64 w-full object-cover rounded-md mb-4"
              />
              <h2 className="text-lg font-semibold text-gray-700">
                {book.title}
              </h2>
              <p className="text-gray-500">by {book.author}</p>
            </div>
          ))}
        </div>
      ) : (
        <p className="text-gray-500 text-center">Your wishlist is empty!</p>
      )}
    </div>
  );
};

export default WishlistPage;
