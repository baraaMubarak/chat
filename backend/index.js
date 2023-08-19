const http = require('http')
require('dotenv').config()
const app = require('./app')
const {testValidateToken} = require('./middleware')
const {saveMessage} = require('./controller').chatController
const {searchUsersByName} = require('./controller').chatController

const server = http.createServer(app)
const io = require("socket.io")(server);


io.on("connection", async (socket) => {
    console.log("User Connected on :", socket.id)
    await socket.on("message", async (data, ack) => {
        console.log(data)
        socket.broadcast.emit(data.receiverId, {
            message: data.message,
            senderId: testValidateToken(data.token),
            createdAt: new Date(Date.now()).toISOString(),
        })
        await saveMessage(data);
        ack({
            status: 201,
            message: 'The message has been sent successfully',
        })
    });
    await socket.on("search", async (data, ack) => {
        console.log(data)
        socket.to(data.socketId).emit('search', {
            data: 'yesssssssss'
        })
        // await saveMessage(data);
        await searchUsersByName(data['searchKey'], (v, e) => {
            if (v) {
                ack({
                    status: 200,
                    users: v,
                })
            } else {
                ack({
                    status: 404,
                    users: [],
                })
            }

        })

    });
});

server.listen(process.env.PORT, () => {
    console.log('server is running on port', process.env.PORT)
})