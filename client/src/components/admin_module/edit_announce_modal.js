const EditAnnounceModal = ({ 
    updateAnnounce,
    resetAnnounceInputs,
    setAnnounceType,
    setAnnounceName,
    setAnnounceDate,
    setAnnounceTime,
    setAnnouncePlace,
    announceType,
    announceName,
    announceDate,
    announceTime,
    announcePlace
    }) => {

    var root = document.querySelector(":root");

    const cancelEdit = () => {
        root.style.setProperty('--adminModule_edit_announce_modal-pointer-events', "none");
        root.style.setProperty('--adminModule_edit_announce_modal-opacity', "0");

        resetAnnounceInputs();
    }

    return (
        <>
            <div className="adminModule_create_account_con">
                <div className="editAtt_Modal_label-b">Edit Announcement</div>

                <div className="adminModule_create_input_inside-b">
                    <span className="adminModule_create_label">Name:</span>
                    <input 
                        type="text" 
                        className="create_input" 
                        placeholder="Enter Announcement Name"
                        value={announceName}
                        onChange={(e) => setAnnounceName(e.target.value)}>
                    </input>
                </div>

                <div className="adminModule_create_input_wrap">
                    <div className="adminModule_create_input_inside announce-input">
                        <span className="adminModule_create_label">Type:</span>
                        <select
                            className="create_select"
                            value={announceType} 
                            onChange={(e) => setAnnounceType(e.target.value)}>
                                <option value="School Program">School Program</option>
                                <option value="Seminar">Seminar</option>
                                <option value="Competition">Competition</option>
                        </select>
                    </div>
                    <div className="adminModule_create_input_inside announce-input">
                        <span className="adminModule_create_label">Place:</span>
                        <input 
                            type="text" 
                            className="create_input" 
                            placeholder="Enter Schedule Time"
                            value={announcePlace}
                            onChange={(e) => setAnnouncePlace(e.target.value)}>
                        </input>
                    </div>
                </div>

                <div className="adminModule_create_input_wrap">
                    <div className="adminModule_create_input_inside announce-input">
                        <span className="adminModule_create_label">Date:</span>
                        <input 
                            type="text" 
                            className="create_input" 
                            placeholder="Enter Date"
                            value={announceDate}
                            onChange={(e) => setAnnounceDate(e.target.value)}>
                        </input>
                    </div>
                    <div className="adminModule_create_input_inside announce-input">
                        <span className="adminModule_create_label">Time:</span>
                        <input 
                            type="text" 
                            className="create_input" 
                            placeholder="Enter Time"
                            value={announceTime}
                            onChange={(e) => setAnnounceTime(e.target.value)}>
                        </input>
                    </div>
                </div>


                <button className="editAtt_cancel_button" onClick={cancelEdit}>Cancel</button>
                <button className="editAtt_update_button" onClick={e => {updateAnnounce(e)}}>Update</button>
            </div>
        </>
    )
}

export default EditAnnounceModal