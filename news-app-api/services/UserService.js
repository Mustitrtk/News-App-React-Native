const User = require('../models/User');
const mongoose = require('mongoose');

class UserService {
    static async get() {
        try {
            const allUsers = await User.find();
            return allUsers;
        } catch (error) {
            console.error(error);
            throw error; // Hata yukarıya fırlatılıyor
        }
    }

    static async getById(id) {
        try {
            const user = await User.findById(new mongoose.Types.ObjectId(id));
            return user;
        } catch (error) {
            console.error(error);
            throw error; // Hata yukarıya fırlatılıyor
        }
    }

    static async getByRole(roleId) {
        try {
            const users = await User.find({ role_id: new mongoose.Types.ObjectId(roleId) });
            return users;
        } catch (error) {
            console.error(error);
            throw error; // Hata yukarıya fırlatılıyor
        }
    }

    static async addUser(user) {
        try {
            const newUser = await User.create(user);
            return newUser;
        } catch (error) {
            console.error(error);
            throw error; // Hata yukarıya fırlatılıyor
        }
    }

    static async updateUser(id, user) {
        try {
            const updatedUser = await User.findOneAndUpdate({ _id: new mongoose.Types.ObjectId(id) }, user, { new: true });
            return updatedUser;
        } catch (error) {
            console.error(error);
            throw error; // Hata yukarıya fırlatılıyor
        }
    }

    static async delete(id) {
        try {
            const deletedUser = await User.findOneAndDelete({ _id: new mongoose.Types.ObjectId(id) });
            return deletedUser;
        } catch (error) {
            console.error(error);
            throw error; // Hata yukarıya fırlatılıyor
        }
    }
}

module.exports = UserService;
