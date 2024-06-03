const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const argon2 = require('argon2');

const UserSchema = new Schema({
    name:{
        type:String,
        required:true,
        minlength: 1,
        maxlength: 20,
    },
    surname:{
        type:String,
        required:true,
        minlength: 1,
        maxlength: 20,
    },
    user_name:{
        type:String,
        required:true,
        unique:true,
        minlength: 1,
        maxlength: 10,
    },
    mail:{
        type:String,
        required:true,
        unique:true,
        minlength: 1,
        maxlength: 20,
    },
    telephone_no:{
        type:String,
        required:true,
        unique:true,
        minlength: 11,
        maxlength: 11,
    },
    password:{
        type:String,
        required:true
    },
    role_id:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Role',
        required:true
    }
},{timestamps:true});

module.exports = mongoose.model('User',UserSchema);
