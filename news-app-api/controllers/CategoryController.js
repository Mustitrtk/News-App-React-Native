const Category = require("../models/Category");
const CategoryService = require("../services/CategoryService");

exports.get = async(req,res)=>{
    try{
        const result = await CategoryService.get()
        return res.status(200).json({result:result})
    }catch(error){
        return res.status(500).json({error:error})
    }
}

exports.getById = async(req,res)=>{
    try{
        const result = await CategoryService.getById(req.params._id)
        return res.status(200).json({result:result})
    }catch(error){
        return res.status(500).json({error:error})
    }
}

exports.add = async(req,res)=>{
    try{
        const result = await CategoryService.add(req.body)
        return res.status(200).json({result:result})
    }catch(error){
        return res.status(500).json({error:error})
    }
}

exports.update = async(req,res)=>{
    try{
        const result = await CategoryService.updateCategory(req.params._id,req.body)
        return res.status(200).json({result:result})
    }catch(error){
        return res.status(500).json({error:error})
    }
}

exports.delete = async(req,res)=>{
    try{
        const result = await CategoryService.delete(req.params._id)
        return res.status(200).json({result:result})
    }catch(error){
        return res.status(500).json({error:error})
    }
}