const mongoose = require('mongoose');

const SubjectSchema = new mongoose.Schema({
  subject_id: {
    type: String,
    required: true
  },
  subject_name: {
    type: String,
    required: true
  },
  teachers: [{
    teacher_id: {
      type: String,
      required: true
    },
    class_ids: [{
      type: String,
      required: true
    }]
  }]
});

module.exports = mongoose.model('Subject', SubjectSchema);