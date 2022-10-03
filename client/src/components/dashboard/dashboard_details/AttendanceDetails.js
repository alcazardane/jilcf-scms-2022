const AttendanceDetails = ({ attendance }) => {

    // Changing the background of the container
    // No proper color coding for now
    const background = (section) => {
    
        if(section.toString() === "12 TVL A"){
            return "#3DB5F9"
        }
        else if(section.toString() === "12 HUMMS A"){
            return "#F14668"
        }
        else if(section.toString() === "12 STEM A"){
            return "#9747FF"
        }
        else if(section.toString() === "11 TVL B"){
            return "#84DF3C"
        }
        return "#9747FF"
    }

    return (
        <>
        <div className="attendance_sub_container"
            style={{ background: background(attendance.attendance_section)}}
        >
            <div className="attendance_subject">
                <span>{attendance.attendance_section}</span>
            </div>
            <div className="attendance_date">
                <span>{"As of " + attendance.attendance_date}</span>
            </div>
            <div className="ratio_wrap">
                <div className="present_ratio">Present Ratio</div>
                <div className="absent_ratio">Absent Ratio</div>
            </div>
            <div className="ratio_wrap">
            <div className="present_ratio ratio">
                <span>{attendance.attendance_present_ratio + "%"}</span>
            </div>
            <div className="absent_ratio ratio">
                <span>{attendance.attendance_absent_ratio + "%"}</span>
            </div> 
            </div>            
        </div>
        </>
    )
}

export default AttendanceDetails