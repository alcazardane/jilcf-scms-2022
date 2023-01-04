const express = require('express');
const {
    createEvent,
    getEvents,
    getSingleEvent,
    deleteEvent,
    updateEvent  
} = require("../controllers/eventController")

const Event = require("../models/userEvents")
 
// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();
 
// This will help us connect to the database
const dbo = require("../db/conn");
 
// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;
 

// Get all events
recordRoutes.get('/', getEvents)

// GET a single event
recordRoutes.get('/:id', getSingleEvent)

// POST a single event
recordRoutes.post("/add", createEvent)

// UPDATE a single event
recordRoutes.patch('/:id', deleteEvent)

// DELETE a single event
recordRoutes.delete('/:id', updateEvent)
 
module.exports = recordRoutes;