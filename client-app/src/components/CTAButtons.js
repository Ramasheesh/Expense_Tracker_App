import React ,{ useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/CTAButtons.css';
import { AuthContext } from '../context/AuthContext';

const CTAButtons = () => {
  const { isAuthenticated } = useContext(AuthContext)
  // console.log('isAuthenticated: ', isAuthenticated);
  const navigate = useNavigate(); 
  const handleNavigation = (route) => {
    if (!isAuthenticated) { 
      navigate('/signin'); 
    } else {
      navigate(route);
    }
  };

  return (
    <section className="cta-buttons">
      <button onClick={() => handleNavigation('/add-income')}>Add Income</button>
      <button onClick={() => handleNavigation('/track-expenses')}>Track Expenses</button>
      <button onClick={() => handleNavigation('/dashboard')}>Go To Dashboard</button>
    </section>
  );
};

export default CTAButtons;