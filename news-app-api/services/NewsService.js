const News = require('../models/News');
const Comment = require('../models/Comment');

class NewsService {
    static async get() {
        try {
            const allNews = await News.find().sort({createdAt: -1});
            return allNews;
        } catch (error) {
            console.error(error);
            return { error: error }; // Hata yukarıya fırlatılıyor
        }
    }    

    static async getById(_id) {
        try {
            const news = await News.findById(_id).populate({ path: 'author_id', select: ['name', 'surname'] })
            .populate('category_id', 'name');
            return news;
        } catch (error) {
            console.error(error);
            return {error:error}; // Hata yukarıya fırlatılıyor
        }
    }

    static async getByType(type) {
        try {
            const news = await News.find({type:type});
            return news;
        } catch (error) {
            console.error(error);
            return {error:error}; // Hata yukarıya fırlatılıyor
        }
    }

    static async getByCategory(category_id) {
        try {
            const news = await News.find({ category_id: category_id }).sort({createdAt: -1});
            return news;
        } catch (error) {
            console.error(error);
            return {error:error}; // Hata yukarıya fırlatılıyor
        }
    }

    static async getComments(_id) {
        try {
            const comments = await Comment.find({news_id:_id});
            return comments;
        } catch (error) {
            console.error(error);
            return {error:error}; // Hata yukarıya fırlatılıyor
        }
    }

    static async add(news) {
        try {
            console.log(news)
            const addNews = await News.create(news);
            return addNews;
        } catch (error) {
            console.error(error);
            return {error:error}; // Hata yukarıya fırlatılıyor
        }
    }

    static async update(_id, news) {
        try {
            const updateNews = await News.findOneAndUpdate(_id, news, { new: true });
            return updateNews;
        } catch (error) {
            console.error(error);
            return {error:error}; // Hata yukarıya fırlatılıyor
        }
    }

    static async delete(_id) {
        try {
            const deleteNews = await News.findOneAndDelete(_id);
            return deleteNews;
        } catch (error) {
            console.error(error);
            return {error:error}; // Hata yukarıya fırlatılıyor
        }
    }
}

module.exports = NewsService;
