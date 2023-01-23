import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import search_icon from "../../images/search_FILL0_wght400_GRAD0_opsz48.png"
import back_icon from "../../images/arrow_back_FILL0_wght400_GRAD0_opsz48.png"

import AssessmentModuleSection from "../assessment_module/assessment_module_section";

const AnalyticsModuleSection = ({ classID, classSection, subjectID }) => {

    var root = document.querySelector(":root");

    const backtoAssessment = () => {
        root.style.setProperty('--windowAnalyticsSection-display', "none")
        root.style.setProperty('--windowAnalytics-display', "block")
    }

    const [sectionAnalytics, setSectionAnalytics] = useState([]);
    useEffect(() => {
        async function fetchStudents() {
          const response = await fetch(`http://localhost:5000/api/class-sections/class/${classID}/subject/${subjectID}`);
          const data = await response.json();
          setSectionAnalytics(data);
        }
        fetchStudents();
    }, [classID, subjectID]);


    const [sectionLeast, setSectionLeast] = useState([]);
    useEffect(() => {
        async function fetchStudents() {
          const response = await fetch(`http://localhost:5000/api/class-sections/least-performers/${classID}/${subjectID}`);
          const data = await response.json();
          setSectionLeast(data);
        }
        fetchStudents();
    }, [classID, subjectID]);

    const openAssessmentSection = () => {
        root.style.setProperty('--windowAssessment-display', "none")
        root.style.setProperty('--windowAssessmentSection-display', "block")
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

                    {/* Insert selected section here */}
                    <span className="assessment_module_section_text">{classSection}</span>
                </div>

                {/* <div className="assessment_module_searchDLUP_wrap">
                    <div className="assessment_module_search_wrap-b">
                        <img src={search_icon} alt="search" className="assessment_module_search_icon"/>
                        <input 
                            type="text" 
                            className="assessment_module_search_input"
                            placeholder="Search a student"
                        />
                    </div>
                </div> */}
            </div>

            <div className="assessment_module_bottomwrap">
                {sectionAnalytics && sectionAnalytics.map(sectionAna => (
                    <div className="analytics_module_overall_container" key={sectionAna._id}>
                        <div className="analytics_module_overall_text_wrap">
                            <div className="analytics_module_overall_text">OVERALL ANALYTICS</div>
                            <Link to="/home/L2/assessment" 
                                style={{ textDecoration: 'none' }}
                                onClick={openAssessmentSection}>
                                <div className="analytics_module_overall_text-b">{"view assessment >"}</div>
                            </Link>
                        </div>

                            <div className="analytics_module_record_wrap">
                                <div className="analytics_module_record_container">
                                    <div className="analytics_module_record_title_wrap">
                                        <div className="analytics_module_record_title">Quiz</div>
                                        <div className="analytics_module_record_title">{"Class Ave: " + sectionAna.quiz}</div>
                                    </div>
                                    <div className="analytics_module_record_separator-b"></div>
                                    <div className="analytics_module_record_title-b">Top Performers:</div>
                                    <div className="analytics_module_record_text">
                                        <span>{"1. " + sectionAna.quiz_top_1_name}</span>
                                        <span>{"score: " + sectionAna.quiz_top_1_score}</span>
                                    </div>
                                    <div className="analytics_module_record_text">
                                        <span>{"2. " + sectionAna.quiz_top_2_name}</span>
                                        <span>{"score: " + sectionAna.quiz_top_2_score}</span>
                                    </div>
                                    <div className="analytics_module_record_text">
                                        <span>{"3. " + sectionAna.quiz_top_3_name}</span>
                                        <span>{"score: " + sectionAna.quiz_top_3_score}</span>
                                    </div>
                                </div>
                                
                                <div className="analytics_module_record_container">
                                    <div className="analytics_module_record_title_wrap">
                                        <div className="analytics_module_record_title">Seatwork</div>
                                        <div className="analytics_module_record_title">{"Class Ave: " + sectionAna.seatwork}</div>
                                    </div>
                                    <div className="analytics_module_record_separator-b"></div>
                                    <div className="analytics_module_record_title-b">Top Performers:</div>
                                    <div className="analytics_module_record_text">
                                        <span>{"1. " + sectionAna.seatwork_top_1_name}</span>
                                        <span>{"score: " + sectionAna.seatwork_top_1_score}</span>
                                    </div>
                                    <div className="analytics_module_record_text">
                                        <span>{"2. " + sectionAna.seatwork_top_2_name}</span>
                                        <span>{"score: " + sectionAna.seatwork_top_2_score}</span>
                                    </div>
                                    <div className="analytics_module_record_text">
                                        <span>{"3. " + sectionAna.seatwork_top_3_name}</span>
                                        <span>{"score: " + sectionAna.seatwork_top_3_score}</span>
                                    </div>
                                </div>

                                <div className="analytics_module_record_container">
                                    <div className="analytics_module_record_title_wrap">
                                        <div className="analytics_module_record_title">Recitation</div>
                                        <div className="analytics_module_record_title">{"Class Ave: " + sectionAna.recitation}</div>
                                    </div>
                                    <div className="analytics_module_record_separator-b"></div>
                                    <div className="analytics_module_record_title-b">Top Performers:</div>
                                    <div className="analytics_module_record_text">
                                        <span>{"1. " + sectionAna.recitation_top_1_name}</span>
                                        <span>{"score: " + sectionAna.recitation_top_1_score}</span>
                                    </div>
                                    <div className="analytics_module_record_text">
                                        <span>{"2. " + sectionAna.recitation_top_2_name}</span>
                                        <span>{"score: " + sectionAna.recitation_top_2_score}</span>
                                    </div>
                                    <div className="analytics_module_record_text">
                                        <span>{"3. " + sectionAna.recitation_top_3_name}</span>
                                        <span>{"score: " + sectionAna.recitation_top_3_score}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="analytics_module_record_wrap">
                                <div className="analytics_module_record_container">
                                    <div className="analytics_module_record_title_wrap">
                                        <div className="analytics_module_record_title">Exam</div>
                                        <div className="analytics_module_record_title">{"Class Ave: " + sectionAna.exam}</div>
                                    </div>
                                    <div className="analytics_module_record_separator-b"></div>
                                    <div className="analytics_module_record_title-b">Top Performers:</div>
                                    <div className="analytics_module_record_text">
                                        <span>{"1. " + sectionAna.exam_top_1_name}</span>
                                        <span>{"score: " + sectionAna.exam_top_1_score}</span>
                                    </div>
                                    <div className="analytics_module_record_text">
                                        <span>{"2. " + sectionAna.exam_top_2_name}</span>
                                        <span>{"score: " + sectionAna.exam_top_2_score}</span>
                                    </div>
                                    <div className="analytics_module_record_text">
                                        <span>{"3. " + sectionAna.exam_top_3_name}</span>
                                        <span>{"score: " + sectionAna.exam_top_3_score}</span>
                                    </div>
                                </div>
                                
                                <div className="analytics_module_record_container">
                                    <div className="analytics_module_record_title_wrap">
                                        <div className="analytics_module_record_title">Project</div>
                                        <div className="analytics_module_record_title">{"Class Ave: " + sectionAna.project}</div>
                                    </div>
                                    <div className="analytics_module_record_separator-b"></div>
                                    <div className="analytics_module_record_title-b">Top Performers:</div>
                                    <div className="analytics_module_record_text">
                                        <span>{"1. " + sectionAna.project_top_1_name}</span>
                                        <span>{"score: " + sectionAna.project_top_1_score}</span>
                                    </div>
                                    <div className="analytics_module_record_text">
                                        <span>{"2. " + sectionAna.project_top_2_name}</span>
                                        <span>{"score: " + sectionAna.project_top_2_score}</span>
                                    </div>
                                    <div className="analytics_module_record_text">
                                        <span>{"3. " + sectionAna.project_top_3_name}</span>
                                        <span>{"score: " + sectionAna.project_top_3_score}</span>
                                    </div>
                                </div>

                                <div className="analytics_module_record_container">
                                    <div className="analytics_module_record_title_wrap">
                                        <div className="analytics_module_record_title">Attendance</div>
                                        <div className="analytics_module_record_title">{"Class Ave: " + sectionAna.attendance}</div>
                                    </div>
                                    <div className="analytics_module_record_separator-b"></div>
                                    <div className="analytics_module_record_title-b">Top Performers:</div>
                                    <div className="analytics_module_record_text">
                                        <span>{"1. " + sectionAna.attendance_top_1_name}</span>
                                        <span>{"score: " + sectionAna.attendance_top_1_score}</span>
                                    </div>
                                    <div className="analytics_module_record_text">
                                        <span>{"2. " + sectionAna.attendance_top_2_name}</span>
                                        <span>{"score: " + sectionAna.attendance_top_2_score}</span>
                                    </div>
                                    <div className="analytics_module_record_text">
                                        <span>{"3. " + sectionAna.attendance_top_3_name}</span>
                                        <span>{"score: " + sectionAna.attendance_top_3_score}</span>
                                    </div>
                                </div>
                            </div>
                    </div>
                ))}

                {sectionLeast && sectionLeast.map(sectionl => (
                    <div className="analytics_module_overall_container" key={sectionl._id}>
                        <div className="analytics_module_overall_text_wrap">
                            <div className="analytics_module_overall_text">ON WATCH ANALYTICS</div>
                            <Link to="/home/L2/assessment" style={{ textDecoration: 'none' }}>
                                <div className="analytics_module_overall_text-b">{"view assessment >"}</div>
                            </Link>
                        </div>
                            <div className="analytics_module_record_wrap">
                                <div className="analytics_module_record_container">
                                    <div className="analytics_module_record_title">Quiz Underperformers</div>
                                    <div className="analytics_module_record_separator"></div>
                                    <div className="analytics_module_record_text">
                                        <span>{"1. " + sectionl.quiz_least_performer_1_name}</span>
                                        <span>{"score: " + sectionl.quiz_least_performer_1_score}</span>
                                    </div>
                                    <div className="analytics_module_record_text">
                                        <span>{"2. " + sectionl.quiz_least_performer_2_name}</span>
                                        <span>{"score: " + sectionl.quiz_least_performer_2_score}</span>
                                    </div>
                                    <div className="analytics_module_record_text">
                                        <span>{"3. " + sectionl.quiz_least_performer_3_name}</span>
                                        <span>{"score: " + sectionl.quiz_least_performer_3_score}</span>
                                    </div>
                                    <div className="analytics_module_record_text">
                                        <span>{"4. " + sectionl.quiz_least_performer_4_name}</span>
                                        <span>{"score: " + sectionl.quiz_least_performer_4_score}</span>
                                    </div>
                                    <div className="analytics_module_record_text">
                                        <span>{"5. " + sectionl.quiz_least_performer_5_name}</span>
                                        <span>{"score: " + sectionl.quiz_least_performer_5_score}</span>
                                    </div>
                                </div>

                                <div className="analytics_module_record_container">
                                    <div className="analytics_module_record_title">Seatwork Underperformers</div>
                                    <div className="analytics_module_record_separator"></div>
                                    <div className="analytics_module_record_text">
                                        <span>{"1. " + sectionl.seatwork_least_performer_1_name}</span>
                                        <span>{"score: " + sectionl.seatwork_least_performer_1_score}</span>
                                    </div>
                                    <div className="analytics_module_record_text">
                                        <span>{"2. " + sectionl.seatwork_least_performer_2_name}</span>
                                        <span>{"score: " + sectionl.seatwork_least_performer_2_score}</span>
                                    </div>
                                    <div className="analytics_module_record_text">
                                        <span>{"3. " + sectionl.seatwork_least_performer_3_name}</span>
                                        <span>{"score: " + sectionl.seatwork_least_performer_3_score}</span>
                                    </div>
                                    <div className="analytics_module_record_text">
                                        <span>{"4. " + sectionl.seatwork_least_performer_4_name}</span>
                                        <span>{"score: " + sectionl.seatwork_least_performer_4_score}</span>
                                    </div>
                                    <div className="analytics_module_record_text">
                                        <span>{"5. " + sectionl.seatwork_least_performer_5_name}</span>
                                        <span>{"score: " + sectionl.seatwork_least_performer_5_score}</span>
                                    </div>
                                </div>

                                <div className="analytics_module_record_container">
                                    <div className="analytics_module_record_title">Recitation Underperformers</div>
                                    <div className="analytics_module_record_separator"></div>
                                    <div className="analytics_module_record_text">
                                        <span>{"1. " + sectionl.recitation_least_performer_1_name}</span>
                                        <span>{"score: " + sectionl.recitation_least_performer_1_score}</span>
                                    </div>
                                    <div className="analytics_module_record_text">
                                        <span>{"2. " + sectionl.recitation_least_performer_2_name}</span>
                                        <span>{"score: " + sectionl.recitation_least_performer_2_score}</span>
                                    </div>
                                    <div className="analytics_module_record_text">
                                        <span>{"3. " + sectionl.recitation_least_performer_3_name}</span>
                                        <span>{"score: " + sectionl.recitation_least_performer_3_score}</span>
                                    </div>
                                    <div className="analytics_module_record_text">
                                        <span>{"4. " + sectionl.recitation_least_performer_4_name}</span>
                                        <span>{"score: " + sectionl.recitation_least_performer_4_score}</span>
                                    </div>
                                    <div className="analytics_module_record_text">
                                        <span>{"5. " + sectionl.recitation_least_performer_5_name}</span>
                                        <span>{"score: " + sectionl.recitation_least_performer_5_score}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="analytics_module_record_wrap">
                                <div className="analytics_module_record_container">
                                    <div className="analytics_module_record_title">Exam Underperformers</div>
                                    <div className="analytics_module_record_separator"></div>
                                    <div className="analytics_module_record_text">
                                        <span>{"1. " + sectionl.exam_least_performer_1_name}</span>
                                        <span>{"score: " + sectionl.exam_least_performer_1_score}</span>
                                    </div>
                                    <div className="analytics_module_record_text">
                                        <span>{"2. " + sectionl.exam_least_performer_2_name}</span>
                                        <span>{"score: " + sectionl.exam_least_performer_2_score}</span>
                                    </div>
                                    <div className="analytics_module_record_text">
                                        <span>{"3. " + sectionl.exam_least_performer_3_name}</span>
                                        <span>{"score: " + sectionl.exam_least_performer_3_score}</span>
                                    </div>
                                    <div className="analytics_module_record_text">
                                        <span>{"4. " + sectionl.exam_least_performer_4_name}</span>
                                        <span>{"score: " + sectionl.exam_least_performer_4_score}</span>
                                    </div>
                                    <div className="analytics_module_record_text">
                                        <span>{"5. " + sectionl.exam_least_performer_5_name}</span>
                                        <span>{"score: " + sectionl.exam_least_performer_5_score}</span>
                                    </div>
                                </div>

                                <div className="analytics_module_record_container">
                                    <div className="analytics_module_record_title">Project Underperformers</div>
                                    <div className="analytics_module_record_separator"></div>
                                    <div className="analytics_module_record_text">
                                        <span>{"1. " + sectionl.project_least_performer_1_name}</span>
                                        <span>{"score: " + sectionl.project_least_performer_1_score}</span>
                                    </div>
                                    <div className="analytics_module_record_text">
                                        <span>{"2. " + sectionl.project_least_performer_2_name}</span>
                                        <span>{"score: " + sectionl.project_least_performer_2_score}</span>
                                    </div>
                                    <div className="analytics_module_record_text">
                                        <span>{"3. " + sectionl.project_least_performer_3_name}</span>
                                        <span>{"score: " + sectionl.project_least_performer_3_score}</span>
                                    </div>
                                    <div className="analytics_module_record_text">
                                        <span>{"4. " + sectionl.project_least_performer_4_name}</span>
                                        <span>{"score: " + sectionl.project_least_performer_4_score}</span>
                                    </div>
                                    <div className="analytics_module_record_text">
                                        <span>{"5. " + sectionl.project_least_performer_5_name}</span>
                                        <span>{"score: " + sectionl.project_least_performer_5_score}</span>
                                    </div>
                                </div>

                                <div className="analytics_module_record_container">
                                    <div className="analytics_module_record_title">Attendance Underperformers</div>
                                    <div className="analytics_module_record_separator"></div>
                                    <div className="analytics_module_record_text">
                                        <span>{"1. " + sectionl.attendance_least_performer_1_name}</span>
                                        <span>{"score: " + sectionl.attendance_least_performer_1_score}</span>
                                    </div>
                                    <div className="analytics_module_record_text">
                                        <span>{"2. " + sectionl.attendance_least_performer_2_name}</span>
                                        <span>{"score: " + sectionl.attendance_least_performer_2_score}</span>
                                    </div>
                                    <div className="analytics_module_record_text">
                                        <span>{"3. " + sectionl.attendance_least_performer_3_name}</span>
                                        <span>{"score: " + sectionl.attendance_least_performer_3_score}</span>
                                    </div>
                                    <div className="analytics_module_record_text">
                                        <span>{"4. " + sectionl.attendance_least_performer_4_name}</span>
                                        <span>{"score: " + sectionl.attendance_least_performer_4_score}</span>
                                    </div>
                                    <div className="analytics_module_record_text">
                                        <span>{"5. " + sectionl.attendance_least_performer_5_name}</span>
                                        <span>{"score: " + sectionl.attendance_least_performer_5_score}</span>
                                    </div>
                                </div>
                            </div>
                    </div>
                ))}
            </div>
        </div>
    </>
  )
}

export default AnalyticsModuleSection