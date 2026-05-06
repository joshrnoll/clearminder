const express = require('express')
const cookieParser = require('cookie-parser')
const app = express()
const port = 3001
const authRoutes = require('./routes/auth.js')
const userRoutes = require('./routes/user.js')
const inboxRoutes = require('./routes/inbox.js')
const nextActionsRoutes = require('./routes/nextActions.js')
const projectsRoutes = require('./routes/projects.js')
const somedayMaybeRoutes = require('./routes/someday-maybe.js')
const cors = require('cors')
const authCheck = require('./middleware/authCheck.js')

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
app.use('/auth', authRoutes)
app.use('/user', authCheck, userRoutes)
app.use('/inbox', authCheck, inboxRoutes)
app.use('/next-actions', authCheck, nextActionsRoutes)
app.use('/projects', authCheck, projectsRoutes)
app.use('/someday-maybe', authCheck, somedayMaybeRoutes)


app.get('/', (req, res) => {
  res.send('Welcome to ClearMinder! A To-Do app based on GTD principles')
})

app.listen(port, () => console.log(`ClearMinder API server listening on port ${port}`))