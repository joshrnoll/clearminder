const express = require('express')
const cookieParser = require('cookie-parser')
const jwt = require('jsonwebtoken')
const app = express()
const port = 3001
const loginRoutes = require('./routes/login.js')
const userRoutes = require('./routes/users.js')
const nextActionsRoutes = require('./routes/nextActions.js')
const cors = require('cors')

const corsOrigins = process.env.CORS_ORIGINS
const allowedMethods = ['GET', 'POST', 'PUT', 'PATCH', 'DELETE']

const corsOpts = {
  "origin": corsOrigins,
  "methods": allowedMethods,
  "credentials": true
}

app.use(express.json())
app.use(cors(corsOpts))
app.use(cookieParser(process.env.COOKIE_SECRET))

// Authentication check
const authCheck = (req, res, next) => {
  if(!req.signedCookies.authToken){
    res.status(401).send('No authToken found. Please log in.')
  }
  else{
    try {
      req.body = jwt.verify(req.signedCookies.authToken, process.env.JWT_SECRET)
      let now = Date.now()
      if(req.body.exp > now){
        res.status(403).send('Token expired. Please log in again.')
      }
      else{
        next()
      }
    }
    catch (err){
      res.status(401).send(`ERR: Invalid token\n${err}`)
    }
  }
}

// Endpoints
app.use('/user', userRoutes)
app.use('/login', loginRoutes)
app.use('/next-actions', authCheck, nextActionsRoutes)


app.get('/', (req, res) => {
  res.send('Welcome to ClearMinder! A To-Do app based on GTD principles')
})

app.listen(port, () => console.log(`ClearMinder API server listening on port ${port}`))