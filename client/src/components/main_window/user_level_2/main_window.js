import React from "react";
import { useState, useRef } from "react";

/**
 * import necessary scripts
 */
import Navbar from './Navbar'
import MainDashboard from '../../dashboard/main_Dashboard'
import WindowAttendance from '../../window_attendance/windowAttendance'
import WindowAssessment from '../../assessment/assessment_window'
import useWindowDimensions from "../../dashboard/hooks/useWindowDimensions";

// import images
import jilcf_logo from "../../../images/jilcf_logo_1.png"
import dashboard_icon from "../../../images/dashboard.png"
import analytics_icon from "../../../images/analytics.png"
import attendance_icon from "../../../images/attendance.png"

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


//=======================================================================================================================
// DASHBOARD
    // For opening the dashboard
    const openDashboard = () => {

        root.style.setProperty('--windowDashboard-display', "block")
        root.style.setProperty('--windowAttendance-display', "none")

        setDashboardIsOpen(true);

        setAttendanceIsOpen(false);
        setAnalyticsIsOpen(false)
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

        setAttendanceIsOpen(true);

        setDashboardIsOpen(false);
        setAnalyticsIsOpen(false)
    }


//=======================================================================================================================
// ANALYTICS MODULE
    // For opening the analytics module
    const openAnalytics = () => {
        setAnalyticsIsOpen(true);

        setDashboardIsOpen(false);
        setAttendanceIsOpen(false);
    }
    
    return (
        <div>
            <div className="main_window_wrap">
                {/* <div className="logo_wrap">
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
                        <button className="main_window_button" onClick={openAssessment}></button>
                        <div className="button_label">Assessment</div>
                    </div>
                    <div className="main_window_button_wrap_in">
                        <button className="main_window_button"></button>
                        <div className="button_label">Analytics</div>
                    </div> 
                </div> */}
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

                        {/* <div 
                            className={"main_window_L1_sidebar_module_wrap " + (analyticsIsOpen ? "sidebar_wrap_active" : "")}
                            onClick={openAnalytics}>
                            <img className="main_window_L1_sidebar_module_icon" src={analytics_icon} alt="Analytics"></img>
                            <div className="main_window_L1_sidebar_module_label">Analytics</div>
                        </div> */}

                    </div>
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
            </div>
            <Navbar />
        </div>
    )
}