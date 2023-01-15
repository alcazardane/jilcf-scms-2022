// IGNACIO
/**
 * MODULES (display depends on the user level)
 * SUB MODULES
 * User Name
 * Logout
 * 
 * IF L1:
 *  DASHBOARD, ADMIN, ATTENDANCE, CALENDAR, ABOUT, USERNAME, LOGOUT
 * IF L2:
 *  DASHBOARD, ATTENDANCE, ASSESSMENT, CAMERA, CALENDAR, ABOUT, USERNAME, LOGOUT
 * IF L3:
 *  DASHBOARD, ATTENDANCE, ASSESSMENT, CALENDAR, ABOUT, USERNAME, LOGOUT
 */

import { useState, useRef} from 'react'
import { useNavigate, Navigate, Link } from 'react-router-dom'
import { useLogout } from '../../hooks/useLogout'
import useWindowDimensions from '../dashboard/hooks/useWindowDimensions'

import '../../styles/mainWindow_styles.css'

// import image
import jilcf_logo from "../../images/jilcf_logo_1.png"
import admin_icon from "../../images/supervisor_account_FILL0_wght400_GRAD0_opsz48.png"
import dashboard_icon from "../../images/Dashboard_Icon.png"
import attendance_icon from "../../images/Attendance_Icon.png"
import analytics_icon from "../../images/Analytics_Icon.png"
import assessment_icon from "../../images/Assessment_Icon.png"
import camera_icon from "../../images/Camera_Icon.png"
import about_icon from "../../images/About_Icon.png"
import calendar_icon from "../../images/Calendar_Icon.png"
import logout_icon from "../../images/logout_FILL0_wght400_GRAD0_opsz48.png"
import notification_icon from "../../images/notifications_FILL1_wght400_GRAD0_opsz48.png"

import NotificationPreview from '../notification_module/notification_preview_module'


// import UserAdminModule from '../ADMIN/userAdminModule'
// import UserAboutModule from '../about_module/userAboutModule'


const Sidebar = ({ user,  
    adminIsOpen,
    dashboardIsOpen,
    attendanceIsOpen,
    assessmentIsOpen,
    analyticsIsOpen,
    cameraIsOpen,
    aboutIsOpen,
    calendarIsOpen,
    adminAccRef,
    adminSchedRef,
    adminAnnRef,
    dashUpRef,
    dashAccRef,
    dashAnaRef,
    dashNoticeRef,
    dashAttRef,
    dashAssessRef,
    dashActRef,
    dashAnnRef,
    notifIsOpen }) => {

    var root = document.querySelector(":root");
    const { height, width } = useWindowDimensions();

//=======================================================================================================================
// DASHBOARD

    const[dashUpcomingIsOpen, setDashUpcomingIsOpen] = useState(true);
    const[dashAccountsIsOpen, setDashAccountsIsOpen] = useState(false);
    const[dashAnalyticsIsOpen, setDashAnalyticsIsOpen] = useState(false);

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

    const[dashUpIsOpen, setDashUpIsOpen] = useState(true);
    const[dashNoticeIsOpen, setDashNoticeIsOpen] = useState(false);
    const[dashAttIsOpen, setDashAttIsOpen] = useState(false);

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
    const showDashAtt2= () => {
        setDashUpIsOpen(false);
        setDashNoticeIsOpen(false);
        setDashAttIsOpen(true);
    }

    const scrollDashSection2 = (elemRef) => {
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
            showDashAtt2();
        }
    }

    const[dashAttIsOpen3, setDashAttIsOpen3] = useState(true);
    const[dashAssessIsOpen, setDashAssessIsOpen] = useState(false);
    const[dashAnaIsOpen, setDashAnaIsOpen] = useState(false);
    const[dashUpIsOpen3, setDashUpIsOpen3] = useState(false);
    const[dashActIsOpen, setDashActIsOpen] = useState(false);
    const[dashAnnIsOpen, setDashAnnIsOpen] = useState(false);

    const showDashAtt = () => {
        setDashAttIsOpen3(true);
        setDashAssessIsOpen(false);
        setDashAnaIsOpen(false);
        setDashUpIsOpen3(false);
        setDashActIsOpen(false);
        setDashAnnIsOpen(false);
    }
    const showDashAssess = () => {
        setDashAttIsOpen3(false);
        setDashAssessIsOpen(true);
        setDashAnaIsOpen(false);
        setDashUpIsOpen3(false);
        setDashActIsOpen(false);
        setDashAnnIsOpen(false);
    }
    const showDashAna= () => {
        setDashAttIsOpen3(false);
        setDashAssessIsOpen(false);
        setDashAnaIsOpen(true);
        setDashUpIsOpen3(false);
        setDashActIsOpen(false);
        setDashAnnIsOpen(false);
    }
    const showDashUp3= () => {
        setDashAttIsOpen3(false);
        setDashAssessIsOpen(false);
        setDashAnaIsOpen(false);
        setDashUpIsOpen3(true);
        setDashActIsOpen(false);
        setDashAnnIsOpen(false);
    }
    const showDashAct= () => {
        setDashAttIsOpen3(false);
        setDashAssessIsOpen(false);
        setDashAnaIsOpen(false);
        setDashUpIsOpen3(false);
        setDashActIsOpen(true);
        setDashAnnIsOpen(false);
    }
    const showDashAnn= () => {
        setDashAttIsOpen3(false);
        setDashAssessIsOpen(false);
        setDashAnaIsOpen(false);
        setDashUpIsOpen3(false);
        setDashActIsOpen(false);
        setDashAnnIsOpen(true);
    }

    const scrollDashSection3 = (elemRef) => {
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
            showDashUp3();
        }
        else if (elemRef === dashActRef){
            showDashAct();
        }
        else if (elemRef === dashAnnRef){
            showDashAnn();
        }
    }

