
const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboard');
const authMiddleware = require('../../middlewares/userAuth');


router.get('/yearly-overview', authMiddleware.userAuthService, dashboardController.getYearlyOverview);


router.get('/monthly-income-expenses', authMiddleware.userAuthService, dashboardController.getMonthlyIncomeExpenses);


router.get('/categorized-expenses', authMiddleware.userAuthService, dashboardController.getCategorizedExpenses);


router.get('/dashboard-data', authMiddleware.userAuthService, dashboardController.getDashboardData);

module.exports = router;

