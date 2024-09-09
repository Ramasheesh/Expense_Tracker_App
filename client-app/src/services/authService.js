import axios from "axios";
const API_URL = 'http://localhost:4000/api/v1'; // Replace with your backend URL
// Register a new user
export const signup = async (name, email, password) => {
  try {
    const response = await fetch(`${API_URL}/user/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({name, email, password }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Registration failed');
    }

    const data = await response.json();
    return data;
    // const response = await axios.post(`${API_URL}/signup`, {
    //   name,
    //   email,
    //   password,
    // });
    // return response.data; 
  } catch (error) {
    console.error('Registration Error:', error);
    throw error;
  }
};

// Sign-in an existing user (alternative to login)
export const signIn = async (loginData) => {
  try {
    const response = await axios.post(`${API_URL}/user/signin`, loginData);
    localStorage.setItem('user', JSON.stringify(response.data)); // Store user data in local storage
    return response.data;
  } catch (error) {
    console.error('Sign-in Error:', error);
    throw error;
  }
};

// Logout the user
export const authLogout = async() => {
  const user = getCurrentUser();
  if (!user) throw new Error('User not authenticated');

  try {
    // Make a POST request to the sign-out endpoint with the token in headers
    await axios.post(`${API_URL}/user/signout`, {}, {
      headers: {
        'Authorization': `Bearer ${user.token}`,
      },
    });

    // Clear user data from local storage
    localStorage.removeItem('user'); // Adjust the key to match what you use to store user data
    localStorage.removeItem('token'); // Adjust the key to match what you use to store the token

    return;
  } catch (error) {
    console.error('Sign-in Error:', error);
    throw error;
  }
  
};

// Get the currently logged-in user
export const getCurrentUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null; 
};

// Add income
export const addIncome = async (income ,month, year) => {
  const user = getCurrentUser();
  if (!user) throw new Error('User not authenticated');

  try {
    const response = await fetch(`${API_URL}/income/addIncome`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`,
      },
      body: JSON.stringify({ income, month, year }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Adding income failed');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.log('error: ', error);
    console.error('Add Income Error:', error);
    throw error;
  }
};

// Get all income records
export const getIncome = async () => {
  const user = getCurrentUser();
  if (!user) throw new Error('User not authenticated');

  try {
    const response = await fetch(`${API_URL}/income/getIncome`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${user.token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Fetching income failed');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Get Income Error:', error);
    throw error;
  }
};

// Update an income record
export const updateIncome = async (id, updates) => {
  const user = getCurrentUser();
  if (!user) throw new Error('User not authenticated');

  try {
    const response = await fetch(`${API_URL}/income/updateIncome`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`,
      },
      body: JSON.stringify(updates),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Updating income failed');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Update Income Error:', error);
    throw error;
  }
};

// Delete an income record
export const deleteIncome = async (id) => {
  const user = getCurrentUser();
  if (!user) throw new Error('User not authenticated');

  try {
    const response = await fetch(`${API_URL}/income/deleteIncome`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Deleting income failed');
    }

    return;
  } catch (error) {
    console.error('Delete Income Error:', error);
    throw error;
  }
};
export const lockIncome = async (id) => {
  const user = getCurrentUser();
  if (!user) throw new Error('User not authenticated');

  try {
    const response = await fetch(`${API_URL}/income/lockIncome`, {

      method: 'POST',
      headers: {
        'Authorization': `Bearer ${user.token}`,
      },
    });
    if (!response.ok) {
      const errorData = await response.json();      
      // throw new Error(errorData.message || 'locking income failed');
      alert(errorData.message);
        return;
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Delete Income Error:', error);
    throw error;
  }
}
// Add expense
export const addExpense = async (title, amount, category, date) => {
  const user = getCurrentUser();
  if (!user) throw new Error('User not authenticated');

  try {
    const response = await fetch(`${API_URL}/expense/add-expense`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`,
      },
      body: JSON.stringify({ title, category, date }),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Adding expense failed');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Add Expense Error:', error);
    throw error;
  }
};

// Get all expense records
export const getExpenses = async (id) => {
  const user = getCurrentUser();
  if (!user) throw new Error('User not authenticated');

  try {
    const response = await fetch(`${API_URL}/expense/get-expense`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${user.token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Fetching expenses failed');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Get Expenses Error:', error);
    throw error;
  }
};

// Update an expense record
export const updateExpense = async (id, updates) => {
  const user = getCurrentUser();
  if (!user) throw new Error('User not authenticated');

  try {
    const response = await fetch(`${API_URL}/expense/edit/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${user.token}`,
      },
      body: JSON.stringify(updates),
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Updating expense failed');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Update Expense Error:', error);
    throw error;
  }
};

// Delete an expense record
export const deleteExpense = async (id) => {
  const user = getCurrentUser();
  if (!user) throw new Error('User not authenticated');

  try {
    const response = await fetch(`${API_URL}/expense/delete/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${user.token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Deleting expense failed');
    }

    return;
  } catch (error) {
    console.error('Delete Expense Error:', error);
    throw error;
  }
};

// Get dashboard data (income, expenses, savings)
export const getDashboardData = async () => {
  const user = getCurrentUser();
  if (!user) throw new Error('User not authenticated');

  try {
    const response = await fetch(`${API_URL}/dashboard/yearly-overview`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${user.token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Fetching dashboard data failed');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Get Dashboard Data Error:', error);
    throw error;
  }
};
export const getExpensesDashboardData = async () => {
  const user = getCurrentUser();
  if (!user) throw new Error('User not authenticated');

  try {
    const response = await fetch(`${API_URL}/dashboard/monthly-income-expenses`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${user.token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Fetching dashboard data failed');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Get Dashboard Data Error:', error);
    throw error;
  }
};
export const getCategorizedDashboardData = async () => {
  const user = getCurrentUser();
  if (!user) throw new Error('User not authenticated');

  try {
    const response = await fetch(`${API_URL}/dashboard/categorized-expenses`, {
      method: 'GET',
      headers: {
        'Authorization': `Bearer ${user.token}`,
      },
    });

    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Fetching dashboard data failed');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Get Dashboard Data Error:', error);
    throw error;
  }
};
