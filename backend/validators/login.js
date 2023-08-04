const isEmailValid = require("./is_email_valid");

module.exports = (req, res, next) => {
    res.status(400)
    if (!req.body.email) {
        return next(new Error('Please Enter email'))
    } else if (!isEmailValid(req.body.email)) {
        return next(new Error('Please Enter valid email'))
    } else if (!req.body.password) {
        return next(new Error('Please Enter password'))
    } else if (req.body.password.length < 8) {
        return next(new Error('Please Enter 8 characters for password'))
    }
    res.status(200)
    return true;
}