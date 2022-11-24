import arrow_next from "../../../images/arrow_circle_right_FILL1_wght400_GRAD0_opsz48.png"
import arrow_prev from "../../../images/arrow_circle_left_FILL1_wght400_GRAD0_opsz48.png"

import useWindowDimensions from "../hooks/useWindowDimensions"

const AttendanceDetails = ({dashboardIsMinimized}) => {

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

        var slider = document.getElementById("dashboard_L3_att_inside_wrap");
        slider.scrollLeft = slider.scrollLeft + scrollValue;
    }
    const slideLeft = () =>{

        if (dashboardIsMinimized === true){
            scrollValue = width * .60 * .68 * .96;
        }
        else{
            scrollValue = width * .68 * .96;
        }
        
        var slider = document.getElementById("dashboard_L3_att_inside_wrap");
        slider.scrollLeft = slider.scrollLeft - scrollValue;
    }

    return (
        <>
            <div className="dashboard_L3_container_label">
                <span>ATTENDANCE RECORD</span>
                <span className="view_calendar_L1" id="view_calendar_L1" >View Attendance &#10095;</span>
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

            <div className="dashboard_L3_assess_inside_wrap" id="dashboard_L3_att_inside_wrap">
                <div className="dashboard_L3_assess_subj_container">
                    <div className="dashboard_L3_assess_subj attn-subj">Computer Programming</div>
                    <div className="dashboard_L3_grades_wrap">
                        <span className="dashboard_L3_grades_label">Today: </span>
                        <span className="dashboard_L3_grades_value">Present</span>
                    </div>
                    <div className="dashboard_L3_grades_wrap">
                        <span className="dashboard_L3_grades_label">Yesterday: </span>
                        <span className="dashboard_L3_grades_value">Present</span>
                    </div>
                    <div className="dashboard_L3_grades_wrap">
                        <span className="dashboard_L3_grades_label">Absent: </span>
                        <span className="dashboard_L3_grades_value">1</span>
                    </div>
                    <div className="dashboard_L3_grades_wrap">
                        <span className="dashboard_L3_grades_label">Present: </span>
                        <span className="dashboard_L3_grades_value">31</span>
                    </div>
                </div>

                <div className="dashboard_L3_assess_subj_container">
                    <div className="dashboard_L3_assess_subj attn-subj">Oral Communication</div>
                    <div className="dashboard_L3_grades_wrap">
                        <span className="dashboard_L3_grades_label">Today: </span>
                        <span className="dashboard_L3_grades_value">Not yet recorded</span>
                    </div>
                    <div className="dashboard_L3_grades_wrap">
                        <span className="dashboard_L3_grades_label">Yesterday: </span>
                        <span className="dashboard_L3_grades_value">Present</span>
                    </div>
                    <div className="dashboard_L3_grades_wrap">
                        <span className="dashboard_L3_grades_label">Absent: </span>
                        <span className="dashboard_L3_grades_value">2</span>
                    </div>
                    <div className="dashboard_L3_grades_wrap">
                        <span className="dashboard_L3_grades_label">Present: </span>
                        <span className="dashboard_L3_grades_value">29</span>
                    </div>
                </div>

                <div className="dashboard_L3_assess_subj_container">
                    <div className="dashboard_L3_assess_subj attn-subj">General Mathematics</div>
                    <div className="dashboard_L3_grades_wrap">
                        <span className="dashboard_L3_grades_label">Today: </span>
                        <span className="dashboard_L3_grades_value">Not yet recorded</span>
                    </div>
                    <div className="dashboard_L3_grades_wrap">
                        <span className="dashboard_L3_grades_label">Yesterday: </span>
                        <span className="dashboard_L3_grades_value">Present</span>
                    </div>
                    <div className="dashboard_L3_grades_wrap">
                        <span className="dashboard_L3_grades_label">Absent: </span>
                        <span className="dashboard_L3_grades_value">3</span>
                    </div>
                    <div className="dashboard_L3_grades_wrap">
                        <span className="dashboard_L3_grades_label">Present: </span>
                        <span className="dashboard_L3_grades_value">28</span>
                    </div>
                </div>

                <div className="dashboard_L3_assess_subj_container">
                    <div className="dashboard_L3_assess_subj attn-subj">Earth and Life Science</div>
                    <div className="dashboard_L3_grades_wrap">
                        <span className="dashboard_L3_grades_label">Today: </span>
                        <span className="dashboard_L3_grades_value">Not yet recorded</span>
                    </div>
                    <div className="dashboard_L3_grades_wrap">
                        <span className="dashboard_L3_grades_label">Yesterday: </span>
                        <span className="dashboard_L3_grades_value">Present</span>
                    </div>
                    <div className="dashboard_L3_grades_wrap">
                        <span className="dashboard_L3_grades_label">Absent: </span>
                        <span className="dashboard_L3_grades_value">2</span>
                    </div>
                    <div className="dashboard_L3_grades_wrap">
                        <span className="dashboard_L3_grades_label">Present: </span>
                        <span className="dashboard_L3_grades_value">29</span>
                    </div>
                </div>
            </div>              
        </>
    )
}

export default AttendanceDetails