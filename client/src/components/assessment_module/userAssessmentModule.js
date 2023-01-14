import { useRef, useState } from "react"
import Sidebar from "../SIDEBAR/sidebar"
import { useAuthContext } from "../../hooks/useAuthContext"

import AssessmentModule from "./assessment_module"
import AssessmentModuleSection from "./assessment_module_section"

const UserAssessmentModule = () => {

    const { user } = useAuthContext()

    const [dashboardIsOpen, setDashboardIsOpen] = useState(false);
    const [adminIsOpen, setAdminIsOpen] = useState(false);
    const [attendanceIsOpen, setAttendanceIsOpen] = useState(false);
    const [assessmentIsOpen, setAssessmentIsOpen] = useState(true);
    const [analyticsIsOpen, setAnalyticsIsOpen] = useState(false);
    const [cameraIsOpen, setCameraIsOpen] = useState(false);
    const [aboutIsOpen, setAboutIsOpen] = useState(false);
    const [calendarIsOpen, setCalendarIsOpen] = useState(false);

    const [idNumber, setIdNumber] = useState(user.idNumber);
    const [classID, setClassID] = useState('TVL-12-TVL-A');
    const [classSection, setClassSection] = useState('12 TVL A');


    let assessmentByUser;
    if (user.level === '2'){
        assessmentByUser = 
            <>
                <div className="windowAssessment_main_wrap">
                  <AssessmentModule
                    setClassID={setClassID}
                    setClassSection={setClassSection} 
                    idNumber={idNumber}/>
                </div>

                <div className="windowAssessmentSection_main_wrap">
                    <AssessmentModuleSection
                        classID={classID}
                        classSection={classSection}/>
                </div>
            </>    
    }
    else if (user.level === '3'){
        assessmentByUser = 
            <div className="windowAssessment_main_wrap">
                <div>ASSESSMENT FOR L3</div>
            </div>
    }
    else{
        assessmentByUser = <div>Unknown User</div>
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

            {assessmentByUser}
        </div>
      </div>
      </>
    )
  }
  
  export default UserAssessmentModule