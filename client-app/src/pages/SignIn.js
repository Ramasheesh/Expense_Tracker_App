import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import  {signIn}  from '../services/authService';
import { AuthContext } from '../context/AuthContext';
import '../styles/SignIn.css';

const SignIn = () => {
    const [emailOrMobile, setEmailOrMobile] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { setIsAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await signIn(emailOrMobile, password);
        setIsAuthenticated(true);
        navigate('/');
      } catch (err) {
        console.log('err: ', err);
        setError('Invalid credentials. Please try again.');
      }
    };
  
    return (
      <div className="signin-container">
        <h1>Sign In</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Email or Mobile"
            value={emailOrMobile}
            onChange={(e) => setEmailOrMobile(e.target.value)}
            required
          />
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          {error && <p className="error-message">{error}</p>}
          <button type="submit">Sign In</button>
        </form>
        <p className="lTab">
          You don't have Account ?  <a href="/signup">   Sign up</a>
        </p>
      </div>
    );
  };
  
  export default SignIn;