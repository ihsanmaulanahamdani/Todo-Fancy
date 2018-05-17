const router = require('express').Router()
const { createTodo, readTodo, updateTodo, deleteTodo } = require('../controllers/todo.controller')
const { loginAuthentication } = require('../middlewares/auth')

router.post('/', loginAuthentication, createTodo)
      .get('/', loginAuthentication, readTodo)
      .put('/update/:id', loginAuthentication, updateTodo)
      .delete('/delete/:id', loginAuthentication, deleteTodo)

module.exports = router