import React from 'react';
import PropTypes from 'prop-types';
import ProductCard from '../ProductCard/ProductCard';
import './ProductList.css';

const ProductList = ({ products }) => {

    if (!Array.isArray(products)) {
      return <div>No products available</div>;
    }
  
    if (products.length === 0) {
      return <div>No products found</div>;
    }
  return (
    <div className="product-list">
      {products?.map((product) => (
        <ProductCard
          key={product.id}
          id={product._id}
          image={product.image}
          name={product.name}
          price={product.price}
          originalPrice={product.originalPrice}
          discount={product.discount}
          stock={product.stock}
        />
      ))}
    </div>
  );
};

ProductList.propTypes = {
  products: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.oneOfType([PropTypes.string, PropTypes.number]).isRequired,
      image: PropTypes.string.isRequired,
      name: PropTypes.string.isRequired,
      price: PropTypes.number.isRequired,
      originalPrice: PropTypes.number,
      discount: PropTypes.number,
    })
  ).isRequired,
};

export default ProductList;
