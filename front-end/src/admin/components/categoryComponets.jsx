import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { VITE_BACKEND_URL } from "../../App";

const Category = ({ category, getCategories }) => {
  const deleteCategory = async (id) => {
    const result = await Swal.fire({
      title: "Do you really want to delete the category?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, delete it!",
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
    });
    if (result.isConfirmed) {
      try {
        await axios.delete(`${VITE_BACKEND_URL}/category/${id}`, {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`, // Add token if authentication is required
          },
        });
        toast.success("Category deleted successfully");
        getCategories(); // Refresh category list after deletion
      } catch (error) {
        toast.error(error.response?.data?.message || error.message); // Display error message correctly
      }
    }
  };

  return (
    <tr className="border-b hover:bg-gray-100">
      <td className="py-2 px-4">{category.title}</td>
      <td className="py-2 px-4">{category.description}</td>
      <td className="py-2 px-4 flex space-x-2">
        <Link
          to={`/edit-Category/${category._id}`}
          className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
        >
          Edit
        </Link>
        <button
          onClick={() => deleteCategory(category._id)}
          className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
        >
          Delete
        </button>
      </td>
    </tr>
  );
};

export default Category;
