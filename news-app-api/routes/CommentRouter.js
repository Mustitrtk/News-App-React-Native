const express = require("express")
const app = express.Router()

const CommentController = require('../controllers/CommentController')
const AuthMiddleware = require('../middlewares/AuthMiddleware')

app.get('/get',CommentController.get)
app.get('/get/:_id',CommentController.getByNewsId)
app.post('/add', AuthMiddleware ,CommentController.add)
app.put('/add', AuthMiddleware ,CommentController.update)
app.delete('/add', AuthMiddleware ,CommentController.delete)