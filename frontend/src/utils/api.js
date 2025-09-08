import axios from "axios";

const API = axios.create({
  baseURL: "https://testcasegenerator-ias5.onrender.com",
  timeout: 10000, // 10 second timeout
});

// Request interceptor
API.interceptors.request.use((req) => {
  const token = localStorage.getItem("token");
  if (token) req.headers.Authorization = `Bearer ${token}`;
  return req;
});

// Response interceptor for better error handling
API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.code === 'ERR_NETWORK') {
      console.error('❌ Network Error: Backend server is not running');
      console.error('💡 Please start the backend server with: cd backend && npm start');
      return Promise.reject({
        message: "Backend server is not running. Please start the server first.",
        details: "Run 'cd backend && npm start' in your terminal"
      });
    }
    
    if (error.response?.status === 404) {
      return Promise.reject({
        message: "API endpoint not found",
        details: "Check if the backend routes are properly configured"
      });
    }
    
    if (error.response?.status === 500) {
      return Promise.reject({
        message: "Internal server error",
        details: "Check backend logs for more information"
      });
    }
    if (error.response?.status === 401) {
      // Token expired or unauthorized
      localStorage.removeItem("token"); // remove old token
      window.location.href = "/login"; // redirect to login
    }
    return Promise.reject(error);

  }
);

export default API;
