const mongoose = require("mongoose");
const {hashSync} = require("bcrypt");
//default, unique, min, max, enum, validate, type, reauire

const messageSchema = new mongoose.Schema({
    senderId: String,
    receiverId: String,
    message: String,
    status: {
        type:String,
        default: 'sent'
    },
}, {
    timestamps: true // Add timestamps for the messages
});

const chatSchema = new mongoose.Schema({
        // userId|userId
        chatId: {
            type: String,
            required: true,
            min: 3,
        },
        messages: [messageSchema]
    },
    {
        timestamps: true
    }
)

module.exports = mongoose.model('Chat', chatSchema);
