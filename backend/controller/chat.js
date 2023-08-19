const {dbConnection} = require('../configration')
const {Chat, User} = require("../model");
const {testValidateToken} = require("../middleware");
const mongoose = require("mongoose");
const collectionName = 'chat';
const getNotReceivedMessages = async (req, res, next) => {
    if (!req.body.userId) {
        return next(new Error('Please Enter userId'))
    }
    await dbConnection(collectionName, async () => {
        try {
            let returnData = [];
            const value = await Chat.find({
                $and: [

                    {
                        $or: [
                            {chatId: req._user_id + '|' + req.body.userId},
                            {chatId: req.body.userId + '|' + req._user_id},
                        ]
                    },
                    {
                        'messages.status': 'sent',
                    }
                ]
            })
            // Update messages' status to 'received'
            for (const chat of value) {
                chat.messages = chat.messages.map(message => {
                    if (message.status === 'sent') {
                        message.status = 'received';
                        returnData.push(message);
                    }
                    return message;
                });
                await chat.save();
            }
            return res.status(200).json({
                status: 200,
                message: 'There All Not Received messages',
                data: returnData,
            })
        } catch (error) {
            res.status(401)
            next(new Error(error.message))
        }
    })
}
const saveMessage = async (data) => {
    await dbConnection(collectionName, async () => {
        const senderId = testValidateToken(data.token)
        try {
            const existingChat = await Chat.findOne({
                $or: [{chatId: data.receiverId + '|' + senderId}, {chatId: senderId + '|' + data.receiverId}],
            });

            if (existingChat) {
                data.status = 'sent'
                data.senderId = senderId
                existingChat.messages.push(data);
                await existingChat.save();
            } else {
                const newChat = new Chat({
                    chatId: data.receiverId + '|' + senderId, messages: [{
                        senderId: senderId,
                        receiverId: data.receiverId,
                        message: data.message,
                    }]
                });
                await newChat.save();
            }
            return
        } catch (error) {
            console.log('Error:', error)
        }
    });
    const addToSubscriberList = async (userId, subscriber) => {
        try {
            const user = await User.findOneAndUpdate(
                {_id: userId, 'subscribers._id': {$ne: subscriber._id}},
                {$addToSet: {subscribers: subscriber}}
            ).exec();

            return user;
        } catch (error) {
            throw new Error(`Error adding subscriber: ${error.message}`);
        }
    };

    await dbConnection('user', async () => {
        const senderId = testValidateToken(data.token);

        try {
            const sender = await User.findOne({_id: senderId});
            const receiver = await User.findOne({_id: data.receiverId});

            const senderData = {
                _id: sender._id,
                name: sender.name,
                email: sender.email,
            };

            const receiverData = {
                _id: receiver._id,
                name: receiver.name, // Replace with the appropriate property
                email: receiver.email,
            };

            await addToSubscriberList(data.receiverId, senderData);
            await addToSubscriberList(senderId, receiverData);
        } catch (error) {
            console.log('Error:', error);
        }
    });


}

const searchUsersByName = async (searchQuery,cb) => {
    if(searchQuery.length > 0) {
        try {
            await dbConnection('user', async () => {
                const users = await User.find({name: {$regex: searchQuery, $options: 'i'}});

                // const users = await User.find({name: {$regex: searchQuery, $options: 'i'}});
                console.log(users);

                // Prepare an array of user data for subscribers
                const subscriberData = users.map(user => ({
                    _id: user._id,
                    name: user.name,
                    email: user.email,
                }));

                // Iterate through the subscribers and add them to each user
                // await Promise.all(subscriberData.map(user => addSubscriber(user._id, user)));

                cb(subscriberData, null); // Return the list of users found
            })
        } catch (error) {
            console.log('Error:', error);
            cb(undefined, error)
            throw new Error('An error occurred during user search.');
        }
    }else{
        cb([],null);
    }
};


module.exports = {
    getNotReceivedMessages,
    saveMessage,
    searchUsersByName,
}