const express = require("express");
 
const recordRoutes = express.Router();
 
// This will help us connect to the database
const dbo = require("../db/conn");
 
// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

// This section will help you get a list of all the assessment_records.
recordRoutes.route("/student_info").get(function (req, res) {
 let db_connect = dbo.getDb("clients");
 let sort_students = { lname: 1 }
 db_connect
   .collection("student_info")
   .find({})
   .sort(sort_students)
   .toArray(function (err, result) {
     if (err) throw err;
     res.json(result);
   });
});

// This section will help you get a single assessment_record by id
recordRoutes.route("/student_info/:userID").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { userID: req.params.userID }
  //let myquery = { _id: ObjectId(req.params.id) };
  db_connect
    .collection("student_info")
    .findOne(myquery, function (err, result) {
      if (err) throw err;
      res.json(result);
    });
 });

// This section will help you create a new assessment_record.
recordRoutes.route("/student_info/add").post(function (req, response) {
  let db_connect = dbo.getDb();
  let myobj = {
    userID: req.body.userID,
    level: req.body.level,
    track: req.body.track,
    strand: req.body.strand,
    grade_level: req.body.grade_level,
    section: req.body.section,
    tc_id: req.body.tc_id,
    fname: req.body.fname,
    lname: req.body.lname,
    mname: req.body.mname,
    pcn: req.body.pcn,
    grade_id: req.body.grade_id,
    att_id: req.body.att_id,
    id_pic: req.body.id_pic,
  };
  db_connect.collection("camera_module_attendances").insertOne(myobj, function (err, res) {
    if (err) throw err;
    response.json(res);
  });
 });

module.exports = recordRoutes;