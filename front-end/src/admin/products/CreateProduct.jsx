import React, { useState, useEffect } from "react";
import axios from "axios";
import { VITE_BACKEND_URL } from "../../App";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

function CreateProduct({ setSelectedPage }) {
  // Accept setSelectedPage as a prop
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [categoryID, setCategory] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate(); // using useNavigate to navigate

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${VITE_BACKEND_URL}/category`);
        setCategories(response.data);
      } catch (error) {
        toast.error("Error fetching categories. Please try again.");
        console.error("Error fetching categories:", error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const newPreviews = images.map((image) => URL.createObjectURL(image));
    setImagePreviews(newPreviews);

    return () => {
      newPreviews.forEach((url) => URL.revokeObjectURL(url));
    };
  }, [images]);

  const getUserId = () => {
    return localStorage.getItem("userId");
  };

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setImages((prevImages) => [...prevImages, ...files]);
  };

  const validateForm = () => {
    if (
      !title ||
      !description ||
      images.length === 0 ||
      !categoryID ||
      !price ||
      !quantity
    ) {
      toast.error("Please fill out all input fields completely");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const userId = getUserId();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("categoryID", categoryID);
    formData.append("price", parseFloat(price));
    formData.append("quantity", parseInt(quantity, 10));
    formData.append("userId", userId);

    images.forEach((image) => formData.append("images", image));

    try {
      setIsLoading(true);
      const response = await axios.post(
        `${VITE_BACKEND_URL}/product`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      toast.success(`Product "${response.data.title}" created successfully`);

      // Redirect to the "Products" page in AdminPanel and update the selectedPage
      setSelectedPage("Products");
      navigate("/admin", { state: { selectedPage: "Products" } });
    } catch (error) {
      toast.error(
        error.response?.data?.message ||
          "Error creating product. Please try again."
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 shadow-md rounded-lg mt-10">
      <h1 className="text-2xl font-semibold mb-4">Create Product</h1>
      <form onSubmit={handleSubmit}>
        {/* Product Title */}
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700">
            Product Title
          </label>
          <input
            id="title"
            aria-label="Product Title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter product title"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Description */}
        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            aria-label="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter product description"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Image Upload */}
        <div className="mb-4">
          <label className="block text-gray-700">Images</label>
          <div className="flex items-center space-x-4 mt-2">
            {imagePreviews.map((preview, idx) => (
              <img
                key={idx}
                src={preview}
                alt="Product Preview"
                className="w-20 h-20 object-cover rounded-lg"
              />
            ))}
            <label className="w-20 h-20 bg-gray-200 flex items-center justify-center rounded-lg border cursor-pointer">
              <input
                type="file"
                className="hidden"
                onChange={handleImageUpload}
                multiple
                disabled={isLoading}
                accept="image/*"
              />
              <span>Upload</span>
            </label>
          </div>
        </div>

        {/* Category Selection */}
        <div className="mb-4">
          <label htmlFor="category" className="block text-gray-700">
            Category
          </label>
          <select
            aria-label="Category"
            value={categoryID}
            onChange={(e) => setCategory(e.target.value)}
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          >
            <option value="" disabled>
              Select Category
            </option>
            {categories.map((category) => (
              <option key={category._id} value={category._id}>
                {category.title}
              </option>
            ))}
          </select>
        </div>

        {/* Price */}
        <div className="mb-4">
          <label htmlFor="price" className="block text-gray-700">
            Price
          </label>
          <input
            id="price"
            aria-label="Price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter price"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Quantity */}
        <div className="mb-4">
          <label htmlFor="quantity" className="block text-gray-700">
            Quantity
          </label>
          <input
            id="quantity"
            aria-label="Quantity"
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            placeholder="Enter quantity"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-500 text-white p-2 rounded-md"
          disabled={isLoading}
        >
          {isLoading ? "Creating..." : "Create Product"}
        </button>
      </form>
    </div>
  );
}

export default CreateProduct;
