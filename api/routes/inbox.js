const express = require('express')
const router = express.Router()
const inboxCtrl = require('../controllers/inbox.js')

router.get('/', inboxCtrl.getInbox)

module.exports = router