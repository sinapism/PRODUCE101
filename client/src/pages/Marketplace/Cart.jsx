import React from 'react';
import MarketNav from './MarketNav';
import Footer from './Footer';
import './cart.css'; // Import the CSS file

// Cart component
const Cart = ({ cart, handleQuantityChange, handleCheckout }) => {
  return (
    <div>
      <MarketNav />

      <div className="center-message">
        <h2>Under Development</h2>
        <p>This feature is currently under development. Check back later for updates!</p>
      </div>

      <Footer />
    </div>
  );
};

export default Cart;
