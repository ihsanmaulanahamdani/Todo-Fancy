const mongoose  = require('mongoose')
const secretKey = process.env.SECRETKEY_JWT
const jwt       = require('jsonwebtoken')
const User      = require('../models/user')
const Todo      = require('../models/todo')

module.exports = {
  createTodo: (req, res) => {
    let { user, todo, estimated_time } = req.body

    let newTodo = new Todo({
      user,
      todo,
      estimated_time,
      status: 'uncomplete'
    })

    newTodo
      .save()
      .then(todo => {
        User
          .findOneAndUpdate({
            _id: todo.user
          }, {
            $push: {
              todo_list: todo._id
            }
          })
          .then(result => {
            res
              .status(201)
              .json({
                message: 'create todo success',
                todo
              })
          })
      })
      .catch(err => {
        res
        .status(500)
        .json({
          message: 'something went wrong',
          err
        })
      })
  },

  readTodo: (req, res) => {
    Todo
      .find({
        user: req.headers.user
      })
      .populate('user')
      .exec()
      .then(todos => {
        res
        .status(200)
        .json({
          message: 'read todos success',
          todos
        })
      })
      .catch(err => {
        res
        .status(500)
        .json({
          message: 'something went wrong',
          err
        })
      })
  },

  updateTodo: (req, res) => {
    let { id } = req.params
    let { status } = req.body

    Todo
      .findOneAndUpdate({
        _id: id
      }, {
        status
      })
      .then(todoUpdated => {
        res
          .status(200)
          .json({
            message: 'update todo success',
            todoUpdated
          })
      })
      .catch(err => {
        res
          .status(500)
          .json({
            message: 'something went wrong',
            err
          })
      })
  },

  deleteTodo: (req, res) => {
    let { id } = req.params

    User
      .findOne({
        _id: req.headers.user
      })
      .then(user => {
        let indexTodo = user.todo_list.indexOf(id)

        user.todo_list.splice(indexTodo, 1)

        User
          .update({
            _id: req.headers.user
          },
            user
          )
          .then(userUpdated => {
            Todo
              .findOneAndRemove({
                _id: id
              })
              .then(deletedTodo => {
                res
                  .status(200)
                  .json({
                    message: 'delete todo success',
                    deletedTodo
                  })
              })
          })
      })
      .catch(err => {
        res
          .status(500)
          .json({
            message: 'something went wrong',
            err
          })
      })
  }
}