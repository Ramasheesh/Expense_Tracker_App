import React, { createContext, useState, useEffect } from 'react';
// import  authServices from '../services/authService'; // Adjust the import path
import * as authServices from '../services/authService';
export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    // Check if a user is already logged in when the app loads
    const user = authServices.getCurrentUser();
    if (user) {
      setIsAuthenticated(true);
      setCurrentUser(user);
    }
  }, []);

  const handleSignIn = async (email, password) => {
    try {
      const user = await authServices.signIn(email, password);
      setIsAuthenticated(true);
      setCurrentUser(user);
    } catch (error) {
      console.error('Sign-in failed:', error);
      throw error;
    }
  };

  const handleSignup = async (name,email, password) => {
    try {
      await authServices.signup(name, email, password);
    } catch (error) {
      console.error('Registration failed:', error);
      throw error; // Allow component to handle this
    }
  };

  const handleLogout = () => {
    authServices.authLogout();
    setIsAuthenticated(false);
    setCurrentUser(null);
  };

  const handleAddIncome = async (income, month, year) => {
    try {
      const data = await authServices.addIncome(income, month, year);
      return data;
    } catch (error) {
      console.error('Add Income failed:', error);
      throw error;
    }
  };

  const handleGetIncome = async () => {
    try {
      const data = await authServices.getIncome();
      return data;
    } catch (error) {
      console.error('Get Income failed:', error);
      throw error;
    }
  };
  const handleLockIncome = async (id) => {
    try {
      const data = await authServices.lockIncome(id);
      return data;
    } catch (error) {
      console.error('Get Income failed:', error);
      throw error;
    }
  };
  
  const handleUpdateIncome = async (id, updates) => {
    try {
      const data = await authServices.updateIncome(id, updates);
      return data;
    } catch (error) {
      console.log('error: ', error);
      console.error('Update Income failed:', error);
      throw error;
    }
  };

  const handleDeleteIncome = async (id) => {
    try {
      await authServices.deleteIncome(id);
    } catch (error) {
      console.error('Delete Income failed:', error);
      throw error;
    }
  };

  const handleAddExpense = async (title, amount, category, date) => {
    try {
      const data = await authServices.addExpense(title, amount, category, date );
      return data;
    } catch (error) {
      console.error('Add Expense failed:', error);
      throw error;
    }
  };

  const handleGetExpenses = async () => {
    try {
      const data = await authServices.getExpenses();
      return data;
    } catch (error) {
      console.error('Get Expenses failed:', error);
      throw error;
    }
  };

  const handleUpdateExpense = async (id, updates) => {
    try {
      const data = await authServices.updateExpense(id, updates);
      return data;
    } catch (error) {
      console.error('Update Expense failed:', error);
      throw error;
    }
  };

  const handleDeleteExpense = async (id) => {
    try {
      await authServices.deleteExpense(id);
    } catch (error) {
      console.error('Delete Expense failed:', error);
      throw error;
    }
  };

  const handleGetDashboardData = async () => {
    try {
      const data = await authServices.getDashboardData();
      return data;
    } catch (error) {
      console.error('Get Dashboard Data failed:', error);
      throw error;
    }
  };

  return (
    <AuthContext.Provider value={{
      isAuthenticated,setIsAuthenticated,
      currentUser,
      lockIncome:handleLockIncome,
      signIn: handleSignIn,
      signup: handleSignup,
      logout: handleLogout,
      addIncome: handleAddIncome,
      getIncome: handleGetIncome,
      updateIncome: handleUpdateIncome,
      deleteIncome: handleDeleteIncome,
      addExpense: handleAddExpense,
      getExpenses: handleGetExpenses,
      updateExpense: handleUpdateExpense,
      deleteExpense: handleDeleteExpense,
      getDashboardData: handleGetDashboardData
    }}>
      {children}
    </AuthContext.Provider>
  );
};
