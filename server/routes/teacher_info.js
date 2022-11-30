const express = require("express");
 
const recordRoutes = express.Router();
 
// This will help us connect to the database
const dbo = require("../db/conn");
 
// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

// This section will help you get a list of all the assessment_records.
recordRoutes.route("/teacher_info").get(function (req, res) {
 let db_connect = dbo.getDb("clients");
 let sort_students = { lname: 1 }
 db_connect
   .collection("teacher_info")
   .find({})
   .sort(sort_students)
   .toArray(function (err, result) {
     if (err) throw err;
     res.json(result);
   });
});

// This section will help you get a single assessment_record by id
recordRoutes.route("/teacher_info/:userID").get(function (req, res) {
  let db_connect = dbo.getDb();
  let myquery = { userID: req.params.userID }
  //let myquery = { _id: ObjectId(req.params.id) };
  db_connect
    .collection("teacher_info")
    .findOne(myquery, function (err, result) {
      if (err) throw err;
      res.json(result);
    });
 });


module.exports = recordRoutes;