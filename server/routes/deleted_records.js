const express = require("express");
 
const recordRoutes = express.Router();
 
// This will help us connect to the database
const dbo = require("../db/conn");
 
// This help convert the id from string to ObjectId for the _id.
const ObjectId = require("mongodb").ObjectId;

// This section will help you get a list of all the assessment_records.
recordRoutes.route("/deleted_records").get(function (req, res) {
 let db_connect = dbo.getDb("clients");
 db_connect
   .collection("deleted_records")
   .find({})
   .toArray(function (err, result) {
     if (err) throw err;
     res.json(result);
   });
});

// This section will add the deleted student attendance record from attendance module
recordRoutes.route("/deleted_records/student_attendance").post(function (req, response) {
    let db_connect = dbo.getDb();
    let myobj = {
      userID: req.body.userID,
      timestamp: req.body.timestamp,
      status: req.body.status,
      reasons: req.body.reasons,
      intervention: req.body.intervention
    };
    db_connect.collection("deleted_records").insertOne(myobj, function (err, res) {
      if (err) throw err;
      response.json(res);
    });
   });

module.exports = recordRoutes;