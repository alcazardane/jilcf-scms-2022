const mongoose = require("mongoose")

const Schema = mongoose.Schema

const eventsSchema = new Schema({
    name: {
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
    }
})

module.exports = mongoose.model('Event', eventsSchema)