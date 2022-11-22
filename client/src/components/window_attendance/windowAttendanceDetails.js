const WindowAttendanceDetails = ({ studinfo, goToViewStudent }) => {

    // var total_attendance = 30;
    // var total_presents = winattendance.student_attendance_record;
    // var total_absents = total_attendance - parseInt(winattendance.student_attendance_record);


    // var root = document.querySelector(":root");

    // const goToViewStudent = () => {
    //     root.style.setProperty('--winAtt-Default-PointerEvents', "none");
    //     root.style.setProperty('--winAtt-Default-Opacity', "0");
    //     root.style.setProperty('--winAtt-Default-Transform', "100%");

    //     root.style.setProperty('--winAtt-ViewStudent-PointerEvents', "all");
    //     root.style.setProperty('--winAtt-ViewStudent-Opacity', "1");
    //     root.style.setProperty('--winAtt-ViewStudent-Transform', "0%");
    // }

    return (
        <>
        <tr>
            {/* <td>{winattendance.student_lastname + ", " + winattendance.student_firstname + " " + winattendance.student_middlename + "."}</td>
            <td>{winattendance.student_id}</td>
            <td>{winattendance.student_grade_level + " " + winattendance.student_strand + " " + winattendance.student_section}</td>
            <td>{total_presents}</td>
            <td>{total_absents}</td> */}
            <td>{studinfo.lname + ", " + studinfo.fname + " " + studinfo.mname + "."}</td>
            <td>{studinfo.userID}</td>
            <td>{studinfo.grade_level + " " + studinfo.strand + " " + studinfo.section}</td>
            <td>0</td>
            <td>0</td>
            <td>
                <button className="windowAttendance_notify"><img src="notifications_active_FILL1_wght400_GRAD0_opsz48.png" alt="notify"></img></button>
                <button className="windowAttendance_view" onClick={event => goToViewStudent(event, studinfo.userID)}>
                    <img src="visibility_FILL1_wght400_GRAD0_opsz48.png" alt="view"></img>
                </button>
            </td>
        </tr>
        </>
    )
}

export default WindowAttendanceDetails