// Footer.js
import React from 'react';
import '../styles/Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <p>&copy; 2024 Expense Tracker. All rights reserved.</p>
      <div className="footer-links">
        <a href="/about">About</a>
        <a href="/contact">Contact</a>
      </div>
    </footer>
  );
};

export default Footer;
