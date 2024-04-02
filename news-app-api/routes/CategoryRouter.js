const express = require('express')
const app = express.Router()
const CategoryController=require('../controllers/CategoryController')

app.get('/get',CategoryController.get)
app.get('/get/:_id',CategoryController.getById)
app.post('/add',CategoryController.add)
app.post('/update/:_id',CategoryController.update)
app.put('/delete/:_id',CategoryController.delete)

module.exports = app