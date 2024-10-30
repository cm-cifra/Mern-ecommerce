import React, { useState } from "react";
import axios from "axios";
import "../index.css";
import { Link, useNavigate } from "react-router-dom";
import { VITE_BACKEND_URL } from "../App";

function createAcc() {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const newUser = async (e) => {
    e.preventDefault();
    if (name === "" || contact === "" || email === "" || password === "") {
      toast.error("please fill out all input completely");
      return;
    }
    try {
      setIsLoading(true);
      const response = await axios.post(`${VITE_BACKEND_URL}/auth/register`, {
        name: name,
        contact: contact,
        email: email,
        password: password,
        image: "https://cdn-icons-png.flaticon.com/512/6596/6596121.png",
      });
      toast.success(`save ${response.data.name} succesfully`);
      setIsLoading(false);
      navigate("/");
    } catch (error) {
      toast.error(error.message);
      setIsLoading(false);
    }
  };
}
function Signup() {
  const [formData, setFormData] = useState({
    fullName: "",
    contactNumber: "",
    email: "",
    password: "",
  });
  const [profilePicture, setProfilePicture] = useState(null); // For the profile picture
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleFileChange = (e) => {
    setProfilePicture(e.target.files[0]); // Set the profile picture file
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Create FormData to send form data along with the file
    const formDataToSend = new FormData();
    formDataToSend.append("fullName", formData.fullName);
    formDataToSend.append("contactNumber", formData.contactNumber);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("password", formData.password);
    if (profilePicture) {
      formDataToSend.append("profilePicture", profilePicture); // Append the profile picture
    }

    try {
      const response = await axios.post(
        `${VITE_BACKEND_URL}/auth/register`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data", // Ensure file is uploaded correctly
          },
        }
      );
      if (response.status === 201) {
        setSuccess("Account created successfully!");
        setError("");
      }
    } catch (err) {
      setError(
        err.response?.data?.message || "An error occurred during signup."
      );
      setSuccess("");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-blue-100">
      <div className="bg-white shadow-lg rounded-lg flex p-8">
        {/* Left Section */}
        <div className="hidden md:flex justify-center items-center w-1/2">
          <img
            src="https://img.freepik.com/free-vector/shop-with-open-sign_23-2148562251.jpg?semt=ais_hybrid"
            alt="Illustration"
            className="w-full h-auto"
          />
        </div>

        {/* Right Section */}
        <div className="w-full md:w-1/2">
          <h2 className="text-3xl font-semibold text-blue-600 mb-2">
            Signup Now
          </h2>
          <p className="text-gray-500 mb-6">Get latest Product and Sales</p>

          {error && <div className="text-red-500 mb-4">{error}</div>}
          {success && <div className="text-green-500 mb-4">{success}</div>}

          <form
            className="space-y-4"
            onSubmit={handleSubmit}
            encType="multipart/form-data"
          >
            {/* Full Name */}
            <div className="flex items-center border-b border-gray-300 py-2">
              <input
                className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                type="text"
                name="fullName"
                value={formData.fullName}
                onChange={handleChange}
                placeholder="Full Name"
                aria-label="Full Name"
              />
            </div>

            {/* Contact Number */}
            <div className="flex items-center border-b border-gray-300 py-2">
              <input
                className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                type="text"
                name="contactNumber"
                value={formData.contactNumber}
                onChange={handleChange}
                placeholder="Contact Number"
                aria-label="Contact Number"
              />
            </div>

            {/* Email */}
            <div className="flex items-center border-b border-gray-300 py-2">
              <input
                className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="E-mail"
                aria-label="Email"
              />
            </div>

            {/* Password */}
            <div className="flex items-center border-b border-gray-300 py-2">
              <input
                className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Password"
                aria-label="Password"
              />
            </div>

            {/* Profile Picture */}
            <div className="flex items-center border-b border-gray-300 py-2">
              <input
                className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                type="file"
                name="profilePicture"
                onChange={handleFileChange}
                aria-label="Profile Picture"
              />
            </div>

            {/* Sign Up Button */}
            <div className="mt-6">
              <button
                className="bg-blue-500 text-white py-2 px-4 rounded-full w-full hover:bg-blue-600 transition duration-300"
                type="submit"
              >
                Sign Up
              </button>
            </div>
          </form>

          {/* Already have an account */}
          <p className="text-gray-500 mt-4 text-center">
            Already have an account?{" "}
            <a href="/login" className="text-blue-500 hover:text-blue-700">
              Login
            </a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Signup;
