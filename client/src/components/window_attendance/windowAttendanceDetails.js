const WindowAttendanceDetails = ({ winattendance }) => {

    var total_attendance = 30;
    var total_presents = winattendance.student_attendance_record;
    var total_absents = total_attendance - parseInt(winattendance.student_attendance_record);

    return (
        <>
        <tr>
            <td>{winattendance.student_lastname + ", " + winattendance.student_firstname + " " + winattendance.student_middlename + "."}</td>
            <td>{winattendance.student_id}</td>
            <td>{winattendance.student_grade_level + " " + winattendance.student_strand + " " + winattendance.student_section}</td>
            <td>{total_presents}</td>
            <td>{total_absents}</td>
            <td>
                <button className="windowAttendance_notify"><img src="notifications_active_FILL1_wght400_GRAD0_opsz48.png" alt="notify"></img></button>
                <button className="windowAttendance_view"><img src="visibility_FILL1_wght400_GRAD0_opsz48.png" alt="view"></img></button>
            </td>
        </tr>
        </>
    )
}

export default WindowAttendanceDetails