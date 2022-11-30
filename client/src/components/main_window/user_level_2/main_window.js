import React from "react";

/**
 * import necessary scripts
 */
import Navbar from './Navbar'
import MainDashboard from '../../dashboard/main_Dashboard'
import WindowAttendance from '../../window_attendance/windowAttendance'

import AboutWindow from "../../about_module/about_module";
import NotesModule from "../../notes_module/notes_module";

// import images
import jilcf_logo from "../../../images/jilcf_logo_1.png"

/**
 * Styles
 */
import '../../../styles/mainWindow_styles.css'

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

    const openAboutModule = () => {
        root.style.setProperty('--aboutModule-L1-display', "block")
        root.style.setProperty('--about-display-b', "block")
    }

    const openNotesModule = () => {
        root.style.setProperty('--notesModule-L1-display', "block")
        root.style.setProperty('--notes-display-b', "block")
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

                <div className="aboutModule_main_wrap">
                  <AboutWindow />
                </div>

                <div className="notesModule_main_wrap">
                  <NotesModule />
                </div>   

            </div>
            <Navbar 
            openAboutModule={openAboutModule}
            openNotesModule={openNotesModule}
            />
        </div>
    )
}