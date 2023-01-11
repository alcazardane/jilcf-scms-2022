const Assessment = require('../models/assessmentModel')
const jwt = require('jsonwebtoken')

const createToken = (_id) => {
    return jwt.sign({_id}, process.env.SECRET, { expiresIn: '3d' })
}

// get all the assessment record
const allRecords = async(req, res) => {
    const assessmentRec = await Assessment.find({})

    try{
        res.status(200).json(assessmentRec)
    }catch(error) {
        res.status(400).json({error: error.message})
    }
}

const createRecord = async(req, res) => {
    const { recordId, userId, teacherId, subjectId, date, label, score, maxscore } = req.body

    try{
        const assessment = Assessment.createRec(
            recordId, userId, teacherId, subjectId, date, label, score, maxscore
        )

        const token = createToken(assessment._id)

        res.status(200).json({recordId, token})
    }catch(error) {
        res.status(400).json({error: error.message})
    }
}

const readRecord = async(req, res) => {
    const { recordId } = req.body

    try{
        const record = await Assessment.readRec(recordId)

        res.status(200).json({recordId, record})
    }catch(error) {
        res.status(400).json({error: error.message})
    }
}

const updateRecord = async(req, res) => {
    const { userId, date, label, score, maxscore } = req.body

    try{
        Assessment.updateRec(
            userId, date, label, score, maxscore
        )

        res.status(200).json({message: "Updated Successfully"})
    }catch(error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {createRecord, readRecord, updateRecord, allRecords}