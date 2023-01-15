import { useRef, useState, useEffect } from "react"
import Sidebar from "../SIDEBAR/sidebar"
import { useAuthContext } from "../../hooks/useAuthContext"

const UserNotificationModule = () => {

    const { user } = useAuthContext()

    const [dashboardIsOpen, setDashboardIsOpen] = useState(false);
    const [adminIsOpen, setAdminIsOpen] = useState(false);
    const [attendanceIsOpen, setAttendanceIsOpen] = useState(false);
    const [assessmentIsOpen, setAssessmentIsOpen] = useState(false);
    const [analyticsIsOpen, setAnalyticsIsOpen] = useState(false);
    const [cameraIsOpen, setCameraIsOpen] = useState(false);
    const [aboutIsOpen, setAboutIsOpen] = useState(false);
    const [calendarIsOpen, setCalendarIsOpen] = useState(false);

    const [announcements, setAnnouncements] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/announcements/')
        .then(res => res.json())
        .then(data => setAnnouncements(data))
        .catch(err => console.log(err));
    }, []);

    const [notifIsOpen, setNotifIsOpen] = useState(false);

    return (
      <>
      <div>
            <div className="main_window_wrap l1_background">
            <Sidebar 
                user={user}

                adminIsOpen={adminIsOpen}
                dashboardIsOpen={dashboardIsOpen}
                attendanceIsOpen={attendanceIsOpen}
                analyticsIsOpen={analyticsIsOpen}
                cameraIsOpen={cameraIsOpen}
                aboutIsOpen={aboutIsOpen}
                calendarIsOpen={calendarIsOpen}
                assessmentIsOpen={assessmentIsOpen}
                notifIsOpen={notifIsOpen}
            />

            <div className="adminModule_L1_main_wrap">
                {announcements && announcements.map(announce => (
                    <div key={announce._id} className="notification_preview_item_container">
                        <div>{announce.name}</div>
                        <div>{announce.description}</div>
                        <div>Type: {announce.type}</div>
                        <div>Date: {announce.date}</div>
                        <div>Time: {announce.time}</div>
                        <div>Place: {announce.place}</div>
                    </div>
                ))}
            </div>
        </div>
      </div>
      </>
    )
  }
  
  export default UserNotificationModule