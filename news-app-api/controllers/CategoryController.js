const CategoryService = require("../services/CategoryService");

exports.get = async(req,res)=>{
    try{
        const result = await CategoryService.get()
        res.status(200).json({result:result})
    }catch(error){
        res.status(500).json({result:error})
    }
}

exports.getById = async(req,res)=>{
    try{
        const result = await CategoryService.getById(req.params._id)
        res.status(200).json({result:result})
    }catch(error){
        res.status(500).json({result:error})
    }
}

exports.add = async(req,res)=>{
    try{
        const result = await CategoryService.add(req.body)
        res.status(200).json({result:result})
    }catch(error){
        res.status(500).json({result:error})
    }
}

exports.update = async(req,res)=>{
    try{
        const result = await CategoryService.update(req.params._id,req.body)
        res.status(200).json({result:"Basarili"})
    }catch(error){
        res.status(500).json({result:error})
    }
}

exports.delete = async(req,res)=>{
    try{
        const result = await CategoryService.delete(req.params._id)
        res.status(200).json({result:"Basarili"})
    }catch(error){
        res.status(500).json({result:error})
    }
}