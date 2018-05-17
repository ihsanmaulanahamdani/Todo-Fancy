const router = require('express').Router()
const { readUser, updateUser, deleteUser } = require('../controllers/user.controller')
const { loginAuthentication } = require('../middlewares/auth')

router.get('/', loginAuthentication, readUser)
      .put('/update', loginAuthentication, updateUser)
      .delete('/delete', loginAuthentication, deleteUser)

module.exports = router