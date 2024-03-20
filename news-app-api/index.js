const express = require('express')
require('dotenv').config()
const app = express()

const db = require('./config/db')

db()

app.listen(process.env.PORT, ()=>{
    console.log(`Server is listening on ${process.env.PORT}`)
})