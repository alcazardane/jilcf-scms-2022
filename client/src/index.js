import React from "react";
import ReactDOM from "react-dom/client";
import {Loginfunc, HomeL1, HomeL2, HomeL3, CreateUser, App, AssessmentWindow, AttendanceWindow, CalendarWindow, NotesWindow, AboutWindow} from "./App";

import './index.css'

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <Router>
    
      <Routes>
        <Route path="/" element={ <App /> }>
          <Route path="/home/L1" element={<HomeL1 />} />
          <Route path="/home/L2" element={<HomeL2 />} />
          <Route path="/home/L3" element={<HomeL3 />} />
          <Route path="/login" element={<Loginfunc />} />
          <Route path="/create" element={<CreateUser />} />
          <Route path="/assessment"  element={<AssessmentWindow/>}/>
          <Route path="/attendance" element={<AttendanceWindow/>}/>
          <Route path="/Calendar" element={<CalendarWindow/>}/>
          <Route path="/notes" element={<NotesWindow/>}/>
          <Route path="/about" element={<AboutWindow/>}/>
        </Route>
      </Routes>

    </Router>
);