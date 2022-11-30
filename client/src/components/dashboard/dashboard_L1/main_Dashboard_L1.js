import { useDrag } from '@use-gesture/react'
import { useSpring, animated } from 'react-spring'
import { useState, useEffect } from 'react'


//dashboard components
// import Calendar from "./calendar_L1"
import ScheduleDetails from './schedule_details_L1'
import AccountDetails from './accounts_details'
import AnalyticsDetails from './analytics_details'
import '../../../styles/Dashboard_Styles/mainDashboard_styles.css'


import useWindowDimensions from '../hooks/useWindowDimensions'

export default function MainDashboard_L1() {

    var root = document.querySelector(":root");

    // For window snapping
    const { height, width } = useWindowDimensions();
    var rightBound = width - (width * 0.60) - 38 + 4;
    var bottomBound = height - (height * 0.70) - 18 - 50 + 4;
    var leftBound = 30;
    var topBound = 15;

    // Get the x and y values to use it for maximizing the window
    var xVal = 0;
    var yVal = 0;

    // For Dragging
    const [{ x, y }, dashboardPos] = useSpring(() => ({ x: 0, y: 0 }));
    const bindDashboardPos = useDrag((state) => {
        xVal = state.offset[0];
        yVal = state.offset[1];
        dashboardPos.set({
            x: xVal,
            y: yVal
        });
        // console.log("x: " + xVal + ", y: " + yVal);
    }, {
        from: () => {
            return [x.get(), y.get()];
        },
        bounds: () => {
            return {left: -leftBound, right: rightBound, top: -topBound, bottom: bottomBound};
        },
    });


    // For minimize and maximize button
    const [dashboardIsMinimized,  setDashboardIsMininimized] = useState(true);
    const minmaxDashboard = () => {

      if(dashboardIsMinimized === true){

        root.style.setProperty('--dashboard-L1-window-width', "calc(100% - 4px)")
        root.style.setProperty('--dashboard-L1-window-height', "calc(100% - 49px)")

        root.style.setProperty('--border-radius', "0")
        root.style.setProperty('--border-radius-b', "0")

        root.style.setProperty('--top', `${-yVal}px`)
        root.style.setProperty('--left', `${-xVal}px`)

        root.style.setProperty('--display-b', "none")

          dashboardPos.set({
            x: xVal,
            y: yVal
          });

          setDashboardIsMininimized(false)
      }
      else{

        root.style.setProperty('--dashboard-L1-window-width', "60%")
        root.style.setProperty('--dashboard-L1-window-height', "70%")

        root.style.setProperty('--border-radius', "7px")
        root.style.setProperty('--border-radius-b', "7px 7px 0 0")

        root.style.setProperty('--top', "15px")
        root.style.setProperty('--left', "30px")

        root.style.setProperty('--display-b', "block")

          setDashboardIsMininimized(true)
      }
    }

    // For close or exit button
    const closeDashboard = () => {
      root.style.setProperty('--dashboard-L1-window-width', "60%")
      root.style.setProperty('--dashboard-L1-window-height', "70%")

      root.style.setProperty('--windowDashboard-L1-display', "none")
      root.style.setProperty('--display-b', "none")

      root.style.setProperty('--border-radius', "7px")
      root.style.setProperty('--border-radius-b', "7px 7px 0 0")

      root.style.setProperty('--top', "15px")
      root.style.setProperty('--left', "30px")

      setDashboardIsMininimized(true)
    }

    // const [adminID, setAdminID] = useState()
    const [schedule, setSchedule] = useState([])

    // setAdminID("22-0000000")
    useEffect(() =>{
        const fetchSchedule= async () => {
            const response = await fetch('http://localhost:5000/schedule/22-0000000')
            const json = await response.json()

            if (response.ok){
                setSchedule(json)
            }
        }
        fetchSchedule()
    }, [])


    return (
    <>
        <animated.div className="dashboard_L1_draggable_area"
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
        </div>

        <div className="dashboard_L1_Main_Container">

            <div className="dashboard_L1_Top_wrap">
                <div className="dashboard_L1_Upcoming">
                    <div className="dashboard_L1_Upcoming_label">
                        <span>UPCOMING</span>
                        <span className="view_calendar_L1" id="view_calendar_L1" >View Calendar &#10095;</span>
                    </div>
                    <div className="dashboard_L1_Upcoming_scheds_wrap">
                        {schedule && schedule.map((schedules) => (
                        <ScheduleDetails key={schedules._id} schedules={schedules} />
                        ))}
                    </div>
                </div>
                
                <div className="dashboard_L1_Accounts">
                    <AccountDetails />
                </div>         
            </div>

            <div className="dashboard_L1_Analytics">
                <AnalyticsDetails />
            </div>
        </div>

        </animated.div>
    </>
    )
}