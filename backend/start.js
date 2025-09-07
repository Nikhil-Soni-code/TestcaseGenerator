import dotenv from "dotenv";

// Load environment variables
dotenv.config();

// Set default values for optional variables
if (!process.env.MONGODB_URI) {
  process.env.MONGODB_URI = "mongodb://localhost:27017/testcasegenerator";
  console.log("ℹ️  Using default MongoDB URI:", process.env.MONGODB_URI);
}

if (!process.env.PORT) {
  process.env.PORT = "5000";
  console.log("ℹ️  Using default port:", process.env.PORT);
}

if (!process.env.JWT_SECRET) {
  process.env.JWT_SECRET = "your_super_secret_jwt_key_here_make_it_long_and_random_12345";
  console.log("⚠️  Using default JWT_SECRET - Please update in production");
}

console.log("🚀 Starting AI Test Case Generator Backend...");
console.log("🔗 MongoDB URI:", process.env.MONGODB_URI);
console.log("🌐 Port:", process.env.PORT);

// Import and start the server
import "./server.js";
