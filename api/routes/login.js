const express = require('express')
const db = require('../db')
const router = express.Router()
const loginCtl = require('../controllers/login.js')

router.post('/', loginCtl.authenticateUser)

module.exports = router