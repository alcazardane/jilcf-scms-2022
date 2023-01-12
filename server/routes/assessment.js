const express = require('express')
const router = express.Router()
const { createRecord, readRecord, updateRecord, allRecords } = require('../controllers/assessmentController')

// controller functions
router.get('/allRecords', allRecords)
router.post('/createRecord', createRecord)
router.post('/readRecord', readRecord)
router.post('/updateRecord', updateRecord)

module.exports = router