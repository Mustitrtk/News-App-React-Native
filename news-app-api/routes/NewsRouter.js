const express = require('express')
const app = express.Router()
const NewsController = require('../controllers/NewsController')
const AuthMiddleware = require('../middlewares/AuthMiddleware')

app.get('/get',NewsController.get)
app.get('/get/:_id',NewsController.getById)
app.get('/getByCategory/:category_id',NewsController.getByCategory)
app.get('/getByType/:type',NewsController.getByType)
app.post('/add',AuthMiddleware,NewsController.add)
app.post('/update/:_id',AuthMiddleware,NewsController.update)
app.put('/delete/:_id',AuthMiddleware,NewsController.delete)

module.exports = app