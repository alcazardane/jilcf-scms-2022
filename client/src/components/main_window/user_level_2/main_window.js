import React from "react";
import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

import { useAuthContext } from "../../../hooks/useAuthContext";
import { useLogout } from "../../../hooks/useLogout";

/**
 * import necessary scripts
 */
import Navbar from './Navbar'
import MainDashboard from '../../dashboard/main_Dashboard'
import WindowAttendance from '../../window_attendance/windowAttendance'
import WindowAssessment from '../../assessment/assessment_window'
import AboutWindow from "../../about_module/about_module";
import useWindowDimensions from "../../dashboard/hooks/useWindowDimensions";

// import images
import jilcf_logo from "../../../images/jilcf_logo_1.png"
import dashboard_icon from "../../../images/Dashboard_Icon.png"
import analytics_icon from "../../../images/analytics.png"
import attendance_icon from "../../../images/Attendance_Icon.png"
import assessment_icon from "../../../images/Assessment_Icon.png"
import camera_icon from "../../../images/Camera_Icon.png"
import about_icon from "../../../images/About_Icon.png"
import calendar_icon from "../../../images/Calendar_Icon.png"

/**
 * Styles
 */
import '../../../styles/mainWindow_styles.css'

export default function Home() {
    var root = document.querySelector(":root");
    const { height } = useWindowDimensions();

    const [dashboardIsOpen, setDashboardIsOpen] = useState(true);
    const [attendanceIsOpen, setAttendanceIsOpen] = useState(false);
    const [analyticsIsOpen, setAnalyticsIsOpen] = useState(false);
    const [assessmentIsOpen, setAssessmentIsOpen] = useState(false);
    const [cameraIsOpen, setCameraIsOpen] = useState(false);
    const [aboutIsOpen, setAboutIsOpen] = useState(false);
    const [calendarIsOpen, setCalendarIsOpen] = useState(false);


//=======================================================================================================================
// DASHBOARD
    // For opening the dashboard
    const openDashboard = () => {

        root.style.setProperty('--windowDashboard-display', "block")
        root.style.setProperty('--windowAttendance-display', "none")
        root.style.setProperty('--aboutModule-L1-display', "none")

        setDashboardIsOpen(true);

        setAttendanceIsOpen(false);
        setAnalyticsIsOpen(false);
        setAssessmentIsOpen(false);
        setCameraIsOpen(false);
        setCalendarIsOpen(false);
        setAboutIsOpen(false);
    }

    const[dashUpIsOpen, setDashUpIsOpen] = useState(true);
    const[dashNoticeIsOpen, setDashNoticeIsOpen] = useState(false);
    const[dashAttIsOpen, setDashAttIsOpen] = useState(false);

    const dashUpRef = useRef(null);
    const dashNoticeRef = useRef(null);
    const dashAttRef = useRef(null);

    const showDashUp = () => {
        setDashUpIsOpen(true);
        setDashNoticeIsOpen(false);
        setDashAttIsOpen(false);
    }
    const showDashNotice = () => {
        setDashUpIsOpen(false);
        setDashNoticeIsOpen(true);
        setDashAttIsOpen(false);
    }
    const showDashAtt= () => {
        setDashUpIsOpen(false);
        setDashNoticeIsOpen(false);
        setDashAttIsOpen(true);
    }

    let dash_top_margin = height * 0.025;
    //console.log(top_margin);

    const scrollDashSection = (elemRef) => {
        document.getElementById("dashbord_L2_main_container").scrollTo({
            top: elemRef.current.offsetTop - dash_top_margin,
            behavior: "smooth"
        })

        if (elemRef === dashUpRef){
            showDashUp();
        }
        else if (elemRef === dashNoticeRef){
            showDashNotice();
        }
        else if (elemRef === dashAttRef){
            showDashAtt();
        }
    }


//=======================================================================================================================
// ATTENDANCE MODULE
    // For opening the attendance module
    const openAttendance = () => {
        root.style.setProperty('--windowDashboard-display', "none")
        root.style.setProperty('--windowAttendance-display', "block")
        root.style.setProperty('--aboutModule-L1-display', "none")

        setAttendanceIsOpen(true);

        setDashboardIsOpen(false);
        setAnalyticsIsOpen(false);
        setAssessmentIsOpen(false);
        setCameraIsOpen(false);
        setCalendarIsOpen(false);
        setAboutIsOpen(false);
    }


//=======================================================================================================================
// ANALYTICS MODULE
    // For opening the analytics module
    const openAnalytics = () => {
        setAnalyticsIsOpen(true);

        setDashboardIsOpen(false);
        setAttendanceIsOpen(false);
        setAssessmentIsOpen(false);
        setCameraIsOpen(false);
        setCalendarIsOpen(false);
        setAboutIsOpen(false);
    }

//=======================================================================================================================
// ANALYTICS MODULE
    // For opening the analytics module
    const openAssessment = () => {
        setAssessmentIsOpen(true);

        setAnalyticsIsOpen(false);
        setDashboardIsOpen(false);
        setAttendanceIsOpen(false);
        setCameraIsOpen(false);
        setCalendarIsOpen(false);
        setAboutIsOpen(false);
    }

    const openCamera = () => {
        setCameraIsOpen(true);

        setDashboardIsOpen(false);
        setAttendanceIsOpen(false);
        setAnalyticsIsOpen(false);
        setAssessmentIsOpen(false);
        setCalendarIsOpen(false);
        setAboutIsOpen(false);
    }

    const openCalendar = () => {
        setCalendarIsOpen(true);

        setDashboardIsOpen(false);
        setAttendanceIsOpen(false);
        setAnalyticsIsOpen(false);
        setAssessmentIsOpen(false);
        setCameraIsOpen(false);
        setAboutIsOpen(false);
    }

    const openAbout = () => {
        root.style.setProperty('--aboutModule-L1-display', "block")
        root.style.setProperty('--windowDashboard-display', "none")
        root.style.setProperty('--windowAttendance-display', "none")

        setAboutIsOpen(true);

        setDashboardIsOpen(false);
        setAttendanceIsOpen(false);
        setAnalyticsIsOpen(false);
        setAssessmentIsOpen(false);
        setCalendarIsOpen(false);
        setCameraIsOpen(false);
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
    
    return (
        <div>
            <div className="main_window_wrap">

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
                        <div className={(dashboardIsOpen ? "sidebar_sub_wrap_active" : "sidebar_sub_wrap_inactive")}>
                            <div 
                                className={"sidebar_sub_item " + (dashUpIsOpen ? "sidebar_sub_item_active" : "")}
                                onClick={() => scrollDashSection(dashUpRef)}                                  
                                >Upcoming
                            </div>
                            <div 
                                className={"sidebar_sub_item " + (dashNoticeIsOpen ? "sidebar_sub_item_active" : "")}
                                onClick={() => scrollDashSection(dashNoticeRef)}                                  
                                >Red/Yellow Notice
                            </div>
                            <div 
                                className={"sidebar_sub_item " + (dashAttIsOpen ? "sidebar_sub_item_active" : "")}
                                onClick={() => scrollDashSection(dashAttRef)}
                                >Attendence per Classroom
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
                            className={"main_window_L1_sidebar_module_wrap " + (cameraIsOpen ? "sidebar_wrap_active" : "")}
                            onClick={openCamera}>
                            <img className="main_window_L1_sidebar_module_icon" src={camera_icon} alt="Camera"></img>
                            <div className="main_window_L1_sidebar_module_label">Camera</div>
                        </div>

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

                <div className="windowDashboard_main_wrap">
                  <MainDashboard
                    dashUpRef={dashUpRef} 
                    dashNoticeRef={dashNoticeRef}
                    dashAttRef={dashAttRef} />
                </div>
                <div className="windowAttendance_main_wrap">
                  <WindowAttendance />
                </div>
                {/* <div className="windowAssessment_main_wrap">
                  <WindowAssessment />
                </div> */}

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