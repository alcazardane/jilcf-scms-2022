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
recordRoutes.route("/student_activities").get(function (req, res) {
 let db_connect = dbo.getDb("clients");
 db_connect
   .collection("student_activities")
   .find({})
   .toArray(function (err, result) {
     if (err) throw err;
     res.json(result);
   });
});
 

// Will find schedules based on userID
recordRoutes.route("/student_activities/:userID").get(function (req, res) {
    let db_connect = dbo.getDb();
    let myquery = { userID: req.params.userID }
    db_connect
      .collection("student_activities")
      .find(myquery)
      .toArray(function (err, result) {
        if (err) throw err;
        res.json(result);
      });
   });
 
module.exports = recordRoutes;