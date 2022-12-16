const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const validator = require('validator')

const Schema = mongoose.Schema

const userSchema = new Schema({
    idNumber: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    }
})

// static register method
userSchema.statics.register = async function(idNumber, password) {

    // validation
    if(!idNumber || !password){
        throw Error('All fields must be filled')
    }
    if(!validator.isStrongPassword(password)){
        throw Error('Password is not strong enough')
    }

    const exists = await this.findOne({ idNumber })

    if(exists){
        throw Error("Id Number is already registered")
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ idNumber, password: hash })

    return user

}

// static login method
userSchema.statics.login = async function(idNumber, password){
    if(!idNumber || !password){
        throw Error('All fields must be filled')
    }

    const user = await this.findOne({ idNumber })

    if(!user){
        throw Error("Incorrect credentials.")
    }

    const match = await bcrypt.compare(password, user.password)

    if(!match){
        throw Error("Incorrect credentials.")
    }

    return user
}

module.exports = mongoose.model('User', userSchema)