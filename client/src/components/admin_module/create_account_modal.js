const CreateAccountModal = ({ 
    addAccount,
    resetInputs,
    setAccountName,
    setAccountUserID,
    setAccountPassword,
    setAccountLevel,
    setAccountTrack,
    setAccountStrand,
    setAccountSecAdv,
    accountUserID,
    accountPassword,
    accountLevel,
    accountTrack,
    accountStrand,
    accountSecAdv,
    accountName
    }) => {

    // if(!openEditIntervention) return null

    var root = document.querySelector(":root");

    const cancelCreate = () => {
        root.style.setProperty('--adminModule_create_modal-pointer-events', "none");
        root.style.setProperty('--adminModule_create_modal-opacity', "0");

        resetInputs();
    }

    return (
        <>
            <div className="adminModule_create_account_con">
                <div className="editAtt_Modal_label-b">Create an Account</div>

                <div className="adminModule_create_input_inside-b">
                    <span className="adminModule_create_label">Name:</span>
                    <input 
                        type="text" 
                        className="create_input" 
                        placeholder="Enter Name"
                        value={accountName}
                        onChange={(e) => setAccountName(e.target.value)}>
                    </input>
                </div>

                <div className="adminModule_create_input_wrap">
                    <div className="adminModule_create_input_inside">
                        <span className="adminModule_create_label">User ID:</span>
                        <input 
                            type="text" 
                            className="create_input" 
                            placeholder="Enter User ID"
                            value={accountUserID}
                            onChange={(e) => setAccountUserID(e.target.value)}>
                        </input>
                    </div>

                    <div className="adminModule_create_input_inside">
                        <span className="adminModule_create_label">Password:</span>
                        <input 
                            type="text" 
                            className="create_input" 
                            placeholder="Enter Password"
                            value={accountPassword}
                            onChange={(e) => setAccountPassword(e.target.value)}>
                        </input>
                    </div>

                    <div className="adminModule_create_input_inside">
                        <span className="adminModule_create_label">Level:</span>
                        <select
                            type="text" 
                            className="create_select" 
                            placeholder="Enter User Level"
                            value={accountLevel}
                            onChange={(e) => setAccountLevel(e.target.value)}>
                                <option value="1">1</option>
                                <option value="2">2</option>
                                <option value="3">3</option>
                        </select>
                    </div>
                </div>

                <div className="adminModule_create_input_wrap">
                    <div className="adminModule_create_input_inside">
                        <span className="adminModule_create_label">Track:</span>
                        <select 
                            type="text" 
                            className="create_select" 
                            placeholder="Enter Track"
                            value={accountTrack}
                            onChange={(e) => setAccountTrack(e.target.value)}>
                                <option value="Admin">Admin</option>
                                <option value="Academic">Academic</option>
                                <option value="TVL">TVL</option>
                        </select>
                    </div>

                    <div className="adminModule_create_input_inside">
                        <span className="adminModule_create_label">Strand:</span>
                        <select 
                            type="text" 
                            className="create_select" 
                            placeholder="Enter Strand"
                            value={accountStrand}
                            onChange={(e) => setAccountStrand(e.target.value)}>
                                <option value="Admin">Admin</option>
                                <option value="ABM">ABM</option>
                                <option value="HUMMS">HUMMS</option>
                                <option value="STEM">STEM</option>
                                <option value="TVL">TVL</option>
                        </select>
                    </div>

                    <div className="adminModule_create_input_inside">
                        <span className="adminModule_create_label">Section:</span>
                        <input 
                            type="text" 
                            className="create_input" 
                            placeholder="Enter Section"
                            value={accountSecAdv}
                            onChange={(e) => setAccountSecAdv(e.target.value)}>
                        </input>
                    </div>
                </div>


                <button className="editAtt_cancel_button" onClick={cancelCreate}>Cancel</button>
                <button className="editAtt_update_button" onClick={addAccount}>Add</button>
            </div>
        </>
    )
}

export default CreateAccountModal