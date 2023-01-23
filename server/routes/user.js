const express = require('express')

// controller functions
const {registerUser, loginUser, getAllUsers, getUserById, updateAccount, deleteAccount, countAccounts } = require('../controllers/userController')
const router = express.Router()


// require authentication
// const requireAuth = require('../middleware/requireAuth')
// router.use(requireAuth)

// login route
router.post('/login', loginUser)

// register route
router.post('/register', registerUser)

router.get('/', getAllUsers)

router.get('/:id', getUserById)

router.patch('/:id', updateAccount)

router.delete('/:id', deleteAccount)

router.get('/number/accounts', countAccounts)

module.exports = router