import React, { useState, useContext } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../styles/Navbar.css';
import { AuthContext } from '../context/AuthContext';
const Navbar = () => {
  const [isOpen, setIsOpen ] = useState(false);
  const location = useLocation();
  const { isAuthenticated, logout } = useContext(AuthContext);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();  
    navigate('/');  
  };
  const getLinkClassName = (path) => {
    return location.pathname === path ? 'active' : '';
  };

  return (
    <nav className="navbar">
      <div className="brand">Expense Tracker App</div>
      <button className="toggle-button" onClick={toggleMenu}>
        {/* Icon or text for the button */}
      </button>
      <ul className={`nav-links ${isOpen ? 'active' : ''}`}>
        {isAuthenticated ? (
          <>
            <li>
              <Link to="/" className={getLinkClassName('/')}>Home</Link>
            </li>
            <li>
              <Link to="/add-income" className={getLinkClassName('/add-income')}>Add Income</Link>
            </li>
            <li>
              <Link to="/track-expenses" className={getLinkClassName('/track-expenses')}>Track Expenses</Link>
            </li>
            <li>
              <Link to="/dashboard" className={getLinkClassName('/dashboard')}>View Dashboard</Link>
            </li>
            
            <li>
              <button className = "nav-link" onClick={handleLogout}>Logout</button>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link to="/signup" className={getLinkClassName('/signup')}>Sign Up</Link>
            </li>
            <li>
              <Link to="/signin" className={getLinkClassName('/signin')}>Sign In</Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;


