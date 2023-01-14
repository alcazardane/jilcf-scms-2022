const mongoose = require("mongoose")

const Schema = mongoose.Schema

const eventsSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    decription: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    time: {
        type: String,
        required: true
    },
    place: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Event', eventsSchema)