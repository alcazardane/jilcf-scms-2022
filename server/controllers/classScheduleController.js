const ClassSchedule = require('../models/classScheduleModel');
const Subject = require("../models/subjectModel");
const ClassSection = require("../models/classSectionModel");

exports.createClassSchedule = async (req, res) => {
    try {
        const newClassSchedule = new ClassSchedule(req.body);
        await newClassSchedule.save();
        res.status(201).send(newClassSchedule);
    } catch (error) {
        res.status(500).json({ message: 'Error creating class schedule', error });
    }
};


exports.getAllClassSchedules = async (req, res) => {
    try {
        const classSchedules = await ClassSchedule.find();
        res.status(200).send(classSchedules);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching class schedules', error });
    }
};


// exports.getClassScheduleById = async (req, res) => {
//     try {
//         const { classScheduleId } = req.params;
//         const classSchedule = await ClassSchedule.findById(classScheduleId);
//         if (!classSchedule) {
//             return res.status(404).json({ message: 'Class schedule not found' });
//         }
//         res.status(200).send(classSchedule);
//     } catch (error) {
//         res.status(500).json({ message: 'Error fetching class schedule', error });
//     }
// };
exports.getClassScheduleById = async (req, res) => {
    try {
        // const { classScheduleId } = req.params;
        const classSchedule = await ClassSchedule.findById(req.params.id);
        if (!classSchedule) {
            res.status(404).json({ message: 'Class schedule not found' });
        } else {
            res.send(classSchedule);
        }
    } catch (error) {
        res.status(400).json({ message: 'Error fetching class schedule', error });
    }
};

exports.updateClassSchedule = async (req, res) => {
    try {
        const { classScheduleId } = req.params;
        const updatedClassSchedule = await ClassSchedule.findByIdAndUpdate(classScheduleId, req.body, { new: true });
        if (!updatedClassSchedule) {
            return res.status(404).json({ message: 'Class schedule not found' });
        }
        res.status(200).json(updatedClassSchedule);
    } catch (error) {
        res.status(500).json({ message: 'Error updating class schedule', error });
    }
};

exports.deleteClassSchedule = async (req, res) => {
    try {
        const { classScheduleId } = req.params;
        const deletedClassSchedule = await ClassSchedule.findByIdAndDelete(classScheduleId);
        if (!deletedClassSchedule) {
            return res.status(404).json({ message: 'Class schedule not found' });
        }
        res.status(200).json({ message: 'Class schedule deleted successfully', data: deletedClassSchedule });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting class schedule', error });
    }
};

// exports.getTeacherSchedule = async (req, res) => {
//     try {
//       const { idNumber, weekday } = req.params;

//       const subject = await Subject.find({ "teachers.teacher_id": idNumber });
//       const classIds = subject[0].teachers[0].class_ids;
//       const schedule = await ClassSchedule.find({ 
//         class_id: { $in: classIds },
//         class_day: weekday
//       });
//       res.status(200).json(schedule);
//     } catch (err) {
//       res.status(500).json({ message: err.message });
//     }
// };

exports.getTeacherSchedule = async (req, res) => {
    try {
      const { idNumber, weekday } = req.params;
  
      // Find the teacher in the Subject model
      const teacher = await Subject.findOne({ 'teachers.teacher_id': idNumber });
      if (!teacher) {
        return res.status(404).json({ message: 'Teacher not found' });
      }
  
      // Get the class IDs for the teacher
      const classIds = teacher.teachers.find(t => t.teacher_id === idNumber).class_ids;
  
      // Find the class schedule for the teacher on the specified weekday
      const schedule = await ClassSchedule.find({
        class_id: { $in: classIds },
        class_day: { $in: [weekday] }
      }).sort({
        class_start_pa: 'asc',
        class_start_hh: 'asc',
        class_start_mm: 'asc'
      });
  
      if (!schedule) {
        return res.status(404).json({ message: 'No schedule found for the specified teacher and day' });
      }
  
      return res.json(schedule);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Server error' });
    }
};

exports.getAdminSchedule = async (req, res) => {
    try {
      const { class_id, weekday } = req.params;
  
      // Find the class schedule by class_id and weekday
      const schedule = await ClassSchedule.find({
        class_id: class_id,
        class_day: { $in: [weekday] }
      }).sort({
        class_start_pa: 'asc',
        class_start_hh: 'asc',
        class_start_mm: 'asc'
      });
  
      if (!schedule) {
        return res.status(404).json({ message: 'No schedule found for the specified class and day' });
      }
  
      return res.json(schedule);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Server error' });
    }
};


exports.getStudentSchedule = async (req, res) => {
    try {
      const { idNumber, weekday } = req.params;
  
      // Find the student's class in the ClassSection model
      const studentClass = await ClassSection.findOne({ 'students.student_id': idNumber });
      if (!studentClass) {
        return res.status(404).json({ message: 'Student not found' });
      }
  
      // Get the class ID for the student
      const classId = studentClass.class_id;
  
      // Find the class schedule for the student on the specified weekday
      const schedule = await ClassSchedule.find({
        class_id: classId,
        class_day: { $in: [weekday] }
      }).sort({
        class_start_pa: 'asc',
        class_start_hh: 'asc',
        class_start_mm: 'asc'
      });
  
      if (!schedule) {
        return res.status(404).json({ message: 'No schedule found for the specified student and day' });
      }
  
      return res.json(schedule);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: 'Server error' });
    }
};