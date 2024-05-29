const express = require('express')
const app = express.Router()
const UserController = require('../controllers/UserController')
const AuthMiddleware = require('../middlewares/AuthMiddleware')

app.post('/login',UserController.login)
app.get('/isLogin',UserController.isLogin)
app.get('/auth/user',UserController.authUser)
app.post('/register',UserController.register)
app.get('/logout',UserController.logout)
app.get('/get',UserController.get)
app.get('/get/:_id',UserController.getById)
app.get('/get/byrole/:role_id',UserController.getByRole)
app.post('/update/:_id',AuthMiddleware,UserController.update)
app.put('/delete/:_id',AuthMiddleware,UserController.delete)

module.exports = app