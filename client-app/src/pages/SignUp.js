import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signup } from '../services/authService'; 
import '../styles/SignUp.css'; 
import googleLogo from "../assets/google_Logo.png";
const SignUp = () => {
  const [name, setName] = useState('');
  const [emailOrMobile, setEmailOrMobile] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await signup(name, emailOrMobile, password);
      alert('Registration successful!');
      navigate('/signin')
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGoogleLogin = () => {
    // Implement Google login here or redirect to Google login page
  };

  return (
    <div className="signup-container">
      <h1>Sign Up</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Mobile or Email"
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
        <button className="submit-button" type="submit">Sign Up</button>
      </form>
      <div className="google-login">
        <button onClick={handleGoogleLogin} className="google-button">
          <img src={googleLogo} alt="Google" className="google-icon" />
          Login with Google
        </button>
        <p className="lTab">
          You have Account ?  <a href="/signin">   Login</a>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
