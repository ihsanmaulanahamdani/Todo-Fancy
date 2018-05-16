const mongoose  = require('mongoose')
const secretKey = process.env.SECRETKEY_JWT
const jwt       = require('jsonwebtoken')
const User      = require('../models/user')
const Todo      = require('../models/todo')

module.exports = {
  readUser: (req, res) => {
    User
      .find()
      .populate('todo_list')
      .exec()
      .then(users => {
        res
          .status(200)
          .json({
            message: 'read data success',
            users
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

  updateUser: (req, res) => {
    let { full_name, username, gender, email, role } = req.body
    let decoded = req.res.locals.decoded

    User
      .findOneAndUpdate({
        _id: decoded.id
      }, {
        full_name,
        username,
        email
      })
      .then(updatedUser => {
        res
          .status(200)
          .json({
            message: 'update data success',
            updatedUser
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

  deleteUser: (req, res) => {
    let decoded = req.res.locals.decoded

    User
      .findOneAndRemove({
        _id: decoded.id
      })
      .then(deletedUser => {
        Todo
          .deleteMany({
            user: decoded.id
          })
          .then(deletedTodo => {
            res
              .status(200)
              .json({
                message: 'delete user success',
                deletedUser,
                deletedTodo
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