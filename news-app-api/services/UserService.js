const Role = require('../models/Role');
const User = require('../models/User');
const argon = require('argon2');
const mongoose = require('mongoose')

class UserService {

    static async Register(user){
        try {
            const passwordHash = await argon.hash(user.password);
            const role = await Role.findOne({name:"kullanici"});
            const newUser = await User.create({
                name: user.name,
                surname: user.surname,
                user_name: user.user_name,
                mail: user.mail,
                telephone_no: user.telephone_no,
                role_id: role._id,
                password: passwordHash,
            });
            if (!newUser) {
                return {error:"Kullanıcı oluşturulamadı!"};
            }
            return newUser;
        } catch (error) {
            console.error(error);
            return {error:error};
        }
    }
    
    static async Login(user){
        try {
            const userLogin = await User.findOne({ mail: user.mail });
            if (!userLogin) {
                return {error:"Kullanıcı Bulunamadı!"};
            }
            const isPasswordValid = await argon.verify(userLogin.password, user.password);
            if (!isPasswordValid) {
                return {error:"Şifre Hatalı!"};
            }
            return userLogin;
        } catch (error) {
            console.error(error);
            return {error:error}
        }
    }
    

    static async get() {
        try {
            const allUsers = await User.find();
            return allUsers;
        } catch (error) {
            console.error(error);
            return {error:error}; // Hata yukarıya fırlatılıyor
        }
    }

    static async getById(_id) {
        try {
            const user = await User.findById(_id);
            return user;
        } catch (error) {
            console.error(error);
            return {error:error}; // Hata yukarıya fırlatılıyor
        }
    }

    static async getByRole(role_id) {
        try {
            const users = await User.find({ role_id:role_id});
            return users;
        } catch (error) {
            console.error(error);
            return {error:error}; // Hata yukarıya fırlatılıyor
        }
    }

    static async update(_id, user) {
        try {
            const updatedUser = await User.findOneAndUpdate(new mongoose.Types.ObjectId(_id), user, { new: true });
            return updatedUser;
        } catch (error) {
            console.error(error);
            return {error:error}; // Hata yukarıya fırlatılıyor
        }
    }

    static async delete(_id) {
        try {
            const deletedUser = await User.findOneAndDelete(new mongoose.Types.ObjectId(_id));
            return deletedUser;
        } catch (error) {
            console.error(error);
            return {error:error}; // Hata yukarıya fırlatılıyor
        }
    }
}

module.exports = UserService;
