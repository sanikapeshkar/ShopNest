import React, { useState } from 'react';
import './ProductModal.css';
import { addToCart } from '../../services/cart.service';
import { toast } from 'react-toastify'; 
import 'react-toastify/dist/ReactToastify.css';
import Loader from '../Loader/Loader';
const ProductModal = ({ product, onClose, userId, isAuthenticated }) => {
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(false); // Loader state

  const handleIncrement = () => {
    setQuantity(prev => prev + 1);
  };

  const handleDecrement = () => {
    if (quantity > 1) {
      setQuantity(prev => prev - 1);
    }
  };

  const handleAddToCart = async () => {
    if (!isAuthenticated) {
      toast.error("Please login first to add items to the cart.");
      return;
    }

    setLoading(true); 

    try {
      const cartData = {
        productId: product.id,
        quantity: quantity,
      };

      await addToCart(cartData, userId);
      toast.success("Item added to cart successfully!");
      onClose();
    } catch (error) {
      console.error("❌ Error adding item to cart:", error);
      toast.error("Failed to add item to cart. Please try again.");
    }

    setLoading(false); 
  };

  const discountedPrice = product.discount
    ? (product.originalPrice - (product.originalPrice * product.discount) / 100).toFixed(2)
    : product.price;

  return (
    <div className="product-modal-overlay" onClick={onClose}>
      <div className="product-modal" onClick={e => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>X</button>

        <div className="modal-content">
          <div className="modal-image-container">
            <img src={product.image} alt={product.name} className="modal-image" />
          </div>

          <div className="modal-details">
            <h2 className="modal-title">{product.name}</h2>

            <div className="modal-price-container">
              <span className="modal-price">${discountedPrice}</span>
              {product.discount && (
                <>
                  <span className="modal-original-price">
                    ${product.originalPrice}
                  </span>
                  <span className="modal-discount">
                    {product.discount}% OFF
                  </span>
                </>
              )}
            </div>

            <div className="quantity-controls">
              <button
                className="quantity-btn"
                onClick={handleDecrement}
                disabled={quantity === 1}
              >
                -
              </button>
              <span className="quantity-display">{quantity}</span>
              <button
                className="quantity-btn"
                onClick={handleIncrement}
              >
                +
              </button>
            </div>

            <button className="add-to-cart-btn" onClick={handleAddToCart} disabled={loading}>
              {loading ? <div>Adding to Cart ... </div>
              : `Add to Cart - $${(discountedPrice * quantity).toFixed(2)}`}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductModal;
