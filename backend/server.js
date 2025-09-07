import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.routes.js";
import testcaseRoutes from "./routes/testcase.routes.js";


dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/testcase", testcaseRoutes);

// MongoDB connect
const MONGODB_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/testcasegenerator";

const PORT = process.env.PORT || 5000;

mongoose.connect(MONGODB_URI)
  .then(() => {
    console.log("✅ MongoDB Connected to:", MONGODB_URI);
    app.listen(PORT, () => {
      console.log(`🚀 Server running on port ${PORT}`);
      console.log(`🌐 API available at: http://localhost:${PORT}/api`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    console.log("💡 Make sure MongoDB is running and your .env file is configured correctly");
  });

// Basic error handling
app.use((err, req, res, next) => {
  console.error("❌ Server error:", err);
  res.status(500).json({ message: "Internal server error" });
});

// 404 handler - Fix the route pattern
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});
