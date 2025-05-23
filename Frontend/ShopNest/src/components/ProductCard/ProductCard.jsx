import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import './ProductCard.css';
import ProductModal from '../ProductModal/ProductModal';
import { AuthContext } from '../../pages/Login/AuthContext';

const ProductCard = ({ id, image, name, price, discount, originalPrice,stock }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const userId = localStorage.getItem('userId') || null;
  const {
    isAuthenticated
  } = useContext(AuthContext);

  const handleCardClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const finalPrice = discount ? (originalPrice - (originalPrice * discount) / 100).toFixed(2) : price;

  return (
    <>
      <div className="product-card" onClick={handleCardClick}>
        <img
          src={image || '/CouldnotLoad.png'}
          alt="Login"
          onError={(e) => e.target.src = '/CouldnotLoad.png'}
          className='product-card-image'
        />
        <div className="product-card-details">
          <h2 className="product-card-name">{name}</h2>
          <div className="product-card-prices">
            <span className="product-card-price">${finalPrice}</span>
            {discount && (
              <>
                <span className="product-card-original-price">${originalPrice}</span>
                <span className="product-card-discount">{discount}% off</span>
              </>
            )}
          </div>
        </div>
      </div>

      {isModalOpen && (
        <ProductModal
          product={{ id, image, name, price, discount, originalPrice,stock }}
          onClose={handleModalClose}
          userId={userId}
          isAuthenticated={isAuthenticated}
          stock={stock}
        />
      )}
    </>
  );
};

ProductCard.propTypes = {
  id: PropTypes.string.isRequired,
  image: PropTypes.string,
  name: PropTypes.string.isRequired,
  price: PropTypes.number.isRequired,
  originalPrice: PropTypes.number,
  discount: PropTypes.number,
};

ProductCard.defaultProps = {
  image: null,
  originalPrice: null,
  discount: null,
};

export default ProductCard;
