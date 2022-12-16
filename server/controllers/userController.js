const User = require('../models/userModel')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
}

// login user
const loginUser = async(req, res) => {
    const { idNumber, password } = req.body

    try{
        const user = await User.login(idNumber, password)

        // create a token
        const token = createToken(user._id)

        res.status(200).json({idNumber, token})
    } catch(error) {
        res.status(400).json({error: error.message})
    }

}

// register user
const registerUser = async(req, res) => {
    const { idNumber, password } = req.body

    try{
        const user = await User.register(idNumber, password)

        // create a token
        const token = createToken(user._id)

        res.status(200).json({idNumber, token})
    } catch(error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {registerUser, loginUser}