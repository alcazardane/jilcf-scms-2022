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
import UserFaceRecog from './components/samplefr'

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
            element={<UserFaceRecog />}
          />
          <Route 
            path="/home/L1"
            element={user ? <MainWindowL1 /> : navigateUser()} />
          <Route 
            path="/home/L2"
            element={
              user ? <MainWindowL2 /> : navigateUser()
            }
          />
          <Route 
            path="/home/L3"
            element={
              user ? <MainWindowL3 /> : navigateUser()
            }
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