// src/components/Sidebar.jsx
import React from "react";

const Sidebar = ({ categories, selectedCategory, handleCategorySelect }) => {
  return (
    <div className="hidden md:block w-1/4 p-4 bg-white border-r">
      <h2 className="text-lg font-semibold mb-3">Categories</h2>
      <ul>
        {categories.map((category) => (
          <li
            key={category._id}
            onClick={() => handleCategorySelect(category._id)}
            className={`cursor-pointer p-2 rounded-md ${
              selectedCategory === category._id
                ? "bg-blue-500 text-white"
                : "hover:bg-blue-100 "
            }`}
          >
            {category.title}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
