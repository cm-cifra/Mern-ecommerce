import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { VITE_BACKEND_URL } from "../App";

const Header = () => {
  const [user, setUser] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [imgSrc, setImgSrc] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Fetch user profile data
  const getUser = async () => {
    try {
      setIsLoading(true);

      const token = localStorage.getItem("token");
      const userId = localStorage.getItem("userId");
      if (!token || !userId) {
        throw new Error("Token or User ID not found in localStorage.");
      }

      const response = await axios.get(
        `${VITE_BACKEND_URL}/auth/profile/${userId}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setUser(response.data);
    } catch (error) {
      console.error("Error fetching user profile:", error);
      if (error.response && error.response.status === 401) {
        alert("Session expired. Please log in again.");
        navigate("/login");
      }
    } finally {
      setIsLoading(false);
    }
  };

  // Handle image file change
  const handleImageChange = (e) => {
    setProfileImage(e.target.files[0]);
  };

  // Fetch user data on component mount
  useEffect(() => {
    getUser();
  }, []);

  // Set imgSrc once user data is available
  useEffect(() => {
    if (user && user.image) {
      setImgSrc(`${VITE_BACKEND_URL}${user.image}`);
    } else {
      setImgSrc("https://cdn-icons-png.flaticon.com/512/6596/6596121.png");
    }
  }, [user]);

  if (isLoading) {
    return <div className="text-center text-lg text-gray-600">Loading...</div>;
  }

  return (
    <div className="flex justify-between items-center p-4 bg-white shadow-md">
      <h1 className="text-2xl font-bold">Ecommerce</h1>
      <div className="flex items-center space-x-4">
        <Link
          to="/client"
          className="text-dark-blue hover:text-light-orange font-bold"
        >
          Home
        </Link>
        {user ? (
          <Link to="/profile" className="flex items-center space-x-2">
            <img
              src={imgSrc}
              alt="Profile"
              className="w-10 h-10 rounded-full border-2 border-blue-500 object-cover"
              onError={(e) =>
                (e.target.src =
                  "https://cdn-icons-png.flaticon.com/512/6596/6596121.png")
              }
            />
            <span className="text-lg font-medium text-dark-blue">
              {user.name}
            </span>
          </Link>
        ) : (
          <Link to="/profile" className="p-2 border rounded-full bg-gray-200">
            Profile
          </Link>
        )}
      </div>
    </div>
  );
};

export default Header;
