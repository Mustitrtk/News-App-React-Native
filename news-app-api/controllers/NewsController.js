const NewsService = require('../services/NewsService')

exports.get = async(req,res) =>{
    try{
        const result = await NewsService.get();
        result;
    }catch(error){
        res.status(500).json({result:error})
    }
}

exports.getById = async(req,res) =>{
    try{
        const result = await NewsService.getById(req.params._id);
        res.status(200).json({result:result});
    }catch(error){
        res.status(500).json({result:error})
    }
}

exports.getByCategory = async(req,res)=>{
    try{
        const result = await NewsService.getByCategory(req.params.category_id)
        res.status(200).json({result:result})
    }catch(error){
        res.status(500).json({result:error})
    }
}

exports.getByType = async(req,res)=>{
    try{
        const result = await NewsService.getByType(req.params.type);
        res.status(200).json({result:result})
    }catch(error){
        res.result(500).json({result:error})
    }
}

exports.add = async(req,res)=>{
    try{
        const result = await NewsService.add(req.body);
        res.status(200).json({result:result})
    }catch(error){
        res.result(500).json({result:error})
    }
}

exports.update = async(req,res)=>{
    try{
        const resultIsset = await NewsService.getById(req.params._id)
        if(resultIsset === null){
            res.status(404).json({result:'Haber bulunamadi'})
        }
        const result = await NewsService.update(req.params._id,req.body);
        res.status(200).json({result:result})
    }catch(error){
        res.result(500).json({result:error})
    }
}

exports.delete = async(req,res)=>{
    try{
        const resultIsset = await NewsService.delete(req.params._id)
        if(resultIsset === null){
            res.status(404).json({result:'Haber bulunamadi'})
        }
        const result = await NewsService.delete(req.params._id);
        res.status(200).json({result:result})
    }catch(error){
        res.result(500).json({result:error})
    }
}