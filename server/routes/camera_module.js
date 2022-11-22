const express = require("express");
 
const recordRoutes = express.Router();
 
// This will help us connect to the database
const dbo = require("../db/conn");
 
// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

// This section will help you get a list of all the assessment_records.
recordRoutes.route("/camera_module_attendance").get(function (req, res) {
 let db_connect = dbo.getDb("clients");
 db_connect
   .collection("camera_module_attendances")
   .find({})
   .toArray(function (err, result) {
     if (err) throw err;
     res.json(result);
   });
});
 
// This section will help you get a single assessment_record by id
recordRoutes.route("/camera_module_attendance/:id").get(function (req, res) {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId(req.params.id) };
 db_connect
   .collection("camera_module_attendances")
   .findOne(myquery, function (err, result) {
     if (err) throw err;
     res.json(result);
   });
});
 
// This section will help you create a new assessment_record.
recordRoutes.route("/camera_module_attendance/add").post(function (req, response) {
 let db_connect = dbo.getDb();
 let myobj = {
    student_id: req.body.student_id,
    student_lastname: req.body.student_lastname,
    student_firstname: req.body.student_firstname,
    student_middlename: req.body.student_middlename,
    student_profile_picture: req.body.student_profile_picture,
    student_track: req.body.student_track,
    student_strand: req.body.student_strand,
    student_grade_level: req.body.student_grade_level,
    student_section: req.body.student_section,
    attendance_date: req.body.attendance_date,
    attendance_status: req.body.attendance_status,
    attendance_reasons: req.body.attendance_reasons,
    attendance_intervention: req.body.attendance_intervention,
 };
 db_connect.collection("camera_module_attendances").insertOne(myobj, function (err, res) {
   if (err) throw err;
   response.json(res);
 });
});
 
// This section will help you update an assessment_record by id.
recordRoutes.route("/camera_module_attendance/update/:id").post(function (req, response) {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId(req.params.id) };
 let newvalues = {
   $set: {
    student_id: req.body.student_id,
    student_lastname: req.body.student_lastname,
    student_firstname: req.body.student_firstname,
    student_middlename: req.body.student_middlename,
    student_profile_picture: req.body.student_profile_picture,
    student_track: req.body.student_track,
    student_strand: req.body.student_strand,
    student_grade_level: req.body.student_grade_level,
    student_section: req.body.student_section,
    attendance_date: req.body.attendance_date,
    attendance_status: req.body.attendance_status,
    attendance_reasons: req.body.attendance_reasons,
    attendance_intervention: req.body.attendance_intervention,
   },
 };
 db_connect
   .collection("camera_module_attendances")
   .updateOne(myquery, newvalues, function (err, res) {
     if (err) throw err;
     console.log("1 document updated");
     response.json(res);
   });
});
 
// This section will help you delete an assessment_record
recordRoutes.route("/camera_module_attendance/delete/:id").delete((req, response) => {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId(req.params.id) };
 db_connect.collection("camera_module_attendances").deleteOne(myquery, function (err, obj) {
   if (err) throw err;
   console.log("1 document deleted");
   response.json(obj);
 });
});

module.exports = recordRoutes;