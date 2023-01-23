const express = require('express')
const router = express.Router()
const { createRecord, readRecord, updateRecord, allRecords, getTeacherAttendance, createAssessment } = require('../controllers/assessmentController')

// controller functions
router.get('/allRecords', allRecords)
router.post('/createRecord', createRecord)
router.post('/upload', createAssessment)
router.post('/readRecord', readRecord)
router.post('/updateRecord', updateRecord)
router.get('/red/:idNumber', getTeacherAttendance)

module.exports = router