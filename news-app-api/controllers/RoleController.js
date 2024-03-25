const Role = require('../models/Role');
const RoleService = require('../services/RoleService')

exports.get = async(req,res)=>{
    try{
        const result = await RoleService.get()
        return res.status(200).json({result:result})
    }catch(error){
        return res.status(500).json({error:error})
    }
}

exports.getById = async(req,res)=>{
    try{
        const result = await RoleService.getById(req.params._id)
        return res.status(200).json({result:result})
    }catch(error){
        return res.status(500).json({error:error})
    }
}

exports.add = async(req,res)=>{
    try{
        const result = await RoleService.add(req.body)
        return res.status(200).json({result:result})
    }catch(error){
        return res.status(500).json({error:error})
    }
}

exports.update = async(req,res)=>{
    try{
        const result = await RoleService.updateRole(req.params._id, req.body)
        return res.status(200).json({result:result})
    }catch(error){
        return res.status(500).json({error:error})
    }
}

exports.delete = async(req,res)=>{
    try{
        const result = await RoleService.delete(req.params._id)
        return res.status(200).json({result:result})
    }catch(error){
        return res.status(500).json({error:error})
    }
}