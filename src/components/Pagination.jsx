// components/Pagination.js
import React from "react";

const Pagination = ({ currentPage, setCurrentPage }) => {
  return (
    <div className="pagination">
      <button
        onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
        disabled={currentPage === 1}
      >
        Previous
      </button>
      <span>Page {currentPage}</span>
      <button onClick={() => setCurrentPage((prev) => prev + 1)}>Next</button>
    </div>
  );
};

export default Pagination;
