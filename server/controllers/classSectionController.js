const ClassSection = require('../models/classSectionModel');
const User = require('../models/userModel');
const Assessment = require('../models/assessmentModel');
const Subject = require('../models/subjectModel')

// Create a new class section
exports.createClassSection = (req, res) => {
    try {
      const classSection = new ClassSection(req.body);
      const savedClassSection = classSection.save();
      res.status(201).send(savedClassSection);
    } catch (error) {
      res.status(500).send(error);
    }
};
  
// Get a list of all class sections
exports.getClassSections = (req, res) => {
    try {
      const classSections = ClassSection.find();
      res.status(200).send(classSections);
    } catch (error) {
      res.status(500).send(error);
    }
};
  
// Update an existing class section
exports.updateClassSection = (req, res) => {
    try {
      const updatedClassSection = ClassSection.findByIdAndUpdate(
        req.params.id,
        req.body,
        { new: true }
      );
      res.status(200).send(updatedClassSection);
    } catch (error) {
      res.status(500).send(error);
    }
};
  
// Delete a class section
exports.deleteClassSection = (req, res) => {
    try {
      const deletedClassSection = ClassSection.findByIdAndDelete(req.params.id);
      res.status(200).send(deletedClassSection);
    } catch (error) {
      res.status(500).send(error);
    }
};

// Get the contents of the section based on class_id
// exports.getClassSectionById = (req, res) => {
//     try {
//       const classSection = ClassSection.findOne({ class_id: req.params.class_id });
//       res.status(200).send(classSection);
//     } catch (error) {
//       res.status(500).send(error);
//     }
//   };

exports.getClassSectionFieldsByClassId = (req, res) => {
    ClassSection.findOne({ class_id: req.params.class_id })
      .then(classSection => {
        if (classSection) {
          res.json([{
            class_glvl: classSection.class_glvl,
            class_track: classSection.class_track,
            class_strand: classSection.class_strand,
            class_section: classSection.class_section,
            class_adviser: classSection.class_adviser,
            students: classSection.students.map(student => ({ student_id: student.student_id }))
          }]);
        } else {
          res.status(404).json({ message: 'ClassSection not found' });
        }
      })
      .catch(err => res.status(400).json({ message: 'Error fetching ClassSection: ' + err }));
  };

// exports.getStudentFieldsByClassId = (req, res) => {
//   ClassSection.findOne({ class_id: req.params.class_id })
//     .then(classSection => {
//       if (classSection) {
//         User.find({ idNumber: { $in: classSection.students.map(student => student.student_id) } })
//           .then(users => {
//             res.json(users.map(user => ({
//               student_id: user.idNumber,
//               fname: user.fname,
//               mname: user.mname,
//               lname: user.lname
//             })));
//           })
//           .catch(err => res.status(400).json({ message: 'Error fetching users: ' + err }));
//       } else {
//         res.status(404).json({ message: 'ClassSection not found' });
//       }
//     })
//     .catch(err => res.status(400).json({ message: 'Error fetching ClassSection: ' + err }));
// };


// will get the class_id and subject_id to return the students and their assessments
exports.getStudentAssessment = async (req, res) => {
  try {
    const { class_id, subject_id } = req.params;
    // Find class section by class_id
    const classSection = await ClassSection.findOne({ class_id });
    if (!classSection) return res.status(404).json({ message: 'Class section not found' });
    // Get all student_id from class section
    const students = classSection.students;

    // Initialize array to store result
    const result = [];
    for (let i = 0; i < students.length; i++) {
      // Find user by student_id
      const student = await User.findOne({ idNumber: students[i].student_id });
      if (!student) continue;

      // Find assessment by student_id and subject_id
      const assessment = await Assessment.findOne({
        userId: students[i].student_id,
        subjectId: subject_id
      });
      if (!assessment) continue;
      //initialize an object
      let studentData = {
        student_id: students[i].student_id,
        fname: student.fname,
        mname: student.mname,
        lname: student.lname,
        suffix: student.suffix
      };

      // Iterate through each studRecord and add it to studentData object.
      for (let j = 0; j < assessment.studRecord.length; j++) {
        let { date, label, score, maxscore } = assessment.studRecord[j];
        studentData[`${label}_date`] = date;
        studentData[`${label}_score`] = score;
        studentData[`${label}_maxscore`] = maxscore;
      }
      result.push(studentData);
    }
    res.json(result);
  } catch (error) {
    res.status(500).send(error);
  }
};

