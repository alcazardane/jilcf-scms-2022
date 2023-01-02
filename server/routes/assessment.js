const express = require('express')
const router = express.Router()
const { createRecord, readRecord, updateRecord } = require('../controllers/assessmentController')

// controller functions
router.post('/createRecord', createRecord)
router.post('/readRecord', readRecord)
router.post('/updateRecord', updateRecord)

module.exports = router