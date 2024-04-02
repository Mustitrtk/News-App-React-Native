const jwt = require('jsonwebtoken');
require('dotenv').config();
const UserService = require('../services/UserService');

exports.login = async (req, res) => {
    try {
        const user = await UserService.Login(req.body);
        if (user.error) {
            return res.status(400).json({ error: user.error });
        }

        const user_id = user._id;
        const user_role = user.role_id;
        const token = jwt.sign({user_id:user_id,user_role:user_role}, process.env.JWT_SECRET,  { expiresIn: "15m" }); //Token oluşturma.
        
        res.cookie('token',token, {httpOnly:true}); //tokeni res ile gönderirrr
        return res.status(200).json({result:"Basarili"})
    } catch (error) {
        return res.status(500).json({ result: error });
    }
};

exports.register=async(req,res)=>{
    try{
        const user = await UserService.Register(req.body);
        if(user.error){
            return res.status(400).json({ result: user.error });
        }
        return res.status(200).json({result:"Basarili"});
    }catch(error){
        return res.status(500).json({result:error.message});
    }
};

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
        if(result.error){
            return res.status(400).json({ result: user.error });
        }
        res.status(200).json({result:result})
    }catch(error){
        res.status(500).json({result:error})
    }
}

exports.getByRole = async(req,res) => {
    try{
        const result = await UserService.getByRole(req.params.role_id)
        res.status(200).json({result:result})
    }catch(error){
        res.status(500).json({result:error})
    }
}

exports.update = async(req,res) => {
    try{
        const result = await UserService.update(req.params._id,req.body)
        if(result.error){
            return res.status(400).json({ result: user.error });
        }
        res.status(200).json({result:"Basarili"})
    }catch(error){
        res.status(500).json({result:error})
    }
}

exports.delete = async(req,res) => {
    try{
        const result = await UserService.delete(req.params._id)
        res.status(200).json({result:"Basarili"})
    }catch(error){
        res.status(500).json({result:error})
    }
}