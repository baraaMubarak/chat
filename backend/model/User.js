const mongoose = require("mongoose");
const {hashSync} = require("bcrypt");
//default, unique, min, max, enum, validate, type, reauire
const userSchema = new mongoose.Schema({
        name: {
            type: String,
            required: true,
            min: 3
        },
        email: {
            type: String,
            unique: true,
            required: true
        },
        emailIsValidate: {
            type: Boolean,
            default: false,
        },
        password: {
            type: String,
            min: 8,
            select: false,
            set: (password) => {
                const saltRounds = 10;
                return hashSync(password, saltRounds);
            },
        },
        gender: {
            type: String,
            enum: ['male', 'female']
        },
        dateOfBirth: {
            type: Date,
            required: true,
        },
        code: {
            type: String,
        },
        subscribers: {
            type: Array,
            default: []
        }
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('User', userSchema);
