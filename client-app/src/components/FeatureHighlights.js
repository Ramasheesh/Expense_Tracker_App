// FeatureHighlights.js
import React from 'react';
import '../styles/FeatureHighlights.css';

const FeatureHighlights = () => {
  return (
    <section className="feature-highlights">
      <div className="feature">
        <h3>Monthly Income Management</h3>
        <p>Add and lock your monthly income to stay organized.</p>
      </div>
      <div className="feature">
        <h3>Expense Tracking</h3>
        <p>Track your expenses by category and manage them efficiently.</p>
      </div>
      <div className="feature">
        <h3>Dashboard</h3>
        <p>View detailed reports with charts to understand your spending habits.</p>
      </div>
    </section>
  );
};

export default FeatureHighlights;
