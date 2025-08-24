const express = require('express')
const app = express()
const port = 3001
const db = require('./db')

app.get('/', (req, res) => {
  res.send('Welcome to Stupf!\n A To-Do app based on GTD principles')
})

app.listen(port, () => console.log(`Stupf API server listening on port ${port}`))