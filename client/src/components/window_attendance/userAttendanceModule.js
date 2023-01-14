import { useRef, useState } from "react"
import Sidebar from "../SIDEBAR/sidebar"
import { useAuthContext } from "../../hooks/useAuthContext"

import WindowAttendanceL1 from "./window_attendance_L1"
import WindowAttendance from "./windowAttendance"
import WindowAttendanceL3 from "./window_attendance_L3"

const UserAttendanceModule = () => {

    const { user } = useAuthContext()

    const [dashboardIsOpen, setDashboardIsOpen] = useState(false);
    const [adminIsOpen, setAdminIsOpen] = useState(false);
    const [attendanceIsOpen, setAttendanceIsOpen] = useState(true);
    const [assessmentIsOpen, setAssessmentIsOpen] = useState(false);
    const [analyticsIsOpen, setAnalyticsIsOpen] = useState(false);
    const [cameraIsOpen, setCameraIsOpen] = useState(false);
    const [aboutIsOpen, setAboutIsOpen] = useState(false);
    const [calendarIsOpen, setCalendarIsOpen] = useState(false);

    let attendanceByUser;
    if (user.level === '1'){
        attendanceByUser = 
            <div className="windowAttendance_main_wrap">
                <WindowAttendanceL1 />
            </div>    
    }
    else if (user.level === '2'){
        attendanceByUser = 
            <div className="windowAttendance_L1_main_wrap">
                <WindowAttendance />
            </div>
    }
    else if (user.level === '3'){
        attendanceByUser = 
            <div className="windowAttendance_L3_main_wrap">
                <WindowAttendanceL3 />
            </div>
    }
    else{
        attendanceByUser = <div>Unknown User</div>
    }

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
            />

            {attendanceByUser}

        </div>
      </div>
      </>
    )
  }
  
  export default UserAttendanceModule