// HeroSection.js
import React from 'react';
import '../styles/HeroSection.css';

const HeroSection = () => {
  return (
    <section className="hero-section">
      <h1>Welcome to Expense Tracker</h1>
      <p>Track your expenses, manage your income, and stay on top of your finances with ease.</p>
      <button onClick={() => window.location.href = '/signin'}>Get Started</button>
    </section>
  );
};

export default HeroSection;
