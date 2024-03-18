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
        referance:'Role',
        required:true
    }
},{timestamps:true});

// Şifre kaydedilmeden önce hashleniyor
UserSchema.pre('save', async function(next) {
  if (!this.isModified('password')) {
    return next();
  }
  try {
    // Argon2 kullanarak şifre hashleniyor
    const hash = await argon2.hash(this.password);
    this.password = hash;
    next();
  } catch (error) {
    next(error);
  }
});

// Şifre doğrulama metodu
UserSchema.methods.comparePassword = async function(candidatePassword) {
  try {
    // Argon2 kullanarak hashli şifreyi karşılaştırma
    return await argon2.verify(this.password, candidatePassword);
  } catch (error) {
    return false;
  }
};

module.exports = mongoose.model('User',UserSchema);
