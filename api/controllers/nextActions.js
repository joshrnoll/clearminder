const db = require('../db.js')
const jwt = require('jsonwebtoken')
const jwtSecret = process.env.JWT_SECRET

exports.getNextActions = (req, res) => {

  const userData = jwt.verify(req.signedCookies.authToken, jwtSecret)

  db.select('*').from('next_actions').where({associated_user: userData.user_id})
  .then((data) => res.status(200).send(data))
  .catch((err) => res.status(500).send(err))
}