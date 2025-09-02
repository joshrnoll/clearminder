const express = require('express')
const db = require('../db')
const router = express.Router()
const nextActionsCtrl = require('../controllers/nextActions.js')

// Get all of the authenticated user's next actions
router.get('/', nextActionsCtrl.getNextActions)

module.exports = router