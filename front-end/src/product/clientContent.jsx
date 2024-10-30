// src/components/DealsOfTheDay.jsx
import React from "react";
import { Link } from "react-router-dom";

const Content = ({ products, backendUrl }) => {
  return (
    <div className="p-4 bg-blue-200 m-7 ">
      <h2 className="text-xl font-semibold mb-4">Deals of the Day</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        {products.map((product) => (
          <Link
            to={`/item/${product._id}`} // Link with product ID
            key={product._id}
            className="bg-white p-4 border rounded-md shadow-sm"
          >
            <img
              src={`${backendUrl}${product.images[0]}`}
              alt={product.title}
              className="w-full h-40 object-cover mb-4 rounded-md"
            />
            <h3 className="text-lg font-semibold">{product.title}</h3>
            <p className="font-semibold">{`Price: ${product.price} BDT`}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Content;
