const UpcomingDetails = ({ upcoming }) => {

    // Changing the border-left based on the grade level and other schedule type
    const sideBorder = (grade_level) => {
    
        if(grade_level.toString() === "11"){
           return "#FFD056"
        }
        else if(grade_level.toString() === "12"){
            return "#03256C"
        }
        // For now, it will default to MEETING color which is purple
        return "#9747FF"
    }

    return (
        <>
        <div className="class_scheds"
            style={{ borderLeftColor: sideBorder(upcoming.upcoming_grade_level)}}
        >
            <div className="class_scheds_wrap_2">
                <div className="class_scheds_time">
                    <span>{upcoming.upcoming_type + ", " + upcoming.upcoming_start_time + " - " + upcoming.upcoming_end_time}</span>
                </div>
                <div className="class_scheds_section">
                    <span>{upcoming.upcoming_subject + " - " + upcoming.upcoming_grade_level + " " + upcoming.upcoming_section}</span>
                </div>
                <div className="class_scheds_room">
                    <span>{upcoming.upcoming_room}</span>
                </div>
            </div>
                <li className="arrow_forward">&#10095;</li>
        </div>
        </>
    )
}

export default UpcomingDetails