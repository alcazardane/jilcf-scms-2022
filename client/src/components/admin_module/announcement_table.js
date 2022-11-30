import edit_icon from "../../images/edit_FILL0_wght400_GRAD0_opsz48.png";
import delete_icon from "../../images/delete_FILL0_wght400_GRAD0_opsz48.png";

const AnnouncementTable = ({ viewAnnouncement, editAnnounce, checkDeleteAnnounce }) => {

    return (
        <>
        <tr className="winAtt_viewStudent_table_body-b">
            <td>{viewAnnouncement.announcement_type}</td>
            <td>{viewAnnouncement.announcement_name}</td>
            <td>{viewAnnouncement.announcement_date}</td>
            <td>{viewAnnouncement.announcement_time}</td>
            <td>{viewAnnouncement.announcement_place}</td>
            <td>
                <button className="windowAttendance_notify">
                    <img src={edit_icon} alt="edit" 
                    onClick={event => {editAnnounce(event, viewAnnouncement._id)}}
                    >
                    </img>
                </button>
                <button className="windowAttendance_notify">
                    <img src={delete_icon} alt="delete" 
                    onClick={e => {checkDeleteAnnounce(e, viewAnnouncement._id)}}
                    >
                    </img>
                </button>
            </td>
        </tr>
        </>
    )
}

export default AnnouncementTable