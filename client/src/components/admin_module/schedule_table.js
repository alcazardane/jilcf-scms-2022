import edit_icon from "../../images/edit_FILL0_wght400_GRAD0_opsz48.png";
import delete_icon from "../../images/delete_FILL0_wght400_GRAD0_opsz48.png";

const ScheduleTable = ({ viewSchedule, editSchedule, checkDeleteSched }) => {

    return (
        <>
        <tr className="winAtt_viewStudent_table_body-b schedule-tb-body">
            <td>{viewSchedule.userID}</td>
            <td>{viewSchedule.task}</td>
            <td>{viewSchedule.time}</td>
            <td>{viewSchedule.subj_id + " - " + viewSchedule.sched_class}</td>
            <td>{viewSchedule.room}</td>
            {/* <td>{viewSchedule.repeat.substring(0,1)}</td> */}
            <td>
                <button className="windowAttendance_notify">
                    <img src={edit_icon} alt="edit" 
                    onClick={event => {editSchedule(event, viewSchedule._id)}}
                    >
                    </img>
                </button>
                <button className="windowAttendance_notify">
                    <img src={delete_icon} alt="delete" 
                    onClick={e => {checkDeleteSched(e, viewSchedule._id)}}
                    >
                    </img>
                </button>
            </td>
        </tr>
        </>
    )
}

export default ScheduleTable