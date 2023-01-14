import { useRef, useState } from "react"
import Sidebar from "../SIDEBAR/sidebar"
import { useAuthContext } from "../../hooks/useAuthContext"
import AboutWindow from "../about_module/about_module"

const UserAboutModule = () => {

    const { user } = useAuthContext()

    const [dashboardIsOpen, setDashboardIsOpen] = useState(false);
    const [adminIsOpen, setAdminIsOpen] = useState(false);
    const [attendanceIsOpen, setAttendanceIsOpen] = useState(false);
    const [assessmentIsOpen, setAssessmentIsOpen] = useState(false);
    const [analyticsIsOpen, setAnalyticsIsOpen] = useState(false);
    const [cameraIsOpen, setCameraIsOpen] = useState(false);
    const [aboutIsOpen, setAboutIsOpen] = useState(true);
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

                <div className="aboutModule_L1_main_wrap">
                    <AboutWindow />
                </div>
        </div>
      </div>
      </>
    )
  }
  
  export default UserAboutModule