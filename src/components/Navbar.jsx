// components/Navbar.js
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-semibold text-gray-700">
          Book Finder
        </Link>
        <div className="space-x-4">
          <Link to="/" className="text-gray-600 hover:text-gray-800">
            Home
          </Link>
          <Link to="/wishlist" className="text-gray-600 hover:text-gray-800">
            Wishlist
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
