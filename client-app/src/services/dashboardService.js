import axios from 'axios';

const API_URL = 'http://localhost:4000/api/v1/dashboard'; // Adjust according to your backend URL

export const getYearlyOverview = (year) => {
    return axios.get(`${API_URL}/yearly-overview`, { params: { year } });
};

export const getMonthlyIncomeExpenses = (year) => {
    return axios.get(`${API_URL}/monthly-income-expenses`, { params: { year } });
};

export const getCategorizedExpenses = (year, month) => {
    return axios.get(`${API_URL}/categorized-expenses`, { params: { year, month } });
};

export const getDashboardData = (year) => {
    return axios.get(`${API_URL}/dashboard-data`, { params: { year } });
};
