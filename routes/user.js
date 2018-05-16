const router = require('express').Router()
const { readUser, updateUser, deleteUser } = require('../controllers/user.controller')
const { loginAuthentication, loginAuthorization } = require('../middlewares/auth')

router.get('/', loginAuthentication, readUser)
      .put('/update', loginAuthentication, updateUser)
      .delete('/delete', loginAuthentication, loginAuthorization, deleteUser)

module.exports = router