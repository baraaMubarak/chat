const isEmailValid = require("./is_email_valid");

module.exports = (req,res,next) => {
    res.status(400)
    if (!req.body.name) {
        return next( new Error('Please Enter name'))
    } else if (req.body.name.length < 3) {
        res.status(422)
        return next( new Error('The Name Must be at least 3 characters'))
    } else if (!req.body.email) {
        return next( new Error('Please Enter email'))
    } else if (!isEmailValid(req.body.email)) {
        res.status(422)
        return next( new Error('Please Enter valid email'))
    } else if (req.body.password.length < 8) {
        res.status(422)
        return next( new Error('Please Enter 8 characters for password'))
    } else if (!req.body.gender) {
        return next( new Error('Please Enter gender'))
    } else if (!(req.body.gender === 'male' || req.body.gender === 'female')) {
        res.status(422)
        return next( new Error('Please Enter valid gender'))
    } else if (!req.body.dateOfBirth) {
        return next( new Error('Please Enter dateOfBirth'))
    } else if (!isAtLeastTenYearsAgo(req.body.dateOfBirth)) {
        return next(new Error('You are so baby'))
    }
    res.status(200)
    return true;
}

function isAtLeastTenYearsAgo(dateToCheck) {
    const currentDate = new Date();
    currentDate.getFullYear();

    const date = new Date(Date.parse(dateToCheck));
    date.getFullYear();

    return currentDate.getFullYear() >= (date.getFullYear() + 10);
}