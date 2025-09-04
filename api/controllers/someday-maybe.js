const db = require('../db.js')

exports.getSomedayMaybe = (req, res) => {
  db.select('*').from('someday_maybe').where({associated_user: req.body.user_id})
  .then((data) => res.status(200).send(data))
  .catch((err) => res.status(500).send(err))
}