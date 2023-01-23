const express = require('express');
const router = express.Router();
const classScheduleController = require('../controllers/classScheduleController');

// Create a class schedule
router.post('/create', classScheduleController.createClassSchedule);

// Get all class schedules
router.get('/get-all', classScheduleController.getAllClassSchedules);

// Get a class schedule by ID
router.get('/get-by-id/:id', classScheduleController.getClassScheduleById);

// Update a class schedule by ID
router.patch('/:classScheduleId', classScheduleController.updateClassSchedule);

// Delete a class schedule by ID
router.delete('/:classScheduleId', classScheduleController.deleteClassSchedule);

router.get('/teacher-schedule/:idNumber/:weekday', classScheduleController.getTeacherSchedule);

router.get('/admin-schedule/:class_id/:weekday', classScheduleController.getAdminSchedule)

router.get('/student-schedule/:idNumber/:weekday', classScheduleController.getStudentSchedule);

module.exports = router;