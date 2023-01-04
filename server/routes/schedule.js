const express = require("express");
 
// recordRoutes is an instance of the express router.
// We use it to define our routes.
// The router will be added as a middleware and will take control of requests starting with path /record.
const recordRoutes = express.Router();
 
// This will help us connect to the database
const dbo = require("../db/conn");
 
// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;
 
 
// This section will help you get a list of all the records.
recordRoutes.route("/schedule").get(function (req, res) {
 let db_connect = dbo.getDb("clients");
 db_connect
   .collection("schedules")
   .find({})
   .toArray(function (err, result) {
     if (err) throw err;
     res.json(result);
   });
});
 

// Will find schedules based on userID
recordRoutes.route("/schedule/:userID").get(function (req, res) {
    let db_connect = dbo.getDb();
    let myquery = { userID: req.params.userID }
    db_connect
      .collection("schedules")
      .find(myquery)
      .toArray(function (err, result) {
        if (err) throw err;
        res.json(result);
      });
   });

recordRoutes.route("/schedule/event/:time").get(function (req, res) {
    let db_connect = dbo.getDb();
    let myquery = { time: req.params.time }
    db_connect
      .collection("schedules")
      .find(myquery)
      .toArray(function (err, result) {
        if (err) throw err;
        res.json(result);
      });
   });


recordRoutes.route("/schedule/edit/:id").get(function (req, res) {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId(req.params.id) };
    db_connect
      .collection("schedules")
      .findOne(myquery, function (err, result) {
        if (err) throw err;
        res.json(result);
      });
   });
 
// This section will help you create a new record.
recordRoutes.route("/schedule/add").post(function (req, response) {
 let db_connect = dbo.getDb();
 let myobj = {
   userID: req.body.userID,
   task: req.body.task,
   time: req.body.time,
   subj_id: req.body.subj_id,
   sched_class: req.body.sched_class,
   room: req.body.room,
   repeat: [req.body.repeat],
 };
 db_connect.collection("schedules").insertOne(myobj, function (err, res) {
   if (err) throw err;
   response.json(res);
 });
});
 
// This section will help you update a record by id.
recordRoutes.route("/schedule/update/:id").post(function (req, response) {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId(req.params.id) };
 let newvalues = {
   $set: {
    userID: req.body.userID,
    task: req.body.task,
    time: req.body.time,
    subj_id: req.body.subj_id,
    sched_class: req.body.sched_class,
    room: req.body.room,
    repeat: [req.body.repeat],
   },
 };
 db_connect
   .collection("schedules")
   .updateOne(myquery, newvalues, function (err, res) {
     if (err) throw err;
     console.log("1 document updated");
     response.json(res);
   });
});
 
// This section will help you delete a record
recordRoutes.route("/schedule/delete/:id").delete((req, response) => {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId(req.params.id) };
 db_connect.collection("schedules").deleteOne(myquery, function (err, obj) {
   if (err) throw err;
   console.log("1 document deleted");
   response.json(obj);
 });
});
 
module.exports = recordRoutes;