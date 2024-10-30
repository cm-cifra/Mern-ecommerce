// src/components/DealsOfTheDay.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { VITE_BACKEND_URL } from "../App";

const DealsOfTheDay = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${VITE_BACKEND_URL}/product`);
        setProducts(res.data);
      } catch (error) {
        console.error("Error fetching products", error);
      }
    };
    fetchProducts();
  }, []);

  return (
    <div className="p-4">
      <h2 className="text-xl font-semibold mb-4">Deals of the Day</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        {products.map((product) => (
          <Link
            to={`/item/${product._id}`} // Link with product ID
            key={product._id}
            className="bg-white p-4 border rounded-md shadow-sm"
          >
            <img
              src={`${VITE_BACKEND_URL}${product.images[0]}`}
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

export default DealsOfTheDay;
