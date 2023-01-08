import React from "react";
import { useAuthContext } from './hooks/useAuthContext'

// We use Route in order to define the different routes of our application
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

import MainWindowL1 from "./components/main_window/user_level_1/main_window_L1"
import MainWindowL2 from "./components/main_window/user_level_2/main_window";
import MainWindowL3 from "./components/main_window/user_level_3/main_window_L3"
import Login from './components/login/login'
import Register from './components/admin_module/create_userAccount'
import Assessment from './components/assessment/assessment_window'

function App(){
  const { user } = useAuthContext()

  const navigateUser = () => {
    if (!user){
      return <Navigate replace to="/login"/>
    }
    else{
      if (user.level === '1') {
        return <Navigate replace to="/home/l1" />;
      }
      else if (user.level === '2') {
        return <Navigate replace to="/home/l2" />;
      }
      else if (user.level === '3') {
        return <Navigate replace to="/home/l3" />;
      }
      else {
        return <Navigate replace to="/login"/>
      }
    }
  };

  return(
    <div className="App">
      <BrowserRouter>
        <Routes>
        <Route 
            path="/"
            element={!user ? <Login /> : navigateUser()}
          />
          <Route 
            path="/login"
            element={!user ? <Login /> : navigateUser()}
          />
          <Route 
            path="/newUser"
            element={<Register />}
          />
          <Route 
            path="/facerecog"
            element={user ? <userFaceRecog /> : <Navigate to="/login" />}
          />
          <Route 
            path="/home/L1"
            element={user ? <MainWindowL1 /> : navigateUser()} />
          <Route 
            path="/home/L2"
            element={user ? <MainWindowL2 /> : navigateUser()}
          />
          <Route 
            path="/home/L3"
            element={user ? <MainWindowL3 /> : navigateUser()}
          />
          <Route 
            path="/assessment"
            element={user ? <Assessment /> : <Navigate to="/login" />}
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
