import React from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/ErrorPage.css';

const ErrorPage = () => {
  const location = useLocation();
  const { state } = location;

  return (
    <div className="error-page">
      <h1>Error</h1>
      <p>{state?.error?.message || 'An unknown error occurred.'}</p>
      <p>Please try again later.</p>
    </div>
  );
};

export default ErrorPage;
