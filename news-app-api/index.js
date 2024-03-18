const express = require('express')
require('dotenv').config()
const app = express()

app.listen(process.env.PORT, ()=>{
    console.log(`Server is listening on ${process.env.PORT}`)
})