exports.getClassSubjectSummary = async (req, res) => {
  try {
    const { class_id, subject_id } = req.params;
    // Find class section by class_id
    const classSection = await ClassSection.findOne({ class_id });
    if (!classSection) return res.status(404).json({ message: 'Class section not found' });
    // Get all student_id from class section
    const students = classSection.students;

    // Initialize object to store result
    let result = {};

    // Initialize object to store total score per label
    let totalScores = {};

    // Initialize object to store top students per label
    let topStudents = {};

    for (let i = 0; i < students.length; i++) {
      // Find user by student_id
      const student = await User.findOne({ idNumber: students[i].student_id });
      if (!student) continue;

      // Find assessment by student_id and subject_id
      const assessment = await Assessment.findOne({
        userId: students[i].student_id,
        subjectId: subject_id
      });
      if (!assessment) continue;

      // Iterate through each studRecord
      for (let j = 0; j < assessment.studRecord.length; j++) {
        let { label, score } = assessment.studRecord[j];

        // Initialize array for each label if it does not exist yet
        if (!topStudents[label]) topStudents[label] = [];

        // Add student to top students array for each label
        topStudents[label].push({
          student_id: students[i].student_id,
          fullname: `${student.lname}, ${student.fname}`,
          score
        });

        // Check if label exists in totalScores object
        if (totalScores[label]) {
          // If label exists, add score
          totalScores[label] += score;
        } else {
          // If label does not exist, initialize it with score
          totalScores[label] = score;
        }
      }
    }

    // Iterate through totalScores object and compute average
    for (let label in totalScores) {
      totalScores[label] = totalScores[label] / students.length;
    }

    // Iterate through topStudents object and sort by score
    for (let label in topStudents) {
      topStudents[label].sort((a, b) => b.score - a.score);
    }

    // Iterate through topStudents object and get the top 3 students
    for (let label in topStudents) {
      for (let i = 0; i < 3; i++) {
        let student = topStudents[label][i];
        if (student) {
          result[`${label}_top_${i+1}`] = student.fullname;
        }
      }
    }

    // Assign totalScores object to result
    result = { ...result, ...totalScores };

    return res.status(200).json([result]);
  } catch (err) {
    res.status(500).send(err);
  }
};


exports.getClassSubjectLeastPerformers = async (req, res) => {
  try {
    const { class_id, subject_id } = req.params;
    // Find class section by class_id
    const classSection = await ClassSection.findOne({ class_id });
    if (!classSection) return res.status(404).json({ message: 'Class section not found' });
    // Get all student_id from class section
    const students = classSection.students;

    // Initialize object to store result
    let result = {};

    // Initialize object to store top students per label
    let topStudents = {};

    for (let i = 0; i < students.length; i++) {
      // Find user by student_id
      const student = await User.findOne({ idNumber: students[i].student_id });
      if (!student) continue;

      // Find assessment by student_id and subject_id
      const assessment = await Assessment.findOne({
        userId: students[i].student_id,
        subjectId: subject_id
      });
      if (!assessment) continue;

      // Iterate through each studRecord
      for (let j = 0; j < assessment.studRecord.length; j++) {
        let { label, score } = assessment.studRecord[j];

        // Initialize array for each label if it does not exist yet
        if (!topStudents[label]) topStudents[label] = [];

        // Add student to top students array for each label
        topStudents[label].push({
          student_id: students[i].student_id,
          fullname: `${student.lname}, ${student.fname}`,
          score
        });
      }
    }

    // Iterate through topStudents object and sort by score
    for (let label in topStudents) {
      topStudents[label].sort((a, b) => a.score - b.score);
    }

    // Iterate through topStudents object and get the top 5 least performers
    for (let label in topStudents) {
      for (let i = 0; i < 5; i++) {
        let student = topStudents[label][i];
        if (student) {
          result[`${label}_least_performer_${i+1}`] = student.fullname;
        }
      }
    }

    return res.status(200).json([result]);
  } catch (err) {
    res.status(500).send(err);
  }
};


exports.getStudentSubjects = async (req, res) => {
  try {
    const { student_id } = req.params;

    // Find class section by student_id
    const classSection = await ClassSection.findOne({ "students.student_id": student_id });
    if (!classSection) return res.status(404).json({ message: 'Student not found' });

    // Get class_id of student
    const class_id = classSection.class_id;

    // Find subject by class_id
    const subject = await Subject.find({ "teachers.class_ids": class_id });
    if (!subject) return res.status(404).json({ message: 'Subject not found' });

    // Initialize array to store result
    const result = [];

    for (let i = 0; i < subject.length; i++) {
      let subjectData = {
        class_id: class_id,
        subject_id: subject[i].subject_id,
        subject_name: subject[i].subject_name
      };

      // Iterate through teachers
      for (let j = 0; j < subject[i].teachers.length; j++) {
        let { teacher_id, class_ids } = subject[i].teachers[j];

        // Check if class_id exists in class_ids
        if (class_ids.includes(class_id)) {
          subjectData.teacher_id = teacher_id;
          // Find user by teacher_id
          const teacher = await User.findOne({ idNumber: teacher_id });
          if (!teacher) continue;

          subjectData.teacher_fname = teacher.fname;
          subjectData.teacher_mname = teacher.mname;
          subjectData.teacher_lname = teacher.lname;
        }
      }
      result.push(subjectData);
    }

    return res.status(200).json(result);
  } catch (err) {
    res.status(500).send(err);
  }
};

exports.getStudentAssessmentRecords = async (req, res) => {
  try {
    const { student_id, subject_id } = req.params;

    // Find assessment by student_id and subject_id
    const assessment = await Assessment.findOne({
        userId: student_id,
        subjectId: subject_id
    });
    if (!assessment) return res.status(404).json({ message: 'Assessment records not found' });
    //initialize an object
    let studRecord = {};
    for (let i = 0; i < assessment.studRecord.length; i++) {
        let { date, label, score, maxscore } = assessment.studRecord[i];
        studRecord[`${label}_score`] = score;
        studRecord[`${label}_maxscore`] = maxscore;
        studRecord[`${label}_date`] = date;
    }
    res.json([studRecord]);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};