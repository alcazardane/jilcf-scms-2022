import edit_icon from "../../images/edit_FILL0_wght400_GRAD0_opsz48.png";
import delete_icon from "../../images/delete_FILL0_wght400_GRAD0_opsz48.png";

const AccountsTable = ({ viewAccount, editAccount, checkDeleteAccount }) => {

    return (
        <>
        <tr className="winAtt_viewStudent_table_body-b">
            <td>{viewAccount.userID}</td>
            <td>{viewAccount.password}</td>
            <td>{viewAccount.level}</td>
            <td>{viewAccount.name}</td>
            <td>{viewAccount.track}</td>
            <td>{viewAccount.strand + " " + viewAccount.secAdv}</td>
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