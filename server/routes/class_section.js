const express = require('express');
const router = express.Router();

const classSectionController = require('../controllers/classSectionController');

// Create a new class section
router.post('/', classSectionController.createClassSection);

// Get a list of all class sections
router.get('/', classSectionController.getClassSections);

// Update an existing class section
router.put('/:id', classSectionController.updateClassSection);

// Delete a class section
router.delete('/:id', classSectionController.deleteClassSection);

// Get a class section by ID
// router.get('/:class_id', classSectionController.getClassSectionById);
router.get('/:class_id', classSectionController.getClassSectionFieldsByClassId);

// router.get('/students/:class_id', classSectionController.getStudentsByClassId);
// router.get('/students/:class_id', classSectionController.getStudentFieldsByClassId);
// router.get('/students/:class_id', classSectionController.getStudentsByClassId);

// router.get('/students/:class_id/:subject_id', classSectionController.getStudentRecordsByClassIdAndSubjectId);
router.get('/students/:class_id/:subject_id', classSectionController.getStudentAssessment)

module.exports = router;