//=======================================================================================================================
// ADMIN MODULE

    const[adminAccIsOpen, setAdminAccIsOpen] = useState(true);
    const[adminSchedIsOpen, setAdminSchedIsOpen] = useState(false);
    const[adminAnnIsOpen, setAdminAnnIsOpen] = useState(false);

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

    const getMiddleName = (initial) => {
        if(!initial){
          return
        }
        else{
          return initial.substring(0, 1)
        }
    }

    const getLevelString = (level) => {
        if (level === "1") {
          return 'Admin';
        } else if (level === "2") {
          return 'Teacher';
        } else if (level === "3") {
          return 'Student';
        }
        return 'Unknown';
    };

//=======================================================================================================================
// LOGOUT
    const { logout } = useLogout();
    const navigate = useNavigate()

    const confirmLogout = () => {
        root.style.setProperty('--ConfirmLogout-Modal-Admin-PointerEvents', "block")
        root.style.setProperty('--ConfirmLogout-Modal-Admin-Opacity', "1")
    }
    const triggerLogout = () => {
        logout()
        navigate("/login")

        root.style.setProperty('--ConfirmLogout-Modal-Admin-PointerEvents', "none")
        root.style.setProperty('--ConfirmLogout-Modal-Admin-Opacity', "0")
    }
    const cancelLogout = () => {
        root.style.setProperty('--ConfirmLogout-Modal-Admin-PointerEvents', "none")
        root.style.setProperty('--ConfirmLogout-Modal-Admin-Opacity', "0")
    }

