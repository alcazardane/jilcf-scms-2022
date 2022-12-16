const express = require("express");
 

const recordRoutes = express.Router();

// This will help us connect to the database
const dbo = require("../db/conn");
 
// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;
 
// Dashboard
 // For Upcoming Schedules
recordRoutes.route("/upcoming_sched").get(function (req, res) {
  let db_connect = dbo.getDb("clients");
  db_connect
    .collection("upcoming_scheds")
    .find({})
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
 });

 // This section will help you get a single record by id
recordRoutes.route("/upcoming_sched/:id").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect
    .collection("upcoming_scheds")
    .findOne(myquery, function (err, result) {
      if (err) throw err;
      res.json(result);
    });
 });
  
 // This section will help you create a new record.
 recordRoutes.route("/upcoming_sched/add").post(function (req, response) {
     let db_connect = dbo.getDb();
     let myobj_upcoming = {
       upcoming_type: req.body.upcoming_type,
       upcoming_start_time: req.body.upcoming_start_time,
       upcoming_end_time: req.body.upcoming_end_time,
       upcoming_subject: req.body.upcoming_subject,
       upcoming_grade_level: req.body.upcoming_grade_level,
       //upcoming_strand: req.body.upcoming_strand,
       upcoming_section: req.body.upcoming_section,
       upcoming_room: req.body.upcoming_room,
     };
     db_connect.collection("upcoming_scheds").insertOne(myobj_upcoming, function (err, res) {
       if (err) throw err;
       response.json(res);
     });
    });


  recordRoutes.route("/upcoming_sched/update/:id").post(function (req, response) {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId(req.params.id) };
    let newvalues = {
      $set: {
        upcoming_type: req.body.upcoming_type,
        upcoming_start_time: req.body.upcoming_start_time,
        upcoming_end_time: req.body.upcoming_end_time,
        upcoming_subject: req.body.upcoming_subject,
        upcoming_grade_level: req.body.upcoming_grade_level,
        //upcoming_strand: req.body.upcoming_strand,
        upcoming_section: req.body.upcoming_section,
        upcoming_room: req.body.upcoming_room,
      },
    };
    db_connect
      .collection("upcoming_scheds")
      .updateOne(myquery, newvalues, function (err, res) {
        if (err) throw err;
        console.log("1 document updated");
        response.json(res);
      });
    });

  // This section will help you delete a record
  recordRoutes.route("/upcoming_sched/delete/:id").delete((req, response) => {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId(req.params.id) };
    db_connect.collection("upcoming_scheds").deleteOne(myquery, function (err, obj) {
      if (err) throw err;
      console.log("1 document deleted");
      response.json(obj);
    });
  });
 
module.exports = recordRoutes;