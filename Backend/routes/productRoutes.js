import express from "express";
import Product from "../model/products.js";
import multer from "multer";
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const router = express.Router();

// Get current file path in ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Create uploads directory if it doesn't exist with correct path
const uploadDir = path.join(__dirname, '../uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

// Configure storage with correct path
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, uploadDir)
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '-' + file.originalname)
    }
});

const upload = multer({
    storage: storage,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB limit
    }
}).single('image');

router.post("/products", (req, res) => {
  upload(req, res, async function (err) {
      if (err) {
          return res.status(400).json({ error: "Upload failed", details: err.message });
      }

      try {
          console.log("Received req.body:", req.body);
          console.log("Received req.file:", req.file);

          if (!req.body.name || !req.body.price || !req.body.discount) {
              return res.status(400).json({ error: "Missing required fields" });
          }

          const { id, ...productData } = req.body;

          const newProduct = new Product({
              ...productData,
              price: Number(productData.price),
              discount: Number(productData.discount),
              stock: productData.stock ? Number(productData.stock) : 0,
              image: req.file ? `/uploads/${req.file.filename}` : req.body.image || ""
          });

          await newProduct.save();
          res.status(201).json(newProduct);
      } catch (error) {
          console.error("Product creation error:", error);
          res.status(500).json({ error: error.message });
      }
  });
});


// Get all products
router.get("/products", async (req, res) => {
  try {
    const products = await Product.find();
    res.send(products);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Get a product by ID
router.get("/products/:id", async (req, res) => {
  try {
    const product = await Product.findById(req.params.id);
    if (!product) {
      return res.status(404).send();
    }
    res.send(product);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Update a product by ID
router.patch("/products/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });
    if (!product) {
      return res.status(404).send();
    }
    res.send(product);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Delete a product by ID
router.delete("/products/:id", async (req, res) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) {
      return res.status(404).send();
    }
    res.send(product);
  } catch (error) {
    res.status(500).send(error);
  }
});

export default router;
