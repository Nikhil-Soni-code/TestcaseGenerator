import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import API from "../utils/api";

const Signup = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: ""
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (error) setError("");
  };

  const validateForm = () => {
    if (!formData.username.trim()) {
      setError("Username is required");
      return false;
    }
    if (!formData.email.trim()) {
      setError("Email is required");
      return false;
    }
    if (!formData.email.includes("@")) {
      setError("Please enter a valid email");
      return false;
    }
    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      return false;
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setLoading(true);
    setError("");
    setSuccess("");

    try {
      // First register the user
      const registerRes = await API.post("api/auth/register", formData);
      
      // If registration successful, automatically log them in
      const loginRes = await API.post("api/auth/login", {
        email: formData.email,
        password: formData.password
      });
      
      // Store the token
      localStorage.setItem("token", loginRes.data.token);
      
      setSuccess("🎉 Registration successful! You are now automatically logged in and will be redirected to the Test Case Generator in 1.5 seconds...");
      
      // Clear form
      setFormData({ username: "", email: "", password: "" });
      
      // Redirect to test case page after successful registration and login
      setTimeout(() => {
        navigate("/testcase");
      }, 1500);
      
    } catch (error) {
      if (error.message && error.message.includes("Backend server is not running")) {
        setError("🚨 Backend server is not running! Please start it first with: cd backend && npm start");
      } else {
        setError(error.response?.data?.message || error.message || "Something went wrong");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="bg-gray-800 shadow-2xl rounded-3xl p-10 w-full max-w-sm border border-gray-700">
        <h2 className="text-3xl font-bold text-white text-center mb-2">Create Account</h2>
        <p className="text-gray-300 text-center mb-6">Sign up to get started</p>

        {error && (
          <div className="bg-red-600/20 text-red-400 px-4 py-2 rounded mb-4 text-sm">
            {error}
          </div>
        )}
        {success && (
          <div className="bg-green-600/20 text-green-400 px-4 py-2 rounded mb-4 text-sm">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="flex flex-col">
            <label htmlFor="username" className="mb-1 text-gray-300 font-medium">Username</label>
            <input
              id="username"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter username"
              required
              disabled={loading}
              className="px-4 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-teal-400 focus:outline-none transition shadow-sm hover:shadow-md"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="email" className="mb-1 text-gray-300 font-medium">Email</label>
            <input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter email"
              required
              disabled={loading}
              className="px-4 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-teal-400 focus:outline-none transition shadow-sm hover:shadow-md"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="password" className="mb-1 text-gray-300 font-medium">Password</label>
            <input
              id="password"
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter password"
              required
              disabled={loading}
              className="px-4 py-2 border border-gray-600 rounded-lg bg-gray-700 text-white placeholder-gray-400 focus:ring-2 focus:ring-teal-400 focus:outline-none transition shadow-sm hover:shadow-md"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-teal-500 hover:bg-teal-400 text-white py-2 rounded-lg font-semibold transition shadow-md hover:shadow-lg disabled:opacity-50"
          >
            {loading ? "Creating Account..." : "Sign Up"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <div className="border-t border-gray-700 my-4"></div>
          <p className="text-gray-300 text-sm">
            Already have an account?{" "}
            <Link to="/login" className="text-teal-400 hover:text-teal-300 hover:underline font-medium">
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Signup;
