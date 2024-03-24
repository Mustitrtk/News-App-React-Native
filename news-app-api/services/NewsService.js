const News = require('../models/News');
const Comment = require('../models/Comment');
const mongoose = require('mongoose');

class NewsService {
    static async get() {
        try {
            const allNews = await News.find();
            return allNews;
        } catch (error) {
            console.error(error);
            throw error; // Hata yukarıya fırlatılıyor
        }
    }

    static async getById(_id) {
        try {
            const news = await News.findById(_id);
            return news;
        } catch (error) {
            console.error(error);
            throw error; // Hata yukarıya fırlatılıyor
        }
    }

    static async getByType(type) {
        try {
            const news = await News.find({type:type});
            return news;
        } catch (error) {
            console.error(error);
            throw error; // Hata yukarıya fırlatılıyor
        }
    }

    static async getByCategory(_category_id) {
        try {
            const categoryId = mongoose.Types.ObjectId(_category_id); // _category_id'yi ObjectId'ye dönüştür
            const news = await News.find({ category_id: categoryId });
            return news;
        } catch (error) {
            console.error(error);
            throw error; // Hata yukarıya fırlatılıyor
        }
    }

    static async getComments(_id) {
        try {
            const comments = await Comment.find({news_id:mongoose.Types.ObjectId(_id)});
            return comments;
        } catch (error) {
            console.error(error);
            throw error; // Hata yukarıya fırlatılıyor
        }
    }

    static async updateNews(_id, news) {
        try {
            const updateNews = await News.findOneAndUpdate(_id, news, { new: true });
            return updateNews;
        } catch (error) {
            console.error(error);
            throw error; // Hata yukarıya fırlatılıyor
        }
    }

    static async delete(_id) {
        try {
            const deleteNews = await News.findOneAndDelete(_id);
            return deleteNews;
        } catch (error) {
            console.error(error);
            throw error; // Hata yukarıya fırlatılıyor
        }
    }
}

module.exports = NewsService;
