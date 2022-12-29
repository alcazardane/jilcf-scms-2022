import React from "react";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { useAuthContext } from "../../../hooks/useAuthContext";
import { useLogout } from "../../../hooks/useLogout";
/**
 * import necessary scripts
 */
import Navbar from './navbar_L3'

// IMPORT MAIN DASHBOARD AND ATTENDANCE MODULE FOR USER LEVEL 1 HERE
import MainDashboardL3 from '../../dashboard/dashboard_L3/main_Dasboard_L3'
import WindowAttendanceL3 from "../../window_attendance/window_attendance_L3";
import useWindowDimensions from "../../dashboard/hooks/useWindowDimensions";
import AboutWindow from "../../about_module/about_module";

// import image
import jilcf_logo from "../../../images/jilcf_logo_1.png"
import dashboard_icon from "../../../images/Dashboard_Icon.png"
import analytics_icon from "../../../images/analytics.png"
import attendance_icon from "../../../images/Attendance_Icon.png"
import assessment_icon from "../../../images/Assessment_Icon.png"
import calendar_icon from "../../../images/Calendar_Icon.png"
import about_icon from "../../../images/About_Icon.png"

/**
 * Styles
 */
import '../../../styles/mainWindow_styles.css'

export default function Home_L3() {
    var root = document.querySelector(":root");
    const { height } = useWindowDimensions();

    const [dashboardIsOpen, setDashboardIsOpen] = useState(true);
    const [attendanceIsOpen, setAttendanceIsOpen] = useState(false);
    const [analyticsIsOpen, setAnalyticsIsOpen] = useState(false);
    const [assessmentIsOpen, setAssessmentIsOpen] = useState(false);
    const [aboutIsOpen, setAboutIsOpen] = useState(false);
    const [calendarIsOpen, setCalendarIsOpen] = useState(false);

//=======================================================================================================================
// DASHBOARD
    // For opening the dashboard
    const openDashboard = () => {

        root.style.setProperty('--windowDashboard-L3-display', "block")
        root.style.setProperty('--windowAttendance-L3-display', "none")
        root.style.setProperty('--aboutModule-L1-display', "none")

        setDashboardIsOpen(true);

        setAttendanceIsOpen(false);
        setAnalyticsIsOpen(false);
        setAssessmentIsOpen(false);
        setAboutIsOpen(false);
        setCalendarIsOpen(false);
    }

    const[dashAttIsOpen, setDashAttIsOpen] = useState(true);
    const[dashAssessIsOpen, setDashAssessIsOpen] = useState(false);
    const[dashAnaIsOpen, setDashAnaIsOpen] = useState(false);
    const[dashUpIsOpen, setDashUpIsOpen] = useState(false);
    const[dashActIsOpen, setDashActIsOpen] = useState(false);
    const[dashAnnIsOpen, setDashAnnIsOpen] = useState(false);

    const dashAttRef = useRef(null);
    const dashAssessRef = useRef(null);
    const dashAnaRef = useRef(null);
    const dashUpRef = useRef(null);
    const dashActRef = useRef(null);
    const dashAnnRef = useRef(null);

    const showDashAtt = () => {
        setDashAttIsOpen(true);
        setDashAssessIsOpen(false);
        setDashAnaIsOpen(false);
        setDashUpIsOpen(false);
        setDashActIsOpen(false);
        setDashAnnIsOpen(false);
    }
    const showDashAssess = () => {
        setDashAttIsOpen(false);
        setDashAssessIsOpen(true);
        setDashAnaIsOpen(false);
        setDashUpIsOpen(false);
        setDashActIsOpen(false);
        setDashAnnIsOpen(false);
    }
    const showDashAna= () => {
        setDashAttIsOpen(false);
        setDashAssessIsOpen(false);
        setDashAnaIsOpen(true);
        setDashUpIsOpen(false);
        setDashActIsOpen(false);
        setDashAnnIsOpen(false);
    }
    const showDashUp= () => {
        setDashAttIsOpen(false);
        setDashAssessIsOpen(false);
        setDashAnaIsOpen(false);
        setDashUpIsOpen(true);
        setDashActIsOpen(false);
        setDashAnnIsOpen(false);
    }
    const showDashAct= () => {
        setDashAttIsOpen(false);
        setDashAssessIsOpen(false);
        setDashAnaIsOpen(false);
        setDashUpIsOpen(false);
        setDashActIsOpen(true);
        setDashAnnIsOpen(false);
    }
    const showDashAnn= () => {
        setDashAttIsOpen(false);
        setDashAssessIsOpen(false);
        setDashAnaIsOpen(false);
        setDashUpIsOpen(false);
        setDashActIsOpen(false);
        setDashAnnIsOpen(true);
    }

    let dash_top_margin = height * 0.025;
    //console.log(top_margin);

    const scrollDashSection = (elemRef) => {
        document.getElementById("dashboard_L3_Main_Container").scrollTo({
            top: elemRef.current.offsetTop - dash_top_margin,
            behavior: "smooth"
        })

        if (elemRef === dashAttRef){
            showDashAtt();
        }
        else if (elemRef === dashAssessRef){
            showDashAssess();
        }
        else if (elemRef === dashAnaRef){
            showDashAna();
        }
        else if (elemRef === dashUpRef){
            showDashUp();
        }
        else if (elemRef === dashActRef){
            showDashAct();
        }
        else if (elemRef === dashAnnRef){
            showDashAnn();
        }
    }


//=======================================================================================================================
// ATTENDANCE MODULE
    // For opening the attendance module
    const openAttendance = () => {
        root.style.setProperty('--windowAttendance-L3-display', "block")
        root.style.setProperty('--windowDashboard-L3-display', "none")
        root.style.setProperty('--aboutModule-L1-display', "none")

        setAttendanceIsOpen(true);

        setDashboardIsOpen(false);
        setAnalyticsIsOpen(false);
        setAssessmentIsOpen(false);
        setAboutIsOpen(false);
        setCalendarIsOpen(false);
    }


//=======================================================================================================================
// ANALYTICS MODULE
    // For opening the analytics module
    const openAnalytics = () => {
        setAnalyticsIsOpen(true);

        setDashboardIsOpen(false);
        setAttendanceIsOpen(false);
        setAssessmentIsOpen(false);
        setAboutIsOpen(false);
        setCalendarIsOpen(false);
    }

//=======================================================================================================================
// ASSESSMENT MODULE
    // For opening the assessment module
    const openAssessment = () => {
        setAssessmentIsOpen(true);

        setAnalyticsIsOpen(false);
        setDashboardIsOpen(false);
        setAttendanceIsOpen(false);
        setAboutIsOpen(false);
        setCalendarIsOpen(false);
    }
    
//=======================================================================================================================
// CALENDAR MODULE
    const openCalendar = () => {
        setCalendarIsOpen(true);

        setAssessmentIsOpen(false);
        setAnalyticsIsOpen(false);
        setDashboardIsOpen(false);
        setAttendanceIsOpen(false);
        setAboutIsOpen(false);
    }

//=======================================================================================================================
// ABOUT MODULE
    const openAbout = () => {
        root.style.setProperty('--aboutModule-L1-display', "block")
        root.style.setProperty('--windowDashboard-L3-display', "none")
        root.style.setProperty('--windowAttendance-L3-display', "none")

        setAboutIsOpen(true);

        setAssessmentIsOpen(false);
        setAnalyticsIsOpen(false);
        setDashboardIsOpen(false);
        setAttendanceIsOpen(false);
        setCalendarIsOpen(false);
    }
//=======================================================================================================================
// LOGOUT
const { user } = useAuthContext();
const { logout } = useLogout();
const navigate = useNavigate()

const confirmLogout = () => {
    root.style.setProperty('--ConfirmLogout-Modal-Admin-PointerEvents', "block")
    root.style.setProperty('--ConfirmLogout-Modal-Admin-Opacity', "1")
}
const triggerLogout = () => {
    logout()
    navigate("/login")
    
    openDashboard();
    root.style.setProperty('--ConfirmLogout-Modal-Admin-PointerEvents', "none")
    root.style.setProperty('--ConfirmLogout-Modal-Admin-Opacity', "0")
}
const cancelLogout = () => {
    root.style.setProperty('--ConfirmLogout-Modal-Admin-PointerEvents', "none")
    root.style.setProperty('--ConfirmLogout-Modal-Admin-Opacity', "0")
}

//=======================================================================================================================
    
    return (
        <div>
            <div className="main_window_wrap l3_background">

                <div className="main_window_L1_sidebar">

                    <div className="main_window_L1_sidebar_LOGO_wrap">
                        <div className="main_window_L1_sidebar_LOGO">
                            <img className="main_window_L1_sidebar_LOGO_img" src={jilcf_logo} alt="school_logo" />
                            <span className="main_window_L1_sidebar_LOGO_label">JILCF SCMS</span>
                        </div>
                    </div>

                    <div className="main_window_L1_sidebar_inside_wrap">
                        <div 
                            className={"main_window_L1_sidebar_module_wrap " + (dashboardIsOpen ? "sidebar_wrap_active" : "")} 
                            onClick={openDashboard}>
                            <img className="main_window_L1_sidebar_module_icon" src={dashboard_icon} alt="Dashboard"></img>
                            <div className="main_window_L1_sidebar_module_label">Dashboard</div>
                        </div>
                        <div className={(dashboardIsOpen ? "sidebar_sub_wrap_active_L3" : "sidebar_sub_wrap_inactive")}>
                            <div 
                                className={"sidebar_sub_item sidebar_sub_item_L3 " + (dashAttIsOpen ? "sidebar_sub_item_active" : "")}
                                onClick={() => scrollDashSection(dashAttRef)}                                  
                                >Attendance Record
                            </div>
                            {/* <div 
                                className={"sidebar_sub_item sidebar_sub_item_L3 " + (dashUpIsOpen ? "sidebar_sub_item_active" : "")}
                                onClick={() => scrollDashSection(dashUpRef)}                                  
                                >Upcoming
                            </div> */}
                            {/* <div 
                                className={"sidebar_sub_item sidebar_sub_item_L3 " + (dashAssessIsOpen ? "sidebar_sub_item_active" : "")}
                                onClick={() => scrollDashSection(dashAssessRef)}
                                >Assessment Record
                            </div> */}
                            <div 
                                className={"sidebar_sub_item sidebar_sub_item_L3 " + (dashActIsOpen ? "sidebar_sub_item_active" : "")}
                                onClick={() => scrollDashSection(dashActRef)}
                                >Activities
                            </div>
                            <div 
                                className={"sidebar_sub_item sidebar_sub_item_L3 " + (dashAnaIsOpen ? "sidebar_sub_item_active" : "")}
                                onClick={() => scrollDashSection(dashAnaRef)}
                                >Analytics
                            </div>
                            <div 
                                className={"sidebar_sub_item sidebar_sub_item_L3 " + (dashAnnIsOpen ? "sidebar_sub_item_active" : "")}
                                onClick={() => scrollDashSection(dashAnnRef)}
                                >Announcements
                            </div>
                        </div>

                        <div 
                            className={"main_window_L1_sidebar_module_wrap " + (attendanceIsOpen ? "sidebar_wrap_active" : "")}
                            onClick={openAttendance}>
                            <img className="main_window_L1_sidebar_module_icon" src={attendance_icon} alt="Attendance"></img>
                            <div className="main_window_L1_sidebar_module_label">Attendance</div>
                        </div>

                        <div 
                            className={"main_window_L1_sidebar_module_wrap " + (assessmentIsOpen ? "sidebar_wrap_active" : "")}
                            onClick={openAssessment}>
                            <img className="main_window_L1_sidebar_module_icon" src={assessment_icon} alt="Assessment"></img>
                            <div className="main_window_L1_sidebar_module_label">Assessment</div>
                        </div>

                        <div className="sidebar_separator"></div>

                        <div 
                            className={"main_window_L1_sidebar_module_wrap " + (calendarIsOpen ? "sidebar_wrap_active" : "")}
                            onClick={openCalendar}>
                            <img className="main_window_L1_sidebar_module_icon" src={calendar_icon} alt="Calendar"></img>
                            <div className="main_window_L1_sidebar_module_label">Calendar</div>
                        </div>

                        <div 
                            className={"main_window_L1_sidebar_module_wrap " + (aboutIsOpen ? "sidebar_wrap_active" : "")}
                            onClick={openAbout}>
                            <img className="main_window_L1_sidebar_module_icon" src={about_icon} alt="About"></img>
                            <div className="main_window_L1_sidebar_module_label">About</div>
                        </div>

                    </div>

                    <Navbar 
                        confirmLogout={confirmLogout}/>
                </div>

                <div className="windowDashboard_L3_main_wrap">
                  <MainDashboardL3 
                    dashAttRef={dashAttRef}
                    dashAssessRef={dashAssessRef}
                    dashAnaRef={dashAnaRef}
                    dashUpRef={dashUpRef}
                    dashActRef={dashActRef}
                    dashAnnRef={dashAnnRef} />
                </div>
                <div className="windowAttendance_L3_main_wrap">
                  <WindowAttendanceL3 />
                </div>

                <div className="aboutModule_L1_main_wrap">
                    <AboutWindow />
                </div>

                <div className="confirmLogout_modal_wrap">
                    <div className="editAtt_Modal_Container">
                        <div className="editAtt_Modal_label">Are you sure you want<br></br>to Logout?</div>
                        <button className="editAtt_cancel_button" onClick={triggerLogout}>Yes</button>
                        <button className="editAtt_update_button" onClick={cancelLogout}>No</button>
                    </div>
                </div>
            </div>
        </div>
    )
}