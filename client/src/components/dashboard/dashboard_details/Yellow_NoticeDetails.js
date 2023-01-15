// Adding data in the Yellow Notice table
const YellowNoticeDetails = ({ studentAttendance }) => {
    const handleSubmittt = (e) =>{
        e.preventDefault()
        console.log("Yellow Notice")
    }
    return (
        <>
            <tr>
                <td>{studentAttendance.student_lastname + ", " + studentAttendance.student_firstname}</td>
                <td>{studentAttendance.student_id}</td>
                <td>{studentAttendance.student_grade_level + " " + studentAttendance.student_strand + " " + studentAttendance.student_section}</td>
                <td>{30 - Number(studentAttendance.student_attendance_record)}</td>
                <td className="td_notify" onClick={handleSubmittt}>
                    <button className="notify_button">
                        <span className="material-symbols-outlined" id="notif_active">notifications_active</span> Notify
                    </button>
                </td>
            </tr>
        </>
    )
}

export default YellowNoticeDetails