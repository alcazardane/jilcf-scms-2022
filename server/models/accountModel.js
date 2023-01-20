const mongoose = require('mongoose')
const Schema = mongoose.Schema


const accountSchema = new Schema({
    idnumber: {
        type: String,
        required: true,
        unique: true
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
    grade: {
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
        required: true,
    },
    img: {
        type: String,
    },
    password: {
        type: String,
        required: true,
    },
}, {strict: true, strictQuery: false})

// static register method
accountSchema.statics.createAcc = async function(idnumber, fname, mname, lname, suffix, level, grade, track, strand, section, img, password) {

    // validation
    if(!idnumber || !fname || !mname || !lname || !suffix || !level || !grade || !track || !strand || !section || !img || !password){
        throw Error('All fields must be filled')
    }

    const exists = await this.findOne({ idnumber : idnumber })

    if(exists){
        throw Error(`User ${idnumber} is already existing.`)
    }

    const salt = await bcrypt.genSalt(10)
    const hash = await bcrypt.hash(password, salt)

    const user = await this.create({ idnumber, fname, mname, lname, suffix, level, grade, track, strand, section, img, password: hash})

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