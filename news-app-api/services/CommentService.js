const Comment = require('../models/Comment');
const mongoose = require('mongoose');

class CommentService {
    static async get() {
        try {
            const allComment = await Comment.find();
            return allComment;
        } catch (error) {
            console.error(error);
            throw error; // Hata yukarıya fırlatılıyor
        }
    }

    static async getByNewsId(_id) {
        try {
            const comments = await Comment.find({news_id :_id});
            return comments;
        } catch (error) {
            console.error(error);
            throw error; // Hata yukarıya fırlatılıyor
        }
    }

    static async add(comment) {
        try {
            const addComment = await Comment.create(comment);
            return addComment;
        } catch (error) {
            console.error(error);
            throw error; // Hata yukarıya fırlatılıyor
        }
    }

    static async update(_id, comment) {
        try {
            const updateComment = await Comment.findOneAndUpdate(_id, comment, { new: true });
            return updateComment;
        } catch (error) {
            console.error(error);
            throw error; // Hata yukarıya fırlatılıyor
        }
    }

    static async delete(_id) {
        try {
            const deleteComment = await Comment.findOneAndDelete(_id);
            return deleteComment;
        } catch (error) {
            console.error(error);
            throw error; // Hata yukarıya fırlatılıyor
        }
    }
}

module.exports = CommentService;
