import React, {useEffect, useState, useRef} from 'react'

// import components
import NavbarViewDateTime from './Navbar_viewDateTime';
import CalendarDetails from '../../dashboard/dashboard_details/CalendarDetails';

// import images
import notification_icon from "../../../images/notifications_FILL1_wght400_GRAD0_opsz48.png"
import settings_icon from "../../../images/settings_FILL0_wght400_GRAD0_opsz48.png"
import power_icon from "../../../images/power_settings_new_FILL0_wght400_GRAD0_opsz48.png"
import calendar_icon from "../../../images/calendar_month_FILL0_wght400_GRAD0_opsz48.png"
import { Link } from 'react-router-dom';

const Navbar = () => {

    const [timeState, setTimeState] = useState();
    const [dateState, setDateState] = useState();

    useEffect(() => {
        setInterval(() =>{
            const date = new Date();
            setTimeState(date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'}));
            setDateState(date.toLocaleDateString([], {month: 'long', day: 'numeric', year: 'numeric'}));
        }, 1000)
    }, []);

    // For opening and closing Menu List
    const [menuIsOpen, setMenuIsOpen] = useState(false);
    const menuBtnRef = useRef();
    const menuListRef = useRef();

    // Use to close the Menu List if clicked outside from it
    useEffect(() => {
        const closeMenuList = (e) => {
            if(!menuBtnRef.current.contains(e.target) && !menuListRef.current.contains(e.target)){
                setMenuIsOpen(false);
            }
        };
        document.addEventListener("mousedown", closeMenuList);
        return () => {document.removeEventListener("mousedown", closeMenuList)};
    }, []);


    // For opening and closing the Navbar Calendar
    const [navCalendarIsOpen, setNavCalendarIsOpen] = useState(false);
    const navCalendarBtnRef = useRef();
    const navCalendarRef = useRef();

    useEffect(() => {
        const closeNavCalendar = (e) => {
            if(!navCalendarBtnRef.current.contains(e.target) && !navCalendarRef.current.contains(e.target)){
                setNavCalendarIsOpen(false);
            }
        };
        document.addEventListener("mousedown", closeNavCalendar);
        return () => {document.removeEventListener("mousedown", closeNavCalendar)};
    }, []);


  return (
    <>
    <div ref={menuListRef} className={"menulist " + (menuIsOpen ? "openMenuList" : "closeMenuList")}>
        <div className="menulist_item_wrap">
            <button className="menulist_item"></button>
            <span className="menulist_item_label">Camera</span>
        </div>
        <div className="menulist_item_wrap">
            <button className="menulist_item"></button>
            <span className="menulist_item_label">Calendar</span>
        </div>
        <div className="menulist_item_wrap">
            <button className="menulist_item"></button>
            <span className="menulist_item_label"><Link to = {"/home/notes"}>Notes</Link></span>
        </div>
        <div className="menulist_item_wrap">
            <button className="menulist_item"></button>
            <span className="menulist_item_label">About</span>
        </div>
        
        <div className="menulist_navbar">
            <div className="menulist_navbar_items_wrap">
                <span className="teacher_name">Dela Cruz, Juan</span>
                <div className="menulist_navbar_icons_wrap">
                    <img className="menulist_navbar_icons" src={notification_icon} alt="notification_icon" />
                    <img className="menulist_navbar_icons" src={settings_icon} alt="settings_icon" />
                    <img className="menulist_navbar_icons" src={power_icon} alt="power_icon" />
                </div>
            </div>
        </div>
    </div>
    <div className="main_Navbar">
        <button className="menu_btn" ref={menuBtnRef} onClick={() => setMenuIsOpen((menuIsOpen) => !menuIsOpen)}>MENU</button>

        <div className="navbar_notification">
            <div className="notif_wrap">
                <span className="navbar_notification_text">
                =-= Notification will display here =- 
                </span>
                <span className="navbar_notification_text_2">
                =-= Notification will display here =-
                </span>
            </div>
        </div>

        <div ref={navCalendarRef} className={"navbar_view_Calendar " + (navCalendarIsOpen ? "openNavCalendar" : "closeNavCalendar")}>
            <NavbarViewDateTime />
            <div className="navbar_datetime_separator"></div>
            <div className="navbar_calendar_wrap">
                <div className="navbar_calendar">
                    <CalendarDetails />
                </div>
            </div>
        </div>

        <div className="navbar_DateTime" ref={navCalendarBtnRef} onClick={() => setNavCalendarIsOpen((navCalendarIsOpen) => !navCalendarIsOpen)}>
            <div className="navbar_datetime_text">{timeState}</div>
            <div className="navbar_datetime_text">{dateState}</div>
            <img className="navbar_datetime_icon" src={calendar_icon} alt="datetime_icon"></img>
        </div>
    </div>
    </>
  )
}

export default Navbar