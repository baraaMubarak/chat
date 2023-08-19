const authRouter = require('./auth')
const chatRouter = require('./chat')
module.exports = (app) => {
    app.use('/auth', authRouter)
    app.use('/chat', chatRouter)
}