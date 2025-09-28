import React from "react";
import './Navbar.css'; // assuming you have a CSS file for styles

const Navbar = (props) => {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-logo">
          <h2>{props.title}</h2>
        </div>
        <ul className="navbar-links">
          <li><a href="/">Home</a></li>
          <li><a href="/about">About</a></li>
          <li><a href="/contact">Contact</a></li>
          <li><a href="/profile">Profile</a></li>
          <li><a href="/login">Login</a></li>
          <li><a href="/signup">SignUp</a></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;