import notify_icon from "../../images/notifications_active_FILL1_wght400_GRAD0_opsz48.png"
import view_icon from "../../images/visibility_FILL1_wght400_GRAD0_opsz48.png"

const WindowAttendanceDetails = ({ studinfo, goToViewStudent }) => {

    return (
        <>
        <tr>
            <td>{studinfo.lname + ", " + studinfo.fname + " " + studinfo.mname.substring(0,1) + "."}</td>
            <td>{studinfo.userID}</td>
            <td>{studinfo.track}</td>
            <td>0</td>
            <td>0</td>
            <td>
                <button className="windowAttendance_notify"><img src={notify_icon} alt="notify"></img></button>
                <button className="windowAttendance_view" onClick={event => goToViewStudent(event, studinfo.userID)}>
                    <img src={view_icon} alt="view"></img>
                </button>
            </td>
        </tr>
        </>
    )
}

export default WindowAttendanceDetails