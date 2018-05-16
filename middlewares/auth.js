const jwt        = require('jsonwebtoken')
const secret_key = process.env.SECRETKEY_JWT

module.exports = {
  loginAuthentication: (req, res, next) => {
    let token = req.headers.token

    jwt.verify(token, secret_key, (err, decoded) => {
      if (!err) {
        res.locals.decoded = decoded
        next()
      } else {
        res.status(403).json({
          message: 'authentication failure',
          err
        })
      }
    })
  },

  loginAuthorization: (req, res, next) => {
    let decoded = req.res.locals.decoded

    if (decoded.role === 'admin') {
      next()
    } else {
      res
        .status(403)
        .json({
          message: 'user have no access to this site'
        })
    }
  }
}