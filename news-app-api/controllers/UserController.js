const mongoose = require('mongoose')
const bodyparser=require('body-parser');
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');
const UserService = require('../services/UserService');

/* const login = async (req,res) =>{
    try{
        const user = await User.find({usern_name:req.body.user_name})
        if(user == null){
            return { error: "Kullanıcı bulunamadı!" };
        }
        if(await argon2.verify(user.password, req.body.password)){
            return { error: "Sifre Hatali!" };
        }

        const token = jwt.sign({user_id:user._id,role:user.role_id}, process.env.JWT_SECRET,  { expiresIn: "15m" }); //Token oluşturma.
        
        res.cookie('token',token, {httpOnly:true}); //tokeni res ile gönderirrr
        return res.status(200).json({message:"giris basarili"})
    }catch(error){
        console.log(error)
    }
}

const register = async (req,res) =>{
    try{
        const user = await User.find({usern_name:req.user_name})
        if(user != null){
            return { error: "Kullanıcı adı mevcut!" };
        }
        //Burada password üzerinde değişiklik olacağı için req.body direkt olarak gönderilmeyecek veya servise yazılacak hashleme
        const result = await UserService.addUser(req.body)

        const token = jwt.sign({user_id:user._id,role:user.role_id}, process.env.JWT_SECRET,  { expiresIn: "15m" }); //Token oluşturma.
        
        res.cookie('token',token, {httpOnly:true}); //tokeni res ile gönderirrr
        return res.status(200).json({message:"giris basarili"})
    }catch(error){
        console.log(error)
    }
} */

exports.get = async(req,res) => {
    try{
        const result = await UserService.get()
        res.status(200).json({result:result})
    }catch(error){
        res.status(500).json({result:error})
    }
}

exports.getById = async(req,res) => {
    try{
        const result = await UserService.getById(req.params._id)
        res.status(200).json({result:result})
    }catch(error){
        res.status(500).json({result:error})
    }
}

exports.delete = async(req,res) => {
    try{
        const result = await UserService.delete(req.params._id)
        res.status(200).json({result:result})
    }catch(error){
        res.status(500).json({result:error})
    }
}