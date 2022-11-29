import React from "react";

/**
 * import necessary scripts
 */
import Navbar from './Navbar'
import MainDashboard from '../../dashboard/main_Dashboard'
import WindowAttendance from '../../window_attendance/windowAttendance'
import AboutWindow from '../user_level_2/about_window/about_window'
import NotesWindow from '../user_level_2/notes_window/App'
// import images
import jilcf_logo from "../../../images/jilcf_logo_1.png"

/**
 * Styles
 */
import '../user_level_2/notes_window/App.css'
import '../../../styles/mainWindow_styles.css'
import '../user_level_2/about_window/about_window.css'
export default function Home() {
    var root = document.querySelector(":root");
   
    // For opening the dashboard window
    const openDashboard = () => {
        root.style.setProperty('--windowDashboard-display', "block")
        root.style.setProperty('--display-b', "block")
    }

    // For opening the attendance window
    const openAttendance = () => {
        root.style.setProperty('--windowAttendance-display', "block")
    }
    const openAbout = () =>{
        root.style.setProperty('--windowAbout-display', "block")
            
    }
    const openNotes = () =>{
        root.style.setProperty('--windowNotes-display', "block")
            
    }
    return (
        <div>
            <div className="main_window_wrap">
                <div className="logo_wrap">
                    <div className="jilcf_logo">
                      <img src={jilcf_logo} alt="school_logo" />
                    </div>
                </div>
                <div className="main_window_button_wrap">
                    <div className="main_window_button_wrap_in">
                        <button className="main_window_button" onClick={openDashboard}></button>
                        <div className="button_label">Dashboard</div>
                    </div>
                    <div className="main_window_button_wrap_in">
                        <button className="main_window_button" onClick={openAttendance}></button>
                        <div className="button_label" >Attendance</div>
                    </div>
                    <div className="main_window_button_wrap_in">
                        <button className="main_window_button"></button>
                        <div className="button_label">Assessment</div>
                    </div>
                    <div className="main_window_button_wrap_in">
                        <button className="main_window_button"></button>
                        <div className="button_label">Analytics</div>
                    </div> 
                </div>
                <div className="windowDashboard_main_wrap">
                  <MainDashboard />
                </div>
                <div className="windowAttendance_main_wrap">
                  <WindowAttendance />
                </div>
                <div className="about_main_wrap">
                  <AboutWindow />
                </div>
                <div className="window_notes_main_wrap">
                    <NotesWindow/>
                </div>
               
             </div>
             <Navbar openAbout={openAbout}/>   
             <Navbar openNotes={openNotes}/>
        </div>
    )
}