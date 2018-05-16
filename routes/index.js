const router = require('express').Router()
const { login, register, facebookLogin }   = require('../controllers/index.controller')

router.post('/register', register)
      .post('/login', login)
      .post('/loginfacebook', facebookLogin)

module.exports = router