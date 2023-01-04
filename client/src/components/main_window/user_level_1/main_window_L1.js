import React from "react";
import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

import { useAuthContext } from "../../../hooks/useAuthContext";
import { useLogout } from "../../../hooks/useLogout";

/**
 * import necessary scripts
 */
import Navbar from './navbar_L1'

// import Components
import MainDashboardL1 from '../../dashboard/dashboard_L1/main_Dashboard_L1'
import WindowAttendanceL1 from "../../window_attendance/window_attendance_L1";
import AdminModule from "../../admin_module/admin_module";
import useWindowDimensions from "../../dashboard/hooks/useWindowDimensions";
import CalendarModule from "../../calendar_module/calendar_module";
import AboutWindow from "../../about_module/about_module";

import AddScheduleModal from "../../calendar_module/calendar_add_schedule";
// import WindowAttendance from './../window_attendance/windowAttendance'

// import image
import jilcf_logo from "../../../images/jilcf_logo_1.png"
import admin_icon from "../../../images/supervisor_account_FILL0_wght400_GRAD0_opsz48.png"
import dashboard_icon from "../../../images/Dashboard_Icon.png"
import analytics_icon from "../../../images/analytics.png"
import attendance_icon from "../../../images/Attendance_Icon.png"
import camera_icon from "../../../images/Camera_Icon.png"
import about_icon from "../../../images/About_Icon.png"
import calendar_icon from "../../../images/Calendar_Icon.png"

/**
 * Styles
 */
import '../../../styles/mainWindow_styles.css'
import { Link } from "react-router-dom";

const sampleEvents = [
    { name: "Back to school", type: "random", date: new Date(2023, 1, 4) },
    { name: "Back to suffering", type: "random", date: new Date(2023, 1, 6) }
]

