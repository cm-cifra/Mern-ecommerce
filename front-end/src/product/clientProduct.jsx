// src/components/MainContent.jsx
import React from "react";
import { VITE_BACKEND_URL } from "../App";

const MainContent = ({ filteredProducts }) => {
  return (
    <div className="flex-1 p-4">
      {/* Banner Section */}
      <div className="flex flex-col md:flex-row gap-4 mb-6 h-56">
        <div className="bg-blue-100 p-8 flex-1 text-center rounded-lg">
          <h2 className="text-3xl font-bold">Biggest Offer Revealed</h2>
          <p className="text-lg">Up to 50% off</p>
          <button className="mt-4 bg-blue-500 text-white py-2 px-4 rounded-md">
            Shop Now
          </button>
        </div>
        <div className="grid grid-cols-2 gap-2 flex-1">
          <div className="bg-gray-200 rounded-lg p-4 text-center">Ad 1</div>
          <div className="bg-gray-200 rounded-lg p-4 text-center">Ad 2</div>
          <div className="bg-gray-200 rounded-lg p-4 text-center">Ad 3</div>
          <div className="bg-gray-200 rounded-lg p-4 text-center">Ad 4</div>
        </div>
      </div>

      {/* Deals of the Day Section */}
      <h2 className="text-xl font-semibold mb-4">Deals of the Day</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        {filteredProducts.map((product) => (
          <div
            className="bg-white p-4 border rounded-md shadow-sm"
            key={product._id}
          >
            <img
              src={`${VITE_BACKEND_URL}${product.images[0]}`}
              alt={product.title}
              className="w-full h-40 object-cover mb-4 rounded-md"
            />
            <h3 className="text-lg font-semibold">{product.title}</h3>
            <p className="font-semibold">{`Price: ${product.price} BDT`}</p>
          </div>
        ))}
      </div>

      {/* Recently Viewed and Suggestions */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h2 className="text-lg font-semibold mb-3">Recently Viewed</h2>
          <div className="bg-white p-4 rounded-md shadow-sm">
            <p>Your browsing history will appear here.</p>
          </div>
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-3">Suggestions for You</h2>
          <div className="bg-white p-4 rounded-md shadow-sm">
            <p>Recommended products will be displayed here.</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainContent;
