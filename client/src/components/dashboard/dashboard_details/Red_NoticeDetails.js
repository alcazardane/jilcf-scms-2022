// Adding data in the Red Notice table
const RedNoticeDetails = ({ studentAttendance }) => {

    return (
        <>
            <tr>
                <td>{studentAttendance.student_lastname + ", " + studentAttendance.student_firstname}</td>
                <td>{studentAttendance.student_id}</td>
                <td>{studentAttendance.student_grade_level + " " + studentAttendance.student_strand + " " + studentAttendance.student_section}</td>
                <td>{30 - Number(studentAttendance.student_attendance_record)}</td>
                <td className="td_notify">
                    <button className="notify_button">
                        <span className="material-symbols-outlined" id="notif_active">notifications_active</span> Notify
                    </button>
                </td>
            </tr>
        </>
    )
}

export default RedNoticeDetails