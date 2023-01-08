const mongoose = require('mongoose')

const Schema = mongoose.Schema

const assessmentSchema = new Schema({
    recordId :{
        type: String,
        required: true,
        unique: true
    },
    userId : {
        type: String,
        required: true,
    },
    teacherId : {
        type: String,
        required: true,
    },
    subjectId : {
        type: String,
        required: true,
    },
    studRecord: [{
        date : String,

        //Labels
        // Quiz, Recitation, Prelim Exam, Midterm Exam, Final Exam,
        // project, seatwork
        label : String,
        score : Number,
    }]
})

assessmentSchema.statics.createRec = async function(recordId, userId, teacherId, subjectId, date, label, score){
    if(!recordId || !userId || !teacherId || !subjectId || !date || !label || !score){
        throw Error('All fields must be filled')
    }

    const exists = await this.findOne({ recordId })

    if(exists){
        throw Error("Record can not be creted. Record may be existing. Try Update.")
    }

    var StudRecord = { date: date, label: label, score: score }

    const record = await this.create({ 
        recordId,
        userId,
        teacherId,
        subjectId,
        studRecord:[date, label, score],
     })

     return record
}

assessmentSchema.statics.readRec = async function(recordId){
    const record = await this.findOne({ recordId })

    if(!record){
        throw Error("No record exist.")
    }

    const filter = {recordId}
    const rRecord = await this.find(filter)

    return rRecord
}

assessmentSchema.statics.updateRec = async function(recordId, date, label, score){
    const exists = await this.findOne({recordId})

    if(exists){
        throw Error("Record can not be creted. Record may be existing. Try Update.")
    }

    var StudRecord = { date: date, label: label, score: score }

    const record = await this.findOneAndUpdate(
        {
            recordId,
            $push: {studRecord: StudRecord},
        }
    )

     return 'Record Updated!'
}

module.exports = mongoose.model('Assessment', assessmentSchema)