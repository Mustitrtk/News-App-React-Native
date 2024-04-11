const express = require('express')
const app = express.Router()
const NewsController = require('../controllers/NewsController')

app.get('/get',NewsController.get)
app.get('/get/:_id',NewsController.getById)
app.get('/get/:category_id',NewsController.getByCategory)
app.get('/get/:type',NewsController.getByType)
app.post('/add',NewsController.add)
app.post('/update/:_id',NewsController.update)
app.put('/delete/:_id',NewsController.delete)

module.exports = app