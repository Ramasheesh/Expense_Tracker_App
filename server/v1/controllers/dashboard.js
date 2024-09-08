const mongoose = require('mongoose');
const Income = require('../../models/income');
const Expense = require('../../models/expense');

// Get yearly overview
exports.getYearlyOverview = async (req, res) => {
    const { year } = req.query;
    try {
        const incomeRecords = await Income.find({ userId: req.user._id, year });
        const expenseRecords = await Expense.find({ userId: req.user._id, year });

        const totalIncome = incomeRecords.reduce((acc, record) => acc + record.amount, 0);
        const totalExpenses = expenseRecords.reduce((acc, record) => acc + record.amount, 0);
        const totalSavings = totalIncome - totalExpenses;

        res.status(200).json({
            totalIncome,
            totalExpenses,
            totalSavings
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get monthly income and expenses for circle chart
exports.getMonthlyIncomeExpenses = async (req, res) => {
    const { year } = req.query;

    try {
        const monthlyData = [];

        for (let month = 1; month <= 12; month++) {
            const monthStr = month.toString().padStart(2, '0');

            const incomeRecord = await Income.findOne({ userId: req.user._id, month: monthStr, year });
            const expenseRecords = await Expense.find({ userId: req.user._id, month: monthStr, year });

            const totalIncome = incomeRecord ? incomeRecord.amount : 0;
            const totalExpenses = expenseRecords.reduce((acc, record) => acc + record.amount, 0);

            monthlyData.push({
                month: monthStr,
                totalIncome,
                totalExpenses
            });
        }

        res.status(200).json(monthlyData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Get expenses categorized by type for bar chart
exports.getCategorizedExpenses = async (req, res) => {
    const { year, month } = req.query;

    try {
        const expenseRecords = await Expense.find({ userId: req.user._id, month, year });
        const categoryData = {};

        expenseRecords.forEach(expense => {
            const categoryName = expense.category.name;
            if (!categoryData[categoryName]) {
                categoryData[categoryName] = 0;
            }
            categoryData[categoryName] += expense.amount;
        });

        res.status(200).json(categoryData);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

// Consolidated dashboard data
exports.getDashboardData = async (req, res) => {
    const { year } = req.query; // assuming year is passed as a query parameter
    try {
        // Get total income and total expenses for the year
        const incomes = await Income.aggregate([
            { $match: { userId: mongoose.Types.ObjectId(req.user._id), isLocked: true, year } },
            { $group: { _id: null, totalIncome: { $sum: '$amount' } } }
        ]);

        const expenses = await Expense.aggregate([
            { $match: { userId: mongoose.Types.ObjectId(req.user._id), year } },
            { $group: { _id: null, totalExpenses: { $sum: '$amount' } } }
        ]);

        const totalIncome = incomes[0]?.totalIncome || 0;
        const totalExpenses = expenses[0]?.totalExpenses || 0;
        const totalSavings = totalIncome - totalExpenses;

        // Get monthly income and expenses for chart
        const monthlyIncome = await Income.aggregate([
            { $match: { userId: mongoose.Types.ObjectId(req.user._id), isLocked: true, year } },
            { $group: { _id: { month: '$month' }, total: { $sum: '$amount' } } },
            { $project: { _id: 0, month: '$_id.month', total: 1 } }
        ]);

        const monthlyExpenses = await Expense.aggregate([
            { $match: { userId: mongoose.Types.ObjectId(req.user._id), year } },
            { $group: { _id: { month: '$month' }, total: { $sum: '$amount' } } },
            { $project: { _id: 0, month: '$_id.month', total: 1 } }
        ]);

        res.json({
            totalIncome,
            totalExpenses,
            totalSavings,
            monthlyIncome,
            monthlyExpenses
        });
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Server error' });
    }
};
