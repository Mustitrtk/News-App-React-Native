const express = require('express')
const app = express.Router()
const RoleController = require('../controllers/RoleController')

app.get('/get',RoleController.get)
app.get('/get/:_id',RoleController.getById)
app.post('/add',RoleController.add)
app.post('/update/:_id',RoleController.update)
app.put('delete/:_id',RoleController.delete)


module.exports = app