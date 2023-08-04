const isEmailValid = require('./is_email_valid')
const register = require('./register')
const login = require('./login')
module.exports = {
    isEmailValid: isEmailValid,
    registerValidData: register,
    loginValidData: login,
}