const express = require('express');
const router = express.Router();
const subjectController = require('../controllers/subjectController');

router.post('/', subjectController.createSubject);
router.get('/', subjectController.getSubjects);
router.get('/:id', subjectController.getSubjectById);
router.patch('/:id', subjectController.updateSubject);
router.delete('/:id', subjectController.deleteSubject);
// router.get('/teacher/:teacherId', subjectController.getClassIdsByTeacherId);
router.get('/teacher/:teacher_id', subjectController.getSubjectsAndClassesByTeacher);

module.exports = router;

