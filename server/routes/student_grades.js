const express = require("express");
 
const recordRoutes = express.Router();
 
// This will help us connect to the database
const dbo = require("../db/conn");
 
// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

// This section will help you get a list of all the assessment_records.
recordRoutes.route("/student_grades").get(function (req, res) {
 let db_connect = dbo.getDb("clients");
 db_connect
   .collection("student_grades")
   .find({})
   .toArray(function (err, result) {
     if (err) throw err;
     res.json(result);
   });
});

module.exports = recordRoutes;