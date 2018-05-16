const mongoose  = require('mongoose')
const secretKey = process.env.SECRETKEY_JWT
const jwt       = require('jsonwebtoken')
const User      = require('../models/user')
const Todo      = require('../models/todo')

module.exports = {
  register: (req, res) => {
    let { full_name, username, email, password } = req.body
    
    User
      .schema
      .methods
      .generateHash(password, (errHash, hash) => {
      if (!errHash) {
        let newUser = new User({
          full_name,
          username,
          email,
          password: hash,
          role: 'user',
          todo_list: []
        })
    
        newUser
          .save()
          .then(user => {
            res
              .status(201)
              .json({
                message: 'create user success',
                user
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
      } else {
        res
          .status(500)
          .json({
            message: 'something went wrong',
            errHash
          })
      }
    })
  },

  login: (req, res) => {
    let { email, password } = req.body

    User
      .findOne({
        email
      })
      .exec()
      .then(user => {
        if (user) {
          User
            .schema
            .methods
            .compareHash(password, user.password, (err, result) => {
              if (!err && result) {
                let token = jwt.sign({ id: user._id, username: user.username, email: user.email, role: user.role }, secretKey)

                res.status(200).json({
                  message: 'login success',
                  token,
                  user: {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    role: user.role
                  }
                })
              } else {
                res.status(400).json({
                  message: 'please login',
                  err
                })
              }
            })
        } else {
          res.status(400).json({
            message: 'please login'
          })
        }
      })
      .catch(err => {
        res.status(500).json({
          message: 'somthing went wrong',
          err
        })
      })
  },

  facebookLogin: (req, res) => {
    let { email, password } = req.body

    User
      .findOne({
        email
      })
      .exec()
      .then(user => {
        if (user) {
          User
            .schema
            .methods
            .compareHash(password, user.password, (err, result) => {
              if (!err && result) {
                let token = jwt.sign({ id: user._id, username: user.username, email: user.email, role: user.role }, secretKey)

                res.status(200).json({
                  message: 'login success',
                  token,
                  user: {
                    id: user._id,
                    username: user.username,
                    email: user.email,
                    role: user.role
                  }
                })
              }
            })
        } else {
          let { full_name, username, email, password } = req.body
    
          User
            .schema
            .methods
            .generateHash(password, (errHash, hash) => {
              if (!errHash) {
                let newUser = new User({
                  full_name,
                  username,
                  email,
                  password: hash,
                  role: 'user',
                  todo_list: []
                })

                newUser
                  .save()
                  .then(user => {
                    let token = jwt.sign({ id: user._id, username: user.username, email: user.email, role: user.role }, secretKey)

                    res
                      .status(201)
                      .json({
                        message: 'create user success',
                        token,
                        user: {
                          id: user._id,
                          username: user.username,
                          email: user.email,
                          role: user.role
                        }
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
              } else {
                res
                  .status(500)
                  .json({
                    message: 'something went wrong',
                    errHash
                  })
              }
            })
        }
      })
  }
}