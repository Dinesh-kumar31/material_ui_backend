require("dotenv").config();
require("./config/database").connnect()

const express = require("express");

const app = express();
app.use(express.json());

const api = require('./routes/router')
app.use('/api', api)

const { APP_PORT } = process.env

app.listen(APP_PORT, () => {
    console.log(`server running on port ${APP_PORT}`)
})