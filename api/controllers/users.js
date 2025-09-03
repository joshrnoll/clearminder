const db = require('../db.js')

exports.getAllUsers = (req, res) => {
  res.status(200).send("This would get all users")
}

exports.getTutorialComplete = (req, res) => {
  db.select('tutorial_complete').from('users').where({ user_id: req.body.user_id })
  .then(data => {
    if (!data){
      console.log('here')
      res.status(404).send(`No user found with user id of ${ req.body.user_id }`)
    }
    else{
      res.status(200).send(data)
    }
  })
  .catch(err => res.status(500).send(err))
}

exports.setTutorialComplete = (req, res) => {
  if(req.params.value != 'true' && req.params.value != 'false'){
    res.status(400).send('Bad parameters')
  }
  else{
    db('users').where({ user_id: req.body.user_id }).update({ tutorial_complete: req.params.value }, ['user_id', 'tutorial_complete'])
    .then(data => {
      if(data){
        res.status(200).send(data)
      }
      else{
        res.status(500).send(`Could not update tutorial status for user ${req.params.user_id}`)
      }
    })
    .catch(err => res.status(500).send(err))
  }
}


