const db = require('../db.js')
const jwt = require('jsonwebtoken')
const jwtSecret = process.env.JWT_SECRET

exports.getInbox = (req, res) => {

  const userData = jwt.verify(req.signedCookies.authToken, jwtSecret)

  db.select('*').from('inbox').where({ associated_user: userData.user_id })
  .then(data => res.status(200).send(data))
  .catch(err => res.status(500).send(err))
}

exports.addToInbox = (req, res) => {

  const userData = jwt.verify(req.signedCookies.authToken, jwtSecret)

  if(!req.body){
    console.error(`Request received from ${req.hostname} with no request body`)
    res.status(400).json({
      success: "false",
      message: "You must supply a body with this request"
    })
  }
  else{
    if (!Object.hasOwn(req.body, "user_id") || !Object.hasOwn(req.body, "content")){
    console.error(`Request received from ${req.hostname} with incorrect or missing properties. Body consisted of:\n${req.body}`)
      res.status(400).send({
        success: "false",
        message: "Missing required properties in message body"
      })
    }
    else{
      db.insert({
        associated_user: req.body.user_id,
        content: req.body.content
      }, ['item_id', 'associated_user', 'content']).into('inbox')
      .then((dbRes) => {
        res.status(200).send({
          success: "true",
          message: `Item ${dbRes[0].item_id} added to inbox for user ${dbRes[0].associated_user} -- "${dbRes[0].content}"`
        })
      })
      .catch((err) => res.status(500).send(err))
    }
  }
}