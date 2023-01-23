import edit_icon from "../../images/edit_FILL0_wght400_GRAD0_opsz48.png";
import delete_icon from "../../images/delete_FILL0_wght400_GRAD0_opsz48.png";

const AccountsTable = ({ viewAccount, editAccount, checkDeleteAccount }) => {

    let class_section;
    const getClassSec = (sec) => {
        if (sec === "admin" || sec === "Teacher"){
            class_section = 
            <>
                {viewAccount.glvl}
            </>

            return class_section;
        }
        else{
            class_section =
            <>
                {viewAccount.glvl + " " + viewAccount.strand + " " + viewAccount.section}
            </>
            return class_section;
        }
    }

    return (
        <>
        <tr className="winAtt_viewStudent_table_body-b">
            <td>{viewAccount.idNumber}</td>
            <td>{viewAccount.level}</td>
            <td>{viewAccount.lname + ", " + viewAccount.fname}</td>
            <td>{viewAccount.track}</td>
            <td>{getClassSec(viewAccount.glvl)}</td>
            <td>
                <button className="windowAttendance_notify">
                    <img src={edit_icon} alt="edit" onClick={event => {editAccount(event, viewAccount._id)}}></img>
                </button>
                <button className="windowAttendance_notify">
                    <img src={delete_icon} alt="delete" onClick={e => {checkDeleteAccount(e, viewAccount._id)}}></img>
                </button>
            </td>
        </tr>
        </>
    )
}

export default AccountsTable