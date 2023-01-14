import { useRef, useState } from "react"
import Sidebar from "../SIDEBAR/sidebar"
import { useAuthContext } from "../../hooks/useAuthContext"
import MainDashboard_L1 from "../dashboard/dashboard_L1/main_Dashboard_L1"
import MainDashboard_L3 from "../dashboard/dashboard_L3/main_Dasboard_L3"
import MainDashboard from "../dashboard/main_Dashboard"

const HomeUserDashboard = () => {

    const { user } = useAuthContext()

    const dashUpRef = useRef(null);
    const dashAccRef = useRef(null);
    const dashAnaRef = useRef(null);

    const dashNoticeRef = useRef(null);
    const dashAttRef = useRef(null);

    const dashAssessRef = useRef(null);
    const dashActRef = useRef(null);
    const dashAnnRef = useRef(null);

    const [dashboardIsOpen, setDashboardIsOpen] = useState(true);
    const [adminIsOpen, setAdminIsOpen] = useState(false);
    const [attendanceIsOpen, setAttendanceIsOpen] = useState(false);
    const [assessmentIsOpen, setAssessmentIsOpen] = useState(false);
    const [analyticsIsOpen, setAnalyticsIsOpen] = useState(false);
    const [cameraIsOpen, setCameraIsOpen] = useState(false);
    const [aboutIsOpen, setAboutIsOpen] = useState(false);
    const [calendarIsOpen, setCalendarIsOpen] = useState(false);


    let dashboardByUser;
    if (user.level === '1'){
        dashboardByUser = 
            <div className="windowDashboard_L1_main_wrap">
                <MainDashboard_L1 
                dashUpRef={dashUpRef}
                dashAccRef={dashAccRef}
                dashAnaRef={dashAnaRef}
                />
            </div>     
    }
    else if (user.level === '2'){
        dashboardByUser = 
            <div className="windowDashboard_main_wrap">
                <MainDashboard
                    dashUpRef={dashUpRef} 
                    dashNoticeRef={dashNoticeRef}
                    dashAttRef={dashAttRef} />
            </div>
    }
    else if (user.level === '3'){
        dashboardByUser = 
            <div className="windowDashboard_L3_main_wrap">
                <MainDashboard_L3 
                    dashAttRef={dashAttRef}
                    dashAssessRef={dashAssessRef}
                    dashAnaRef={dashAnaRef}
                    dashUpRef={dashUpRef}
                    dashActRef={dashActRef}
                    dashAnnRef={dashAnnRef}
                    dashNoticeRef={dashNoticeRef} />
            </div>
    }
    else{
        dashboardByUser = <div>Unknown User</div>
    }

    return (
      <>
      <div>
            <div className="main_window_wrap l1_background">
            <Sidebar 
                user={user} 
                dashUpRef={dashUpRef}
                dashAccRef={dashAccRef}
                dashAnaRef={dashAnaRef}
                dashNoticeRef={dashNoticeRef}
                dashAttRef={dashAttRef}
                dashAssessRef={dashAssessRef}
                dashActRef={dashActRef}
                dashAnnRef={dashAnnRef}

                adminIsOpen={adminIsOpen}
                dashboardIsOpen={dashboardIsOpen}
                attendanceIsOpen={attendanceIsOpen}
                assessmentIsOpen={assessmentIsOpen}
                analyticsIsOpen={analyticsIsOpen}
                cameraIsOpen={cameraIsOpen}
                aboutIsOpen={aboutIsOpen}
                calendarIsOpen={calendarIsOpen}
            />

            {dashboardByUser}
        </div>
      </div>
      </>
    )
  }
  
  export default HomeUserDashboard