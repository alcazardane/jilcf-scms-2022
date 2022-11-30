import React from "react";

/**
 * import necessary scripts
 */
import Navbar from './navbar_L3'

// IMPORT MAIN DASHBOARD AND ATTENDANCE MODULE FOR USER LEVEL 1 HERE
import MainDashboardL3 from '../../dashboard/dashboard_L3/main_Dasboard_L3'
import WindowAttendanceL3 from "../../window_attendance/window_attendance_L3";
import AboutWindow from "../../about_module/about_module";
import NotesModule from "../../notes_module/notes_module";

// import image
import jilcf_logo from "../../../images/jilcf_logo_1.png"

/**
 * Styles
 */
import '../../../styles/mainWindow_styles.css'

export default function Home_L3() {
    var root = document.querySelector(":root");
  
    // For opening the dashboard window
    const openDashboard = () => {
        root.style.setProperty('--windowDashboard-L3-display', "block")
        root.style.setProperty('--display-b', "block")

        // Put codes to open Dashboard for User Level 1 here
    }

    // For opening the attendance window
    const openAttendance = () => {
        root.style.setProperty('--windowAttendance-L3-display', "block")

        // Put codes to open Attendance Module for User Level 1 here
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
            <div className="main_window_wrap l3_background">
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
                <div className="windowDashboard_L3_main_wrap">
                  <MainDashboardL3 />
                </div>

                <div className="windowAttendance_L3_main_wrap">
                  <WindowAttendanceL3 />
                </div>

                <div className="aboutModule_L3_main_wrap">
                  <AboutWindow />
                </div>

                <div className="notesModule_L3_main_wrap">
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