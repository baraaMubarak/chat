const {Router} =require('express')
const router = Router();
const {authController} = require('../controller')
const {checkEmailToken} = require('../middleware')
const {checkToken} = require('../middleware')

router.post('/register',authController.register)
router.post('/login',authController.login)
router.post('/sendCode',authController.sendCode)
router.post('/verifyCode',checkEmailToken,authController.verifyCode)
router.post('/resetPassword',checkToken,authController.resetPassword)

module.exports = router;