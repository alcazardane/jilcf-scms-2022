const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const classScheduleSchema = new Schema({
    class_id: {
        type: String,
        required: true
    },
    class_start_hh: {
        type: String,
        required: true
    },
    class_start_mm: {
        type: String,
        required: true
    },
    class_start_pa: {
        type: String,
        required: true
    },
    class_end_hh: {
        type: String,
        required: true
    },
    class_end_mm: {
        type: String,
        required: true
    },
    class_end_pa: {
        type: String,
        required: true
    },
    class_day: {
        type: [String],
        required: true
    },
    // subject_id: {
    //     type: String,
    //     required: true
    // },
    subject_name: {
        type: String,
        required: true
    },
    class_type: {
        type: String,
        required: true
    },
    class_room: {
        type: String,
        required: true
    },
    class_start_time: {
        type: String,
        get: function(){
            return this.class_start_hh + ":" + this.class_start_mm + " " + this.class_start_pa;
        }
    },
    class_end_time: {
        type: String,
        get: function(){
            return this.class_end_hh + ":" + this.class_end_mm + " " + this.class_end_pa;
        }
    },
    class_time: {
        type: String,
        get: function(){
            return this.class_start_time + " - " + this.class_end_time;
        }
    }
});

module.exports = mongoose.model('ClassSchedule', classScheduleSchema);
