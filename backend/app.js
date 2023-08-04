const express = require('express')
const routes = require('./routes')
const {errorHandler} = require('./middleware')
const bodyParser = require('body-parser');


const app = express();
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: true }))

app.use('/uploads', express.static('uploads'));

var cors = require('cors');
app.use(cors());



routes(app)

app.use(errorHandler)

module.exports = app