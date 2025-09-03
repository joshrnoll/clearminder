const express = require('express')
const router = express.Router()
const usersCtrl = require('../controllers/users.js')

router.get('/tutorial-complete', usersCtrl.getTutorialComplete)

router.patch('/tutorial-complete/:value', usersCtrl.setTutorialComplete)

module.exports = router