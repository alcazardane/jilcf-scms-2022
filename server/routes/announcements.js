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
recordRoutes.route("/announcements").get(function (req, res) {
 let db_connect = dbo.getDb("clients");
 db_connect
   .collection("announcements")
   .find({})
   .toArray(function (err, result) {
     if (err) throw err;
     res.json(result);
   });
});

recordRoutes.route("/announcement/edit/:id").get(function (req, res) {
    let db_connect = dbo.getDb();
    let myquery = { _id: ObjectId(req.params.id) };
    db_connect
      .collection("announcements")
      .findOne(myquery, function (err, result) {
        if (err) throw err;
        res.json(result);
      });
   });
 
// This section will help you create a new record.
recordRoutes.route("/announcement/add").post(function (req, response) {
 let db_connect = dbo.getDb();
 let myobj = {
   announcement_type: req.body.announcement_type,
   announcement_name: req.body.announcement_name,
   announcement_date: req.body.announcement_date,
   announcement_time: req.body.announcement_time,
   announcement_place: req.body.announcement_place,
 };
 db_connect.collection("announcements").insertOne(myobj, function (err, res) {
   if (err) throw err;
   response.json(res);
 });
});
 
// This section will help you update a record by id.
recordRoutes.route("/announcement/update/:id").post(function (req, response) {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId(req.params.id) };
 let newvalues = {
   $set: {
    announcement_type: req.body.announcement_type,
    announcement_name: req.body.announcement_name,
    announcement_date: req.body.announcement_date,
    announcement_time: req.body.announcement_time,
    announcement_place: req.body.announcement_place,
   },
 };
 db_connect
   .collection("announcements")
   .updateOne(myquery, newvalues, function (err, res) {
     if (err) throw err;
     console.log("1 document updated");
     response.json(res);
   });
});
 
// This section will help you delete a record
recordRoutes.route("/announcement/delete/:id").delete((req, response) => {
 let db_connect = dbo.getDb();
 let myquery = { _id: ObjectId(req.params.id) };
 db_connect.collection("announcements").deleteOne(myquery, function (err, obj) {
   if (err) throw err;
   console.log("1 document deleted");
   response.json(obj);
 });
});
 
module.exports = recordRoutes;