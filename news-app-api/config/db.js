const mongoose = require('mongoose')

require('dotenv').config()

const db = async()=>{
    try{
        mongoose.connect(process.env.MONGOURI)
        console.log('veritabanı bağlandı')
    }
    catch(error){
        console.log(error)
    }
}

module.exports=db