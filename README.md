# Expense Tracker App

## Overview

The Expense Tracker App is a web application designed to help users manage their income and expenses. It features user authentication, income and expense management, and a dashboard to visualize financial data.

## Tech Stack

- **Frontend:** React
- **Backend:** Node.js, Express
- **Database:** MongoDB
- **Authentication:** JWT

## Frontend

### Setup

1. **Install Dependencies:**

   ```bash
   cd frontend
   npm install

The frontend will be available at http://localhost:3000.


# API Integration
Base URL: http://localhost:4000/api/v1

Endpoints:

# User Authentication:

POST /signUp - Register a new user
POST /signin - Login a user
POST /signout - Logout a user

# Income Management:

POST /addIncome - Add new income
POST /lockIncome - Lock income for a specific month
GET /getIncome - Retrieve all income
PUT /updateIncome - Update existing income
DELETE /deleteIncome - Delete income

# Expense Management:

POST /add-expense - Add new expense
GET /get-expense - Retrieve all expenses
PUT /edit/:id - Edit an expense
DELETE /delete/:id - Delete an expense

# Dashboard:

GET /yearly-overview - Get yearly financial overview
GET /monthly-income-expenses - Get monthly income and expenses for the circle chart
GET /categorized-expenses - Get expenses categorized by type for the bar chart
GET /dashboard-data - Get consolidated dashboard data

# Backend
Setup
     cd server    
     npm install
     npm start

The backend will be available at http://localhost:4000.

# API Endpoints
# User Authentication:

POST /signUp - Register a new user.
POST /signin - Login a user.
POST /signout - Logout a user.

# Income Management:

POST /addIncome - Add new income.
POST /lockIncome - Lock income for a specific month.
GET /getIncome - Retrieve all income.
PUT /updateIncome - Update existing income.
DELETE /deleteIncome - Delete income.

# Expense Management:

POST /add-expense - Add new expense.
GET /get-expense - Retrieve all expenses.
PUT /edit/:id - Edit an expense.
DELETE /delete/:id - Delete an expense.

# Dashboard:

GET /yearly-overview - Get yearly financial overview.
GET /monthly-income-expenses - Get monthly income and expenses for the circle chart.
GET /categorized-expenses - Get expenses categorized by type for the bar chart.
GET /dashboard-data - Get consolidated dashboard data.

# Authentication
# Token Management:
 JWT tokens are used for authentication. They are stored in local storage on the frontend and sent with each request requiring authentication.
# Expense_Tracker_App
# Expense_Tracker_App
