import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  productName: { type: String},
  productPrice: { type: Number},
  description: { type: String },
});

const Product = mongoose.model("Products", productSchema);

export default Product;
