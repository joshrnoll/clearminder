const express = require('express')
const router = express.Router()
const projectsCtl = require('../controllers/projects.js')

router.get('/', projectsCtl.getProjects)

module.exports = router