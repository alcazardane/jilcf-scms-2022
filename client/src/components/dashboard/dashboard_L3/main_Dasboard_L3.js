import { useDrag } from '@use-gesture/react'
import { useSpring, animated } from 'react-spring'
import { useState, useEffect, useRef } from 'react'


//dashboard components
import AssessmentDetails from './assessment_details_L3'
import AttendanceDetails from './attendance_details_L3'
import ActivityDetails from './activities_details_L3'
import AnnouncementDetails from './announcement_details_L3'
import UpcomingDetails from './upcoming_details_L3'
import '../../../styles/Dashboard_Styles/mainDashboard_styles.css'


import useWindowDimensions from '../hooks/useWindowDimensions'

export default function MainDashboard_L3({dashAttRef, dashAssessRef, dashAnaRef, dashUpRef, dashActRef, dashAnnRef}) {

    var root = document.querySelector(":root");

    // For window snapping
    const { height, width } = useWindowDimensions();
    var rightBound = width - (width * 0.50) - 38 + 4;
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

      root.style.setProperty('--windowDashboard-L3-display', "none")
      root.style.setProperty('--display-b', "none")

      root.style.setProperty('--border-radius', "7px")
      root.style.setProperty('--border-radius-b', "7px 7px 0 0")

      root.style.setProperty('--top', "15px")
      root.style.setProperty('--left', "30px")

      setDashboardIsMininimized(true)
    }

    // Getting the schedule of the student
    const [schedule, setSchedule] = useState([])
    useEffect(() =>{
        const fetchSchedule= async () => {
            const response = await fetch('http://localhost:5000/schedule/11-0000006')
            const json = await response.json()

            if (response.ok){
                setSchedule(json)
            }
        }
        fetchSchedule()
    }, [])

    // Getting all the activities of the student
    const [activity, setActivity] = useState([])
    useEffect(() =>{
        const fetchActivity = async () => {
            const response = await fetch('http://localhost:5000/student_activities/11-0000006')
            const json = await response.json()

            if (response.ok){
                setActivity(json)
            }
        }
        fetchActivity()
    }, [])

    // Getting all the announcements
    const [announcement, setAnnouncement] = useState([])
    useEffect(() =>{
        const fetchAnnouncement = async () => {
            const response = await fetch('http://localhost:5000/announcements')
            const json = await response.json()

            if (response.ok){
                setAnnouncement(json)
            }
        }
        fetchAnnouncement()
    }, [])


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

        <div className="dashboard_L1_Main_Container" id="dashboard_L3_Main_Container">

            <div className="dashboard_L3_top_wrap">
                <div className="dashboard_L3_container_big" ref={dashAttRef}>
                    <AttendanceDetails
                    dashboardIsMinimized={dashboardIsMinimized}/>
                </div>

                {/* <div className="dashboard_L3_container_small" ref={dashUpRef}>
                    <div className="dashboard_L3_container_label">
                        <span>UPCOMING</span>
                        <span className="view_calendar_L1" id="view_calendar_L1" >View Calendar &#10095;</span>
                    </div>

                    <div className="dashboard_L3_act_inside_wrap">                  
                        {schedule && schedule.map((schedules) => (
                            <UpcomingDetails key={schedules._id} schedules={schedules} />
                        ))}
                    </div>
                </div> */}
                <div className="dashboard_L3_container_small" ref={dashActRef}>
                    <div className="dashboard_L3_container_label">
                        <span>ACTIVITIES</span>
                    </div>

                    <div className="dashboard_L3_act_inside_wrap">                    
                        {activity && activity.map((activities) => (
                            <ActivityDetails key={activities._id} activities={activities} />
                        ))}
                    </div>
                </div>
            </div>

            {/* <div className="dashboard_L3_top_wrap">
                <div className="dashboard_L3_container_big" ref={dashAssessRef}>                    
                    <AssessmentDetails 
                    dashboardIsMinimized={dashboardIsMinimized}/>
                </div>

                <div className="dashboard_L3_container_small" ref={dashActRef}>
                    <div className="dashboard_L3_container_label">
                        <span>ACTIVITIES</span>
                    </div>

                    <div className="dashboard_L3_act_inside_wrap">                    
                        {activity && activity.map((activities) => (
                            <ActivityDetails key={activities._id} activities={activities} />
                        ))}
                    </div>
                </div>
            </div> */}

            <div className="dashboard_L3_top_wrap bottom_wrap">
                <div className="dashboard_L3_container_big" ref={dashAnaRef}>               
                    <div className="dashboard_L3_container_label">
                        <span>ANALYTICS</span>
                        <span className="view_calendar_L1" id="view_calendar_L1" >View Analytics &#10095;</span>
                    </div>

                        <div className="dashboard_L3_annt_attn">
                        <div className="dashboard_L1_Analytics_label">Attendance</div>
                            <div className="accounts_pie_wrap_outside-b">
                                <div className="accounts_pie_wrap">
                                    <div className="pie animate no-round" style={{"--p": "92.9", "--c": "#84DF3C", "--b": "10px"}}>
                                        <div className="pie_number_wrap">
                                            <span>92.9%</span>
                                            <span className="pie_number">223/240</span>
                                        </div>
                                    </div>
                                    <span className="pie_label">Presents</span>
                                </div> 

                                <div className="accounts_pie_wrap">
                                    <div className="pie animate no-round" style={{"--p": "7.1", "--c": "#F14668", "--b": "10px"}}>
                                        <div className="pie_number_wrap">
                                            <span>7.1%</span>
                                            <span className="pie_number">17/240</span>
                                        </div>
                                    </div>
                                    <span className="pie_label">Absents</span>
                                </div> 
                            </div>
                        </div>

                        {/* <div className="dashboard_L3_annt_attn annt_attn-b">
                        <div className="dashboard_L1_Analytics_label">Assessment</div>
                            <div className="accounts_pie_wrap">
                                <div className="pie animate no-round" style={{"--p": "92", "--c": "#84DF3C", "--b": "10px"}}>
                                    <div className="pie_number_wrap">
                                        <span>92%</span>
                                        <span className="pie_number">92/100</span>
                                    </div>
                                </div>
                                <span className="pie_label">Grades</span>
                            </div>
                        </div> */}
                    
                </div>

                <div className="dashboard_L3_container_small" ref={dashAnnRef}>
                    <div className="dashboard_L3_container_label">
                        <span>ANNOUNCEMENTS</span>
                    </div>

                    <div className="dashboard_L3_act_inside_wrap">                  
                        {announcement && announcement.map((announcements) => (
                            <AnnouncementDetails key={announcements._id} announcements={announcements} />
                        ))}
                    </div>
                </div>
            </div>

        </div>

        {/* </animated.div> */}
    </>
    )
}