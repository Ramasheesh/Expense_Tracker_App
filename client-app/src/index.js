import React from 'react';
import ReactDOM from 'react-dom/client';
// import './index.css';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';
// import { BrowserRouter} from 'react-router-dom'
import ErrorBoundary from './components/ErrorBoundary';
import { AuthProvider } from './context/AuthContext';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // <React.StrictMode>
     <AuthProvider>
    <GoogleOAuthProvider clientId="">
    <ErrorBoundary>
        <App />
      </ErrorBoundary>
    </GoogleOAuthProvider>
    </AuthProvider>
  //</React.StrictMode>
);

   