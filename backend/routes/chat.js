const {Router} = require('express')
const router = Router();
const {checkToken} = require('../middleware')
const {chatController} = require('../controller')

router.get('/getNotReceivedMessages', checkToken, chatController.getNotReceivedMessages)

module.exports = router;