import { useState, useEffect } from "react";
import search_icon from "../../images/search_FILL0_wght400_GRAD0_opsz48.png"
import back_icon from "../../images/arrow_back_FILL0_wght400_GRAD0_opsz48.png"

const AssessmentModuleSection = ({ classID, classSection, subjectID }) => {

    var root = document.querySelector(":root");

    const backtoAssessment = () => {
        root.style.setProperty('--windowAssessmentSection-display', "none")
        root.style.setProperty('--windowAssessment-display', "block")
    }

    const [handledStudents, setHandledStudents] = useState([]);

    useEffect(() => {
        async function fetchStudents() {
          const response = await fetch(`http://localhost:5000/api/class-sections/students/${classID}/${subjectID}`);
          const data = await response.json();
          setHandledStudents(data);
        }
        fetchStudents();
    }, [classID, subjectID]);

    const getMiddleInitial = (initial) => {
        if(!initial){
          return
        }
        else{
          return initial.substring(0, 1)
        }
    }

  return (
    <>
        <div className="assessment_module_main_wrap_b">
            <div className="assessment_module_topwrap">
                <div className="assessment_module_back_wrap">
                    <img 
                        src={back_icon} alt="back" 
                        className="assessment_module_back_icon" 
                        onClick={backtoAssessment}/>

                    {/* Insert selected section here */}
                    <span className="assessment_module_section_text">{classSection}</span>
                </div>

                <div className="assessment_module_searchDLUP_wrap">
                    <div className="assessment_module_search_wrap-b">
                        <img src={search_icon} alt="search" className="assessment_module_search_icon"/>
                        <input 
                            type="text" 
                            className="assessment_module_search_input"
                            placeholder="Search a student"
                        />
                    </div>
                    <button className="upload_assessment">Upload</button>
                    <button className="download_assessment">Download</button>
                </div>
            </div>

            <div className="assessment_module_students_table_wrap">
                <table className="assessment_module_students_table">
                    <thead>
                        <tr className="assessment_module_students_header">
                            <td>Student Name</td>
                            <td>Exam</td>
                            <td>Recitation</td>
                            <td>Quiz</td>
                            <td>Seatwork</td>
                            <td>Project</td>
                            <td>Attendance</td>
                        </tr>
                    </thead>
                    <tbody className="assessment_module_students_body">                   
                        {handledStudents && handledStudents.map((hStudents) => (
                                <tr key={hStudents._id}>
                                    <td>{hStudents.lname + ", " + hStudents.fname + " " + getMiddleInitial(hStudents.mname) + "."}</td>
                                    <td>{hStudents.exam_score + "/" + hStudents.exam_maxscore}</td>
                                    <td>{hStudents.recitation_score + "/" + hStudents.recitation_maxscore}</td>
                                    <td>{hStudents.quiz_score + "/" + hStudents.quiz_maxscore}</td>
                                    <td>{hStudents.seatwork_score + "/" + hStudents.seatwork_maxscore}</td>
                                    <td>{hStudents.project_score + "/" + hStudents.project_maxscore}</td>
                                    <td>{hStudents.attendance_score + "/" + hStudents.attendance_maxscore}</td>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </div>
        </div>
    </>
  )
}

export default AssessmentModuleSection