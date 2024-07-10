import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import './marketnav.css'; 

const MarketNav = () => {

  const [cart, setCart] = useState({});
  const [showCart, setShowCart] = useState(false);

  const handleToggleCart = () => {
    setShowCart(!showCart);
  };

  const fetchCart = async () => {
    try {
      const res = await axios.get("http://localhost:8800/cart");
      setCart(res.data);
    } catch (err) {
      console.error(err);
    }
  };

  const handleLogout = () => {
    const confirmLogout = window.confirm("Are you sure you want to logout?");

    if (confirmLogout) {
      // Add your logout logic here, e.g., redirecting to a logout route
      // You can also use a state management library like Redux to manage authentication state
      console.log("Logging out...");

      // Redirect to "/"
      window.location.href = "/"; // Using window.location.href to force a full page reload
    } else {
      // The user clicked "Cancel" in the window alert
      console.log("Logout canceled.");
    }
  };

// eslint-disable-next-line no-unused-vars
  const handleCheckout = async () => {
    try {
      await axios.post("http://localhost:8800/cart/checkout");
      fetchCart();
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <div className="market-nav">
        <Link to="/marketplace" style={{ textDecoration: "none" }}>
          <h1 className="h1-produce">PRODUCE101</h1>
        </Link>

        <div className="nav-buttons">

          <button className="home-button">
            <Link to="/marketplace" style={{ color: "inherit", textDecoration: "none" }}>
              Home
            </Link>
          </button>

          <button className="shop-button">
            <Link to="/shop" style={{ color: "inherit", textDecoration: "none" }}>
              Shop
            </Link>
          </button>

          <button onClick={handleToggleCart} className="cart-button">
            <Link to="/cart" style={{ color: "inherit", textDecoration: "none" }}>
              Cart ({Object.values(cart).reduce((total, item) => total + item.quantity, 0)})
            </Link>
          </button>

          {/* Button for logout */}
          <button className="logout" onClick={handleLogout}>
            Logout
          </button>

        </div>
      </div>
    </div>
  )
}

export default MarketNav;
