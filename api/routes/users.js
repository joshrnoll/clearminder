const express = require('express')
const db = require('../db')
const router = express.Router()
const usersCtrl = require('../controllers/users.js')

// Create


// Read
router.get('/all', usersCtrl.getAllUsers)

// TODO: Update

// TODO: Delete

module.exports = router