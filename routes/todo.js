const router = require('express').Router()
const { createTodo, readTodo, updateTodo, deleteTodo } = require('../controllers/todo.controller')
const { loginAuthentication, loginAuthorization } = require('../middlewares/auth')

router.post('/', createTodo)
      .get('/', readTodo)
      .put('/update/:id', updateTodo)
      .delete('/delete/:id', deleteTodo)

module.exports = router