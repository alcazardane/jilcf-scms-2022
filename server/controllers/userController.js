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
        const level = user.level
        const fname = user.fname
        const mname = user.mname
        const lname = user.lname
        const suffix = user.suffix

        res.status(200).json({idNumber, level, token, fname, mname, lname, suffix})
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
        glvl, 
        section 
    } = req.body

    try{
        const user = await User.register(idNumber, password, fname, mname, lname, suffix, level, track, strand, glvl, section)

        // create a token
        const token = createToken(user._id)

        res.status(200).json({idNumber, token})
    } catch(error) {
        res.status(400).json({error: error.message})
    }
}

const getAllUsers = async (req, res) => {
  try {
    const allusers = await User.find();
    res.json(allusers);
  } catch (err) {
    res.status(400).json({ message: 'Failed to get users', error: err });
  }
};

const getUserById = async (req, res) => {
  try {
    const user = await User.findById(req.params.id);
    if (!user) {
      res.status(404).json({ message: 'User not found' });
    } else {
      res.json(user);
    }
  } catch (err) {
    res.status(400).json({ message: 'Failed to get user', error: err });
  }
};

const updateAccount = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!user) {
      res.status(404).json({ message: 'User not found' });
    } else {
      res.json(user);
    }
  } catch (err) {
    res.status(400).json({ message: 'Failed to update user', error: err });
  }
};

const deleteAccount = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.id);
    if (!user) {
      res.status(404).json({ message: 'Event not found' });
    } else {
      res.json({ message: 'Successfully deleted event' });
    }
  } catch (err) {
    res.status(400).json({ message: 'Failed to delete event', error: err });
  }
};


const countAccounts = async (req, res) => {
  try {
      const totalAccounts = await User.countDocuments()
      const teacherAccounts = await User.countDocuments({ level: '2' })
      const studentAccounts = await User.countDocuments({ level: '3' })

      res.status(200).json({ total_accounts: totalAccounts, teacher_accounts: teacherAccounts, students_accounts: studentAccounts })
  } catch (error) {
      res.status(500).json({ message: error.message })
  }
}



module.exports = {registerUser, loginUser, getAllUsers, getUserById, updateAccount, deleteAccount, countAccounts}