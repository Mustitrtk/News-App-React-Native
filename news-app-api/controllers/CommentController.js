const CommentService = require('../services/CommentService')

exports.get = async(req,res) =>{
    try{
        const result = await CommentService.get();
        res.status(200).json({result:result});
    }catch(error){
        res.status(500).json({result:error})
    }
}

exports.getById = async(req,res) =>{
    try{
        const result = await CommentService.getById(req.params._id);
        res.status(200).json({result:result});
    }catch(error){
        res.status(500).json({result:error})
    }
}

exports.add = async(req,res)=>{
    try{
        const result = await CommentService.add(req.body);
        res.status(200).json({result:result})
    }catch(error){
        res.result(500).json({result:error})
    }
}

exports.update = async(req,res)=>{
    try{
        const result = await CommentService.update(req.params._id,req.body);
        res.status(200).json({result:result})
    }catch(error){
        res.result(500).json({result:error})
    }
}

exports.delete = async(req,res)=>{
    try{
        const result = await CommentService.delete(req.params._id);
        res.status(200).json({result:result})
    }catch(error){
        res.result(500).json({result:error})
    }
}