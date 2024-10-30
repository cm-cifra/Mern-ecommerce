import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const AuthHeader = () => {
  return (
    <header className="p-5 bg-blue-300 shadow-md flex justify-between items-center h-24">
      <Link to="/" className="flex items-center space-x-2">
        <img
          src="../public/assets/delivery-time.png"
          alt="Cart"
          className="h-8 w-8 text-dark-blue hover:text-light-orange"
        />
        <h1 className="text-2xl font-bold">Ecommerce</h1>
      </Link>
      <nav className="flex items-center space-x-6 flex-grow justify-end">
        <Link to="/" className="text-black hover:text-blue-500 font-bold">
          Home
        </Link>
        <Link to="/about" className="text-black hover:text-blue-500 font-bold">
          About
        </Link>
        <Link to="/login" className="text-black hover:text-blue-500 font-bold">
          Login
        </Link>
      </nav>
    </header>
  );
};

export default AuthHeader;
