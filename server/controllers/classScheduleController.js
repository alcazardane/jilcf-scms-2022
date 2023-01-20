const ClassSchedule = require('../models/classScheduleModel');

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