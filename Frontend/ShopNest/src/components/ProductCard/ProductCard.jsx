import React, { useState } from 'react';
import PropTypes from 'prop-types';
import './ProductCard.css';
import Modal from '../Modal/Modal';

const ProductCard = ({id, image, name, price, discount, originalPrice }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const discountedPrice = discount
    ? (originalPrice - (originalPrice * discount) / 100).toFixed(2)
    : null;

  const handleCardClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <div className="product-card" onClick={handleCardClick}>
        <img src={image} alt={name} className="product-card-image" />
        <div className="product-card-details">
          <h2 className="product-card-name">{name}</h2>
          <div className="product-card-prices">
            <span className="product-card-price">
              ${discountedPrice || price}
            </span>
            {discount && (
              <>
                <span className="product-card-original-price">
                  ${originalPrice}
                </span>
                <span className="product-card-discount">{discount}% off</span>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Render Modal */}
      {isModalOpen && (
        <Modal
          product={{ id,image, name, price, discount, originalPrice }}
          onClose={handleModalClose}
        />
      )}
    </>
  );
};

ProductCard.propTypes = {
  image: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  originalPrice: PropTypes.number,
  discount: PropTypes.number,
};

ProductCard.defaultProps = {
  originalPrice: null,
  discount: null,
};

export default ProductCard;
