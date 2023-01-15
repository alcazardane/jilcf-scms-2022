import { useRef, useState } from "react"
import Sidebar from "../SIDEBAR/sidebar"
import { useAuthContext } from "../../hooks/useAuthContext"

import AnalyticsModule from "./analytics_module"
import AnalyticsModuleSection from "./analytics_module_section"

const UserAnalyticsModule = ({
    idNumber,
    setClassID,
    setClassSection,
    setSubjectID,
    classID,
    classSection,
    subjectID }) => {

    const { user } = useAuthContext()

    const [dashboardIsOpen, setDashboardIsOpen] = useState(false);
    const [adminIsOpen, setAdminIsOpen] = useState(false);
    const [attendanceIsOpen, setAttendanceIsOpen] = useState(false);
    const [assessmentIsOpen, setAssessmentIsOpen] = useState(false);
    const [analyticsIsOpen, setAnalyticsIsOpen] = useState(true);
    const [cameraIsOpen, setCameraIsOpen] = useState(false);
    const [aboutIsOpen, setAboutIsOpen] = useState(false);
    const [calendarIsOpen, setCalendarIsOpen] = useState(false);

    // const [idNumber, setIdNumber] = useState(user.idNumber);
    // const [classID, setClassID] = useState('ACADEMIC-12-STEM-A');
    // const [classSection, setClassSection] = useState('12 STEM A');
    // const [subjectID, setSubjectID] = useState('GM-001');

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

            <div className="windowAnalytics_main_wrap">
                <AnalyticsModule 
                    setClassID={setClassID}
                    setClassSection={setClassSection}
                    setSubjectID={setSubjectID} 
                    idNumber={idNumber}/>
            </div>

            <div className="windowAnalyticsSection_main_wrap">
                <AnalyticsModuleSection
                    classID={classID}
                    subjectID={subjectID}
                    classSection={classSection}/>
            </div>

        </div>
      </div>
      </>
    )
  }
  
  export default UserAnalyticsModule