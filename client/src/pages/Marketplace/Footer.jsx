import React, { useState } from 'react';
import './footer.css';

// Footer component
const Footer = () => {
  const [email, setEmail] = useState('');

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim() === '') {
      alert('Please enter your email before subscribing.');
    } else {
      // Perform subscription logic here
      alert('You have successfully subscribed to our newsletter! Watch out for new updates.');
      // Optionally, you can reset the email input after successful subscription
      setEmail('');
    }
  };

  return (
    <div>
      <footer className="marketplace-footer">
        <div className="footer-content">
          {/* Short About Section */}
          <div className="short-about">
            <h2>PRODUCE101</h2>
            <p>Your direct link to farm-fresh goodness, delivering a curated selection of locally sourced fruits, vegetables, and more to your doorstep. Elevate your culinary experience with quality produce, supporting local farmers and fostering a sustainable connection between producers and consumers.</p>
          </div>

          {/* Social Media Links Section */}
          <div className="social-media-links">
            <h3>Follow us</h3>
            <ul>
              <li><a href="https://www.facebook.com/produce101" className="footer-link" target="_blank" rel="noopener noreferrer">Facebook</a></li>
              <li><a href="https://www.instagram.com/produce101" className="footer-link" target="_blank" rel="noopener noreferrer">Instagram</a></li>
              <li><a href="https://www.twitter.com/produce101" className="footer-link" target="_blank" rel="noopener noreferrer">Twitter</a></li>
            </ul>
          </div>

          {/* Newsletter Section */}
          <div className="newsletter">
            <h3>Subscribe to Our Newsletter</h3>
            <form onSubmit={handleSubscribe}>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </div>

        {/* Rights Reserved Section */}
        <div className="rights-reserved">
          <p>&copy; 2024 <span className="company-name">PRODUCE101.</span> All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}

export default Footer;
