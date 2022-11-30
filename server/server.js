require("dotenv").config({ path: "./config.env" });

// express app
const express = require("express");
const app = express();
// const bodyParser = require("body-parser")
// const mongoose = require("mongoose")
// const jwt = require("jsonwebtoken")
// const bcrypt = require("bcrypt")
// const User = require("./models/user")
// const { response } = require("express")

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

// get driver connection
const dbo = require("./db/conn");
 
app.listen(port, () => {
  // perform a database connection when server starts
  dbo.connectToServer(function (err) {
    if (err) console.error(err);
 
  });
  console.log(`Server is running on port: ${port}`);
});

app.use('/login', (req, res) => {
  res.send({
    token: 'test123'
  });
});

app.listen(8080, () => console.log('API is running on http://localhost:8080/login'));

// const urlencodedParser = bodyParser.urlencoded({ extended: false })
// app.use(bodyParser.json(), urlencodedParser)

// require('dotenv').config({ path: './config.env' });
// const atlasURI = process.env.ATLAS_URI

// mongoose.connect(atlasURI, {useNewUrlParser:true, useUnifiedTopology:true})
// .then((res) => {
//     app.listen(process.env.PORT, () => console.log("server is live"))
// })
// .catch(err=>console.log(err))

// app.post("/register", async (req, res) => {
//     const user = req.body;

//     const takenUserid = await User.findOne({userID: user.userID})

//     if(takenUserid) {
//         res.json({message: "User ID has already have an account."})
//     } else {
//         user.password = await bcrypt.hash(req.body.password, 10)
 
//         const dbUser = new User({
//             userID: user.username.toLowerCase(),
//             password: user.password
//         })
        
//         dbUser.save()
//         res.json({message: "Success"})
//     }
// })

// app.post("/login", (req, res) => {
//     const userLoggingIn = req.body;

//     User.findOne({userID: userLoggingIn.userID})
//     .then(dbUser => {
//         if (!dbUser) {
//             return res.json({
//                 message: "User ID and/or Password is incorrect"
//             })
//         }
//         bcrypt.compare(userLoggingIn.password, dbUser.password)
//         .then(isCorrect => {
//             if(isCorrect){
//                 const payload = {
//                     id: dbUser._id,
//                     userID: dbUser.userID,
//                 }
//                 jwt.sign(
//                     payload,
//                     process.env.JWT_SECRET,
//                     {expiresIn: 86400},
//                     (err, token) => {
//                         if (err) return response.json({message: err})
//                         return response.json({
//                             message: "Success",
//                             token: "Client: " + token
//                         })
//                     }
//                 )
//             } else {
//                 return res.json({
//                     message: "Invalid userID or Password"
//                 }) 
//             }
//         })
//     })
// })