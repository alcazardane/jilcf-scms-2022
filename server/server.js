require("dotenv").config({ path: "./config.env" });

const express = require("express");
const app = express();
const mongoose = require("mongoose")

//middleware
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
app.use('/api/events', require("./routes/events"))

// login routes
const userRoutes = require('./routes/user')
// assessment routes
const assessmentRoutes = require('./routes/assessment')
// subject routes
const subjectRoutes = require('./routes/subject')
// class section routes
const classSectionRoutes = require('./routes/class_section')

// get driver connection
const dbo = require("./db/conn");
 
app.listen(port, () => {
  // perform a database connection when server starts
  dbo.connectToServer(function (err) {
    if (err) console.error(err);
 
  });
  console.log(`Server is running on port: ${port}`);
});

app.use('/api/user', userRoutes)
app.use('/api/assessment', assessmentRoutes)
app.use('/api/subject', subjectRoutes)
app.use('/api/class-sections', classSectionRoutes)

app.listen(8080, () => console.log('API is running on http://localhost:8080/login'));

mongoose.connect(process.env.ATLAS_URI)
  .then(() => {
    app.listen(process.env.PORT, () => {
      console.log('connected to db')
    })
  })