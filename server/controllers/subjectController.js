const Subject = require('../models/subjectModel');
const ClassSection = require('../models/classSectionModel');

exports.createSubject = async (req, res) => {
  try {
    const subject = new Subject(req.body);
    await subject.save();
    res.send(subject);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getSubjects = async (req, res) => {
  try {
    const subjects = await Subject.find();
    res.send(subjects);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.getSubjectById = async (req, res) => {
  try {
    const subject = await Subject.findById(req.params.id);
    if (!subject) {
      return res.status(404).send();
    }
    res.send(subject);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.updateSubject = async (req, res) => {
  try {
    const subject = await Subject.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!subject) {
      return res.status(404).send();
    }
    res.send(subject);
  } catch (error) {
    res.status(400).send(error);
  }
};

exports.deleteSubject = async (req, res) => {
  try {
    const subject = await Subject.findByIdAndDelete(req.params.id);
    if (!subject) {
      return res.status(404).send();
    }
    res.send(subject);
  } catch (error) {
    res.status(400).send(error);
  }
};

// get all the class ids handled by the teacher
// exports.getClassIdsByTeacherId = async (req, res) => {
//   try {
//     const teacherId = req.params.teacherId;
//     const subjects = await Subject.find({ 'teachers.teacher_id': teacherId }, 'teachers.$ subject_id subject_name');
//     const classIds = subjects.reduce((acc, subject) => {
//       return acc.concat(subject.teachers[0].class_ids.map(classId => ({
//         class_id: classId,
//         subject_id: subject.subject_id,
//         subject_name: subject.subject_name
//       })));
//     }, []);
//     res.send(classIds);
//   } catch (error) {
//     res.status(400).send(error);
//   }
// };

// exports.getSubjectByTeacher = async (req, res) => {
//   try {
//     const subject = await Subject.findOne({ 'teachers.teacher_id': req.params.teacher_id });
//     if (!subject) return res.status(404).json({ message: 'Subject not found' });

//     const classSections = await ClassSection.find({ 'class_id': { $in: subject.teachers[0].class_ids } });
//     const classData = classSections.reduce((acc, classSection) => {
//       const index = acc.findIndex(item => item.class_id === classSection.class_id);
//       if (index === -1) {
//         acc.push({
//           class_id: classSection.class_id,
//           class_glvl: classSection.class_glvl,
//           class_track: classSection.class_track,
//           class_strand: classSection.class_strand,
//           class_section: classSection.class_section,
//           class_adviser: classSection.class_adviser,
//           students: classSection.students,
//         });
//       } else {
//         acc[index].students.push(...classSection.students);
//       }
//       return acc;
//     }, []);

//     return res.status(200).json([{
//       subject_id: subject.subject_id,
//       subject_name: subject.subject_name,
//       class_ids: classData,
//     }]);
//   } catch (e) {
//     return res.status(500).json({ message: 'Error getting subject by teacher' });
//   }
// };


exports.getSubjectsAndClassesByTeacher = async (req, res) => {
  try {
    const { teacher_id } = req.params;

    const subjects = await Subject.find({ 'teachers.teacher_id': teacher_id });

    const result = [];
    for (let i = 0; i < subjects.length; i++) {
      const subject = subjects[i];
      for (let j = 0; j < subject.teachers.length; j++) {
        if (subject.teachers[j].teacher_id === teacher_id) {
          const classIds = subject.teachers[j].class_ids;
          const classSections = await ClassSection.find({ class_id: { $in: classIds } });
          result.push(
            ...classSections.map(classSection => ({
              class_id: classSection.class_id,
              subject_id: subject.subject_id,
              subject_name: subject.subject_name,
              teacher_id: subject.teachers[j].teacher_id,
              class_glvl: classSection.class_glvl,
              class_track: classSection.class_track,
              class_strand: classSection.class_strand,
              class_section: classSection.class_section
            }))
          );
        }
      }
    }
    res.json(result);
  } catch (error) {
    res.status(500).send(error);
  }
};