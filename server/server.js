require("dotenv").config({ path: "./config.env" });

// express app
const express = require("express");
const app = express();

//middleware?
const cors = require("cors");
app.use(express.json());
const port = process.env.PORT || 5000;
app.use(cors());

//routes
app.use(require("./routes/record"));
app.use(require("./routes/upcoming_schedule"));
app.use(require("./routes/attendance_per_classroom"));
app.use(require("./routes/assessment_record"));
app.use(require("./routes/camera_module"));
app.use(require("./routes/student_info"));
app.use(require("./routes/student_grades"));
app.use(require("./routes/student_attendance"));
app.use(require("./routes/deleted_records"));
app.use(require("./routes/schedule"));
app.use(require("./routes/student_activities"));
app.use(require("./routes/announcements"));
app.use(require("./routes/teacher_info"));
app.use(require("./routes/teacher_attendance"))

// get driver connection
const dbo = require("./db/conn");
 
app.listen(port, () => {
  // perform a database connection when server starts
  dbo.connectToServer(function (err) {
    if (err) console.error(err);
 
  });
  console.log(`Server is running on port: ${port}`);
});