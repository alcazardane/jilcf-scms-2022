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

    // Getting all the announcements
    const [announcement, setAnnouncement] = useState([])
    useEffect(() =>{
        const fetchAnnouncement= async () => {
            const response = await fetch('http://localhost:5000/api/announcements')
            const json = await response.json()
            if (response.ok){
                setAnnouncement(json)
            }
        }
        fetchAnnouncement()
    }, [])


    return (
    <>
        <div className="dashboard_L1_Main_Container" id="dashboard_L3_Main_Container">

            <div className="dashboard_L3_top_wrap">
                <div className="dashboard_L3_container_big" ref={dashAttRef}>
                    <AttendanceDetails />
                </div>

                <div className="dashboard_L3_container_small" ref={dashUpRef}>
                    <div className="dashboard_L3_container_label">
                        <span>UPCOMING</span>
                        <span className="view_calendar_L1" id="view_calendar_L1" >View Calendar &#10095;</span>
                    </div>

                    <div className="dashboard_L3_act_inside_wrap">                  
                        {schedule && schedule.map((schedules) => (
                            <UpcomingDetails key={schedules._id} schedules={schedules} />
                        ))}
                    </div>
                </div>
            </div>

            <div className="dashboard_L3_top_wrap">
                <div className="dashboard_L3_container_big" ref={dashAssessRef}>                    
                    <AssessmentDetails />
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
    </>
    )
}