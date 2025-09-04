const db = require('../db.js')

exports.getProjects = (req, res) => {
  db.select('*').from('projects').where({associated_user: req.body.user_id})
  .then((data) => res.status(200).send(data))
  .catch((err) => res.status(500).send(err))
}