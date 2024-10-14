// components/BookCard.js
import React, { useState } from "react";

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
    <div className="book-card">
      <img
        src={book.formats["image/jpeg"]}
        alt={book.title}
        className="book-cover"
      />
      <h3>{book.title}</h3>
      <p>{book.authors[0].name}</p>
      <button onClick={toggleWishlist}>{isWishlisted ? "💖" : "🤍"}</button>
    </div>
  );
};

export default BookCard;
