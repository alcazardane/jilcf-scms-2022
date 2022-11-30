const CreateSchedModal = ({ 
    addSchedule,
    resetSchedInputs,
    setSchedUserID,
    setSchedTask,
    setSchedTime,
    setSchedSubjID,
    setSchedClass,
    setSchedRoom,
    setSchedRepeat,
    schedUserID,
    schedTask,
    schedTime,
    schedSubjID,
    schedClass,
    schedRoom,
    schedRepeat
    }) => {

    // if(!openEditIntervention) return null

    var root = document.querySelector(":root");

    const cancelCreate = () => {
        root.style.setProperty('--adminModule_create_sched_modal-pointer-events', "none");
        root.style.setProperty('--adminModule_create_sched_modal-opacity', "0");

        resetSchedInputs();
    }

    return (
        <>
            <div className="adminModule_create_account_con">
                <div className="editAtt_Modal_label-b">Create Schedule</div>

                <div className="adminModule_create_input_inside-b">
                    <span className="adminModule_create_label">User ID:</span>
                    <input 
                        type="text" 
                        className="create_input" 
                        placeholder="Enter User ID"
                        value={schedUserID}
                        onChange={(e) => setSchedUserID(e.target.value)}>
                    </input>
                </div>

                <div className="adminModule_create_input_wrap">
                    <div className="adminModule_create_input_inside">
                        <span className="adminModule_create_label">Task:</span>
                        <select
                            className="create_select"
                            value={schedTask} 
                            onChange={(e) => setSchedTask(e.target.value)}>
                                <option value="Meeting">Meeting</option>
                                <option value="Class">Class</option>
                                <option value="Event">Event</option>
                        </select>
                    </div>

                    <div className="adminModule_create_input_inside">
                        <span className="adminModule_create_label">Time:</span>
                        <input 
                            type="text" 
                            className="create_input" 
                            placeholder="Enter Schedule Time"
                            value={schedTime}
                            onChange={(e) => setSchedTime(e.target.value)}>
                        </input>
                    </div>

                    <div className="adminModule_create_input_inside">
                        <span className="adminModule_create_label">Subject ID:</span>
                        <select
                            className="create_select"
                            value={schedSubjID}
                            onChange={(e) => setSchedSubjID(e.target.value)}>
                                <option value="FAC-001">FAC-001</option>
                                <option value="GEN-001">GEN-001</option>
                                <option value="GM-001">GM-001</option>
                                <option value="CP-001">CP-001</option>
                                <option value="OC-001">OC-001</option>
                                <option value="ELS-001">ELS-001</option>
                        </select>
                    </div>
                </div>

                <div className="adminModule_create_input_wrap">
                    <div className="adminModule_create_input_inside">
                        <span className="adminModule_create_label">Scheduled Class:</span>
                        <select 
                            className="create_select" 
                            value={schedClass}
                            onChange={(e) => setSchedClass(e.target.value)}>
                                <option value="Faculty Meeting">Faculty Meeting</option>
                                <option value="School Program">School Program</option>
                                <option value="General Mathematics">General Mathematics</option>
                                <option value="Oral Communication">Oral Communication</option>
                                <option value="Earth and Life Science">Earth and Life Science</option>
                                <option value="Computer Programming">Computer Programming</option>
                        </select>
                    </div>

                    <div className="adminModule_create_input_inside">
                        <span className="adminModule_create_label">Room:</span>
                        <select 
                            className="create_select" 
                            value={schedRoom}
                            onChange={(e) => setSchedRoom(e.target.value)}>
                                <option value="BLDG A - Discipline's Office">BLDG A - Discipline's Office</option>
                                <option value="BLDG A - RM303">BLDG A - RM303</option>
                                <option value="BLDG A - RM304">BLDG A - RM304</option>
                                <option value="BLDG A - RM503">BLDG A - RM503</option>
                        </select>
                    </div>

                    <div className="adminModule_create_input_inside">
                        <span className="adminModule_create_label">Repeat:</span>
                        <input 
                            type="text" 
                            className="create_input" 
                            placeholder="Enter Repeat Days"
                            value={schedRepeat}
                            onChange={(e) => setSchedRepeat(e.target.value)}>
                        </input>
                    </div>
                </div>


                <button className="editAtt_cancel_button" onClick={cancelCreate}>Cancel</button>
                <button className="editAtt_update_button" onClick={addSchedule}>Add</button>
            </div>
        </>
    )
}

export default CreateSchedModal