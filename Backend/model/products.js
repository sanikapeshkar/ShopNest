import mongoose from 'mongoose';

const productSchema = new mongoose.Schema({
  id: { type: Number, required: true }, 
  image: { type: String, required: true }, 
  name: { type: String, required: true }, 
  price: { type: Number, required: true }, 
  originalPrice: { type: Number, required: true }, 
});

const Product = mongoose.model("Products", productSchema);

export default Product;
