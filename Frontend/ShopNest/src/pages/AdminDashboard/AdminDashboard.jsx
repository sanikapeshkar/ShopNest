import React, { useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "./AdminDashboard.css";
import {
  addProduct,
  deleteProduct,
  getAllProducts,
} from "../../services/products.service";
import "react-toastify/dist/ReactToastify.css";

const AdminDashboard = ({products,setProducts})=>{
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    stock: "",
    discount: "",
    image: "",
    description: "",
  });


  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);


  const validateForm = () => {
    let tempErrors = {};
    if (!newProduct.name.trim()) tempErrors.name = "Product name is required.";
    if (!newProduct.price || newProduct.price <= 0)
      tempErrors.price = "Valid price is required.";
    if (!newProduct.stock || newProduct.stock < 0)
      tempErrors.stock = "Valid stock is required.";
    if (newProduct.discount < 0 || newProduct.discount > 100)
      tempErrors.discount = "Discount must be between 0 and 100.";
    if (!newProduct.image.trim()) tempErrors.image = "Image is required.";
    if (!newProduct.description.trim())
      tempErrors.description = "Description is required.";

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setNewProduct((prev) => ({ ...prev, image: imageUrl }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);
    const productToAdd = {
      ...newProduct,
      price: parseFloat(newProduct.price),
      stock: parseInt(newProduct.stock),
      discount: parseFloat(newProduct.discount),
    };

    try {
      await addProduct(productToAdd);
      const updatedProducts = await getAllProducts();

      setProducts(updatedProducts);

      setNewProduct({
        name: "",
        price: "",
        stock: "",
        discount: "",
        image: "",
        description: "",
      });
      setErrors({});
      toast.success("Product added successfully! 🎉");
    } catch (error) {
      toast.error("Error adding product. Try again! ❌");
      console.error("Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleDelete = async (productId) => {
    try {
      await deleteProduct(productId);
      const updatedProducts = await getAllProducts();
      setProducts(updatedProducts);
      toast.success("Product deleted successfully! 🗑️");
    } catch (error) {
      toast.error("Error deleting product. Try again! ❌");
      console.error("Error:", error);
    }
  };

  return (
    <div className="admin-dashboard">
      <ToastContainer position="top-right" autoClose={3000} />
      <div className="admin-content">
        <div className="add-product-section">
          <h2>Add New Product</h2>
          <form onSubmit={handleSubmit} className="add-product-form">
            <div className="form-group">
              <label htmlFor="name">Product Name</label>
              <input
                type="text"
                id="name"
                name="name"
                value={newProduct.name}
                onChange={handleInputChange}
                required
              />
              {errors.name && <p className="error">{errors.name}</p>}
            </div>

            <div className="form-row">
              <div className="form-group">
                <label htmlFor="price">MRP Price</label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={newProduct.price}
                  onChange={handleInputChange}
                  required
                />
                {errors.price && <p className="error">{errors.price}</p>}
              </div>

              <div className="form-group">
                <label htmlFor="stock">Stock</label>
                <input
                  type="number"
                  id="stock"
                  name="stock"
                  value={newProduct.stock}
                  onChange={handleInputChange}
                  required
                />
                {errors.stock && <p className="error">{errors.stock}</p>}
              </div>

              <div className="form-group">
                <label htmlFor="discount">Discount (%)</label>
                <input
                  type="number"
                  id="discount"
                  name="discount"
                  value={newProduct.discount}
                  onChange={handleInputChange}
                />
                {errors.discount && <p className="error">{errors.discount}</p>}
              </div>
            </div>

            <div className="form-group">
              <label htmlFor="image">Image URL</label>
              <input
                type="url"
                id="image"
                name="image"
                value={newProduct.image}
                onChange={handleInputChange}
                placeholder="Paste image URL or upload a file"
              />
              {errors.image && <p className="error">{errors.image}</p>}

              {newProduct.image && (
                <div className="image-preview">
                  <img
                    src={newProduct.image}
                    alt="Preview"
                    style={{ width: "100px", height: "100px" }}
                  />
                </div>
              )}
            </div>

            <div className="form-group">
              <label htmlFor="description">Description</label>
              <textarea
                id="description"
                name="description"
                value={newProduct.description}
                onChange={handleInputChange}
                rows="4"
              />
              {errors.description && <p className="error">{errors.description}</p>}
            </div>

            <button type="submit" className="submit-btn" disabled={isSubmitting}>
              {isSubmitting ? "Adding..." : "Add Product"}
            </button>
          </form>
        </div>

        <div className="product-list-section">
          <h2>Current Products</h2>
          <div className="products-grid">
            {products.map((product) => (
              <div key={product.id} className="product-item">
                <img src={product.image} alt={product.name} />
                <div className="product-info">
                  <h3>{product.name}</h3>
                  <p>${product.price}</p>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(product.id)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
