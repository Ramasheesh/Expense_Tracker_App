import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import  {signIn}  from '../services/authService';
import { AuthContext } from '../context/AuthContext';
import '../styles/SignIn.css';

const SignIn = () => {
    const [inputValue, setInputValue] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { setIsAuthenticated } = useContext(AuthContext);
    const navigate = useNavigate();
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      const isEmail = inputValue.includes('@');
      try {
        // Validate the input to determine if it's an email or phone number
        const loginData = {
          email: isEmail ? inputValue : undefined,
          phone: !isEmail ? inputValue : undefined,
          password,
        };
        await signIn(loginData);
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
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
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