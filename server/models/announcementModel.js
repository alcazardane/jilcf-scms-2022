const mongoose = require('mongoose');

const announcementSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  type: {
    type: String,
    required: true
  },
  ann_year: {
    type: String,
    required: true
  },
  ann_month: {
    type: String,
    required: true
  },
  ann_day: {
    type: String,
    required: true
  },
  date: {
    type: String,
    // required: true,
    default: function() {
    return this.ann_year + "-" + this.ann_month + "-" + this.ann_day;
  }
  },
  start_time: {
    type: String,
    required: true
  },
  end_time: {
    type: String,
    required: true
  },
  time: {
    type: String,
    // required: true,
    default: function() {
    return this.start_time + " - " + this.end_time;
  }
  },
  place: {
  type: String,
  required: true
  }
  });

module.exports = mongoose.model('Announcement', announcementSchema);