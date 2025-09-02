const db = require('../db.js')

exports.getNextActions = (req, res) => {
  db.select('*').from('next_actions').where({associated_user: req.body.user_id})
  .then((data) => res.status(200).send(data))
  .catch((err) => res.status(500).send(err))
}