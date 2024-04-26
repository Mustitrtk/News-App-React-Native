const express = require('express')
const app = express.Router()
const RoleController = require('../controllers/RoleController')
const AuthMiddleware = require('../middlewares/AuthMiddleware')

app.get('/get',AuthMiddleware,RoleController.get)
app.get('/get/:_id',AuthMiddleware,RoleController.getById)
app.post('/add',AuthMiddleware,RoleController.add)
app.post('/update/:_id',AuthMiddleware,RoleController.update)
app.put('/delete/:_id',AuthMiddleware,RoleController.delete)


module.exports = app