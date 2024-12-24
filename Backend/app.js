import express from "express";
import mongoose from "mongoose";
import productRoutes from "./routes/productRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import cartRoutes from "./routes/cartRoutes.js";
import orderRoutes from "./routes/orderRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

// MongoDB connection URI
const mongoURI = "mongodb://localhost:27017/Shopify";


app.use(cors(corsOptions));

// Routes
app.get('/', (req, res) => {
  res.send('CORS-enabled backend running!');
});
// Middleware
app.use(express.json());

const connectToDatabase = async () => {
  try {
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("Connected to MongoDB");
  } catch (err) {
    console.error("Error connecting to MongoDB:", err);
  }
};

connectToDatabase();

// Basic route
app.get("/", (req, res) => {
  res.send("Hello, World!");
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

app.use("/api", productRoutes);
app.use("/api", orderRoutes);
app.use("/api", userRoutes);
app.use("/api", cartRoutes);
mongoose.connection.on("connected", () => {
  console.log("Mongoose connected to DB");
});
