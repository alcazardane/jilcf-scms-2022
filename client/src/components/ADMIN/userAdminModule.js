import { useRef, useState } from "react"
import Sidebar from "../SIDEBAR/sidebar"
import { useAuthContext } from "../../hooks/useAuthContext"
import AdminModule from "../admin_module/admin_module"

const UserAdminModule = () => {

    const { user } = useAuthContext()

    const adminAccRef = useRef(null)
    const adminSchedRef = useRef(null)
    const adminAnnRef = useRef(null)

    const [dashboardIsOpen, setDashboardIsOpen] = useState(false);
    const [adminIsOpen, setAdminIsOpen] = useState(true);
    const [attendanceIsOpen, setAttendanceIsOpen] = useState(false);
    const [assessmentIsOpen, setAssessmentIsOpen] = useState(false);
    const [analyticsIsOpen, setAnalyticsIsOpen] = useState(false);
    const [cameraIsOpen, setCameraIsOpen] = useState(false);
    const [aboutIsOpen, setAboutIsOpen] = useState(false);
    const [calendarIsOpen, setCalendarIsOpen] = useState(false);

    return (
      <>
      <div>
            <div className="main_window_wrap l1_background">
            <Sidebar 
                user={user}
                adminAccRef={adminAccRef}
                adminSchedRef={adminSchedRef}
                adminAnnRef={adminAnnRef}

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
                <AdminModule 
                    adminAccRef={adminAccRef}
                    adminSchedRef={adminSchedRef}
                    adminAnnRef={adminAnnRef}/>
            </div>
        </div>
      </div>
      </>
    )
  }
  
  export default UserAdminModule