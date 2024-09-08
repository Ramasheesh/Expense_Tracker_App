const express = require('express');
const { addIncome,getIncome, lockMonth ,updateIncome ,deleteIncome} = require('../controllers/income');
const  protect  = require('../../middlewares/userAuth');

const router = express.Router();

router.post('/addIncome', protect.userAuthService, addIncome);
router.post('/lockIncome', protect.userAuthService, lockMonth);
router.get('/getIncome', protect.userAuthService, getIncome);
router.put('/updateIncome', protect.userAuthService, updateIncome);
router.delete('/deleteIncome', protect.userAuthService, deleteIncome);


module.exports = router;