const express = require("express");
 
const recordRoutes = express.Router();
 
// This will help us connect to the database
const dbo = require("../db/conn");
 
// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;
 
 
// This section will help you get a list of all the assessment_records.
recordRoutes.route("/assessment_record").get(function (req, res) {
 let db_connect = dbo.getDb("clients");
 //sort assessment_record by student_lasname
 let sort_assessment = {student_lastname: 1}
 db_connect
   .collection("assessment_records")
   .find({})
   .sort(sort_assessment)
   .toArray(function (err, result) {
     if (err) throw err;
     res.json(result);
   });
});
 
// This section will help you get a single assessment_record by id
recordRoutes.route("/assessment_record/:id").get(function (req, res) {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId(req.params.id) };
 db_connect
   .collection("assessment_records")
   .findOne(myquery, function (err, result) {
     if (err) throw err;
     res.json(result);
   });
});
 
// This section will help you create a new assessment_record.
recordRoutes.route("/assessment_record/add").post(function (req, response) {
 let db_connect = dbo.getDb();
 let myobj = {
    student_lastname: req.body.student_lastname,
    student_firstname: req.body.student_firstname,
    student_middlename: req.body.student_middlename,
    student_id: req.body.student_id,
    student_track: req.body.student_track,
    student_strand: req.body.student_strand,
    student_grade_level: req.body.student_grade_level,
    student_section: req.body.student_section,
    student_sy: req.body.student_sy,
    student_exam_score: req.body.student_exam_score,
    student_recitation_score: req.body.student_recitation_score,
    student_quiz_score: req.body.student_quiz_score,
    student_seatwork_score: req.body.student_seatwork_score,
    student_project_score: req.body.student_project_score,
    student_attendance_record: parseInt(req.body.student_attendance_record),
 };
 db_connect.collection("assessment_records").insertOne(myobj, function (err, res) {
   if (err) throw err;
   response.json(res);
 });
});
 
// This section will help you update an assessment_record by id.
recordRoutes.route("/assessment_record/update/:id").post(function (req, response) {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId(req.params.id) };
 let newvalues = {
   $set: {
    student_lastname: req.body.student_lastname,
    student_firstname: req.body.student_firstname,
    student_middlename: req.body.student_middlename,
    student_id: req.body.student_id,
    student_track: req.body.student_track,
    student_strand: req.body.student_strand,
    student_grade_level: req.body.student_grade_level,
    student_section: req.body.student_section,
    student_sy: req.body.student_sy,
    student_exam_score: req.body.student_exam_score,
    student_recitation_score: req.body.student_recitation_score,
    student_quiz_score: req.body.student_quiz_score,
    student_seatwork_score: req.body.student_seatwork_score,
    student_project_score: req.body.student_project_score,
    student_attendance_record: parseInt(req.body.student_attendance_record),
   },
 };
 db_connect
   .collection("assessment_records")
   .updateOne(myquery, newvalues, function (err, res) {
     if (err) throw err;
     console.log("1 document updated");
     response.json(res);
   });
});
 
// This section will help you delete an assessment_record
recordRoutes.route("/assessment_record/delete/:id").delete((req, response) => {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId(req.params.id) };
 db_connect.collection("assessment_records").deleteOne(myquery, function (err, obj) {
   if (err) throw err;
   console.log("1 document deleted");
   response.json(obj);
 });
});

// Red Notice
// Find students with more than 10 absences
recordRoutes.route("/red").get(function (req, res) {
  let db_connect = dbo.getDb("clients");
  let query_red = {student_attendance_record: {$lt: 20} }
  // Sort by the highest absent count
  let sort_red = {student_attendance_record: 1}
  db_connect
    .collection("assessment_records")
    .find(query_red)
    .sort(sort_red)
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
 });


 //Yellow Notice
 //Find students with more than 5 but less than 10 absences
 recordRoutes.route("/yellow").get(function (req, res) {
  let db_connect = dbo.getDb("clients");
  let query_yellow = {student_attendance_record: {$gte: 20, $lte: 25} }
  // Sort by the highest absent count
  let sort_yellow = {student_attendance_record: 1}
  db_connect
    .collection("assessment_records")
    .find(query_yellow)
    .sort(sort_yellow)
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
 });

// Find grade 11 students
 recordRoutes.route("/grade_level_11").get(function (req, res) {
  let db_connect = dbo.getDb("clients");
  let query_grade_level_11 = {student_grade_level: "11" }
  // Sort by the highest absent count
  let sort_grade_level_11 = {student_attendance_record: 1}
  db_connect
    .collection("assessment_records")
    .find(query_grade_level_11)
    .sort(sort_grade_level_11)
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
 });


 // Find grade 12 students
 recordRoutes.route("/grade_level_12").get(function (req, res) {
  let db_connect = dbo.getDb("clients");
  let query_grade_level_12 = {student_grade_level: 12 }
  // Sort by the highest absent count
  let sort_grade_level_12 = {student_attendance_record: 1}
  db_connect
    .collection("assessment_records")
    .find(query_grade_level_12)
    .sort(sort_grade_level_12)
    .toArray(function (err, result) {
      if (err) throw err;
      res.json(result);
    });
 });
 
module.exports = recordRoutes;