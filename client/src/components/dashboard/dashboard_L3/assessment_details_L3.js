import { useState, useEffect } from "react"
import arrow_next from "../../../images/arrow_circle_right_FILL1_wght400_GRAD0_opsz48.png"
import arrow_prev from "../../../images/arrow_circle_left_FILL1_wght400_GRAD0_opsz48.png"

import useWindowDimensions from "../hooks/useWindowDimensions"

const AssessmentDetails = ({dashboardIsMinimized}) => {

    const { width } = useWindowDimensions();

    let scrollValue = 0;

    // For the sliders
    const slideRight = () =>{

        if (dashboardIsMinimized === true){
            scrollValue = width * .60 * .68 * .96;
        }
        else{
            scrollValue = width * .68 * .96;
        }

        var slider = document.getElementById("dashboard_L3_assess_inside_wrap");
        slider.scrollLeft = slider.scrollLeft + scrollValue;
    }
    const slideLeft = () =>{

        if (dashboardIsMinimized === true){
            scrollValue = width * .60 * .68 * .96;
        }
        else{
            scrollValue = width * .68 * .96;
        }

        var slider = document.getElementById("dashboard_L3_assess_inside_wrap");
        slider.scrollLeft = slider.scrollLeft - scrollValue;
    }

    // const [adminID, setAdminID] = useState()
    const [grade, setGrade] = useState([])

    // setAdminID("22-0000000")
    useEffect(() =>{
        const fetchGrade= async () => {
            const response = await fetch('http://localhost:5000/student_grades/sg-11-0000006')
            const json = await response.json()

            if (response.ok){
                setGrade(json)
            }
        }
        fetchGrade()
    }, [])

    const getSubject = (subject) => {

        if (subject === "CP-001"){
            return "Computer Programming"
        }
        else if (subject === "GM-001"){
            return "General Mathematics"
        }
        else if (subject === "OC-001"){
            return "Oral Communication"
        }
        else if (subject === "ELS-001"){
            return "Earth and Life Science"
        }
    }

    const getExam = (pre, mid, fil) => {
        let totalExam = (pre + mid + fil) / 3;
        return totalExam.toFixed(2)
    }

    return (
        <>
            <div className="dashboard_L3_container_label">
                <span>ASSESSMENT RECORD</span>
                <span className="view_calendar_L1" id="view_calendar_L1" >View Assessment &#10095;</span>
            </div>

            <div className="dashboard_L3_container_arrow">
                <img className="dashboard_L3_container_arrow_btn btn-prev" 
                    src={arrow_prev} alt="prev"
                    onClick={slideLeft}/>
                <img className="dashboard_L3_container_arrow_btn btn-next" 
                    src={arrow_next} 
                    alt="next"
                    onClick={slideRight}/>
            </div>

            <div className="dashboard_L3_assess_inside_wrap" id="dashboard_L3_assess_inside_wrap">
                
                    {grade && grade.map((grades) => (
                        <div className="dashboard_L3_assess_subj_container" key={grades._id}>
                            <div className="dashboard_L3_assess_subj">{getSubject(grades.subj_id)}</div>

                            <div>{grades.exams && grades.exams.map((exam) => (
                                <div key={exam.prelim} className="dashboard_L3_grades_wrap">
                                    <span className="dashboard_L3_grades_label">Exam: </span>
                                    <span className="dashboard_L3_grades_value">{getExam(exam.prelim, exam.midterm, exam.finals)}</span>
                                </div>
                            ))}</div>

                            <div>{grades.recitation && grades.recitation.map((recitations) => (
                                <div key={recitations.graded_recitation} className="dashboard_L3_grades_wrap">
                                    <span className="dashboard_L3_grades_label">Recitation: </span>
                                    <span className="dashboard_L3_grades_value">{recitations.graded_recitation}</span>
                                </div>
                            ))}</div>

                            <div>{grades.quiz && grades.quiz.map((quizzes) => (
                                <div key={quizzes.quiz_no1} className="dashboard_L3_grades_wrap">
                                    <span className="dashboard_L3_grades_label">Quiz: </span>
                                    <span className="dashboard_L3_grades_value">{quizzes.quiz_no1}</span>
                                </div>
                            ))}</div>

                            <div>{grades.seatwork && grades.seatwork.map((seatworks) => (
                                <div key={seatworks.seatwork_no1} className="dashboard_L3_grades_wrap">
                                    <span className="dashboard_L3_grades_label">Seatwork: </span>
                                    <span className="dashboard_L3_grades_value">{seatworks.seatwork_no1}</span>
                                </div>
                            ))}</div>

                            <div>{grades.project && grades.project.map((projects) => (
                                <div key={projects.project_score} className="dashboard_L3_grades_wrap">
                                    <span className="dashboard_L3_grades_label">Project: </span>
                                    <span className="dashboard_L3_grades_value">{projects.project_score}</span>
                                </div>
                            ))}</div>

                        </div>
                        
                    ))}
            </div>              
        </>
    )
}

export default AssessmentDetails