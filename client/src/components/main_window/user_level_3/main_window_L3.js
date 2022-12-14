import React from "react";
import { useState, useRef } from "react";

/**
 * import necessary scripts
 */
import Navbar from './navbar_L3'

// IMPORT MAIN DASHBOARD AND ATTENDANCE MODULE FOR USER LEVEL 1 HERE
import MainDashboardL3 from '../../dashboard/dashboard_L3/main_Dasboard_L3'
import WindowAttendanceL3 from "../../window_attendance/window_attendance_L3";
import useWindowDimensions from "../../dashboard/hooks/useWindowDimensions";

// import image
import jilcf_logo from "../../../images/jilcf_logo_1.png"
import dashboard_icon from "../../../images/dashboard.png"
import analytics_icon from "../../../images/analytics.png"
import attendance_icon from "../../../images/attendance.png"

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

//=======================================================================================================================
// DASHBOARD
    // For opening the dashboard
    const openDashboard = () => {

        root.style.setProperty('--windowDashboard-L3-display', "block")
        root.style.setProperty('--windowAttendance-L3-display', "none")

        setDashboardIsOpen(true);

        setAttendanceIsOpen(false);
        setAnalyticsIsOpen(false)
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
        root.style.setProperty('--windowDashboard-L3-display', "none")
        root.style.setProperty('--windowAttendance-L3-display', "block")

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
            <div className="main_window_wrap l3_background">
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
                        <button className="main_window_button"></button>
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
                        <div className={(dashboardIsOpen ? "sidebar_sub_wrap_active_L3" : "sidebar_sub_wrap_inactive")}>
                            <div 
                                className={"sidebar_sub_item sidebar_sub_item_L3 " + (dashAttIsOpen ? "sidebar_sub_item_active" : "")}
                                onClick={() => scrollDashSection(dashAttRef)}                                  
                                >Attendance Record
                            </div>
                            <div 
                                className={"sidebar_sub_item sidebar_sub_item_L3 " + (dashUpIsOpen ? "sidebar_sub_item_active" : "")}
                                onClick={() => scrollDashSection(dashUpRef)}                                  
                                >Upcoming
                            </div>
                            <div 
                                className={"sidebar_sub_item sidebar_sub_item_L3 " + (dashAssessIsOpen ? "sidebar_sub_item_active" : "")}
                                onClick={() => scrollDashSection(dashAssessRef)}
                                >Assessment Record
                            </div>
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
                            className={"main_window_L1_sidebar_module_wrap " + (analyticsIsOpen ? "sidebar_wrap_active" : "")}
                            onClick={openAnalytics}>
                            <img className="main_window_L1_sidebar_module_icon" src={analytics_icon} alt="Analytics"></img>
                            <div className="main_window_L1_sidebar_module_label">Analytics</div>
                        </div>

                    </div>
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
            </div>
            <Navbar />
        </div>
    )
}