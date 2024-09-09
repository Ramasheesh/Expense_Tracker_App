// import React, { useEffect, useState } from 'react';
// import "../styles/Dashboard.css";
// import { Doughnut, Bar } from 'react-chartjs-2';
// import useAuth from "../hooks/useAuth";
// import * as dashboardService  from "../services/dashboardService";
// import {
//   Chart as ChartJS,
//   ArcElement,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend,
// } from 'chart.js';

// // Register Chart.js components
// ChartJS.register(
//   ArcElement,
//   CategoryScale,
//   LinearScale,
//   BarElement,
//   Title,
//   Tooltip,
//   Legend
// );

// const Dashboard = () => {
//   const { isAuthenticated, currentUser, logout } = useAuth();  // Authentication context
//   const [yearlyOverview, setYearlyOverview] = useState({});
//   const [monthlyData, setMonthlyData] = useState([]);
//   const [categorizedExpenses, setCategorizedExpenses] = useState({});

//   useEffect(() => {
//     if (isAuthenticated) {
//       const fetchYearlyOverview = async () => {
//         try {
//           const { data } = await dashboardService.getYearlyOverview(new Date().getFullYear());
//           console.log('Yearly Overview:', data);
//           setYearlyOverview(data);
//         } catch (error) {
//           console.error('Error fetching yearly overview:', error);
//           if (error.response && error.response.status === 401) {
//             logout();
//           }
//         }
//       };

//       const fetchMonthlyData = async () => {
//         try {
//           const { data } = await dashboardService.getMonthlyIncomeExpenses(new Date().getFullYear());
//           console.log('datammm: ', data);
//           setMonthlyData(data);
//         } catch (error) {
//           console.error('Error fetching monthly data:', error);
//           if (error.response && error.response.status === 401) {
//             logout();
//           }
//         }
//       };

//       const fetchCategorizedExpenses = async () => {
//         try {
//           const { data } = await dashboardService.getCategorizedExpenses(
            
//             new Date().getFullYear(),
//             new Date().getMonth() + 1
//           );
//           setCategorizedExpenses(data);
//           console.log('data: ', data);
//         } catch (error) {
//           console.error('Error fetching categorized expenses:', error);
//           if (error.response && error.response.status === 401) {
//             logout();
//           }
//         }
//       };

//       fetchYearlyOverview();
//       fetchMonthlyData();
//       fetchCategorizedExpenses();
//     }
//   }, [isAuthenticated, currentUser, logout]);

//   const monthlyIncomeChartData = {
//     labels: monthlyData.map(data => `Month ${data.month}`),
//     datasets: [
//       {
//         label: 'Total Income',
//         data: monthlyData.map(data => data.totalIncome),
//         backgroundColor: 'rgba(75, 192, 192, 0.6)',
//         borderColor: 'rgba(75, 192, 192, 1)',
//         borderWidth: 1,
//       },
//       {
//         label: 'Total Expenses',
//         data: monthlyData.map(data => data.totalExpenses),
//         backgroundColor: 'rgba(255, 99, 132, 0.6)',
//         borderColor: 'rgba(255, 99, 132, 1)',
//         borderWidth: 1,
//       },
//     ],
//   };

//   const categorizedExpensesChartData = {
//     labels: Object.keys(categorizedExpenses),
//     datasets: [
//       {
//         label: 'Expenses by Category',
//         data: Object.values(categorizedExpenses),
//         backgroundColor: 'rgba(153, 102, 255, 0.6)',
//         borderColor: 'rgba(153, 102, 255, 1)',
//         borderWidth: 1,
//       },
//     ],
//   };

//   return (
//     <div className="dashboard-container">
//       <div className="yearly-overview">
//         <h2>Yearly Overview</h2>
//         <p>Total Income: {yearlyOverview.totalIncome}</p>
//         <p>Total Expenses: {yearlyOverview.totalExpenses}</p>
//         <p>Total Savings: {yearlyOverview.totalSavings}</p>
//       </div>

//       <div className="monthly-income-expenses">
//         <h2>Monthly Income vs Expenses</h2>
//         <div className="chart-container">
//           <Doughnut data={monthlyIncomeChartData} options={{ responsive: true, maintainAspectRatio: false }} />
//         </div>
//       </div>

