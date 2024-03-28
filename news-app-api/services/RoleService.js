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
            const role = await Role.findById(_id);
            return role;
        } catch (error) {
            console.error(error);
            throw error; // Hata yukarıya fırlatılıyor
        }
    }

    static async add(role) {
        try {
            const newRole = await Role.create(role);
            return newRole;
        } catch (error) {
            console.error(error);
            throw error; // Hata yukarıya fırlatılıyor
        }
    }

    static async update(_id, role) {
        try {
            const updatedRole = await Role.findOneAndUpdate(_id, role, { new: true });
            return updatedRole;
        } catch (error) {
            console.error(error);
            throw error; // Hata yukarıya fırlatılıyor
        }
    }

    static async delete(_id) {
        try {
            const deletedRole = await Role.findOneAndDelete(_id);
            return deletedRole;
        } catch (error) {
            console.error(error);
            throw error; // Hata yukarıya fırlatılıyor
        }
    }
}

module.exports = RoleService;
