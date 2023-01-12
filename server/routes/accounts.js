const express = require('express')

const {createAccount, readAccount} = require('../controllers/accountController')
const router = express.Router()

// require authentication
const requireAuth = require('../middleware/requireAuth')
router.use(requireAuth)

// ACCOUNTS TABLE
router.post('/create', createAccount)
router.get('/accountRecords', readAccount)

module.exports = router