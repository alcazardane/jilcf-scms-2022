const mongoose = require('mongoose')
const Schema = mongoose.Schema


const accountSchema = new Schema({
    idNumber: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    fname: {
        type: String,
        required: true,
    },
    mname: {
        type: String,
    },
    lname: {
        type: String,
        required: true,
    },
    suffix: {
        type: String,
    },
    level: {
        type: String,
        required: true,
    },
    track: {
        type: String,
        required: true,
    },
    strand: {
        type: String,
        required: true,
    },
    section: {
        type: String,
    },
}, {strict: true, strictQuery: false})

// static register method
accountSchema.statics.register = async function(idNumber, password, fname, mname, lname, suffix, level, track, strand, section) {

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

    const user = await this.create({ idNumber, password: hash, fname, mname, lname, suffix, level, track, strand, section})

    return user

}

// static accounts method
accountSchema.statics.readAcc = async function(){
    const accounts = await this.find()

    if(!accounts){
        throw Error("No Accounts Created.")
    }

    return accounts
}

module.exports = mongoose.model('Accounts', accountSchema)