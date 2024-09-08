const express = require('express');
const router = express.Router();
const userController = require('../controllers/user')
const Auth_user = require('../../middlewares/userAuth')


//On Boarding
router.post('/signUp',userController.signup)
router.post('/signin',userController.login)
router.post('/signout',Auth_user.userAuthService,userController.signOut);

module.exports = router  