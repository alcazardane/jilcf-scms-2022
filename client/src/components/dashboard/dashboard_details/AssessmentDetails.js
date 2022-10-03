const AssessmentDetails = ({ assessment }) => {

    // Grade Computation variables
    var exam_total = 100;
    var project_total = 100;
    var attendance_total = 30;
    var recitaion_total = 20;
    var quiz_total = 50;
    var seatwork_total = 45;

    var exam_grade = 0;
    var performance_grade = 0;
    var written_grade = 0;

    var total_grade = 0;

    // Grade Computation
    const studentgrade = () => {
        exam_grade = ((parseInt(assessment.student_exam_score) / exam_total) * 100);
        performance_grade = (((parseInt(assessment.student_project_score) + parseInt(assessment.student_attendance_record)) / (project_total + attendance_total))* 100);
        written_grade = (((parseInt(assessment.student_quiz_score) + parseInt(assessment.student_recitation_score) + parseInt(assessment.student_seatwork_score)) / (quiz_total + recitaion_total + seatwork_total)) * 100);

        // For Academic Track
        if(assessment.student_track === "ACADEMIC"){
            total_grade = (exam_grade * 0.30) + (performance_grade * 0.45) + (written_grade * 0.25);
        }

        // For TVL Track
        if(assessment.student_track === "TVL"){
            total_grade = (exam_grade * 0.20) + (performance_grade * 0.60) + (written_grade * 0.20);
        }
    }

    studentgrade()

    // Will return the top-border-color of each container
    // Also used in the background color of final grade
    const topBorder = () => {
    
        if(Number(total_grade) < 75){
            return "#F14668"
        }
        else if(Number(total_grade) <= 90){
            return "#FFD056"
        }
        return "#84DF3C"
    }


    return (
        <>
        <div className="assessment_sub_container"
            style={{ borderTopColor: topBorder()}}
        >
            <div className="assessment_stud_name">
                <span>{assessment.student_lastname + ", " + assessment.student_firstname + " " + assessment.student_middlename + "."}</span>
            </div>
            <div className="student_info_wrap">
                <div className="student_info_inside">
                    <div className="assessment_stud_id assessment_dim">
                        <span>{assessment.student_id}</span>
                    </div>
                    <div className="assessment_stud_section assessment_dim">
                        <span>{assessment.student_grade_level + " " + assessment.student_strand + " " + assessment.student_section}</span>
                    </div>
                    <span className="assessment_stud_sy assessment_dim">
                        <span>{assessment.student_sy}</span>                   
                    </span>
                </div>
                <div className="final_grade_container"
                    style={{ background: topBorder()}}
                >
                    <span className="final_grade">{Math.round(total_grade * 100)/100}</span>
                </div>
            </div>
            <div className="assessment_sub_container_wrap">
                <div className="activity_label">EXAM:</div>
                <div className="activity_score">
                    <span>{assessment.student_exam_score + "/" + exam_total}</span>
                </div>
            </div>
            <div className="assessment_sub_container_wrap">
                <div className="activity_label">RECITATION:</div>
                <div className="activity_score">
                    <span>{assessment.student_recitation_score + "/" + recitaion_total}</span>
                </div>
            </div>
            <div className="assessment_sub_container_wrap">
                <div className="activity_label">QUIZ:</div>
                <div className="activity_score">
                    <span>{assessment.student_quiz_score + "/" + quiz_total}</span>
                </div>
            </div>
            <div className="assessment_sub_container_wrap">
                <div className="activity_label">SEATWORK:</div>
                <div className="activity_score">
                    <span>{assessment.student_seatwork_score + "/" + seatwork_total}</span>
                </div>
            </div>
            <div className="assessment_sub_container_wrap">
                <div className="activity_label">PROJECT:</div>
                <div className="activity_score">
                    <span>{assessment.student_project_score + "/" + project_total}</span>
                </div>
            </div>
            <div className="assessment_sub_container_wrap">
                <div className="activity_label">ATTENDANCE:</div>
                <div className="activity_score">
                    <span>{assessment.student_attendance_record + "/" + attendance_total}</span>
                </div>
            </div>
        </div>
        </>
    )
}

export default AssessmentDetails