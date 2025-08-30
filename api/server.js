const express = require('express')
const app = express()
const port = 3001
const userRoutes = require('./routes/users.js')

app.use('/users', userRoutes)

app.get('/', (req, res) => {
  res.send('Welcome to ClearMinder! A To-Do app based on GTD principles')
})

app.listen(port, () => console.log(`Stupf API server listening on port ${port}`))