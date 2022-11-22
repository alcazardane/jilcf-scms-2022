// import images
import edit_icon from "../../images/edit_FILL0_wght400_GRAD0_opsz48.png";


const WinAttViewStudentDetails = ({ 
    viewstudatt, 
    editAttendanceReason, 
    setOpenEditReason, 
    setUpdateReasonID,
    editAttendanceIntervention,
    setOpenEditIntervention,
    setUpdateInterventionID,
    setDataToBeDeleted,
    // attRecordsToBeDeleted
}) => {
         
    return(
        <>
        <tr className="winAtt_viewStudent_table_body">
            <td>
                <input type="checkbox"
                    onChange={ e => 
                        {setDataToBeDeleted(e, viewstudatt._id)
                        // attRecordsToBeDeleted(e, viewstudatt)
                        }}></input>
            </td>
            <td>{viewstudatt.timestamp}</td>
            <td>{viewstudatt.status}</td>
            <td>{viewstudatt.reasons}</td>
            <td>
                <img className="editButton" src={edit_icon} alt="edit"
                    onClick={event => 
                        {editAttendanceReason(event, viewstudatt._id); 
                        setOpenEditReason(true);
                        setUpdateReasonID(viewstudatt._id)}}>                    
                </img>
            </td>
            <td>{viewstudatt.intervention}</td>
            <td>
                <img className="editButton" src={edit_icon} alt="edit"
                    onClick={event =>
                        {editAttendanceIntervention(event, viewstudatt._id);
                        setOpenEditIntervention(true);
                        setUpdateInterventionID(viewstudatt._id)}}>
                </img>
            </td>
        </tr>
        </>
    )
}

export default WinAttViewStudentDetails