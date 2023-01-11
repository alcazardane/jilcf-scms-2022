const express = require('express')

// controller functions
const {registerUser, loginUser, getLoggedInUser, getUserDetails} = require('../controllers/userController')
const router = express.Router()


// require authentication
// const requireAuth = require('../middleware/requireAuth')
// router.use(requireAuth)

// login route
router.post('/login', loginUser)

// register route
router.post('/register', registerUser)

// get logged in user route
router.get('/usercred/get-logged-in-user', getLoggedInUser);

// get the detailes of the logged in user
router.get('/get-user-details', getUserDetails);

module.exports = router