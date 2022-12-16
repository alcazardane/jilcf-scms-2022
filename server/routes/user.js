const express = require('express')

// controller functions
const {registerUser, loginUser} = require('../controllers/userController')
const router = express.Router()

// Blocks the user to access the router if not authenticated
const requireAuth = require('../middleware/requireAuth')
router.use(requireAuth)

// login route
router.post('/login', loginUser)

// register route
router.post('/register', registerUser)

module.exports = router