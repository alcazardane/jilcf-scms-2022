const ClassSection = require('../models/classSectionModel');
const User = require('../models/userModel');
const Assessment = require('../models/assessmentModel');

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
  