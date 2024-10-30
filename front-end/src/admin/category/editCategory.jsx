import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { VITE_BACKEND_URL } from "../../App";
import Sidebar from "../adminSidebar";
import Header from "../adminHeader";
import "react-toastify/dist/ReactToastify.css";

const EditCategoryPage = () => {
  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  const { id } = useParams();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [category, setCategory] = useState({
    title: "",
    description: "",
  });

  const getCategory = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get(`${VITE_BACKEND_URL}/category/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`, // Include token in the headers
        },
      });
      setCategory(response.data);
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      if (error.response && error.response.status === 401) {
        toast.error("Unauthorized access. Please login again.");
        navigate("/login"); // Redirect to login if unauthorized
      } else {
        toast.error(error.message);
      }
    }
  };

  const updateCategory = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await axios.put(`${VITE_BACKEND_URL}/category/${id}`, category, {
        headers: {
          Authorization: `Bearer ${token}`, // Include token in the headers
        },
      });
      toast.success("Updated the category successfully");
      navigate("/admin", { state: { selectedPage: "Categories" } }); // Navigate to Admin with selectedPage "Categories"
    } catch (error) {
      setIsLoading(false);
      if (error.response && error.response.status === 401) {
        toast.error("Unauthorized access. Please login again.");
        navigate("/login");
      } else {
        toast.error(error.message);
      }
    }
  };

  useEffect(() => {
    getCategory();
  }, []);

  return (
    <div>
      <div className="max-w-lg bg-white shadow-lg mx-auto p-7 rounded mt-6">
        <h2 className="font-semibold text-2xl mb-4 text-center">
          Update Category
        </h2>
        {isLoading ? (
          "Loading..."
        ) : (
          <form onSubmit={updateCategory}>
            <div className="space-y-2">
              <div>
                <label>Title</label>
                <input
                  type="text"
                  value={category.title}
                  onChange={(e) =>
                    setCategory({ ...category, title: e.target.value })
                  }
                  className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline"
                  placeholder="Enter Category Title"
                />
              </div>

              <div>
                <label>Description</label>
                <input
                  type="text"
                  value={category.description}
                  onChange={(e) =>
                    setCategory({ ...category, description: e.target.value })
                  }
                  className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline"
                  placeholder="Enter Category Description"
                />
              </div>

              <div>
                <button className="block w-full mt-6 bg-blue-700 text-white rounded-sm px-4 py-2 font-bold hover:bg-blue-600">
                  Update
                </button>
              </div>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default EditCategoryPage;
