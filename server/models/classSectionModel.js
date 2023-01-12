const mongoose = require('mongoose');

const ClassSectionSchema = new mongoose.Schema({
  class_id: {
    type: String,
    default: function() {
      return `${this.class_track}-${this.class_glvl}-${this.class_strand}-${this.class_section}`
    }
  },
  class_glvl: {
    type: String,
    required: true
  },
  class_track: {
    type: String,
    required: true
  },
  class_strand: {
    type: String,
    required: true
  },
  class_section: {
    type: String,
    required: true
  },
  class_adviser: {
    type: String,
    required: true
  },
  students: [
    {
      student_id: {
        type: String,
        required: true
      }
    }
  ]
});

const ClassSection = mongoose.model('ClassSection', ClassSectionSchema);

module.exports = ClassSection;