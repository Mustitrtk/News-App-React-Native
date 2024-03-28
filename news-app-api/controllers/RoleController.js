const RoleService = require('../services/RoleService')

exports.get = async(req,res)=>{
    try{
        const result = await RoleService.get()
        res.status(200).json({result:result})
    }catch(error){
        res.status(500).json({result:error})
    }
}

exports.getById = async(req,res)=>{
    try{
        const result = await RoleService.getById(req.params._id)
        res.status(200).json({result:result})
    }catch(error){
        res.status(500).json({result:error})
    }
}

exports.add = async(req,res)=>{
    try{
        const result = await RoleService.add(req.body)
        res.status(200).json({result:result})
    }catch(error){
        res.status(500).json({result:error})
    }
}

exports.update = async(req,res)=>{
    try{
        const result = await RoleService.update(req.params._id, req.body)
        res.status(200).json({result:result})
    }catch(error){
        res.status(500).json({result:error})
    }
}

exports.delete = async(req,res)=>{
    try{
        const result = await RoleService.delete(req.params._id)
        res.status(200).json({result:result})
    }catch(error){
        res.status(500).json({result:error})
    }
}