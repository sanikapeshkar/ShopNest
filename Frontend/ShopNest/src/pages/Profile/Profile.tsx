import React from 'react';
import Products from '../../dummyData/ProductListData';
import './Profile.css';

const Profile = () => {
  const userName = 'John Doe';

  return (
    <div className="profile-page">
      <header className="profile-header">
        <h1 className="profile-title">Welcome, {userName}!</h1>
      </header>

      <section className="order-history-section">
        <h2 className="order-history-title">Your Order History</h2>
        <div className="order-history">
          {Products.map((product) => (
            <div key={product.id} className="order-item">
              <img src={product.image} alt={product.name} className="product-image" />
              <div className="product-details">
                <h3 className="product-name">{product.name}</h3>
                <p className="product-price">Price: ${product.price.toFixed(2)}</p>
                <p className="product-original-price">Original Price: ${product.originalPrice.toFixed(2)}</p>
                <p className="product-discount">Discount: {product.discount}%</p>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Profile;
