import React from "react";
import { useState } from "react";
import { useAuthContext } from './hooks/useAuthContext'

// We use Route in order to define the different routes of our application
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';

// import MainWindowL1 from "./components/main_window/user_level_1/main_window_L1"
// import MainWindowL2 from "./components/main_window/user_level_2/main_window";
// import MainWindowL3 from "./components/main_window/user_level_3/main_window_L3"
import Login from './components/login/login'
import Register from './components/admin_module/create_userAccount'
import Assessment from './components/assessment/assessment_window'
import UserFaceRecog from './components/samplefr'

// import MainWindowDraft from "./components/main_window/user_level_1/main_window_draft";
import HomeUserDashboard from "./components/main_window/home_userDashboard";
import UserAdminModule from "./components/ADMIN/userAdminModule";
import UserAttendanceModule from "./components/window_attendance/userAttendanceModule";
import UserCalendarModule from "./components/calendar_module/userCalendarModule";
import UserAboutModule from "./components/about_module/userAboutModule";
import UserAssessmentModule from "./components/assessment_module/userAssessmentModule";
import UserCameraModule from "./components/camera_module/userCameraModule";
import UserNotificationModule from "./components/notification_module/userNotificationModule";
import UserAnalyticsModule from "./components/analytics_module/userAnalyticsModule";

import UploadAccount from "./components/ADMIN/accounts/uploadAccount"

function App(){
  const { user } = useAuthContext()

  const [classID, setClassID] = useState('ACADEMIC-12-STEM-A');
  const [classSection, setClassSection] = useState('12 STEM A');
  const [subjectID, setSubjectID] = useState('GM-001');

  const navigateUser = () => {
    if (!user){
      return <Navigate replace to="/login"/>
    }
    else{
      if (user.level === '1') {
        return <Navigate replace to="/home/L1/user_dashboard" />;
      }
      else if (user.level === '2') {
        return <Navigate replace to="/home/L2/user_dashboard" />;
      }
      else if (user.level === '3') {
        return <Navigate replace to="/home/L3/user_dashboard" />;
      }
      else {
        return <Navigate replace to="/login"/>
      }
    }
  };

  return(
    <div className="App">
      <BrowserRouter basename='/'>
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
            path="/home/L1/user_dashboard"
            element={user ? <HomeUserDashboard /> : navigateUser()}
            />
          <Route 
            path="/home/L2/user_dashboard"
            element={user ? <HomeUserDashboard /> : navigateUser()}
          />
          <Route 
            path="/home/L3/user_dashboard"
            element={user ? <HomeUserDashboard /> : navigateUser()}
          />
          <Route 
            path="/assessment"
            element={user ? <Assessment /> : <Navigate to="/login" />}
          />
          <Route 
            path="/home/L1/admin_module"
            element={user ? <UserAdminModule /> : <Navigate to="/login" />}
          />

          <Route 
            path="/home/L1/attendance"
            element={user ? <UserAttendanceModule /> : <Navigate to="/login" />}
          />
          <Route 
            path="/home/L2/attendance"
            element={user ? <UserAttendanceModule /> : <Navigate to="/login" />}
          />
          <Route 
            path="/home/L3/attendance"
            element={user ? <UserAttendanceModule /> : <Navigate to="/login" />}
          />

          <Route 
            path="/home/L1/calendar"
            element={user ? <UserCalendarModule /> : <Navigate to="/login" />}
          />
          <Route 
            path="/home/L2/calendar"
            element={user ? <UserCalendarModule /> : <Navigate to="/login" />}
          />
          <Route 
            path="/home/L3/calendar"
            element={user ? <UserCalendarModule /> : <Navigate to="/login" />}
          />

          <Route 
            path="/home/L1/about"
            element={user ? <UserAboutModule/> : <Navigate to="/login" />}
          />
          <Route 
            path="/home/L2/about"
            element={user ? <UserAboutModule /> : <Navigate to="/login" />}
          />
          <Route 
            path="/home/L3/about"
            element={user ? <UserAboutModule /> : <Navigate to="/login" />}
          />

          <Route 
            path="/home/L2/assessment"
            element={
              user ? 
              <UserAssessmentModule  
                setClassID={setClassID}
                setClassSection={setClassSection}
                setSubjectID={setSubjectID}
                classID={classID}
                classSection={classSection}
                subjectID={subjectID}/> : <Navigate to="/login" />}
          />
          <Route 
            path="/home/L3/assessment"
            element={
                user ? 
                <UserAssessmentModule 
                  setClassID={setClassID}
                  setClassSection={setClassSection}
                  setSubjectID={setSubjectID}
                  classID={classID}
                  classSection={classSection}
                  subjectID={subjectID}/> : <Navigate to="/login" />}
          />

          <Route 
            path="/home/L2/camera"
            element={user ? <UserCameraModule /> : <Navigate to="/login" />}
          />

          <Route 
            path="/home/L1/notification"
            element={user ? <UserNotificationModule /> : <Navigate to="/login" />}
          />
          <Route 
            path="/home/L2/notification"
            element={user ? <UserNotificationModule /> : <Navigate to="/login" />}
          />
          <Route 
            path="/home/L3/notification"
            element={user ? <UserNotificationModule /> : <Navigate to="/login" />}
          />

          <Route 
            path="/home/L2/analytics"
            element={
              user ? 
              <UserAnalyticsModule 
                setClassID={setClassID}
                setClassSection={setClassSection}
                setSubjectID={setSubjectID}
                classID={classID}
                classSection={classSection}
                subjectID={subjectID}/> : <Navigate to="/login" />}
          />

          {/* <Route 
            path="/secretaccount"
            element={ <CreateAccount /> }
          /> */}
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App;