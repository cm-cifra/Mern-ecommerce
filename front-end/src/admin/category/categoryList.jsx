import { useEffect, useState } from "react";
import axios from "axios";
import Category from "../components/categoryComponets";
import { useNavigate } from "react-router-dom";
import { VITE_BACKEND_URL } from "../../App";
import CreatePage from "./createCategory";

const CategoryList = () => {
  const [categories, setCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const getCategories = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${VITE_BACKEND_URL}/category`);
      setCategories(response.data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getCategories();
  }, []);

  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-bold">Category List</h1>
      </div>
      <div className="flex gap-8">
        <div className="w-2/3">
          {isLoading ? (
            <p>Loading...</p>
          ) : categories.length > 0 ? (
            <div className="overflow-x-auto">
              <table className="min-w-full bg-white border border-gray-300">
                <thead>
                  <tr className="bg-gray-200">
                    <th className="py-2 px-4 border-b text-left">Title</th>
                    <th className="py-2 px-4 border-b text-left">
                      Description
                    </th>
                    <th className="py-2 px-4 border-b text-left">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((category, index) => (
                    <Category
                      key={index}
                      category={category}
                      getCategories={getCategories}
                    />
                  ))}
                </tbody>
              </table>
            </div>
          ) : (
            <p>No categories available</p>
          )}
        </div>
        <div className="w-1/3">
          <CreatePage getCategories={getCategories} />
        </div>
      </div>
    </div>
  );
};

export default CategoryList;
