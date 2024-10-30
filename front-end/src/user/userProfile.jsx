import React, { useState, useEffect } from "react";
import axios from "axios";
import { VITE_BACKEND_URL } from "../App";
import { useNavigate } from "react-router-dom";
import Header from "../product/clientHeader";
function ProfilePage() {
  const [user, setUser] = useState(null);
  const [profileImage, setProfileImage] = useState(null);
  const [imgSrc, setImgSrc] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
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

  // Update profile
  const updateProfile = async () => {
    const formData = new FormData();
    formData.append("name", user.name);
    formData.append("contact", user.contact);
    if (profileImage) {
      formData.append("image", profileImage);
    }

    try {
      const token = localStorage.getItem("token");

      const response = await axios.put(
        `${VITE_BACKEND_URL}/auth/profile/${user._id}`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setUser(response.data);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating profile:", error);
    }
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
    <div className="bg-gray-100 min-h-screen p-4">
      <Header />
      <div className="max-w-xl mx-auto bg-white rounded-lg shadow-lg overflow-hidden p-10 m-6">
        {user ? (
          <div className="text-center">
            <div className="mb-4">
              <img
                src={imgSrc}
                alt="Profile"
                className="w-32 h-32 rounded-full border-2 border-blue-500 object-cover"
                onError={(e) =>
                  (e.target.src =
                    "https://cdn-icons-png.flaticon.com/512/6596/6596121.png")
                }
              />
              {isEditing && (
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageChange}
                  className="mt-2 border border-gray-300 rounded p-2"
                />
              )}
            </div>
            <h2 className="text-2xl font-semibold text-gray-800">
              {user.name}
            </h2>
            <p className="text-gray-600">Contact: {user.contact}</p>
            <p className="text-gray-600">Email: {user.email}</p>
            {isEditing ? (
              <button
                onClick={updateProfile}
                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                Save Changes
              </button>
            ) : (
              <button
                onClick={() => setIsEditing(true)}
                className="mt-4 bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
              >
                Edit Profile
              </button>
            )}
          </div>
        ) : (
          <div className="text-center text-gray-600">No user data found.</div>
        )}
      </div>{" "}
    </div>
  );
}

export default ProfilePage;
