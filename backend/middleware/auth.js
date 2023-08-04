const jwt = require('jsonwebtoken');

const checkToken = (req, res, next) => {
    const authHeader = req.get('authorization');

    if (!authHeader) {
        res.status(401);
        return next(new Error('Authentication token missing. Please include a valid token in the request headers.'));
    }

    const token = authHeader.split(' ')[1];
    const secretKey = process.env.PRIVATE_KEY_FOR_TOKEN;

    try {
        const decode = jwt.verify(token, secretKey);
        console.log(decode._id);
        req._user_id = decode._id;
        return next();
    } catch (e) {
        if (e instanceof jwt.TokenExpiredError) {
            res.status(401);
            return next(new Error('Token has expired. Please obtain a new token for authentication.'));
        } else if (e instanceof jwt.JsonWebTokenError) {
            res.status(401);
            return next(new Error('Invalid token. Please provide a valid token for authentication.'));
        } else {
            res.status(401);
            return next(new Error('An error occurred while processing your request. Please check your token or contact support for assistance.'));
        }
    }
};
const checkEmailToken = (req, res, next) => {
    const authHeader = req.get('authorization');

    if (!authHeader) {
        res.status(401);
        return next(new Error('Authentication token missing. Please include a valid token in the request headers.'));
    }

    const token = authHeader.split(' ')[1];
    const secretKey = process.env.PRIVATE_KEY_FOR_TOKEN;

    try {
        const decode = jwt.verify(token, secretKey);
        req.email = decode.email;
        return next();
    } catch (e) {
        if (e instanceof jwt.TokenExpiredError) {
            res.status(401);
            return next(new Error('Token has expired. Please obtain a new token for authentication.'));
        } else if (e instanceof jwt.JsonWebTokenError) {
            res.status(401);
            return next(new Error('Invalid token. Please provide a valid token for authentication.'));
        } else {
            res.status(401);
            return next(new Error(e))
            // return next(new Error('An error occurred while processing your request. Please check your token or contact support for assistance.'));
        }
    }
};
module.exports = {
    checkToken,
    checkEmailToken
}