import React from 'react';
import './Footer.css'; // assuming you have a CSS file for styles

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">

        <div className="footer-section">
          <h3>MyWebsite</h3>
          <p>&copy; {new Date().getFullYear()} MyWebsite. All rights reserved.</p>
        </div>

        <div className="footer-section">
          <h4>Navigation</h4>
          <ul className="footer-links">
            <li><a href="/">Home</a></li>
            <li><a href="/about">About</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </div>

        <div className="footer-section">
          <h4>Follow Us</h4>
          <div className="social-icons">
            <a href="#"><i className="fab fa-facebook"></i></a>
            <a href="#"><i className="fab fa-twitter"></i></a>
            <a href="#"><i className="fab fa-instagram"></i></a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