//       <div className="categorized-expenses">
//         <h2>Expenses Categorized by Type</h2>
//         <div className="chart-container">
//           <Bar data={categorizedExpensesChartData} options={{ responsive: true, maintainAspectRatio: false }} />
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Dashboard;




import React, { useEffect, useState } from 'react';
import axios from 'axios';
import "../styles/Dashboard.css";
import {
  Chart as ChartJS,
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Doughnut, Bar } from 'react-chartjs-2';
import useAuth from "../hooks/useAuth";  // Auth hook
import {  } from "../services/dashboardService";
// Register Chart.js components
ChartJS.register(
  ArcElement,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const ApiUrl = "http://localhost:4000/api/v1/dashboard";

const Dashboard = () => {
  const { isAuthenticated, currentUser, logout } = useAuth();  // Use authentication context
  const [yearlyOverview, setYearlyOverview] = useState({});
  const [monthlyData, setMonthlyData] = useState([]);
  const [categorizedExpenses, setCategorizedExpenses] = useState({});

  useEffect(() => {
    if (isAuthenticated) {  // Ensure user is authenticated before making API calls
      const fetchYearlyOverview = async () => {
        try {
          const  data  = await axios.get(`${ApiUrl}/yearly-overview`, {
            params: { year: new Date().getFullYear() },
            headers: { Authorization: `Bearer ${currentUser.token}` }  // Pass token
          });
          setYearlyOverview(data);
        } catch (error) {
          console.error('Error fetching yearly overview:', error);
          if (error.response && error.response.status === 401) {
            logout();  // Log out the user if token is invalid
          }
        }
      };

      const fetchMonthlyData = async () => {
        try {
          const { data } = await axios.get(`${ApiUrl}/monthly-income-expenses`, {
            params: { year: new Date().getFullYear() },
            headers: { Authorization: `Bearer ${currentUser.token}` }  // Pass token
          });
          setMonthlyData(data);
        } catch (error) {
          console.error('Error fetching monthly data:', error);
          if (error.response && error.response.status === 401) {
            logout();  // Log out the user if token is invalid
          }
        }
      };

      const fetchCategorizedExpenses = async () => {
        try {
          const { data } = await axios.get(`${ApiUrl}/categorized-expenses`, {
            params: { year: new Date().getFullYear(), month: new Date().getMonth() + 1 },
            headers: { Authorization: `Bearer ${currentUser.token}` }  // Pass token
          });
          setCategorizedExpenses(data);
        } catch (error) {
          console.error('Error fetching categorized expenses:', error);
          if (error.response && error.response.status === 401) {
            logout();  // Log out the user if token is invalid
          }
        }
      };

      fetchYearlyOverview();
      fetchMonthlyData();
      fetchCategorizedExpenses();
    }
  }, [isAuthenticated, currentUser, logout]);  // Dependency array includes authentication state

  const monthlyIncomeChartData = {
    labels: monthlyData.map(data => `Month ${data.month}`),
    datasets: [
      {
        label: 'Total Income',
        data: monthlyData.map(data => data.totalIncome),
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
      {
        label: 'Total Expenses',
        data: monthlyData.map(data => data.totalExpenses),
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        borderWidth: 1,
      },
    ],
  };

  const categorizedExpensesChartData = {
    labels: Object.keys(categorizedExpenses),
    datasets: [
      {
        label: 'Expenses by Category',
        data: Object.values(categorizedExpenses),
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="dashboard">
      <div className="overview-section">
        <h2>Yearly Overview</h2>
        <p>Total Income: {yearlyOverview.totalIncome}</p>
        <p>Total Expenses: {yearlyOverview.totalExpenses}</p>
        <p>Total Savings: {yearlyOverview.totalSavings}</p>
      </div>

      <div className="chart-section">
        <h2>Monthly Income vs Expenses</h2>
        <Doughnut data={monthlyIncomeChartData} />
      </div>

      <div className="chart-section">
        <h2>Expenses Categorized by Type</h2>
        <Bar data={categorizedExpensesChartData} />
      </div>
    </div>
  );
};

export default Dashboard;
