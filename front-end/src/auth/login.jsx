import React, { useState } from "react";
import axios from "axios";
import "../index.css";
import FotterPage from "../user/footerpage";
import { VITE_BACKEND_URL } from "../App";
import AuthHeader from "./header";
import FooterPage from "../user/footerpage";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Send login request to the backend
      const response = await axios.post(`${VITE_BACKEND_URL}/auth/login`, {
        email,
        password,
      });

      // Get the token and userId from response
      const { token, userId } = response.data;

      // Store the token and userId in localStorage
      localStorage.setItem("token", token);
      localStorage.setItem("userId", userId); // Save the userId

      // Redirect the user after successful login
      window.location.href = `/admin`; // Adjust this route as per your app
    } catch (error) {
      setLoading(false);
      if (error.response && error.response.data.message) {
        setError(error.response.data.message); // Backend error message
      } else {
        setError("An error occurred. Please try again."); // Generic error message
      }
    }
  };

  return (
    <>
      <AuthHeader />
      <div className="flex justify-center items-center min-h-screen bg-blue-100">
        <div className="bg-white shadow-lg rounded-lg flex flex-col md:flex-row p-8">
          {/* Left Section - Form */}
          <div className="flex flex-col justify-center items-start w-full md:w-1/2 p-6">
            <h2 className="text-3xl font-semibold text-blue-600 mb-6">
              Login Now
            </h2>

            {error && <p className="text-red-500 mb-4">{error}</p>}

            <form className="space-y-4 w-full" onSubmit={handleLogin}>
              {/* Email */}
              <div className="flex items-center border-b border-gray-300 py-2">
                <input
                  className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                  type="email"
                  placeholder="E-mail"
                  aria-label="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>

              {/* Password */}
              <div className="flex items-center border-b border-gray-300 py-2">
                <input
                  className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
                  type="password"
                  placeholder="Password"
                  aria-label="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                />
              </div>

              {/* Login Button */}
              <div className="mt-6">
                <button
                  className="bg-blue-500 text-white py-2 px-4 rounded-full w-full hover:bg-blue-600 transition duration-300"
                  type="submit"
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "Login"}
                </button>
              </div>
            </form>

            {/* Sign Up Link */}
            <p className="text-gray-500 mt-4">
              Don't have an account?{" "}
              <a href="/signup" className="text-blue-500 hover:text-blue-700">
                Sign up
              </a>
            </p>
          </div>

          {/* Right Section - Image */}
          <div className="w-full md:w-1/2">
            <img
              src="https://img.freepik.com/free-vector/shop-with-open-sign_23-2148562251.jpg?semt=ais_hybrid"
              alt="Illustration"
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
      <FooterPage />
    </>
  );
}

export default Login;
