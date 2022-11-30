//import { useState } from "react"

const EditAccountModal = ({ 
    editAccountValue,
    updateAccount,
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

    var root = document.querySelector(":root");

    const cancelEdit = () => {
        root.style.setProperty('--adminModule_edit_modal-pointer-events', "none");
        root.style.setProperty('--adminModule_edit_modal-opacity', "0");

        resetInputs();
    }

    return (
        <>
            <div className="adminModule_create_account_con">
                <div className="editAtt_Modal_label-b">Edit Account</div>

                <div className="adminModule_create_input_inside-b">
                    <span className="adminModule_create_label">Name:</span>
                    <input 
                        type="text" 
                        className="create_input" 
                        // defaultValue={accountName}
                        value={accountName}
                        placeholder={accountName}
                        //value={state.name}
                        onChange={(e) => setAccountName(e.target.value)}
                    >
                    </input>
                </div>

                <div className="adminModule_create_input_wrap">
                    <div className="adminModule_create_input_inside">
                        <span className="adminModule_create_label">User ID:</span>
                        <input 
                            type="text" 
                            className="create_input" 
                            //placeholder={editAccountValue.userID}
                            // defaultValue={accountUserID}
                            value={accountUserID}
                            placeholder={accountUserID}
                            // value={state.userID}
                            onChange={(e) => setAccountUserID(e.target.value)}>
                        </input>
                    </div>

                    <div className="adminModule_create_input_inside">
                        <span className="adminModule_create_label">Password:</span>
                        <input 
                            type="text" 
                            className="create_input" 
                            //placeholder={editAccountValue.password}
                            // defaultValue={accountPassword}
                            value={accountPassword}
                            placeholder={accountPassword}
                            // value={state.password}
                            onChange={(e) => setAccountPassword(e.target.value)}>
                        </input>
                    </div>

                    <div className="adminModule_create_input_inside">
                        <span className="adminModule_create_label">Level:</span>
                        <select
                            type="text" 
                            className="create_select" 
                            //placeholder={editAccountValue.level}
                            // defaultValue={accountLevel}
                            value={accountLevel}
                            placeholder={accountLevel}
                            // value={state.level}
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
                            //placeholder="Enter Track"
                            // defaultValue={accountTrack}
                            value={accountTrack}
                            placeholder={accountTrack}
                            //value={state.track}
                            onChange={(e) => setAccountTrack(e.target.value)}>
                                <option value="admin">Admin</option>
                                <option value="academic">Academic</option>
                                <option value="tvl">TVL</option>
                        </select>
                    </div>

                    <div className="adminModule_create_input_inside">
                        <span className="adminModule_create_label">Strand:</span>
                        <select 
                            type="text" 
                            className="create_select" 
                            //placeholder="Enter Strand"
                            // defaultValue={accountStrand}
                            value={accountStrand}
                            placeholder={accountStrand}
                            // value={state.strand}
                            onChange={(e) => setAccountStrand(e.target.value)}>
                                <option value="admin">Admin</option>
                                <option value="abm">ABM</option>
                                <option value="humms">HUMMS</option>
                                <option value="stem">STEM</option>
                                <option value="tvl">TVL</option>
                        </select>
                    </div>

                    <div className="adminModule_create_input_inside">
                        <span className="adminModule_create_label">Section:</span>
                        <input 
                            type="text" 
                            className="create_input" 
                            // placeholder="Enter Section"
                            // defaultValue={accountSecAdv}
                            value={accountSecAdv}
                            placeholder={accountSecAdv}
                            // value={state.secAdv}
                            onChange={(e) => setAccountSecAdv(e.target.value)}>
                        </input>
                    </div>
                </div>


                <button className="editAtt_cancel_button" onClick={cancelEdit}>Cancel</button>
                <button className="editAtt_update_button" onClick={e => {updateAccount(e)}}>Update</button>
            </div>
        </>
    )
}

export default EditAccountModal