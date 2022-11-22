const MultiEditAttReason = ({ 
    openMultiEditReasons,  
    setOpenMultiEditReasons, 
    setNewReason,
    setNewIntervention,
    updateMultiAttReasons }) => {

    if(!openMultiEditReasons) return null

    var root = document.querySelector(":root");

    const closeMultiEditReason = () => {
        root.style.setProperty('--MultiEditAttendanceRes-Modals-PointerEvents', "none");
        root.style.setProperty('--MultiEditAttendanceRes-Modals-Opacity', "0");
        setOpenMultiEditReasons(false);
    }

    return (
        <>
            <div className="MultiEditAtt_Modal_Container">
                <div className="editAtt_Modal_label">Edit selected items:</div>
                <input 
                    type="text" 
                    className="editAtt_input" 
                    placeholder="Edit Reasons"
                    onChange={(e) => setNewReason(e.target.value)}>
                </input>
                <input 
                    type="text" 
                    className="editAtt_input"
                    placeholder="Edit Interventions" 
                    onChange={(e) => setNewIntervention(e.target.value)}>
                </input>
                <button className="editAtt_cancel_button" onClick={closeMultiEditReason}>Cancel</button>
                <button className="editAtt_update_button" onClick={updateMultiAttReasons}>Update</button>
            </div>
        </>
    )
}

export default MultiEditAttReason