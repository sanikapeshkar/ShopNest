// Modal.jsx
import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import './Modal.css';
import Button from '../Button/Button';
import { AuthContext } from '../../pages/Login/AuthContext';
import { addToCart } from '../../services/cart.service';

const Modal = ({ product, onClose }) => {
  const [quantity,setQuantity]=useState(1);
  const { isAuthenticated, setLoginPopup,userId } = useContext(AuthContext);
  
  if (!product) return null;

  const discountedPrice = product.discount
    ? (product.originalPrice - (product.originalPrice * product.discount) / 100).toFixed(2)
    : null;

  const handleAddToCart = () => {
    if (!isAuthenticated) {
      setLoginPopup(true)
      return;
    }else{
      addToCart({productId:product.id,quantity:quantity},userId);
    }
    console.log('Added to cart');
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={onClose}>
          &times;
        </button>
        <div className="modal-product-details">
          <img src={product.image} alt={product.name} className="modal-product-image" />
          <h2>{product.name}</h2>
          <p>Price: ${discountedPrice || product.price}</p>
          {product.discount && <p>Original Price: ${product.originalPrice}</p>}
          <p>Discount: {product.discount}%</p>
          <div className="modal-actions">
            <label>
              Quantity:
              <input type="number" defaultValue={1} min={1} className="modal-quantity-input" />
            </label>
            <Button buttonType="default" onClick={handleAddToCart}>
              Add to Cart
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

Modal.propTypes = {
  product: PropTypes.shape({
    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    price: PropTypes.number.isRequired,
    originalPrice: PropTypes.number,
    discount: PropTypes.number,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Modal;
