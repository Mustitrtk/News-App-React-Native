const express = require('express')
require('dotenv').config()
const app = express()
const parser = require('body-parser')
const UserRouter = require('./routes/UserRouter')
const RoleRouter = require('./routes/RoleRouter')
const cors = require('cors')

//DB CONNECTİON
const db = require('./config/db')
db()

//ROLE SEEDER
const roleSeeder = require('./seeder/roleSeeder')
//roleSeeder() //Her seferinde çalışmaması için ilk çalıştırmadan sonra yorum satırına alın.


//Use parser for post size
app.use(parser.urlencoded({ extended: false }));
app.use(parser.json());
app.use(cors())

app.use('/user',UserRouter)
app.use('/role',RoleRouter)

app.listen(process.env.PORT, ()=>{
    console.log(`Server is listening on ${process.env.PORT}`)
})