const Acc = require('../models/accountModel')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
}

// register user
const createAccount = async(req, res) => {
    const { 
        idNumber, 
        password, 
        fname, 
        mname, 
        lname, 
        suffix,
        level, 
        track, 
        strand, 
        section 
    } = req.body

    try{
        const user = await Acc.register(idNumber, password, fname, mname, lname, suffix, level, track, strand, section)
        // create a token
        const token = createToken(user._id)

        res.status(200).json({idNumber, token})
    } catch(error) {
        res.status(400).json({error: error.message})
    }
}

const readAccount = async(req, res) => {
    localStorage.setItem('user', JSON.stringify(json))
    const cred = JSON.parse(localStorage.getItem('user'))
    const tkn = cred.token
    try{
        const record = await Acc.readAcc()

        res.status(200).json({record, tkn})
    }catch(error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {createAccount, readAccount}