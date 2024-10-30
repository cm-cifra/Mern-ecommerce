// src/components/ClientHome.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import { VITE_BACKEND_URL } from "../App";
import Header from "./clientHeader";
import Sidebar from "./clientSidebar";
import Content from "./clientContent";

import { Link } from "react-router-dom";

const ClientHome = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  useEffect(() => {
    fetchCategories();
    fetchProducts();
  }, []);

  const fetchCategories = async () => {
    try {
      const res = await axios.get(`${VITE_BACKEND_URL}/category`);
      setCategories(res.data);
    } catch (error) {
      console.error("Error fetching categories", error);
    }
  };

  const fetchProducts = async () => {
    try {
      const res = await axios.get(`${VITE_BACKEND_URL}/product`);
      setProducts(res.data);
    } catch (error) {
      console.error("Error fetching products", error);
    }
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleCategorySelect = (categoryId) => {
    setSelectedCategory(categoryId);
  };

  const filteredProducts = products.filter(
    (product) =>
      product.title.toLowerCase().includes(searchQuery.toLowerCase()) &&
      (selectedCategory ? product.categoryID === selectedCategory : true)
  );

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Header */}
      <Header searchQuery={searchQuery} handleSearch={handleSearch} />

      <div className="flex">
        {/* Sidebar */}
        <Sidebar
          categories={categories}
          selectedCategory={selectedCategory}
          handleCategorySelect={handleCategorySelect}
        />

        {/* Main Content */}
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

          {/* Deals of the Day */}
          <Content products={filteredProducts} backendUrl={VITE_BACKEND_URL} />
        </div>
      </div>
    </div>
  );
};

export default ClientHome;
