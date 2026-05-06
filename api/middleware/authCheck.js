const jwt = require('jsonwebtoken')

const authCheck = (req, res, next) => {
  if (!req.signedCookies.authToken) {
    res.status(401).send('No authToken found. Please log in.')
  } else {
    try {
      jwt.verify(req.signedCookies.authToken, process.env.JWT_SECRET)
      next()
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        res.status(403).send('Token expired. Please log in again.')
      } else if (error.name === 'JsonWebTokenError') {
        res.status(403).send('Invalid token.')
      } else {
        res.status(500).send('Token verification failed.')
      }
    }
  }
}

module.exports = authCheck
