const express = require("express");
 
const recordRoutes = express.Router();
 
// This will help us connect to the database
const dbo = require("../db/conn");
 
// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;
 
 
// This section will help you get a list of all the records.
recordRoutes.route("/attendance_per_classroom").get(function (req, res) {
 let db_connect = dbo.getDb("clients");
 db_connect
   .collection("attendance_per_classrooms")
   .find({})
   .toArray(function (err, result) {
     if (err) throw err;
     res.json(result);
   });
});
 
// This section will help you get a single record by id
recordRoutes.route("/attendance_per_classroom/:id").get(function (req, res) {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId(req.params.id) };
 db_connect
   .collection("attendance_per_classrooms")
   .findOne(myquery, function (err, result) {
     if (err) throw err;
     res.json(result);
   });
});
 
// This section will help you create a new record.
recordRoutes.route("/attendance_per_classroom/add").post(function (req, response) {
 let db_connect = dbo.getDb();
 let myobj = {
   attendance_section: req.body.attendance_section,
   attendance_date: req.body.attendance_date,
   attendance_present_ratio: req.body.attendance_present_ratio,
   attendance_absent_ratio: req.body.attendance_absent_ratio,
 };
 db_connect.collection("attendance_per_classrooms").insertOne(myobj, function (err, res) {
   if (err) throw err;
   response.json(res);
 });
});
 
// This section will help you update a record by id.
recordRoutes.route("/attendance_per_classroom/update/:id").post(function (req, response) {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId(req.params.id) };
 let newvalues = {
   $set: {
    attendance_section: req.body.attendance_section,
    attendance_date: req.body.attendance_date,
    attendance_present_ratio: req.body.attendance_present_ratio,
    attendance_absent_ratio: req.body.attendance_absent_ratio,
   },
 };
 db_connect
   .collection("attendance_per_classrooms")
   .updateOne(myquery, newvalues, function (err, res) {
     if (err) throw err;
     console.log("1 document updated");
     response.json(res);
   });
});
 
// This section will help you delete a record
recordRoutes.route("/attendance_per_classroom/delete/:id").delete((req, response) => {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId(req.params.id) };
 db_connect.collection("attendance_per_classrooms").deleteOne(myquery, function (err, obj) {
   if (err) throw err;
   console.log("1 document deleted");
   response.json(obj);
 });
});
 
module.exports = recordRoutes;