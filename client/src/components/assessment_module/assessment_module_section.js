import { useState, useEffect } from "react";
import search_icon from "../../images/search_FILL0_wght400_GRAD0_opsz48.png"
import back_icon from "../../images/arrow_back_FILL0_wght400_GRAD0_opsz48.png"
import view_icon from "../../images/visibility_FILL1_wght400_GRAD0_opsz48.png"

const AssessmentModuleSection = ({ user, idNumber, classID, classSection, subjectID }) => {

    var root = document.querySelector(":root");

    const backtoAssessment = () => {
        root.style.setProperty('--windowAssessmentSection-display', "none")
        root.style.setProperty('--windowAssessment-display', "block")
    }

    const [handledStudents, setHandledStudents] = useState([]);
    useEffect(() => {
        async function fetchStudents() {
          const response = await fetch(`/api/class-sections/students/${classID}/${subjectID}`);
          const data = await response.json();
          setHandledStudents(data);
        }
        fetchStudents();
    }, [classID, subjectID]);

    const [studAssessment, setStudAssessment] = useState([]);
    useEffect(() => {
        async function fetchStudents() {
          const response = await fetch(`/api/class-sections/records/${idNumber}/${subjectID}`);
          const data = await response.json();
          setStudAssessment(data);
        }
        fetchStudents();
    }, [idNumber, subjectID]);

    const getMiddleInitial = (initial) => {
        if(!initial){
          return
        }
        else{
          return initial.substring(0, 1)
        }
    }

    let assessment_top;
    let assessment_content;
    if (user.level === '2'){
        assessment_top =
            <>
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
            </>
        
        assessment_content =
            <>
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
                            <td>Actions</td>
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
                                    <button className="windowAttendance_view">
                                        <img src={view_icon} alt="view"></img>
                                    </button>
                                </tr>
                            ))
                        }
                    </tbody>
                </table>
            </>
    }
    else if (user.level === '3'){
        assessment_top = 
            <>
                <div className="assessment_module_searchDLUP_wrap">
                    <div className="assessment_module_search_wrap-c">
                        <img src={search_icon} alt="search" className="assessment_module_search_icon"/>
                        <input 
                            type="text" 
                            className="assessment_module_search_input"
                            placeholder="Search a record"
                        />
                    </div>
                </div>
            </>

        assessment_content = 
            <>
                {studAssessment && studAssessment.map(studscores => (
                    <div 
                        key={"key-" + studscores.quiz_score + "-" + studscores.seatwork_score}
                        className="assessment_module_studscores">
                        <div className="analytics_module_record_wrap">
                            <div className="analytics_module_record_container">
                                <div className="analytics_module_record_title">Quiz</div>
                                <div className="analytics_module_record_separator-b"></div>
                                <div className="analytics_module_record_text">{"Date: " + studscores.quiz_date}</div>
                                <div className="analytics_module_record_text">
                                    {"Score: " + studscores.quiz_score + "/" + studscores.quiz_maxscore}
                                </div>
                            </div>

                            <div className="analytics_module_record_container">
                                <div className="analytics_module_record_title">Seatwork</div>
                                <div className="analytics_module_record_separator-b"></div>
                                <div className="analytics_module_record_text">{"Date: " + studscores.seatwork_date}</div>
                                <div className="analytics_module_record_text">
                                    {"Score: " + studscores.seatwork_score + "/" + studscores.seatwork_maxscore}
                                </div>
                            </div>

                            <div className="analytics_module_record_container">
                                <div className="analytics_module_record_title">Recitation</div>
                                <div className="analytics_module_record_separator-b"></div>
                                <div className="analytics_module_record_text">{"Date: " + studscores.recitation_date}</div>
                                <div className="analytics_module_record_text">
                                    {"Score: " + studscores.recitation_score + "/" + studscores.recitation_maxscore}
                                </div>
                            </div>
                        </div>

                        <div className="analytics_module_record_wrap">
                            <div className="analytics_module_record_container">
                                <div className="analytics_module_record_title">Exam</div>
                                <div className="analytics_module_record_separator-b"></div>
                                <div className="analytics_module_record_text">{"Date: " + studscores.exam_date}</div>
                                <div className="analytics_module_record_text">
                                    {"Score: " + studscores.exam_score + "/" + studscores.exam_maxscore}
                                </div>
                            </div>

                            <div className="analytics_module_record_container">
                                <div className="analytics_module_record_title">Project</div>
                                <div className="analytics_module_record_separator-b"></div>
                                <div className="analytics_module_record_text">{"Date: " + studscores.project_date}</div>
                                <div className="analytics_module_record_text">
                                    {"Score: " + studscores.project_score + "/" + studscores.project_maxscore}
                                </div>
                            </div>

                            <div className="analytics_module_record_container">
                                <div className="analytics_module_record_title">Attendance</div>
                                <div className="analytics_module_record_separator-b"></div>
                                <div className="analytics_module_record_text">{"Date: " + studscores.attendance_date}</div>
                                <div className="analytics_module_record_text">
                                    {"Score: " + studscores.attendance_score + "/" + studscores.attendance_maxscore}
                                </div>
                            </div>
                        </div>
                    </div>                   
                ))}
            </>
    }
    else{
        return
    }

  return (
    <>
        <div className="assessment_module_main_wrap">
            <div className="assessment_module_topwrap">
                <div className="assessment_module_back_wrap">
                    <img 
                        src={back_icon} alt="back" 
                        className="assessment_module_back_icon" 
                        onClick={backtoAssessment}/>

                    <span className="assessment_module_section_text">{classSection}</span>
                </div>

                {assessment_top}
            </div>

            <div className="assessment_module_students_table_wrap">
                {assessment_content}
            </div>
        </div>
    </>
  )
}

export default AssessmentModuleSection