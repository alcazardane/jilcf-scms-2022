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
        const user = await User.register(idNumber, password, fname, mname, lname, suffix, level, track, strand, section)

        // create a token
        const token = createToken(user._id)

        res.status(200).json({idNumber, token})
    } catch(error) {
        res.status(400).json({error: error.message})
    }
}

// get the logged in user
const getLoggedInUser = async (req, res) => {
    try {
      // get the idNumber of the logged in user from the request header
      const idNumber = req.header('idNumber');
      if (!idNumber) {
        return res.status(400).json({ error: 'No idNumber provided' });
      }
  
      // find the user with the matching idNumber
      const user = await User.findOne({ idNumber });
      if (!user) {
        return res.status(400).json({ error: 'User not found' });
      }
  
      res.status(200).json({ idNumber });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  };

// get the details of the logged in user
const getUserDetails = async (req, res) => {
    try {
      // get the idNumber from the request query
      const idNumber = req.query.idNumber;
      if (!idNumber) {
        return res.status(400).json({ error: 'No idNumber provided' });
      }
  
      // find the user with the matching idNumber
      const user = await User.findOne({ idNumber });
      if (!user) {
        return res.status(400).json({ error: 'User not found' });
      }
  
      // return the user details
      res.status(200).json({
        fname: user.fname,
        mname: user.mname,
        lname: user.lname,
        suffix: user.suffix,
        level: user.level
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
};

module.exports = {registerUser, loginUser, getLoggedInUser, getUserDetails}