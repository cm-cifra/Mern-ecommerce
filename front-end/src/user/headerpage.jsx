import React from "react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom

const HeaderPage = ({
  searchQuery,
  setSearchQuery,
  selectedCategory,
  setSelectedCategory,
  categories,
}) => {
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
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search products..."
          className="border rounded-lg p-2 w-1/3  mx-2"
        />
        <select
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="border rounded-lg p-2 bg-white   mx-2"
        >
          <option value="">All Categories</option>
          {categories.map((category) => (
            <option key={category._id} value={category.title}>
              {category.title}
            </option>
          ))}
        </select>
        <Link
          to="/"
          className="text-dark-blue hover:text-light-orange hover:text-blue-400 font-bold"
        >
          Home
        </Link>
        <Link
          to="/about"
          className="text-dark-blue hover:text-blue-400  font-bold"
        >
          About
        </Link>
        <Link
          to="/login"
          className="text-dark-blue hover:text-blue-400  font-bold "
        >
          Login
        </Link>
      </nav>
    </header>
  );
};

export default HeaderPage;
