const UpcomingDetails = ({ upcoming }) => {

    // Changing the border-left based on the grade level and other schedule type
    const sideBorder = (class_type) => {
    
        if(class_type === "Class"){
           return "#FFD056"
        }
        else if(class_type === "Meeting"){
            return "#03256C"
        }
        // For now, it will default to MEETING color which is purple
        return "#9747FF"
    }

    return (
        <>
        <div className="class_scheds"
            style={{ borderLeftColor: sideBorder(upcoming.class_type)}}
        >
            <div className="class_scheds_wrap_2">
                <div className="class_scheds_time">
                    <span>
                        {upcoming.class_type + ", " + 
                        upcoming.class_start_hh + ":" + upcoming.class_start_mm + " " + upcoming.class_start_pa +
                        " - " + 
                        upcoming.class_end_hh + ":" + upcoming.class_end_mm + " " + upcoming.class_end_pa}
                    </span>
                </div>
                <div className="class_scheds_section">
                    <span>{upcoming.subject_name}</span>
                </div>
                <div className="class_scheds_room">
                    <span>{upcoming.class_room}</span>
                </div>
            </div>
                {/* <li className="arrow_forward">&#10095;</li> */}
        </div>
        </>
    )
}

export default UpcomingDetails