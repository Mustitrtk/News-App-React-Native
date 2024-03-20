const Role = require('../models/Role');
const mongoose = require('mongoose');

class RoleService {
    static async get() {
        try {
            const allRoles = await Role.find();
            return allRoles;
        } catch (error) {
            console.error(error);
            throw error; // Hata yukarıya fırlatılıyor
        }
    }

    static async getById(_id) {
        try {
            const role = await Role.findById(new mongoose.Types.ObjectId(_id));
            return role;
        } catch (error) {
            console.error(error);
            throw error; // Hata yukarıya fırlatılıyor
        }
    }

    static async addRole(role) {
        try {
            const newRole = await Role.create(role);
            return newRole;
        } catch (error) {
            console.error(error);
            throw error; // Hata yukarıya fırlatılıyor
        }
    }

    static async updateUser(_id, role) {
        try {
            const updatedUser = await Role.findOneAndUpdate({ _id: new mongoose.Types.ObjectId(_id) }, role, { new: true });
            return updatedUser;
        } catch (error) {
            console.error(error);
            throw error; // Hata yukarıya fırlatılıyor
        }
    }

    static async delete(_id) {
        try {
            const deletedRole = await Role.findOneAndDelete({ _id: new mongoose.Types.ObjectId(_id) });
            return deletedRole;
        } catch (error) {
            console.error(error);
            throw error; // Hata yukarıya fırlatılıyor
        }
    }
}

module.exports = RoleService;
