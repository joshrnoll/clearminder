const express = require('express')
const cookieParser = require('cookie-parser')
const app = express()
const port = 3001
const loginRoutes = require('./routes/login.js')
const userRoutes = require('./routes/users.js')
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

// Endpoints
app.use('/user', userRoutes)
app.use('/login', loginRoutes)

app.get('/', (req, res) => {
  res.send('Welcome to ClearMinder! A To-Do app based on GTD principles')
})

app.listen(port, () => console.log(`ClearMinder API server listening on port ${port}`))