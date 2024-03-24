const Category = require('../models/Category');
const mongoose = require('mongoose');

class CategoryService {
    static async get() {
        try {
            const allCategories = await Category.find();
            return allCategories;
        } catch (error) {
            console.error(error);
            throw error; // Hata yukarıya fırlatılıyor
        }
    }

    static async getById(_id) {
        try {
            const category = await Category.findById(_id);
            return category;
        } catch (error) {
            console.error(error);
            throw error; // Hata yukarıya fırlatılıyor
        }
    }

    static async addRole(category) {
        try {
            const newCategory = await Category.create(category);
            return newCategory;
        } catch (error) {
            console.error(error);
            throw error; // Hata yukarıya fırlatılıyor
        }
    }

    static async updateUser(_id, category) {
        try {
            const updatedCategory = await Category.findOneAndUpdate(_id, category, { new: true });
            return updatedCategory;
        } catch (error) {
            console.error(error);
            throw error; // Hata yukarıya fırlatılıyor
        }
    }

    static async delete(_id) {
        try {
            const deletedCategory = await Category.findOneAndDelete(_id);
            return deletedCategory;
        } catch (error) {
            console.error(error);
            throw error; // Hata yukarıya fırlatılıyor
        }
    }
}

module.exports = CategoryService;
