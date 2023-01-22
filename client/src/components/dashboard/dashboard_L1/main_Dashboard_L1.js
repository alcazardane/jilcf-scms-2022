import { useDrag } from '@use-gesture/react'
import { useSpring, animated } from 'react-spring'
import { useState, useEffect, useRef } from 'react'

import { useAuthContext } from '../../../hooks/useAuthContext'


//dashboard components
// import Calendar from "./calendar_L1"
import ScheduleDetails from './schedule_details_L1'
import AccountDetails from './accounts_details'
import AnalyticsDetails from './analytics_details'
import '../../../styles/Dashboard_Styles/mainDashboard_styles.css'


import useWindowDimensions from '../hooks/useWindowDimensions'

export default function MainDashboard_L1({dashUpRef, dashAccRef, dashAnaRef}) {

    var root = document.querySelector(":root");
    const { user } = useAuthContext()

    // const [adminID, setAdminID] = useState()
    // const [schedule, setSchedule] = useState([])

    // setAdminID("22-0000000")
    // useEffect(() =>{
    //     const fetchSchedule= async () => {
    //         const response = await fetch('http://localhost:5000/schedule/22-0000000')
    //         const json = await response.json()

    //         if (response.ok){
    //             setSchedule(json)
    //         }
    //     }
    //     fetchSchedule()
    // }, [])

    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const [schedule, setSchedule] = useState([])
    const [idNumber, setIdNumber] = useState(user.idNumber);
    const [classID, setClassID] = useState("ADMIN");
    const [weekday, setWeekday] = useState(weekdays[new Date().getDay()]);

    useEffect(() => {
        fetch(`http://localhost:5000/api/upcoming-schedules/admin-schedule/${classID}/${weekday}`)
          .then(res => res.json())
          .then(data => setSchedule(data))
          .catch(err => console.log(err));
      }, [classID,weekday]);


    // const sampleRef = useRef(null);
    
    // const scrollDashSection = (elemRef) => {
    //     window.scrollTo({
    //         top: elemRef.current.offsetTop,
    //         behavior: "smooth"
    //     })
    // }

    return (
    <>
        {/* <animated.div className="dashboard_L1_draggable_area"
        {...bindDashboardPos()} style={{
          x, y
        }} />
        <animated.div className="dashboard_L1_window" id="dashboard_L1_window"
        style={{
          x, y
        }}>
        <div className="dashboard_L1_window_topbar" id="dashboard_L1_window_topbar">Dashboard
            <div>
                <span id="dashboard_L1_minmax" className="material-symbols-outlined" onClick={minmaxDashboard}>web_asset</span>
                <span id="dashboard_L1_close" className="material-symbols-outlined" onClick={closeDashboard}>close</span>
            </div>
        </div> */}

        <div className="dashboard_L1_Main_Container" id="dashboard_L1_Main_Container">
            <div className="dashboard_L1_Top_wrap">
                <div className="dashboard_L1_Upcoming" ref={dashUpRef}>
                    <div className="dashboard_L1_Upcoming_label">
                        <span>SCHEDULE FOR THE DAY</span>
                        {/* <span className="view_calendar_L1" id="view_calendar_L1" >View Calendar &#10095;</span> */}
                        <span className="view_calendar_L1" id="view_calendar_L1" ></span>
                    </div>
                    <div className="dashboard_L1_Upcoming_scheds_wrap">
                        {schedule && schedule.map((schedules) => (
                        <ScheduleDetails key={schedules._id} schedules={schedules} />
                        ))}
                    </div>
                </div>
                
                <div className="dashboard_L1_Accounts" ref={dashAccRef}>
                    <AccountDetails />
                </div>         
            </div>

            <div className="dashboard_L1_Analytics" ref={dashAnaRef}>
                <AnalyticsDetails />
            </div>
        </div>

        {/* </animated.div> */}
    </>
    )
}