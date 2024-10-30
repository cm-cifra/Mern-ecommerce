import React from "react";

function Header({ isSidebarOpen, setIsSidebarOpen }) {
  return (
    <div className="flex flex-col sm:flex-row items-start justify-between p-4 bg-gray-100 shadow-md">
      <div className="flex items-center gap-2 sm:gap-4">
        <button
          className="md:hidden text-blue-600 text-3xl"
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        >
          ☰
        </button>
        <h2 className="text-lg sm:text-2xl font-bold">Products Grid</h2>
      </div>
      <div className="flex items-center gap-2 sm:gap-4 mt-2 sm:mt-0">
        <input
          type="text"
          placeholder="Search"
          className="border border-gray-300 px-2 sm:px-4 py-2 rounded-lg text-sm sm:text-base"
        />
        <button className="bg-gray-200 p-2 rounded-lg text-lg">🔄</button>
        <button
          onClick={() => setIsSidebarOpen(false)}
          className="bg-blue-500 text-white px-2 sm:px-4 py-2 rounded-lg"
        >
          Create Product
        </button>
      </div>
    </div>
  );
}

export default Header;
