import React from 'react';
import {BrowserRouter, Route, Routes, } from 'react-router-dom';
import HomePage from './pages/HomePage';
import Layout from './components/Layout';
import IncomeManager from './components/IncomeManager';
import ErrorBoundary from './components/ErrorBoundary';
import ExpenseManager from './components/ExpenseManager';
import Dashboard from './components/Dashboard';
import SignUp from './pages/SignUp';
import SignIn from './pages/SignIn';

import './styles/App.css';

function App() {
  
  return (
    <BrowserRouter>
    <Layout>
       <Routes >
        {/* <Navbar /> */}
        <Route path="/" element={<HomePage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/add-income" element={<IncomeManager />} />
        <Route path="/error-page" element={<ErrorBoundary />} />
        <Route path="/track-expenses" element={<ExpenseManager />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
      
    </Layout>
    </BrowserRouter>
  );
}

export default App;
