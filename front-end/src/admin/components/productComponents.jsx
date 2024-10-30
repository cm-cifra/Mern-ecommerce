import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { VITE_BACKEND_URL } from "../../App";

const Product = ({ product, getProducts }) => {
  const deleteProduct = async (id) => {
    const result = await Swal.fire({
      title: "Do you really want to delete the product?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    });
    if (result.isConfirmed) {
      try {
        await axios.delete(`${VITE_BACKEND_URL}/product/${id}`);
        toast.success("Product deleted successfully");
        getProducts();
      } catch (error) {
        toast.error("Error: " + error.message);
      }
    }
  };

  const [mainImage, setMainImage] = useState(product.images[0]);

  return (
    <div className="bg-white rounded shadow-lg overflow-hidden m-2 sm:m-4 p-4 max-w-full sm:max-w-sm lg:max-w-md">
      <div className="w-full h-40 sm:h-50 flex justify-center items-center mb-4">
        <img
          src={`${VITE_BACKEND_URL}${mainImage}`}
          className="w-full h-full object-cover"
          alt="Main product"
        />
      </div>
      <div className="flex gap-2 mb-4 overflow-x-auto">
        {product.images.map((image, index) => (
          <img
            key={index}
            src={`${VITE_BACKEND_URL}${image}`}
            className="w-18 h-18 sm:w-16 sm:h-16 object-contain cursor-pointer"
            alt={`Thumbnail ${index + 1}`}
            onClick={() => setMainImage(image)}
          />
        ))}
      </div>
      <div className="px-2 sm:px-4">
        <h2 className="text-md sm:text-xs font-bold mb-2">{product.title}</h2>
        <div className="description-container h-16 sm:h-20 overflow-hidden relative">
          <p className="description-text text-xs sm:text-xs mb-2">
            {product.description}
          </p>
          <div className="fade-overlay absolute inset-0 bg-gradient-to-t from-white to-transparent"></div>
        </div>
        <div className="text-xs sm:text-xs mb-2">
          Quantity: {product.quantity}
        </div>
        <div className="text-xs sm:text-xs mb-4">
          Price: ${product.price.toFixed(2)}
        </div>
        <div className="mt-2 flex flex-col sm:flex-row gap-2">
          <Link
            to={`/editProduct/${product._id}`}
            className="text-center shadow-md text-xs sm:text-sm bg-gray-700 text-white rounded-sm px-3 py-1 font-bold hover:bg-gray-600"
          >
            Edit
          </Link>
          <button
            onClick={() => deleteProduct(product._id)}
            className="text-center shadow-md text-xs sm:text-sm bg-red-700 text-white rounded-sm px-3 py-1 font-bold hover:bg-red-600"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default Product;
