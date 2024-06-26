const mongoose = require("mongoose")

const Schema = mongoose.Schema

const CommentSchema = new Schema({
    comment:{
        type:String,
        required:true
    },
    author_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    news_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'News',
        required:true
    }
},{timestamps:true})

module.exports = mongoose.model('Comment',CommentSchema)