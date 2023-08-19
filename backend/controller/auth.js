const {dbConnection} = require('../configration')
const {User} = require('../model')
const {registerValidData} = require('../validators')
const {loginValidData} = require('../validators')
const {compareSync} = require("bcrypt");
const isEmailValid = require("../validators/is_email_valid");
const nodemailer = require('nodemailer');
const jwt = require('jsonwebtoken');
const html = require("../email_style");

const register = (req, res, next) => {
    dbConnection('user', async () => {
        if (registerValidData(req, res, next)) {

            await new User({
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                gender: req.body.gender,
                dateOfBirth: new Date(Date.parse(req.body.dateOfBirth)),
            }).save()
                .then(value => {
                    console.log(value)
                    return sendEmail(value,res,next)
                })
                .catch(error => {
                    if (error.message.toString().includes('email')) {
                        res.status(409)
                        return next(new Error('your email is already used'))
                    }
                })
        }
    });

}
const login = async (req, res, next) => {
    if (loginValidData(req, res, next)) {
        await dbConnection('user', async () => {
            await User.findOne({
                email: req.body.email
            }).select('+password').then(async value => {
                if (value) {
                    if (compareSync(req.body.password, value.password)) {
                        if(value.emailIsValidate) {
                            return res.status(200).json({
                                status: 200,
                                message: 'Login Success',
                                data: userWithOutPassword(value),
                                token: createUserToken(value.id)
                            })
                        }else{
                            return await sendEmail(value,res,next)
                        }
                    }
                }
                res.status(401)
                next(new Error('Email Or password is wrong'))
            }).catch(error => {
                res.status(401)
                if (error.message.includes('password'))
                    next(new Error('Email Or password is wrong'))
                next(new Error(error.message))
            })
        })
    }
}

const sendCode = async (req, res, next) => {
    if (!req.body.email) {
        return next(new Error('Please Enter email'))
    } else if (!isEmailValid(req.body.email)) {
        return next(new Error('Please Enter valid email'))
    }
    await dbConnection('user', async () => {
        try {
            const value = await User.findOne({
                email: req.body.email
            })
            await sendEmail(value,res,next);
        } catch (error) {
            res.status(401)
            next(new Error(error.message))
        }
    })
}

const verifyCode = async (req, res, next) => {
    if (!req.body.code) {
        return next(new Error('Please Enter code'))
    } else if (req.body.code.length !== 6) {
        return next(new Error('The Code Is Not Correct'))
    }
    await dbConnection('user', async () => {
        await User.findOneAndUpdate({
            code: req.body.code,
            email: req.email
        }, {
            code: '',
            emailIsValidate: true
        }).then(value => {
                if (value !== null) {
                    res.status(200).json({
                            status: 200,
                            message: 'Success',
                            data:userWithOutPassword(value),
                            token: createUserToken(value.id)
                        }
                    )
                } else {
                    res.status(422)
                    return next(new Error('The Code Is Wrong'))
                }
            }
        ).catch(error => next(new Error(error.message)))
    })
}

const resetPassword = async (req, res, next) => {
    if (!req.body.password) {
        return next(new Error('Please Enter The password'))
    } else if (req.body.password.length < 8) {
        return next(new Error('The Password is too short'))
    }
    console.log(req._user_id)
    await dbConnection('user', async () => {
        await User.findByIdAndUpdate(req._user_id, {
            password: req.body.password
        },).then(value => {
                if (value !== null) {
                    console.log(value);
                    res.status(200).json({
                            status: 200,
                            message: 'Success',
                            data: userWithOutPassword(value),
                            token: createUserToken(value.id)
                        }
                    )
                } else {
                    res.status(400)
                    return next(new Error('The Code Is Wrong'))
                }
            }
        ).catch(error => next(new Error(error.message)))
    })
}

function userWithOutPassword(value) {
    return {
        _id: value._id,
        name: value.name,
        email: value.email,
        emailIsValidate: value.emailIsValidate,
        gender: value.gender,
        dateOfBirth: value.dateOfBirth,
        subscribers: value.subscribers,
        createdAt: value.createdAt,
        updatedAt: value.updatedAt,
        __v: value.__v,
    }
}

function createUserToken(userId) {
    return jwt.sign({
        _id: userId
    }, process.env.PRIVATE_KEY_FOR_TOKEN, {
        expiresIn: '1d',
    })
}

function createEmailToken(email) {
    return jwt.sign({
        email: email
    }, process.env.PRIVATE_KEY_FOR_TOKEN, {
        expiresIn: 60 * 5,
    })
}

async function sendEmail(value,res,next) {
    let transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 587,
        secure: false, // true for 587, false for other ports
        requireTLS: true,
        auth: {
            user: process.env.EMAIL,
            pass: process.env.PASSWORD,
        },
    });
    const code = generateRandom6Digits().toString();
    let mailOptions = {
        from: `${process.env.APP_NAME} <${process.env.EMAIL}>`,
        to: value.email,
        subject: 'رمز اعادة تعيين كلمة المرور',
        html: html(value.name, code)
    };

    await transporter.sendMail(mailOptions, async function (error, info) {
        if (error) {
            res.status(401)
            next(new Error(error.message))
        } else {
            await dbConnection('user', async () => {
                await User.findByIdAndUpdate(value.id, {
                    code: code
                }).then(v => {
                    return res.status(200).json({
                        status: 200,
                        message: 'Send Code Success',
                        data: null,
                        token: createEmailToken(value.email)
                    })
                }).catch(error => {
                    return next(new Error(error))
                })
            })
        }
    });
}

function generateRandom6Digits() {
    const min = 100000; // Minimum 6-digit number
    const max = 999999; // Maximum 6-digit number
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

module.exports = {
    register,
    login,
    sendCode,
    verifyCode,
    resetPassword
}