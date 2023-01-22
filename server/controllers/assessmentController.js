const Assessment = require('../models/assessmentModel')
const ClassSection = require('../models/classSectionModel')
const Subject = require('../models/subjectModel')
const User = require('../models/userModel')

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

const createAssessment = async (req, res) => {
    try {
        const newAssessment = new Assessment(req.body);
        await newAssessment.save();
        res.status(201).send(newAssessment);
    } catch (error) {
        res.status(500).json({ message: 'Error creating class schedule', error });
    }
};

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

const getTeacherAttendance = async (req, res) => {
    try {
    const { idNumber } = req.params;
    let result = [];
    
    // Find teacher's subject
    const subjects = await Subject.find({teachers: idNumber});
    if (!subjects) return res.status(404).json({ message: 'Teacher not found' });
    
    // Get all class_id handled by teacher
    const classIds = subjects.map(subject => subject.class_id);
    // Find class section by class_id
    const classSections = await ClassSection.find({ class_id: { $in: classIds } });
    
    for(let i = 0; i < classSections.length; i++){
      let classSection = classSections[i];
      // Get all student_id from class section
      const students = classSection.students;
    
      for (let j = 0; j < students.length; j++) {
        // Find user by student_id
        const student = await User.findOne({ idNumber: students[j].student_id });
        if (!student) continue;
        // Find assessment by student_id and subject_id
        const assessment = await Assessment.findOne({
          userId: students[j].student_id,
        });
        if (!assessment) continue;
    
        let attendance_value = assessment.attendance_maxscore - assessment.attendance_score;
        if(attendance_value > 5){
          result.push({
            idNumber: student.idNumber,
            fname: student.fname,
            mname: student.mname,
            lname: student.lname,
            track: student.track,
            strand: student.strand,
            section: student.section,
            attendance_value
          });
        }
      }
    }
    return res.status(200).json(result);
    } catch (err) {
    // handle error
    }
    };

module.exports = {createRecord, readRecord, updateRecord, allRecords, getTeacherAttendance, createAssessment}