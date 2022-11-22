const EditAttReason = ({ 
    openEditReason, 
    editReason, 
    setOpenEditReason, 
    setNewReason, 
    updateAttendanceReason }) => {

    if(!openEditReason) return null

    var root = document.querySelector(":root");

    const closeEditReason = () => {
        root.style.setProperty('--editAttendance-Modals-PointerEvents', "none");
        root.style.setProperty('--editAttendance-Modals-Opacity', "0");
        setOpenEditReason(false);
    }

    return (
        <>
            <div className="editAtt_Modal_Container">
                <div className="editAtt_Modal_label">Edit reasons:</div>
                <input 
                    type="text" 
                    className="editAtt_input" 
                    placeholder={editReason.reasons}
                    onChange={(e) => setNewReason(e.target.value)}>
                </input>
                <button className="editAtt_cancel_button" onClick={closeEditReason}>Cancel</button>
                <button className="editAtt_update_button" onClick={updateAttendanceReason}>Update</button>
            </div>
        </>
    )
}

export default EditAttReason