const express = require('express')
const router = express.Router()
const somedayMaybeCtl = require('../controllers/someday-maybe.js')

router.get('/', somedayMaybeCtl.getSomedayMaybe)

module.exports = router