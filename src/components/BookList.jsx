// components/BookList.js
import React from "react";
import BookCard from "./BookCard";

const BookList = ({ books }) => {
  return (
    <div className="book-list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {books.map((book) => (
        <BookCard key={book.id} book={book} />
      ))}
    </div>
  );
};

export default BookList;
