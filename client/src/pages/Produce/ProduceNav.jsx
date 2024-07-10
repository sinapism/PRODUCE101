import React from 'react';
import { Link } from 'react-router-dom';
import './produceNav.css';

const ProduceNav = () => {
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

  return (
    <div className="sidebar">
      <div className="nav">
        <div className="nav-left">
          <h1 className="h1-produce">
            <Link to="/produce" style={{ color: 'inherit', textDecoration: 'none' }}>
              PRODUCE101
            </Link>
          </h1>
          <p className="admin-panel">admin panel</p>
        </div>
        
        <div className="nav-buttons">
          <Link to="/Undercons" className="nav-button">
            Dashboard
          </Link>

          <Link to="/Undercons" className="nav-button">
            Orders
          </Link>
          
          <Link to="/produce" className="nav-button">
            Inventory
          </Link>

          {/* Button for logout */}
          <button className="logout" onClick={handleLogout}>
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProduceNav;
