const AssessmentWindowDetails = ({ assessment }) => {

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
        <div>
            
        </div>
        </>
    )
}

export default AssessmentWindowDetails