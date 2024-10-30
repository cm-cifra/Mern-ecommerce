import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "../index.css";
import { VITE_BACKEND_URL } from "../App";
import AuthHeader from "./header";
import FotterPage from "../user/footerpage";
function Signup() {
  const [name, setName] = useState("");
  const [contact, setContact] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const newUser = async (e) => {
    e.preventDefault();
    if (name === "" || contact === "" || email === "" || password === "") {
      toast.error("Please fill out all input fields completely");
      return;
    }
    try {
      setIsLoading(true);
      const response = await axios.post(`${VITE_BACKEND_URL}/auth/register`, {
        name,
        contact,
        email,
        password,
        image: "https://cdn-icons-png.flaticon.com/512/6596/6596121.png", // Default image
      });
      toast.success(`Account for ${response.data.name} created successfully`);
      setIsLoading(false);
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.message || "Error registering user");
      setIsLoading(false);
    }
  };

  return (
    <>
      <AuthHeader />
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
            <p className="text-gray-500 mb-6">
              Get the latest products and deals!
            </p>

            <form className="space-y-4" onSubmit={newUser}>
              {/* Full Name */}
              <div className="flex items-center border-b border-gray-300 py-2">
                <input
                  className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                  type="text"
                  name="fullName"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
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
                  value={contact}
                  onChange={(e) => setContact(e.target.value)}
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
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
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
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="Password"
                  aria-label="Password"
                />
              </div>

              {/* Sign Up Button */}
              <div className="mt-6">
                <button
                  className="bg-blue-500 text-white py-2 px-4 rounded-full w-full hover:bg-blue-600 transition duration-300"
                  type="submit"
                >
                  {isLoading ? "Signing Up..." : "Sign Up"}
                </button>
              </div>
            </form>

            {/* Already have an account */}
            <p className="text-gray-500 mt-4 text-center">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-500 hover:text-blue-700">
                Login
              </Link>
            </p>
          </div>
        </div>
      </div>{" "}
      <FotterPage />
    </>
  );
}

export default Signup;
