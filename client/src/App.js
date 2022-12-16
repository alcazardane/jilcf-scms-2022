import React, { useState } from "react";
 
// We use Route in order to define the different routes of our application
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// We import all the components we need in our app
// import RecordList from "./components/recordList";
// import Edit from "./components/edit";
import Create from "./components/create";
// import Login from "./components/login/login";
import MainWindowL1 from "./components/main_window/user_level_1/main_window_L1"
import MainWindowL2 from "./components/main_window/user_level_2/main_window";
import MainWindowL3 from "./components/main_window/user_level_3/main_window_L3"
import Attendance from "./components/attendance_window/attendance_window";
import Assessment from "./components/assessment_window/assessment_window";
import Calendar from "./components/calendar_window/calendar_window";
import FaceRecog from "./components/samplefr";
import useToken from "./useToken";
import Login from './components/login/login'
import Register from './components/admin_module/create_userAccount'

function App(){
  return(
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route 
            path="/login"
            element={<Login />}
          />
          <Route 
            path="/newUser"
            element={<Register />}
          />
          <Route 
            path="/facerecog"
            element={<FaceRecog />}
          />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;

// export function Loginfunc(){
//   return(
//     <Login />
//   )
// }

// export function HomeL1(){
//   return(
//     <MainWindowL1 />
//   )
// }

// export function HomeL2(){
//   return(
//     <MainWindowL2 />
//   )
// }

// export function HomeL3(){
//   return(
//     <MainWindowL3 />
//   )
// }

// export function FaceRec(){
//   return(
//     <FaceRecog/>
//   )
// }

// export function CreateUser(){
//   return(
//     <Create />
//   )
// }

// function setToken(userToken) {
//   sessionStorage.setItem('token', JSON.stringify(userToken));
// }

// function getToken() {
//   const tokenString = sessionStorage.getItem('token');
//   const userToken = JSON.parse(tokenString);
//   return userToken?.token
// }

// export function App(){
//   const { token, setToken } = useToken();

//   if(!token) {
//     return <Login setToken={setToken} />
//   }

//   return (
//     <Outlet />
//   );
// }

// export function AssessmentWindow(){
//   return(
//     <Assessment/>
//   )
// }
// export function AttendanceWindow(){
//   return(
//     <Attendance/>
//   )
// }

// export function CalendarWindow(){
//   return(
//     <Calendar/>
//   )
// };
