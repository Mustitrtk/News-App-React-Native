const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const NewsSchema = new Schema({
    type:{
        type:Boolean,
        required:true,
    },
    title:{
        type:String,
        required:true,
    },
    subtitle:{
        type:String,
        required:true,
    },
    content:{
        type:String,
        required:true,
    },
    image:{
        type:String
    },
    author_id:[{
        type:mongoose.Schema.Types.ObjectId,
        referance:'User',
        required:true
    }],
    category_id:[{
        type:mongoose.Schema.Types.ObjectId,
        referance:'Category',
        required:true
    }],
    comment_id:[{
        type:mongoose.Schema.Types.ObjectId,
        referance:'Comment',
        required:true
    }]
},{timestamps:true});

module.exports = mongoose.model('News',NewsSchema);
