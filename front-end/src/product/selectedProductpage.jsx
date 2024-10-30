// src/components/LandingPage.jsx
import React, { useState, useEffect } from "react";
import { VITE_BACKEND_URL } from "../App";
import { useParams } from "react-router-dom";
import axios from "axios";
import Header from "./clientHeader";
import Sidebar from "./clientSidebar";
import Content from "./clientContent";

const Selected = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [selectedImage, setSelectedImage] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [quantity, setQuantity] = useState(1);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await axios.get(`${VITE_BACKEND_URL}/product/${id}`);
        setProduct(res.data);
        setMainImage(res.data.images[0]);
      } catch (error) {
        console.error("Error fetching product", error);
      }
    };
    fetchProduct();
  }, [id]);

  const closeImage = () => setSelectedImage("");
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleQuantityChange = (e) => {
    const value = Math.max(1, Number(e.target.value));
    setQuantity(value);
  };

  const handleAddToCart = () => {
    closeModal();
    console.log(`Added ${quantity} of product ${product.title} to cart`);
  };

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

  if (!product) return <div>Loading...</div>;

  return (
    <div className="bg-blue-50 min-h-screen">
      <Header searchQuery={searchQuery} handleSearch={handleSearch} />

      <div className="flex">
        {/* Sidebar */}
        <Sidebar
          categories={categories}
          selectedCategory={selectedCategory}
          handleCategorySelect={handleCategorySelect}
          className="w-1/4 max-w-xs bg-white p-4 shadow-lg"
        />

        {/* Main Content */}
        <div className="flex-grow p-4">
          <div className="max-w-5xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden p-6 flex flex-col md:flex-row">
            {/* Left Side - Product Image */}
            <div className="md:w-1/2 flex flex-col items-center mb-6 md:mb-0">
              <img
                src={`${VITE_BACKEND_URL}${mainImage}`}
                className="w-full h-64 object-cover rounded-lg cursor-pointer transition-transform duration-300 hover:scale-105"
                alt="Main product"
                onClick={() => setSelectedImage(mainImage)}
              />
              <div className="flex gap-3 mt-4 overflow-x-auto">
                {product.images.map((image, index) => (
                  <img
                    key={index}
                    src={`${VITE_BACKEND_URL}${image}`}
                    className="w-20 h-20 object-cover cursor-pointer rounded border-2 border-blue-200 hover:border-blue-400 transition-all"
                    alt={`Thumbnail ${index + 1}`}
                    onClick={() => setMainImage(image)}
                  />
                ))}
              </div>
            </div>

            {/* Right Side - Product Details and Actions */}
            <div className="md:w-1/2 flex flex-col justify-center px-4">
              <h2 className="text-2xl font-semibold text-blue-800 mb-3 text-center md:text-left">
                {product.title}
              </h2>
              <div className="relative overflow-hidden h-24 mb-6">
                <p className="text-gray-600 text-sm leading-relaxed">
                  {product.description}
                </p>
              </div>
              <div className="text-lg text-blue-700 mb-2 text-center md:text-left">
                <strong>Quantity Available:</strong> {product.quantity}
              </div>
              <div className="text-xl text-pink-600 font-bold mb-4 text-center md:text-left">
                Price: ${product.price.toFixed(2)}
              </div>

              {/* Action Buttons */}
              <div className="flex justify-between mt-6">
                <button
                  onClick={openModal}
                  className="bg-blue-500 text-white py-2 px-6 rounded-md shadow hover:bg-blue-200 w-80"
                >
                  Add to Cart
                </button>
                <button
                  onClick={openModal}
                  className="bg-pink-500 text-white py-2 px-6 rounded-md shadow hover:bg-pink-200"
                >
                  Buy Now
                </button>
              </div>
            </div>
          </div>

          {/* Product List */}
          <Content products={filteredProducts} backendUrl={VITE_BACKEND_URL} />
        </div>
      </div>

      {/* Image Modal */}
      {selectedImage && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-75 z-50">
          <div className="relative">
            <img
              src={`${VITE_BACKEND_URL}${selectedImage}`}
              className="max-w-full max-h-full rounded-lg shadow-lg"
              alt="Full Size"
            />
            <button
              className="absolute top-2 right-2 text-white text-3xl font-bold"
              onClick={closeImage}
            >
              &times;
            </button>
          </div>
        </div>
      )}

      {/* Quantity Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm w-full">
            <div className="flex flex-col items-center mb-6">
              <img
                src={`${VITE_BACKEND_URL}${mainImage}`}
                className="w-full h-64 object-cover rounded-lg"
                alt="Main product"
              />
            </div>
            <h3 className="text-xl font-semibold mb-4">
              Select Quantity for {product.title}
            </h3>
            <div className="mb-4">
              <label className="block text-gray-700 mb-2">Quantity</label>
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={handleQuantityChange}
                className="w-full border p-2 rounded"
              />
            </div>
            <p className="text-lg font-semibold">
              Total Price: ${(product.price * quantity).toFixed(2)}
            </p>
            <div className="flex justify-end mt-4">
              <button
                onClick={closeModal}
                className="bg-gray-300 text-gray-700 py-2 px-4 rounded mr-2"
              >
                Cancel
              </button>
              <button
                onClick={handleAddToCart}
                className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Selected;
