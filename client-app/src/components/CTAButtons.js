// CTAButtons.js
import React from 'react';
import '../styles/CTAButtons.css';

const CTAButtons = ({ onCTAClick }) => {
  return (
    <section className="cta-buttons">
      <button onClick={() => onCTAClick('/add-income')}>Add Income</button>
      <button onClick={() => onCTAClick('/track-expenses')}>Track Expenses</button>
      <button onClick={() => onCTAClick('/dashboard')}>Go to Dashboard</button>
    </section>
  );
};
export default CTAButtons;
