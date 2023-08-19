const errorHandler = require('./errorMiddleware')
const token = require('./auth')

module.exports = {
    errorHandler,
    checkEmailToken:token.checkEmailToken,
    checkToken:token.checkToken,
    testValidateToken:token.testValidateToken,
}