export default function Home_L1() {

    var root = document.querySelector(":root");
    const { height, width } = useWindowDimensions();
  
    const [dashboardIsOpen, setDashboardIsOpen] = useState(true);
    const [adminIsOpen, setAdminIsOpen] = useState(false);
    const [attendanceIsOpen, setAttendanceIsOpen] = useState(false);
    const [analyticsIsOpen, setAnalyticsIsOpen] = useState(false);
    const [cameraIsOpen, setCameraIsOpen] = useState(false);
    const [aboutIsOpen, setAboutIsOpen] = useState(false);
    const [calendarIsOpen, setCalendarIsOpen] = useState(false);

//=======================================================================================================================
// DASHBOARD
    // For opening the dashboard
    const openDashboard = () => {

        // window.history.pushState('new', 'title', 'user_dashboard');

        root.style.setProperty('--windowDashboard-L1-display', "block")
        root.style.setProperty('--adminModule_L1_display', "none")
        root.style.setProperty('--windowAttendance-L1-display', "none")
        root.style.setProperty('--aboutModule-L1-display', "none")
        root.style.setProperty('--calendar-module-display', "none")
        //root.style.setProperty('--display-b', "block")
        setDashboardIsOpen(true);

        setAttendanceIsOpen(false);
        setAdminIsOpen(false);
        setAnalyticsIsOpen(false);
        setCameraIsOpen(false);
        setCalendarIsOpen(false);
        setAboutIsOpen(false);
    }

    const[dashUpcomingIsOpen, setDashUpcomingIsOpen] = useState(true);
    const[dashAccountsIsOpen, setDashAccountsIsOpen] = useState(false);
    const[dashAnalyticsIsOpen, setDashAnalyticsIsOpen] = useState(false);

    const dashUpRef = useRef(null);
    const dashAccRef = useRef(null);
    const dashAnaRef = useRef(null);

    const showDashUpcoming = () => {
        setDashUpcomingIsOpen(true);
        setDashAccountsIsOpen(false);
        setDashAnalyticsIsOpen(false);
    }
    const showDashAccounts = () => {
        setDashUpcomingIsOpen(false);
        setDashAccountsIsOpen(true);
        setDashAnalyticsIsOpen(false);
    }
    const showDashAnalytics = () => {
        setDashUpcomingIsOpen(false);
        setDashAccountsIsOpen(false);
        setDashAnalyticsIsOpen(true);
    }

    let dash_top_margin = height * 0.025;
    //console.log(top_margin);

    const scrollDashSection = (elemRef) => {
        document.getElementById("dashboard_L1_Main_Container").scrollTo({
            top: elemRef.current.offsetTop - dash_top_margin,
            behavior: "smooth"
        })

        if (elemRef === dashUpRef){
            showDashUpcoming();
        }
        else if (elemRef === dashAccRef){
            showDashAccounts();
        }
        else if (elemRef === dashAnaRef){
            showDashAnalytics();
        }
    }

//=======================================================================================================================
// ADMIN MODULE
    // For opening the admin module
    const openAdminModule = () => {
        root.style.setProperty('--adminModule_L1_display', "block")
        root.style.setProperty('--windowDashboard-L1-display', "none")
        root.style.setProperty('--windowAttendance-L1-display', "none")
        root.style.setProperty('--aboutModule-L1-display', "none")
        root.style.setProperty('--calendar-module-display', "none")
        //root.style.setProperty('--adminModule-display-b', "block")

        setAdminIsOpen(true);

        setDashboardIsOpen(false);
        setAttendanceIsOpen(false);
        setAnalyticsIsOpen(false);
        setCameraIsOpen(false);
        setCalendarIsOpen(false);
        setAboutIsOpen(false);
    }

    const[adminAccIsOpen, setAdminAccIsOpen] = useState(true);
    const[adminSchedIsOpen, setAdminSchedIsOpen] = useState(false);
    const[adminAnnIsOpen, setAdminAnnIsOpen] = useState(false);

    const adminAccRef = useRef(null);
    const adminSchedRef = useRef(null);
    const adminAnnRef = useRef(null);

    const showAdminAcc = () => {
        setAdminAccIsOpen(true);
        setAdminSchedIsOpen(false);
        setAdminAnnIsOpen(false);
    }
    const showAdminSched = () => {
        setAdminAccIsOpen(false);
        setAdminSchedIsOpen(true);
        setAdminAnnIsOpen(false);
    }
    const showAdminAna = () => {
        setAdminAccIsOpen(false);
        setAdminSchedIsOpen(false);
        setAdminAnnIsOpen(true);
    }

    const scrollAdminSection = (elemRef) => {
        document.getElementById("adminModule_L1_Main_Container").scrollTo({
            top: elemRef.current.offsetTop - dash_top_margin,
            behavior: "smooth"
        })

        if (elemRef === adminAccRef){
            showAdminAcc();
        }
        else if (elemRef === adminSchedRef){
            showAdminSched();
        }
        else if (elemRef === adminAnnRef){
            showAdminAna();
        }
    }

//=======================================================================================================================
// ATTENDANCE MODULE
    // For opening the attendance module
    const openAttendance = () => {
        root.style.setProperty('--windowAttendance-L1-display', "block")
        root.style.setProperty('--adminModule_L1_display', "none")
        root.style.setProperty('--windowDashboard-L1-display', "none")
        root.style.setProperty('--aboutModule-L1-display', "none")
        root.style.setProperty('--calendar-module-display', "none")

        setAttendanceIsOpen(true);

        setDashboardIsOpen(false);
        setAdminIsOpen(false);
        setAnalyticsIsOpen(false);
        setCameraIsOpen(false);
        setCalendarIsOpen(false);
        setAboutIsOpen(false);
    }

//=======================================================================================================================
// ANALYTICS MODULE
    // For opening the analytics module
    const openAnalytics = () => {
        setAnalyticsIsOpen(true);

        setAdminIsOpen(false);
        setDashboardIsOpen(false);
        setAttendanceIsOpen(false);
    }

    const openCamera = () => {
        setCameraIsOpen(true);

        setAdminIsOpen(false);
        setDashboardIsOpen(false);
        setAttendanceIsOpen(false);
        setAnalyticsIsOpen(false);
        setCalendarIsOpen(false);
        setAboutIsOpen(false);
    }

    const openCalendar = () => {
        root.style.setProperty('--calendar-module-display', "block")
        root.style.setProperty('--windowAttendance-L1-display', "none")
        root.style.setProperty('--adminModule_L1_display', "none")
        root.style.setProperty('--windowDashboard-L1-display', "none")
        root.style.setProperty('--aboutModule-L1-display', "none")

        setCalendarIsOpen(true);

        setAdminIsOpen(false);
        setDashboardIsOpen(false);
        setAttendanceIsOpen(false);
        setAnalyticsIsOpen(false);
        setCameraIsOpen(false);
        setAboutIsOpen(false);
    }

    const openAbout = () => {
        root.style.setProperty('--aboutModule-L1-display', "block")
        root.style.setProperty('--windowAttendance-L1-display', "none")
        root.style.setProperty('--adminModule_L1_display', "none")
        root.style.setProperty('--windowDashboard-L1-display', "none")
        root.style.setProperty('--calendar-module-display', "none")

        setAboutIsOpen(true);

        setAdminIsOpen(false);
        setDashboardIsOpen(false);
        setAttendanceIsOpen(false);
        setAnalyticsIsOpen(false);
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

//=======================================================================================================================
    const [newEvent, setNewEvent] = useState({ name: "", type: "", date: ""})
    // const [allEvents, setAllEvents] = useState([]);
    const [allEvents, setAllEvents] = useState(sampleEvents);

    // useEffect(() => {
    //     const fetchEvent = async () => {
    //         const response = await fetch('http://localhost:5000/api/events/')
    //         const json = await response.json()

    //         if (response.ok){
    //             setAllEvents(json)
    //         }
    //     }
    //     fetchEvent()
    // })

    // useEffect(() => {
    //     console.log(allEvents);
    // })

    const [clickedDate, setClickedDate] = useState();

    const openAddEvent = (theStringDate, theDate) => {
        setClickedDate(theStringDate)
        setNewEvent({...newEvent, date: theDate})
        root.style.setProperty('--calendarAddSchedule_modal-PointerEvents', "all")
        root.style.setProperty('--calendarAddSchedule_modal-Opacity', "1")
    }

    const handleAddEvent = async (e) => {
        e.preventDefault()
        setAllEvents([...allEvents, newEvent])

        const response = await fetch('http://localhost:5000/api/events/add', {
            method: 'POST',
            body: JSON.stringify(newEvent),
            headers : {
                'Content-Type': 'application/json'
            }
        })
        const json = await response.json()
        
        if (response.ok) {
            setNewEvent({ name: "", type: "", date: ""})
        }

        root.style.setProperty('--calendarAddSchedule_modal-PointerEvents', "none")
        root.style.setProperty('--calendarAddSchedule_modal-Opacity', "0")
    }

//=======================================================================================================================

    return (
        <div>
            <div className="main_window_wrap l1_background">

                <div className="main_window_L1_sidebar">

                    
                    <div className="main_window_L1_sidebar_LOGO_wrap">
                        <div className="main_window_L1_sidebar_LOGO">
                            <img className="main_window_L1_sidebar_LOGO_img" src={jilcf_logo} alt="school_logo" />
                            {/* <Link to="/home/L1" className="main_window_L1_sidebar_LOGO_label"> */}
                                <span className="main_window_L1_sidebar_LOGO_label">JILCF SCMS</span>
                            {/* </Link> */}
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
                                className={"sidebar_sub_item " + (dashUpcomingIsOpen ? "sidebar_sub_item_active" : "")}
                                onClick={() => scrollDashSection(dashUpRef)}                                  
                                >Upcoming</div>
                            <div 
                                className={"sidebar_sub_item " + (dashAccountsIsOpen ? "sidebar_sub_item_active" : "")}
                                onClick={() => scrollDashSection(dashAccRef)}
                                >Accounts</div>
                            <div 
                                className={"sidebar_sub_item " + (dashAnalyticsIsOpen ? "sidebar_sub_item_active" : "")}
                                onClick={() => scrollDashSection(dashAnaRef)}
                                >Analytics</div>
                        </div>

                        <div 
                            className={"main_window_L1_sidebar_module_wrap " + (adminIsOpen ? "sidebar_wrap_active" : "")} 
                            onClick={openAdminModule}>
                            <img className="main_window_L1_sidebar_module_icon adminIcon" src={admin_icon} alt="Admin"></img>
                            <div className="main_window_L1_sidebar_module_label">Admin</div>
                        </div>
                        <div className={(adminIsOpen ? "sidebar_sub_wrap_active" : "sidebar_sub_wrap_inactive")}>
                            <div 
                                className={"sidebar_sub_item " + (adminAccIsOpen ? "sidebar_sub_item_active" : "")}
                                onClick={() => scrollAdminSection(adminAccRef)}                                  
                                >Accounts</div>
                            <div 
                                className={"sidebar_sub_item " + (adminSchedIsOpen? "sidebar_sub_item_active" : "")}
                                onClick={() => scrollAdminSection(adminSchedRef)}
                                >Schedules</div>
                            <div 
                                className={"sidebar_sub_item " + (adminAnnIsOpen ? "sidebar_sub_item_active" : "")}
                                onClick={() => scrollAdminSection(adminAnnRef)}
                                >Announcements</div>
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

                <div className="windowDashboard_L1_main_wrap">
                  <MainDashboardL1 
                  dashUpRef={dashUpRef}
                  dashAccRef={dashAccRef}
                  dashAnaRef={dashAnaRef}/>
                </div>

                <div className="windowAttendance_L1_main_wrap">
                  <WindowAttendanceL1 />
                </div>

                <div className="adminModule_L1_main_wrap">
                  <AdminModule 
                  adminAccRef={adminAccRef}
                  adminSchedRef={adminSchedRef}
                  adminAnnRef={adminAnnRef}/>
                </div>

                <div className="calendarModule_L1_main_wrap">
                    <CalendarModule 
                    allEvents={allEvents}
                    openAddEvent={openAddEvent}/>
                </div>

                <div className="calendarAddSchedule_modal_wrap">
                    <AddScheduleModal
                    newEvent={newEvent} 
                    setNewEvent={setNewEvent}
                    handleAddEvent={handleAddEvent}
                    clickedDate={clickedDate}/>
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