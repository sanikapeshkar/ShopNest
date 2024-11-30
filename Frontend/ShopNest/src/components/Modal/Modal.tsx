import React from 'react';
import PropTypes from 'prop-types';
import './Modal.css';
import Button from '../Button/Button';

const Modal = ({ product, onClose }) => {
  if (!product) return null;

  const discountedPrice = product.discount
    ? (product.originalPrice - (product.originalPrice * product.discount) / 100).toFixed(2)
    : null;

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
            <Button buttonType="default" onClick={() => console.log('Added to cart')}>
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