//=======================================================================================================================
// NOTIFICATION
    const [notifClicked, setNotifCliked] = useState(false);
    const previewNotif = () => {
        if (!notifClicked || notifIsOpen){
            setNotifCliked(true)
            root.style.setProperty('--notification_preview-display', "block")
        }
        if (notifClicked){
            root.style.setProperty('--notification_preview-display', "none")
            setNotifCliked(false)
        } 
    }


    let adminModule;
    let userDashboard;
    let userAttendanceModule;
    let userCalendarModule;
    let userAboutModule;
    let userAssessmentModule;
    let userCameraModule;
    let userAnalyticsModule;

    if (user.level === '1'){
        adminModule = 
            <>
                <Link to="/home/L1/admin_module" style={{ textDecoration: 'none' }}>
                    <div 
                        className={"main_window_L1_sidebar_module_wrap " + (adminIsOpen ? "sidebar_wrap_active" : "")}>
                        <img className="main_window_L1_sidebar_module_icon adminIcon" src={admin_icon} alt="Admin"></img>
                        <div className="main_window_L1_sidebar_module_label">Admin</div>
                    </div>
                </Link>
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
            </>

        userDashboard = 
            <>
                <Link to="/home/L1/user_dashboard" style={{ textDecoration: 'none' }}>
                    <div 
                        className={"main_window_L1_sidebar_module_wrap " + (dashboardIsOpen ? "sidebar_wrap_active" : "")}>
                        <img className="main_window_L1_sidebar_module_icon" src={dashboard_icon} alt="Dashboard"></img>
                        <div className="main_window_L1_sidebar_module_label">Dashboard</div>
                    </div>
                </Link>
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
            </>
        
        userAttendanceModule = 
            <Link to="/home/L1/attendance" style={{ textDecoration: 'none' }}>
                <div 
                    className={"main_window_L1_sidebar_module_wrap " + (attendanceIsOpen ? "sidebar_wrap_active" : "")}>
                    <img className="main_window_L1_sidebar_module_icon" src={attendance_icon} alt="Attendance"></img>
                    <div className="main_window_L1_sidebar_module_label">Attendance</div>
                </div>
            </Link>

        userCalendarModule =
            <Link to="/home/L1/calendar" style={{ textDecoration: 'none' }}>
                <div 
                    className={"main_window_L1_sidebar_module_wrap " + (calendarIsOpen ? "sidebar_wrap_active" : "")}>
                    <img className="main_window_L1_sidebar_module_icon" src={calendar_icon} alt="Calendar"></img>
                    <div className="main_window_L1_sidebar_module_label">Calendar</div>
                </div>
            </Link>

        userAboutModule = 
            <Link to="/home/L1/about" style={{ textDecoration: 'none' }}>
                <div 
                    className={"main_window_L1_sidebar_module_wrap " + (aboutIsOpen ? "sidebar_wrap_active" : "")}>
                    <img className="main_window_L1_sidebar_module_icon" src={about_icon} alt="About"></img>
                    <div className="main_window_L1_sidebar_module_label">About</div>
                </div> 
            </Link>
    }
    else if (user.level === '2'){
        userDashboard = 
            <>
                <Link to="/home/L2/user_dashboard" style={{ textDecoration: 'none' }}>
                    <div 
                        className={"main_window_L1_sidebar_module_wrap " + (dashboardIsOpen ? "sidebar_wrap_active" : "")}>
                        <img className="main_window_L1_sidebar_module_icon" src={dashboard_icon} alt="Dashboard"></img>
                        <div className="main_window_L1_sidebar_module_label">Dashboard</div>
                    </div>
                </Link>
                <div className={(dashboardIsOpen ? "sidebar_sub_wrap_active" : "sidebar_sub_wrap_inactive")}>
                    <div 
                        className={"sidebar_sub_item " + (dashUpIsOpen ? "sidebar_sub_item_active" : "")}
                        onClick={() => scrollDashSection2(dashUpRef)}                                  
                        >Upcoming
                    </div>
                    <div 
                        className={"sidebar_sub_item " + (dashNoticeIsOpen ? "sidebar_sub_item_active" : "")}
                        onClick={() => scrollDashSection2(dashNoticeRef)}                                  
                        >Red/Yellow Notice
                    </div>
                    <div 
                        className={"sidebar_sub_item " + (dashAttIsOpen ? "sidebar_sub_item_active" : "")}
                        onClick={() => scrollDashSection2(dashAttRef)}
                        >Attendence per Classroom
                    </div>
                </div>
            </>

        userAttendanceModule = 
            <Link to="/home/L2/attendance" style={{ textDecoration: 'none' }}>
                <div 
                    className={"main_window_L1_sidebar_module_wrap " + (attendanceIsOpen ? "sidebar_wrap_active" : "")}>
                    <img className="main_window_L1_sidebar_module_icon" src={attendance_icon} alt="Attendance"></img>
                    <div className="main_window_L1_sidebar_module_label">Attendance</div>
                </div>
            </Link>

        userAssessmentModule = 
            <Link to="/home/L2/assessment" style={{ textDecoration: 'none' }}>
                <div 
                    className={"main_window_L1_sidebar_module_wrap " + (assessmentIsOpen ? "sidebar_wrap_active" : "")}>
                    <img className="main_window_L1_sidebar_module_icon" src={assessment_icon} alt="Assessment"></img>
                    <div className="main_window_L1_sidebar_module_label">Assessment</div>
                </div>
            </Link>

        userAnalyticsModule = 
            <Link to="/home/L2/analytics" style={{ textDecoration: 'none' }}>
                <div 
                    className={"main_window_L1_sidebar_module_wrap " + (analyticsIsOpen ? "sidebar_wrap_active" : "")}>
                    <img className="main_window_L1_sidebar_module_icon" src={analytics_icon} alt="Assessment"></img>
                    <div className="main_window_L1_sidebar_module_label">Analytics</div>
                </div>
            </Link>

        userCameraModule = 
            <Link to="/home/L2/camera" style={{ textDecoration: 'none' }}>
                <div 
                    className={"main_window_L1_sidebar_module_wrap " + (cameraIsOpen ? "sidebar_wrap_active" : "")}>
                    <img className="main_window_L1_sidebar_module_icon" src={camera_icon} alt="Camera"></img>
                    <div className="main_window_L1_sidebar_module_label">Camera</div>
                </div>
            </Link>
        
        userCalendarModule =
            <Link to="/home/L2/calendar" style={{ textDecoration: 'none' }}>
                <div 
                    className={"main_window_L1_sidebar_module_wrap " + (calendarIsOpen ? "sidebar_wrap_active" : "")}>
                    <img className="main_window_L1_sidebar_module_icon" src={calendar_icon} alt="Calendar"></img>
                    <div className="main_window_L1_sidebar_module_label">Calendar</div>
                </div>
            </Link>
        
        userAboutModule = 
            <Link to="/home/L2/about" style={{ textDecoration: 'none' }}>
                <div 
                    className={"main_window_L1_sidebar_module_wrap " + (aboutIsOpen ? "sidebar_wrap_active" : "")}>
                    <img className="main_window_L1_sidebar_module_icon" src={about_icon} alt="About"></img>
                    <div className="main_window_L1_sidebar_module_label">About</div>
                </div> 
            </Link>
    }
    else if (user.level === '3'){
        userDashboard = 
            <>
                <Link to="/home/L3/user_dashboard" style={{ textDecoration: 'none' }}>
                    <div 
                        className={"main_window_L1_sidebar_module_wrap " + (dashboardIsOpen ? "sidebar_wrap_active" : "")}>
                        <img className="main_window_L1_sidebar_module_icon" src={dashboard_icon} alt="Dashboard"></img>
                        <div className="main_window_L1_sidebar_module_label">Dashboard</div>
                    </div>
                </Link>
                <div className={(dashboardIsOpen ? "sidebar_sub_wrap_active_L3" : "sidebar_sub_wrap_inactive")}>
                    <div 
                        className={"sidebar_sub_item sidebar_sub_item_L3 " + (dashAttIsOpen3 ? "sidebar_sub_item_active" : "")}
                        onClick={() => scrollDashSection3(dashAttRef)}                                  
                        >Attendance Record
                    </div>
                    <div 
                        className={"sidebar_sub_item sidebar_sub_item_L3 " + (dashUpIsOpen3 ? "sidebar_sub_item_active" : "")}
                        onClick={() => scrollDashSection3(dashUpRef)}                                  
                        >Upcoming
                    </div>
                    <div 
                        className={"sidebar_sub_item sidebar_sub_item_L3 " + (dashAssessIsOpen ? "sidebar_sub_item_active" : "")}
                        onClick={() => scrollDashSection3(dashAssessRef)}
                        >Assessment Record
                    </div>
                    <div 
                        className={"sidebar_sub_item sidebar_sub_item_L3 " + (dashActIsOpen ? "sidebar_sub_item_active" : "")}
                        onClick={() => scrollDashSection3(dashActRef)}
                        >Activities
                    </div>
                    <div 
                        className={"sidebar_sub_item sidebar_sub_item_L3 " + (dashAnaIsOpen ? "sidebar_sub_item_active" : "")}
                        onClick={() => scrollDashSection3(dashAnaRef)}
                        >Analytics
                    </div>
                    <div 
                        className={"sidebar_sub_item sidebar_sub_item_L3 " + (dashAnnIsOpen ? "sidebar_sub_item_active" : "")}
                        onClick={() => scrollDashSection3(dashAnnRef)}
                        >Announcements
                    </div>
                </div>
            </>

        userAttendanceModule = 
            <Link to="/home/L3/attendance" style={{ textDecoration: 'none' }}>
                <div 
                    className={"main_window_L1_sidebar_module_wrap " + (attendanceIsOpen ? "sidebar_wrap_active" : "")}>
                    <img className="main_window_L1_sidebar_module_icon" src={attendance_icon} alt="Attendance"></img>
                    <div className="main_window_L1_sidebar_module_label">Attendance</div>
                </div>
            </Link>

        userAssessmentModule = 
            <Link to="/home/L3/assessment" style={{ textDecoration: 'none' }}>
                <div 
                    className={"main_window_L1_sidebar_module_wrap " + (assessmentIsOpen ? "sidebar_wrap_active" : "")}>
                    <img className="main_window_L1_sidebar_module_icon" src={assessment_icon} alt="Assessment"></img>
                    <div className="main_window_L1_sidebar_module_label">Assessment</div>
                </div>
            </Link>

        userCalendarModule =
            <Link to="/home/L1/calendar" style={{ textDecoration: 'none' }}>
                <div 
                    className={"main_window_L1_sidebar_module_wrap " + (calendarIsOpen ? "sidebar_wrap_active" : "")}>
                    <img className="main_window_L1_sidebar_module_icon" src={calendar_icon} alt="Calendar"></img>
                    <div className="main_window_L1_sidebar_module_label">Calendar</div>
                </div>
            </Link>

        userAboutModule = 
            <Link to="/home/L3/about" style={{ textDecoration: 'none' }}>
                <div 
                    className={"main_window_L1_sidebar_module_wrap " + (aboutIsOpen ? "sidebar_wrap_active" : "")}>
                    <img className="main_window_L1_sidebar_module_icon" src={about_icon} alt="About"></img>
                    <div className="main_window_L1_sidebar_module_label">About</div>
                </div> 
            </Link>
    }
    else{
        return
    }

    return (
            <>
                <div className="main_window_L1_sidebar">   
                    <div className="main_window_L1_sidebar_LOGO_wrap">
                        <div className="main_window_L1_sidebar_LOGO">
                            <img className="main_window_L1_sidebar_LOGO_img" src={jilcf_logo} alt="school_logo" />
                                <span className="main_window_L1_sidebar_LOGO_label">JILCF SCMS</span>
                        </div>
                    </div>

                    <div className="main_window_L1_sidebar_inside_wrap">
                        {userDashboard}                          

                        {adminModule}

                        {userAttendanceModule}

                        {userAssessmentModule}

                        {userAnalyticsModule}

                        <div className="sidebar_separator"></div>

                        {userCameraModule}

                        {userCalendarModule}

                        {userAboutModule}              
                    </div>

                    <div className="sidebar_Navbar">
                        <div className="sidebar_Navbar_sub_wrap">
                            <div className="sidebar_Navbar_name_wrap">
                                <div className="sidebar_Navbar_username">{user.lname + ", " + user.fname + " " + getMiddleName(user.mname) + "."}</div>
                                <div className="sidebar_Navbar_userPosition">{getLevelString(user.level)}</div>
                            </div>
                            <div className="sidebar_Navbar_name_wrap_2">
                                <img 
                                    className="sidebar_Navbar_icons" 
                                    onClick={ previewNotif } 
                                    src={notification_icon} 
                                    alt="notification_icon" />

                                <img 
                                    className="sidebar_Navbar_icons" 
                                    onClick={ confirmLogout } 
                                    src={logout_icon} 
                                    alt="logout_icon" />
                            </div>
                        </div>
                    </div>

                </div>

                <div className="confirmLogout_modal_wrap">
                    <div className="editAtt_Modal_Container">
                        <div className="editAtt_Modal_label">Are you sure you want<br></br>to Logout?</div>
                        <button className="editAtt_cancel_button" onClick={triggerLogout}>Yes</button>
                        <button className="editAtt_update_button" onClick={cancelLogout}>No</button>
                    </div>
                </div>

                <div className="notification_preview_container">
                    <NotificationPreview />
                </div>
            </>
        )
    }
  
  export default Sidebar