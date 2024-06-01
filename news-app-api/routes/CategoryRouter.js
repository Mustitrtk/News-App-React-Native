const express = require('express')
const app = express.Router()
const CategoryController=require('../controllers/CategoryController')
const AuthMiddleware = require('../middlewares/AuthMiddleware')

app.get('/get',CategoryController.get)
app.get('/get/:_id',CategoryController.getById)
app.post('/add',AuthMiddleware,CategoryController.add)
app.post('/update/:_id',AuthMiddleware,CategoryController.update)
app.put('/delete/:_id',AuthMiddleware,CategoryController.delete)

module.exports = app