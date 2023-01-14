const Event = require('../models/userEvents')
const mongoose = require('mongoose')

// get all Events
const getEvents = async (req, res) => {
    const events = await Event.find({})

    res.status(200).json(events) 
}

// get single Events
const getSingleEvent = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such event"})
    }
    const event = await Event.findById(id)

    if(!event){
        return res.status(404).json({error: "No such event"})
    }

    res.status(200).json(event)
}

// create new Event
const createEvent = async (req, res) => {
    // const {name, description, type, time, place} = req.body

    // const rawdate = req.body.date
    // const date = new Date(rawdate)

    // try {
    //     const event = await Event.create({name, description, type, date, time, place})
    //     res.status(200).json(event)
    // } catch (error) {
    //     res.status(400).json({error: error.message})
    // }

    try {
        const event = new Event(req.body);
        const savedEvent = Event.save();
        res.status(201).send(savedEvent);
      } catch (error) {
        res.status(500).send(error);
    }
}

// delete an event
const deleteEvent = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such event"})
    }

    const event = await Event.findOneAndDelete({_id: id})

    if(!event){
        return res.status(404).json({error: "No such event"})
    }

    res.status(200).json(event)
}

// update an event
const updateEvent = async (req, res) => {
    const {id} = req.params

    if (!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({error: "No such event"})
    }

    const event = await Event.findOneAndUpdate({_id: id}, {
        ...req.body
    })

    if(!event){
        return res.status(404).json({error: "No such event"})
    }

    res.status(200).json(event)
}


module.exports = {
    createEvent,
    getEvents,
    getSingleEvent,
    deleteEvent,
    updateEvent 
}