// components/Navbar.js
import React from "react";
import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="bg-purple-600 shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="text-xl font-semibold text-white">
          Book Finder
        </Link>
        <div className="space-x-4">
          <Link to="/" className="text-white hover:font-semibold">
            Home
          </Link>
          <Link to="/wishlist" className="text-white hover:font-semibold">
            Wishlist
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
