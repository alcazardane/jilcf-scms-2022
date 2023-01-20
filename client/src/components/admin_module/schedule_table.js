import edit_icon from "../../images/edit_FILL0_wght400_GRAD0_opsz48.png";
import delete_icon from "../../images/delete_FILL0_wght400_GRAD0_opsz48.png";

const ScheduleTable = ({ viewSchedule, editSchedule, checkDeleteSched }) => {

    return (
        <>
        <tr className="winAtt_viewStudent_table_body-b schedule-tb-body">
            <td>{viewSchedule.class_id}</td>
            <td>{viewSchedule.class_type}</td>
            <td>{viewSchedule.class_start_hh + ":" + viewSchedule.class_start_mm + " " + viewSchedule.class_start_pa
            + " - " + viewSchedule.class_end_hh + ":" + viewSchedule.class_end_mm + " " + viewSchedule.class_end_pa}</td>
            <td>{viewSchedule.subject_name}</td>
            <td>{viewSchedule.class_room}</td>
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