import React, { useState, useEffect } from "react";
import axios from "axios";
import { VITE_BACKEND_URL } from "../../App";
import { toast } from "react-toastify";
import { useNavigate, useParams } from "react-router-dom";

function EditProduct({ setSelectedPage }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [images, setImages] = useState([]);
  const [imagePreviews, setImagePreviews] = useState([]);
  const [categoryID, setCategoryID] = useState("");
  const [price, setPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const token = localStorage.getItem("token");

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${VITE_BACKEND_URL}/category`);
        setCategories(response.data);
      } catch (error) {
        toast.error("Error fetching categories. Please try again.");
      }
    };

    const fetchProduct = async () => {
      setIsLoading(true);

      try {
        const response = await axios.get(`${VITE_BACKEND_URL}/product/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const productData = response.data;
        setTitle(productData.title);
        setDescription(productData.description);
        setCategoryID(productData.categoryID);
        setPrice(productData.price);
        setQuantity(productData.quantity);
        setImagePreviews(productData.images || []);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          toast.error("Unauthorized access. Please log in again.");
          navigate("/login");
        } else {
          toast.error("Error fetching product details.");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
    fetchProduct();
  }, [id, navigate, token]);

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    setImages((prevImages) => [...prevImages, ...files]);
    const previews = files.map((file) => URL.createObjectURL(file));
    setImagePreviews((prevPreviews) => [...prevPreviews, ...previews]);
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

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("categoryID", categoryID);
    formData.append("price", parseFloat(price));
    formData.append("quantity", parseInt(quantity, 10));
    images.forEach((image) => formData.append("images", image));

    try {
      setIsLoading(true);
      const response = await axios.put(
        `${VITE_BACKEND_URL}/product/${id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Log the response for debugging
      console.log(response);

      if (response.status === 200) {
        toast.success("Product updated successfully");

        navigate("/admin");
      }
    } catch (error) {
      if (error.response && error.response.status === 401) {
        toast.error("Unauthorized access. Please log in again.");
        navigate("/login");
      } else {
        toast.error("Error updating product. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Cleanup object URLs to prevent memory leaks
  useEffect(() => {
    return () => {
      imagePreviews.forEach((preview) => URL.revokeObjectURL(preview));
    };
  }, [imagePreviews]);

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 shadow-md rounded-lg mt-10">
      <h1 className="text-2xl font-semibold mb-4">Update Product</h1>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="title" className="block text-gray-700">
            Product Title
          </label>
          <input
            id="title"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter product title"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="description" className="block text-gray-700">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Enter product description"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

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
                accept="image/*"
              />
              <span>Upload</span>
            </label>
          </div>
        </div>

        <div className="mb-4">
          <label htmlFor="category" className="block text-gray-700">
            Category
          </label>
          <select
            value={categoryID}
            onChange={(e) => setCategoryID(e.target.value)}
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

        <div className="mb-4">
          <label htmlFor="price" className="block text-gray-700">
            Price
          </label>
          <input
            id="price"
            type="number"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
            placeholder="Enter price"
            className="mt-1 block w-full p-2 border border-gray-300 rounded-md"
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="quantity" className="block text-gray-700">
            Quantity
          </label>
          <input
            id="quantity"
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
          {isLoading ? "Updating..." : "Update Product"}
        </button>
      </form>
    </div>
  );
}

export default EditProduct;
