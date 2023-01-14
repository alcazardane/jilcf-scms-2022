import { useRef, useState } from "react"
import Sidebar from "../SIDEBAR/sidebar"
import { useAuthContext } from "../../hooks/useAuthContext"

const UserCameraModule = () => {

    const { user } = useAuthContext()


    const [dashboardIsOpen, setDashboardIsOpen] = useState(false);
    const [adminIsOpen, setAdminIsOpen] = useState(false);
    const [attendanceIsOpen, setAttendanceIsOpen] = useState(false);
    const [assessmentIsOpen, setAssessmentIsOpen] = useState(false);
    const [analyticsIsOpen, setAnalyticsIsOpen] = useState(false);
    const [cameraIsOpen, setCameraIsOpen] = useState(true);
    const [aboutIsOpen, setAboutIsOpen] = useState(false);
    const [calendarIsOpen, setCalendarIsOpen] = useState(false);

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

            <div className="adminModule_L1_main_wrap">
                <div>CAMERA MODULE</div>
            </div>
        </div>
      </div>
      </>
    )
  }
  
  export default UserCameraModule