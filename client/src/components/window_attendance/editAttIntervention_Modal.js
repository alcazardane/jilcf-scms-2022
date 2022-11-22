const EditAttIntervention = ({ 
    openEditIntervention, 
    editIntervention, 
    setOpenEditIntervention, 
    setNewIntervention, 
    updateAttendanceIntervention }) => {

    if(!openEditIntervention) return null

    var root = document.querySelector(":root");

    const closeEditIntervention = () => {
        root.style.setProperty('--editAttendanceInt-Modals-PointerEvents', "none");
        root.style.setProperty('--editAttendanceInt-Modals-Opacity', "0");
        setOpenEditIntervention(false);
    }

    return (
        <>
            <div className="editAtt_Modal_Container">
                <div className="editAtt_Modal_label">Edit intervention:</div>
                <input 
                    type="text" 
                    className="editAtt_input" 
                    placeholder={editIntervention.intervention}
                    onChange={(e) => setNewIntervention(e.target.value)}>
                </input>
                <button className="editAtt_cancel_button" onClick={closeEditIntervention}>Cancel</button>
                <button className="editAtt_update_button" onClick={updateAttendanceIntervention}>Update</button>
            </div>
        </>
    )
}

export default EditAttIntervention