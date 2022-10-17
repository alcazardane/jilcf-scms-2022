import { useEffect, useState} from 'react'

//Components
import RedNoticeDetails from './dashboard_details/Red_NoticeDetails'
import YellowNoticeDetails from './dashboard_details/Yellow_NoticeDetails'

//Red and Yellow Notice
const RedYellowNotice = () => {
  const [studentAttendances, setStudentAttendance] = useState(null)
  const [studentAttendances_B, setStudentAttendance_B] = useState(null)

  // For Red Notice
  // Will fetch values from the "assessment_record" collection
  // for the student that has more than 10 absences
  useEffect(() =>{
    const fetchAssessment = async () => {
        const response = await fetch('http://localhost:5000/red')
        const json = await response.json()

        if (response.ok){
            setStudentAttendance(json)
        }
    }

    fetchAssessment()
  }, [])

  // For Yellow Notice
  // Will fetch values from the "assessment_record" collection
  // for the student that has more than 5 absences but less than 10
  useEffect(() =>{
    const fetchAssessment = async () => {
        const response = await fetch('http://localhost:5000/yellow')
        const json = await response.json()

        if (response.ok){
            setStudentAttendance_B(json)
        }
    }

    fetchAssessment()
  }, [])
  
    return (
        <div className="notice_container">
          <div className="notice_header">
            <div className="container_labels-c">RED NOTICE</div>
            <span className="view_list_red">View Full List &#10095;</span>
          </div>
            <table className="red_notice_table notice_table">
              <tbody className="redyellownotice_limiter">
                {studentAttendances && studentAttendances.map((studentAttendance) => (
                    <RedNoticeDetails key={studentAttendance._id} studentAttendance={studentAttendance} />
                ))}
              </tbody>
            </table>
          <div className="notice_header">
            <div className="container_labels-c">YELLOW NOTICE</div>
            <span className="view_list_yellow">View Full List &#10095;</span>
          </div>
            <table className="yellow_notice_table notice_table">
              <tbody className="redyellownotice_limiter">
                {studentAttendances_B && studentAttendances_B.map((studentAttendance) => (
                    <YellowNoticeDetails key={studentAttendance._id} studentAttendance={studentAttendance} />
                ))}
              </tbody>
            </table>
        </div>
    )
}

export default RedYellowNotice