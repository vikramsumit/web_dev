// Import necessary modules
import express from "express";
import mongoose from "mongoose";
import cors from "cors"; // allow frontend requests
import dotenv from "dotenv";
import employeeRouter from "./routes/employees.js";

// Load environment variables
dotenv.config();

// Create Express application
const app = express();

// Middleware setup
app.use(cors());
app.use(express.json());

// Logging middleware for incoming requests
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`);
  next();
});

// MongoDB connection
const mongoUri = process.env.MONGODB_URI;
if (!mongoUri) {
  console.error("❌ MONGODB_URI is not defined in environment variables");
  process.exit(1);
}
mongoose.connect(mongoUri).then(() => {
  console.log("✅ Connected to MongoDB");
}).catch((err) => {
  console.error("❌ MongoDB connection error:", err);
  process.exit(1);
});

// Routes setup
app.use('/', employeeRouter);

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`✅ Server running on http://localhost:${PORT}`));
