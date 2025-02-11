import express from "express";
import mongoose from "mongoose";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
const app = express();
const PORT = process.env.PORT || 4000;

const mongoURI = "mongodb://localhost:27017/Shopify";

// CORS configuration
const corsOptions = {
  origin: 'http://localhost:5173', 
  credentials: true,
  optionsSuccessStatus: 200
};


// Fix for __dirname in ES Module
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middleware
app.use(cors(corsOptions));
app.use(express.json()); // Uncomment if you're parsing JSON requests
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// Database connection
const connectToDatabase = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
};

connectToDatabase();

// Routes
app.get("/", (req, res) => {
  res.send("CORS-enabled backend running!");
});

app.use("/api", productRoutes);
app.use("/api", orderRoutes);
app.use("/api", userRoutes);
app.use("/api", cartRoutes);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

// Listen for connection events
mongoose.connection.on("connected", () => {
  console.log("Mongoose connected to DB");
});

// Optional: Handle connection errors
mongoose.connection.on("error", (err) => {
  console.error("MongoDB connection error:", err);
});

// Optional: Handle disconnection
mongoose.connection.on("disconnected", () => {
  console.log("Mongoose disconnected from DB");
});
