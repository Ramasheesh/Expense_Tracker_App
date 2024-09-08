const express = require('express');
const { addExpense,getExpense, editExpense, deleteExpense, addCategory } = require('../controllers/expense');
const  protect  = require('../../middlewares/userAuth');

const router = express.Router();

router.post('/add-expense', protect.userAuthService, addExpense);
router.get('/get-expense', protect.userAuthService, getExpense);
router.put('/edit/:id', protect.userAuthService, editExpense);
router.delete('/delete/:id', protect.userAuthService, deleteExpense);
// router.post('/category/add', protect.userAuthService, addCategory);
// router.get('/category', protect.userAuthService, getCategory);

module.exports = router;
