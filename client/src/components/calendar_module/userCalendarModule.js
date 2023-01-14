import { useRef, useState } from "react"
import Sidebar from "../SIDEBAR/sidebar"
import { useAuthContext } from "../../hooks/useAuthContext"

import CalendarModule from "./calendar_module"

const UserCalendarModule = () => {

    const { user } = useAuthContext()

    const [dashboardIsOpen, setDashboardIsOpen] = useState(false);
    const [adminIsOpen, setAdminIsOpen] = useState(false);
    const [attendanceIsOpen, setAttendanceIsOpen] = useState(false);
    const [assessmentIsOpen, setAssessmentIsOpen] = useState(false);
    const [analyticsIsOpen, setAnalyticsIsOpen] = useState(false);
    const [cameraIsOpen, setCameraIsOpen] = useState(false);
    const [aboutIsOpen, setAboutIsOpen] = useState(false);
    const [calendarIsOpen, setCalendarIsOpen] = useState(true);

    let calendarByUser;
    if (user.level === '1'){
        calendarByUser = 
            <div className="calendarModule_L1_main_wrap">
                <CalendarModule />
            </div>   
    }
    else if (user.level === '2'){
        calendarByUser = 
            <div className="calendarModule_L1_main_wrap">
                <CalendarModule />
            </div>  
    }
    else if (user.level === '3'){
        calendarByUser = 
            <div className="calendarModule_L1_main_wrap">
                <CalendarModule />
            </div>  
    }
    else{
        calendarByUser = <div>Unknown User</div>
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

            {calendarByUser}

        </div>
      </div>
      </>
    )
  }
  
  export default UserCalendarModule