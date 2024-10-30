import React, { useState } from "react";

function ProductPage() {
  const products = [
    {
      name: "T-shirt for Men",
      price: "$90.00",
      imgUrl: "https://via.placeholder.com/150",
    },
    {
      name: "Travel Bag Jeans",
      price: "$19.50",
      imgUrl: "https://via.placeholder.com/150",
    },
    {
      name: "Jeans shorts",
      price: "$70.00",
      imgUrl: "https://via.placeholder.com/150",
    },
    {
      name: "Sofa for interior",
      price: "$375.00",
      imgUrl: "https://via.placeholder.com/150",
    },
    {
      name: "Leather Wallet",
      price: "$375.00",
      imgUrl: "https://via.placeholder.com/150",
    },
    {
      name: "GoPro Camera 4K",
      price: "$32.00",
      imgUrl: "https://via.placeholder.com/150",
    },
    {
      name: "Headset Xiaomi",
      price: "$375.00",
      imgUrl: "https://via.placeholder.com/150",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
      {/* Products Grid */}
      {products.map((product, idx) => (
        <div key={idx} className="bg-white p-4 shadow-lg rounded-lg">
          <img
            src={product.imgUrl}
            alt={product.name}
            className="w-full h-40 object-cover mb-4 rounded-lg"
          />
          <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
          <p className="text-gray-500 mb-4">{product.price}</p>
          <div className="flex justify-between">
            <button className="bg-green-500 text-white px-4 py-2 rounded-lg">
              Edit
            </button>
            <button className="bg-red-500 text-white px-4 py-2 rounded-lg">
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductPage;
