import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { VITE_BACKEND_URL } from "../../App";

const CreatePage = ({ getCategories }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const saveCategory = async (e) => {
    e.preventDefault();

    if (title.trim() === "" || description.trim() === "") {
      toast.error("Please fill out all fields.");
      return;
    }

    try {
      setIsLoading(true);
      const response = await axios.post(`${VITE_BACKEND_URL}/category`, {
        title,
        description,
      });
      toast.success(`Category "${response.data.title}" saved successfully.`);
      getCategories();
    } catch (error) {
      toast.error(error.response?.data?.message || "Something went wrong!");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white shadow-md p-6 rounded-md">
      <h2 className="font-semibold text-xl mb-4 text-center">
        Create Category
      </h2>
      <form onSubmit={saveCategory}>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-300"
              placeholder="Enter Title"
            />
          </div>
          <div>
            <label className="block text-sm font-medium">Description</label>
            <input
              type="text"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full block border p-3 text-gray-600 rounded focus:outline-none focus:shadow-outline focus:border-blue-300"
              placeholder="Enter Description"
            />
          </div>
          <div>
            <button
              type="submit"
              className={`block w-full mt-6 text-white rounded-sm px-4 py-2 font-bold ${
                isLoading
                  ? "bg-blue-400 cursor-not-allowed"
                  : "bg-blue-700 hover:bg-blue-600"
              }`}
              disabled={isLoading}
            >
              {isLoading ? "Saving..." : "Save Category"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CreatePage;
