const express = require("express");
 
const recordRoutes = express.Router();
 
// This will help us connect to the database
const dbo = require("../db/conn");
 
// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

// This section will help you get a list of all the assessment_records.
recordRoutes.route("/student_attendance").get(function (req, res) {
 let db_connect = dbo.getDb("clients");
 db_connect
   .collection("student_attendance")
   .find({})
   .toArray(function (err, result) {
     if (err) throw err;
     res.json(result);
   });
});


recordRoutes.route("/student_attendance/to_be_deleted/:id").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect
    .collection("student_attendance")
    .findOne(myquery, function (err, result) {
      if (err) throw err;
      res.json(result);
    });
 });

// This section will get the userID of the selected student to be viewed
recordRoutes.route("/student_attendance/:userID").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { userID: req.params.userID }
  db_connect
    .collection("student_attendance")
    .find(myquery)
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
 });

 // This will get the document you want to edit the reason
 recordRoutes.route("/student_attendance/edit_reason/:id").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect
    .collection("student_attendance")
    .findOne(myquery, function (err, result) {
      if (err) throw err;
      res.json(result);
    });
 });

 // This will get the document you want to edit the intervention
 recordRoutes.route("/student_attendance/edit_intervention/:id").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect
    .collection("student_attendance")
    .findOne(myquery, function (err, result) {
      if (err) throw err;
      res.json(result);
    });
 });

 // This will update the reason in the database based on the input entered by the user
 recordRoutes.route("/student_attendance/update_reason/:id").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  let newvalues = {
    $set: {
     reasons: req.body.reasons,
    },
  };
  db_connect
    .collection("student_attendance")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      console.log("1 document updated");
      response.json(res);
    });
 });

// This will update the intervention in the database based on the input entered by the user
 recordRoutes.route("/student_attendance/update_intervention/:id").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  let newvalues = {
    $set: {
     intervention: req.body.intervention,
    },
  };
  db_connect
    .collection("student_attendance")
    .updateOne(myquery, newvalues, function (err, res) {
      if (err) throw err;
      console.log("1 document updated");
      response.json(res);
    });
 });

 recordRoutes.route("/student_attendance/delete_attendance/:id").delete((req, response) => {
  let db_connect = dbo.getDb();
  let myquery = { _id: ObjectId(req.params.id) };
  db_connect.collection("student_attendance").deleteOne(myquery, function (err, obj) {
    if (err) throw err;
    console.log("1 document deleted");
    response.json(obj);
  });
 });

module.exports = recordRoutes;