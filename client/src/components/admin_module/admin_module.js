import { useDrag } from '@use-gesture/react'
import { useSpring, animated } from 'react-spring'
import { useState, useEffect, useRef } from 'react'


// Import Components
import AccountsTable from './accounts_table'
import Register from './create_userAccount'
import CreateAccountModal from './create_account_modal'
import EditAccountModal from './edit_account_modal'

import ScheduleTable from './schedule_table'
import CreateSchedModal from './create_schedule_modal'
import EditScheduleModal from './edit_schedule_modal'

import AnnouncementTable from './announcement_table'
import CreateAnnounceModal from './create_announcement_modal'
import EditAnnounceModal from './edit_announce_modal'

import '../../styles/admin_module_styles.css'

// Import Images
import search_icon from "../../images/search_FILL0_wght400_GRAD0_opsz48.png";
import refresh_icon from "../../images/refresh_FILL1_wght400_GRAD0_opsz48.png"


import useWindowDimensions from '../dashboard/hooks/useWindowDimensions'

export default function AdminModule({adminAccRef, adminSchedRef, adminAnnRef}) {

    var root = document.querySelector(":root");

    // For window snapping
    const { height, width } = useWindowDimensions();
    var rightBound = width - (width * 0.60) - 38 + 4;
    var bottomBound = height - (height * 0.70) - 18 - 50 + 4;
    var leftBound = 30;
    var topBound = 15;

    // Get the x and y values to use it for maximizing the window
    var xVal = 0;
    var yVal = 0;

    // For Dragging
    const [{ x, y }, adminPos] = useSpring(() => ({ x: 0, y: 0 }));
    const bindAdminPos = useDrag((state) => {
        xVal = state.offset[0];
        yVal = state.offset[1];
        adminPos.set({
            x: xVal,
            y: yVal
        });
        // console.log("x: " + xVal + ", y: " + yVal);
    }, {
        from: () => {
            return [x.get(), y.get()];
        },
        bounds: () => {
            return {left: -leftBound, right: rightBound, top: -topBound, bottom: bottomBound};
        },
    });


    // For minimize and maximize button
    const [adminModuleIsMinimized,  setAdminModuleIsMininimized] = useState(true);
    const minmaxAdminModule = () => {

      if(adminModuleIsMinimized === true){

        root.style.setProperty('--adminModule-L1-window-width', "calc(100% - 4px)")
        root.style.setProperty('--adminModule-L1-window-height', "calc(100% - 49px)")

        root.style.setProperty('--border-radius', "0")
        root.style.setProperty('--border-radius-b', "0")

        root.style.setProperty('--adminModule-top', `${-yVal}px`)
        root.style.setProperty('--adminModule-left', `${-xVal}px`)

        root.style.setProperty('--adminModule-display-b', "none")

          adminPos.set({
            x: xVal,
            y: yVal
          });

          setAdminModuleIsMininimized(false)
      }
      else{

        root.style.setProperty('--adminModule-L1-window-width', "70%")
        root.style.setProperty('--adminModule-L1-window-height', "70%")

        root.style.setProperty('--border-radius', "7px")
        root.style.setProperty('--border-radius-b', "7px 7px 0 0")

        root.style.setProperty('--adminModule-top', "15px")
        root.style.setProperty('--adminModule-left', "30px")

        root.style.setProperty('--adminModule-display-b', "block")

        setAdminModuleIsMininimized(true)
      }
    }

    // For close or exit button
    const closeAdminModule = () => {
      root.style.setProperty('--adminModule-L1-window-width', "70%")
      root.style.setProperty('--adminModule-L1-window-height', "70%")

      root.style.setProperty('--adminModule_L1_display', "none")
      root.style.setProperty('--adminModule-display-b', "none")

      root.style.setProperty('--border-radius', "7px")
      root.style.setProperty('--border-radius-b', "7px 7px 0 0")

      root.style.setProperty('--adminModule-top', "15px")
      root.style.setProperty('--adminModule-left', "30px")

    setAdminModuleIsMininimized(true)
    }


//======================================================================================================================
//==================================================== FOR ACCCOUNT ====================================================
//======================================================================================================================

    // Fetching account records
    const [viewAccounts, setViewAccounts] = useState([]);

    useEffect(() =>{
        const fetchRecord= async () => {
            const response = await fetch('http://localhost:5000/record')
            const json = await response.json()

            if (response.ok){
                setViewAccounts(json)
            }
        }
        fetchRecord()
    }, [])


    // getting and setting credentials
    const [accountName, setAccountName] = useState("");
    const [accountUserID, setAccountUserID] = useState("");
    const [accountPassword, setAccountPassword] = useState("");
    const [accountLevel, setAccountLevel] = useState("");
    const [accountTrack, setAccountTrack] = useState("");
    const [accountStrand, setAccountStrand] = useState("");
    const [accountSecAdv, setAccountSecAdv] = useState("");

    //const [accountProfilePic, setAccountProfilePic] = useState();

    // To open Create account modal
    const createAccount = () => {

        root.style.setProperty('--adminModule_create_modal-pointer-events', "all");
        root.style.setProperty('--adminModule_create_modal-opacity', "1");

        //resetInputs();
        //refreshTable();
    }

    // Will add the inputs to the database
    const addAccount = () => {

        refreshTable();
        let databody = {
            "userID": accountUserID,
            "password": accountPassword,
            "level": accountLevel,
            "track": accountTrack,
            "strand": accountStrand,
            "secAdv": accountSecAdv,
            "name": accountName,
            "profilePic": "Name.png",
        }
        fetch('http://localhost:5000/record/add', {
            method: 'POST',
            body: JSON.stringify(databody),
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(response => response.json());


        root.style.setProperty('--adminModule_create_modal-pointer-events', "none");
        root.style.setProperty('--adminModule_create_modal-opacity', "0");
        resetInputs();
        refreshTable();
    }

    // For searching
    const [accountQuery, setAccountQuery] = useState("");
    const keys = ["userID", "name", "level", "track", "strand", "secAdv"]
    //const keys = ["name"]

//=====================================================================================================================
    // Editing account record
    const [editAccountValue, setEditAccountValue] = useState([]);
    const [editAccountID, setEditAccountID] = useState([]);

    useEffect (() => {
        setEditAccountID(editAccountValue._id)
        setAccountName(editAccountValue.name);
        setAccountUserID(editAccountValue.userID);
        setAccountPassword(editAccountValue.password);
        setAccountLevel(editAccountValue.level);
        setAccountTrack(editAccountValue.track);
        setAccountStrand(editAccountValue.strand);
        setAccountSecAdv(editAccountValue.secAdv);
    }, [editAccountValue])

    const editAccount = (e, editID) => {

        fetch('http://localhost:5000/record/' + editID).then(res => res.json()).then(result => {
            setEditAccountValue(result)
        })

        root.style.setProperty('--adminModule_edit_modal-pointer-events', "all");
        root.style.setProperty('--adminModule_edit_modal-opacity', "1");
    }

    const updateAccount = (e) => {
        //e.preventDefault();
        refreshTable();

        let databody = {
            "userID": accountUserID,
            "password": accountPassword,
            "level": accountLevel,
            "track": accountTrack,
            "strand": accountStrand,
            "secAdv": accountSecAdv,
            "name": accountName,
            "profilePic": "Name.png",
        }
        fetch('http://localhost:5000/update/' + editAccountID, {
            method: 'POST',
            body: JSON.stringify(databody),
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(response => response.json());

        root.style.setProperty('--adminModule_edit_modal-pointer-events', "none");
        root.style.setProperty('--adminModule_edit_modal-opacity', "0");

        resetInputs();
        refreshTable();
    }


//======================================================================================================================
    // Deleting account record
    const [accountToDelete, setAccountToDelete] = useState([])
    const [accountToDeleteID, setAccountToDeleteID] = useState([])

    const checkDeleteAccount = (e, deleteID) => {

        setAccountToDeleteID(deleteID)

        fetch('http://localhost:5000/record/' + deleteID).then(res => res.json()).then(result => {
            setAccountToDelete(result)
        })
        
        root.style.setProperty('--ConfirmDelete-Modal-Admin-PointerEvents', "all");
        root.style.setProperty('--ConfirmDelete-Modal-Admin-Opacity', "1");
    }

    const cancelDelete = () => {
        root.style.setProperty('--ConfirmDelete-Modal-Admin-PointerEvents', "none");
        root.style.setProperty('--ConfirmDelete-Modal-Admin-Opacity', "0");
        setAccountToDelete([]);
    }

    const confirmDelete = () => {
        refreshTable();

        let databody = {
            "userID": accountToDelete.userID,
            "password": accountToDelete.password,
            "level": accountToDelete.level,
            "track": accountToDelete.track,
            "strand": accountToDelete.strand,
            "secAdv": accountToDelete.secAdv,
            "name": accountToDelete.name,
            "profilePic": "Name.png",
        }

        fetch('http://localhost:5000/deleted_records/accounts', {
            method: 'POST',
            body: JSON.stringify(databody),
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(response => response.json());

        fetch('http://localhost:5000/' + accountToDeleteID, {
            method: 'DELETE'
        })
        .then(response => response.json());

        root.style.setProperty('--ConfirmDelete-Modal-Admin-PointerEvents', "none");
        root.style.setProperty('--ConfirmDelete-Modal-Admin-Opacity', "0");

        setAccountToDelete([]);
        setAccountToDeleteID([]);
        refreshTable();
    }

//======================================================================================================================
    const resetInputs = () => {
        setAccountName("");
        setAccountUserID("");
        setAccountPassword("");
        setAccountLevel("");
        setAccountTrack("");
        setAccountStrand("");
        setAccountSecAdv("");
    }

    // Refresh Accounts table
    const refreshTable = () => {
        fetch('http://localhost:5000/record').then(res => res.json()).then(result => {
            setViewAccounts(result)
        })
    }
//======================================================================================================================


//======================================================================================================================
//==================================================== FOR SCHEDULE ====================================================
//======================================================================================================================

    // Will get all the schedules and put on the table
    const [viewSchedules, setViewSchedules] = useState([]);

    useEffect(() =>{
        const fetchSchedule= async () => {
            const response = await fetch('http://localhost:5000/schedule')
            const json = await response.json()

            if (response.ok){
                setViewSchedules(json)
            }
        }
        fetchSchedule()
    }, [])

    // For searching
    const [scheduleQuery, setScheduleQuery] = useState('')
    const schedKeys = ["userID", "subj_id", "task", "sched_class", "room"]

//======================================================================================================================
    // getting and setting credentials
    const [schedUserID, setSchedUserID] = useState("");
    const [schedTask, setSchedTask] = useState("");
    const [schedTime, setSchedTime] = useState("");
    const [schedSubjID, setSchedSubjID] = useState("");
    const [schedClass, setSchedClass] = useState("");
    const [schedRoom, setSchedRoom] = useState("");
    const [schedRepeat, setSchedRepeat] = useState("");

    // To open Create account modal
    const createSchedule = () => {

        root.style.setProperty('--adminModule_create_sched_modal-pointer-events', "all");
        root.style.setProperty('--adminModule_create_sched_modal-opacity', "1");

        //resetInputs();
        //refreshTable();
    }

    // Will add the inputs to the database
    const addSchedule = () => {

        refreshSchedTable();
        let databody = {
            "userID": schedUserID,
            "task": schedTask,
            "time": schedTime,
            "subj_id": schedSubjID,
            "sched_class": schedClass,
            "room": schedRoom,
            "repeat": schedRepeat,
        }
        fetch('http://localhost:5000/schedule/add', {
            method: 'POST',
            body: JSON.stringify(databody),
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(response => response.json());


        root.style.setProperty('--adminModule_create_sched_modal-pointer-events', "none");
        root.style.setProperty('--adminModule_create_sched_modal-opacity', "0");
        resetSchedInputs();
        refreshSchedTable();
    }
//======================================================================================================================

// Editing account record
    const [editSchedValue, setEditSchedValue] = useState([]);
    const [editSchedID, setEditSchedID] = useState([]);

    useEffect (() => {
        setEditSchedID(editSchedValue._id);
        setSchedUserID(editSchedValue.userID);
        setSchedTask(editSchedValue.task);
        setSchedTime(editSchedValue.time);
        setSchedSubjID(editSchedValue.subj_id);
        setSchedClass(editSchedValue.sched_class);
        setSchedRoom(editSchedValue.room);
        setSchedRepeat(editSchedValue.repeat);
    }, [editSchedValue])


    const editSchedule = (e, editID) => {

        fetch('http://localhost:5000/schedule/edit/' + editID).then(res => res.json()).then(result => {
            setEditSchedValue(result)
        })

        root.style.setProperty('--adminModule_edit_sched_modal-pointer-events', "all");
        root.style.setProperty('--adminModule_edit_sched_modal-opacity', "1");
    }

    const updateSchedule = (e) => {
        //e.preventDefault();
        refreshSchedTable();

        let databody = {
            "userID": schedUserID,
            "task": schedTask,
            "time": schedTime,
            "subj_id": schedSubjID,
            "sched_class": schedClass,
            "room": schedRoom,
            "repeat": [schedRepeat]
        }
        fetch('http://localhost:5000/schedule/update/' + editSchedID, {
            method: 'POST',
            body: JSON.stringify(databody),
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(response => response.json());

        root.style.setProperty('--adminModule_edit_sched_modal-pointer-events', "none");
        root.style.setProperty('--adminModule_edit_sched_modal-opacity', "0");

        resetSchedInputs();
        refreshSchedTable();
    }

//======================================================================================================================
    // Deleting account record
    const [schedToDelete, setSchedToDelete] = useState([])
    const [schedToDeleteID, setSchedToDeleteID] = useState([])

    const checkDeleteSched = (e, deleteID) => {

        setSchedToDeleteID(deleteID)

        fetch('http://localhost:5000/schedule/edit/' + deleteID).then(res => res.json()).then(result => {
            setSchedToDelete(result)
        })
        
        root.style.setProperty('--ConfirmDelete-Sched-Modal-Admin-PointerEvents', "all");
        root.style.setProperty('--ConfirmDelete-Sched-Modal-Admin-Opacity', "1");
    }

    const cancelDeleteSched = () => {
        root.style.setProperty('--ConfirmDelete-Sched-Modal-Admin-PointerEvents', "none");
        root.style.setProperty('--ConfirmDelete-Sched-Modal-Admin-Opacity', "0");
        setSchedToDelete([]);
    }

    const confirmDeleteSched = () => {
        refreshSchedTable();

        let databody = {
            "userID": schedToDelete.userID,
            "task": schedToDelete.task,
            "time": schedToDelete.time,
            "subj_id": schedToDelete.subj_id,
            "sched_class": schedToDelete.sched_class,
            "room": schedToDelete.room,
            "repeat": [schedToDelete.repeat]
        }

        fetch('http://localhost:5000/deleted_records/schedules', {
            method: 'POST',
            body: JSON.stringify(databody),
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(response => response.json());

        fetch('http://localhost:5000/schedule/delete/' + schedToDeleteID, {
            method: 'DELETE'
        })
        .then(response => response.json());

        root.style.setProperty('--ConfirmDelete-Sched-Modal-Admin-PointerEvents', "none");
        root.style.setProperty('--ConfirmDelete-Sched-Modal-Admin-Opacity', "0");

        setSchedToDelete([]);
        setSchedToDeleteID([]);
        refreshSchedTable();
    }


//===================================================================================================================
    const resetSchedInputs = () => {
        setSchedUserID("");
        setSchedTask("");
        setSchedTime("");
        setSchedSubjID("");
        setSchedClass("");
        setSchedRoom("");
        setSchedRepeat("");
    }

    // Refresh Accounts table
    const refreshSchedTable = () => {
        fetch('http://localhost:5000/schedule').then(res => res.json()).then(result => {
            setViewSchedules(result)
        })
    }
//======================================================================================================================


//======================================================================================================================
//================================================= FOR ANNOUNCEMENTS ==================================================
//======================================================================================================================

    // Will get all the schedules and put on the table
    const [viewAnnouncements, setViewAnnouncements] = useState([]);

    useEffect(() =>{
        const fetchAnnouncement= async () => {
            const response = await fetch('http://localhost:5000/announcements')
            const json = await response.json()

            if (response.ok){
                setViewAnnouncements(json)
            }
        }
        fetchAnnouncement()
    }, [])

    // For searching
    const [announceQuery, setAnnounceQuery] = useState('')
    const announceKeys = ["announcement_type", "announcement_name", "announcement_date", "announcement_time", "announcement_place"]

//======================================================================================================================
    // getting and setting credentials
    const [announceType, setAnnounceType] = useState("");
    const [announceName, setAnnounceName] = useState("");
    const [announceDate, setAnnounceDate] = useState("");
    const [announceTime, setAnnounceTime] = useState("");
    const [announcePlace, setAnnouncePlace] = useState("");

    // To open Create account modal
    const createAnnounce = () => {
        root.style.setProperty('--adminModule_create_announce_modal-pointer-events', "all");
        root.style.setProperty('--adminModule_create_announce_modal-opacity', "1");
    }

    // Will add the inputs to the database
    const addAnnounce = () => {

        refreshAnnounceTable();
        let databody = {
            "announcement_type": announceType,
            "announcement_name": announceName,
            "announcement_date": announceDate,
            "announcement_time": announceTime,
            "announcement_place": announcePlace
        }
        fetch('http://localhost:5000/announcement/add', {
            method: 'POST',
            body: JSON.stringify(databody),
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(response => response.json());


        root.style.setProperty('--adminModule_create_announce_modal-pointer-events', "none");
        root.style.setProperty('--adminModule_create_announce_modal-opacity', "0");
        resetAnnounceInputs();
        refreshAnnounceTable();
    }

//======================================================================================================================

    // Editing account record
    const [editAnnounceValue, setEditAnnounceValue] = useState([]);
    const [editAnnounceID, setEditAnnounceID] = useState([]);

    useEffect (() => {
        setEditAnnounceID(editAnnounceValue._id);
        setAnnounceType(editAnnounceValue.announcement_type);
        setAnnounceName(editAnnounceValue.announcement_name);
        setAnnounceDate(editAnnounceValue.announcement_date);
        setAnnounceTime(editAnnounceValue.announcement_time);
        setAnnouncePlace(editAnnounceValue.announcement_place);
    }, [editAnnounceValue])


    const editAnnounce = (e, editID) => {

        fetch('http://localhost:5000/announcement/edit/' + editID).then(res => res.json()).then(result => {
            setEditAnnounceValue(result)
        })

        root.style.setProperty('--adminModule_edit_announce_modal-pointer-events', "all");
        root.style.setProperty('--adminModule_edit_announce_modal-opacity', "1");
    }

    const updateAnnounce = (e) => {
        //e.preventDefault();
        refreshAnnounceTable();

        let databody = {
            "announcement_type": announceType,
            "announcement_name": announceName,
            "announcement_date": announceDate,
            "announcement_time": announceTime,
            "announcement_place": announcePlace
        }
        fetch('http://localhost:5000/announcement/update/' + editAnnounceID, {
            method: 'POST',
            body: JSON.stringify(databody),
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(response => response.json());

        root.style.setProperty('--adminModule_edit_announce_modal-pointer-events', "none");
        root.style.setProperty('--adminModule_edit_announce_modal-opacity', "0");

        resetAnnounceInputs();
        refreshAnnounceTable();
    }

//======================================================================================================================
    // Deleting account record
    const [announceToDelete, setAnnounceToDelete] = useState([])
    const [announceToDeleteID, setAnnounceToDeleteID] = useState([])

    const checkDeleteAnnounce = (e, deleteID) => {

        setAnnounceToDeleteID(deleteID)

        fetch('http://localhost:5000/announcement/edit/' + deleteID).then(res => res.json()).then(result => {
            setAnnounceToDelete(result)
        })
        
        root.style.setProperty('--ConfirmDelete-Announce-Modal-Admin-PointerEvents', "all");
        root.style.setProperty('--ConfirmDelete-Announce-Modal-Admin-Opacity', "1");
    }

    const cancelDeleteAnnounce = () => {
        root.style.setProperty('--ConfirmDelete-Announce-Modal-Admin-PointerEvents', "none");
        root.style.setProperty('--ConfirmDelete-Announce-Modal-Admin-Opacity', "0");
        setAnnounceToDelete([]);
    }

    const confirmDeleteAnnounce = () => {
        refreshAnnounceTable();

        let databody = {
            "announcement_type": announceToDelete.announcement_type,
            "announcement_name": announceToDelete.announcement_name,
            "announcement_date": announceToDelete.announcement_date,
            "announcement_time": announceToDelete.announcement_time,
            "announcement_place": announceToDelete.announcement_place
        }

        fetch('http://localhost:5000/deleted_records/announcements', {
            method: 'POST',
            body: JSON.stringify(databody),
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(response => response.json());

        fetch('http://localhost:5000/announcement/delete/' + announceToDeleteID, {
            method: 'DELETE'
        })
        .then(response => response.json());

        root.style.setProperty('--ConfirmDelete-Announce-Modal-Admin-PointerEvents', "none");
        root.style.setProperty('--ConfirmDelete-Announce-Modal-Admin-Opacity', "0");

        setAnnounceToDelete([]);
        setAnnounceToDeleteID([]);
        refreshAnnounceTable();
    }


//======================================================================================================================
    const resetAnnounceInputs = () => {
        setAnnounceType("");
        setAnnounceName("");
        setAnnounceDate("");
        setAnnounceTime("");
        setAnnouncePlace("");
    }

    const refreshAnnounceTable = () => {
        fetch('http://localhost:5000/announcements').then(res => res.json()).then(result => {
            setViewAnnouncements(result)
        })
    }

    return (
    <>
        {/* <animated.div className="adminModule_L1_draggable_area"
        {...bindAdminPos()} style={{
          x, y
        }} />
        <animated.div className="adminModule_L1_window" id="adminModule_L1_window"
        style={{
          x, y
        }}>
        <div className="adminModule_L1_window_topbar" id="adminModule_L1_window_topbar">Admin
            <div>
                <span id="adminModule_L1_minmax" className="material-symbols-outlined" onClick={minmaxAdminModule}>web_asset</span>
                <span id="adminModule_L1_close" className="material-symbols-outlined" onClick={closeAdminModule}>close</span>
            </div>
        </div> */}

        <div className="adminModule_L1_Main_Container" id="adminModule_L1_Main_Container">
            <div className="adminModule_Main_Container_wrap">

                <div className="adminModule_L1_Accounts" ref={adminAccRef}>
                    <div className="dashboard_L1_Upcoming_label">
                        <span>ACCOUNTS</span>
                    </div>

                    <div className="adminModule_L1_Accounts_top_wrap">
                        <div className="adminModule_L1_Create_Search">
                            <img className="adminModule_create_search_icon" src={search_icon} alt="search"></img>
                            <input 
                                type="text" 
                                className="adminModule_create_search_input" 
                                placeholder="Search" 
                                onChange={e=> setAccountQuery(e.target.value)}>
                            </input>
                        </div>

                        <div className="adminModule_button_wrap">
                            <button className="winAtt_viewStudent_refdelButton"
                                onClick={refreshTable}>
                                <img src={refresh_icon}
                                    alt="refresh" 
                                    className="winAtt_viewStudent_refdelIcon"/>
                            </button>

                            <button 
                                className="adminModule_create_button"
                                onClick={createAccount}> Add Account
                            </button>
                        </div>
                    </div>

                    <div className="adminModule_table_main_wrap">
                    <div className="winAtt_viewStudent_table_wrap table-admin-wrap">
                        <table className="winAtt_viewStudent_table table-admin">
                            <thead>
                                <tr className="winAtt_viewStudent_table_header-b">
                                    <td>User ID</td>
                                    <td>Password</td>
                                    <td>Level</td>
                                    <td>Name</td>
                                    <td>Track</td>
                                    <td>Section</td>
                                    <td>Actions</td>
                                </tr>
                            </thead>
                            <tbody className="adminModule_table_body">
                                {viewAccounts && viewAccounts.filter
                                    (viewAccount=>
                                        keys.some(key=>viewAccount[key].toLowerCase().includes(accountQuery))
                                    ).map((viewAccount) => (
                                        <AccountsTable 
                                            key={viewAccount._id}
                                            viewAccount={viewAccount}
                                            editAccount={editAccount} 
                                            checkDeleteAccount={checkDeleteAccount}
                                        />
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                    </div>
                </div>

                <div className="adminModule_create_account_modal">
                    <Register />
                </div>

                <div className="adminModule_edit_account_modal">
                    <EditAccountModal
                    editAccountValue={editAccountValue}
                    updateAccount={updateAccount} 
                    resetInputs={resetInputs}
                    setAccountName={setAccountName}
                    setAccountUserID={setAccountUserID}
                    setAccountPassword={setAccountPassword}
                    setAccountLevel={setAccountLevel}
                    setAccountTrack={setAccountTrack}
                    setAccountStrand={setAccountStrand}
                    setAccountSecAdv={setAccountSecAdv}
                    accountUserID={accountUserID}
                    accountPassword={accountPassword}
                    accountLevel={accountLevel}
                    accountTrack={accountTrack}
                    accountStrand={accountStrand}
                    accountSecAdv={accountSecAdv}
                    accountName={accountName}
                    />
                </div>

                <div className="confirmDelete_modal_wrap-admin">
                    <div className="editAtt_Modal_Container">
                        <div className="editAtt_Modal_label">Are you sure you want<br></br>to delete the account?</div>
                        <button className="editAtt_cancel_button" onClick={confirmDelete}>Yes</button>
                        <button className="editAtt_update_button" onClick={cancelDelete}>No</button>
                    </div>
                </div>

{/*===================================================================================================================*/}
                <div className="adminModule_L1_Schedule" ref={adminSchedRef}>
                    <div className="dashboard_L1_Upcoming_label">
                        <span>SCHEDULES</span>
                    </div>

                    <div className="adminModule_L1_Accounts_top_wrap">
                        <div className="adminModule_L1_Create_Search">
                            <img className="adminModule_create_search_icon" src={search_icon} alt="search"></img>
                            <input 
                                type="text" 
                                className="adminModule_create_search_input" 
                                placeholder="Search" 
                                onChange={e=> setScheduleQuery(e.target.value)}>
                            </input>
                        </div>

                        <div className="adminModule_button_wrap">
                            <button className="winAtt_viewStudent_refdelButton"
                                onClick={refreshSchedTable}>
                                <img src={refresh_icon}
                                    alt="refresh" 
                                    className="winAtt_viewStudent_refdelIcon"/>
                            </button>

                            <button 
                                className="adminModule_create_button"
                                onClick={createSchedule}> Add Schedule
                            </button>
                        </div>
                    </div>

                    <div className="adminModule_table_main_wrap">
                        <div className="winAtt_viewStudent_table_wrap table-admin-wrap">
                            <table className="winAtt_viewStudent_table table-admin">
                                <thead>
                                    <tr className="winAtt_viewStudent_table_header-b schedule-tb-header">
                                        <td>User ID</td>
                                        <td>Task</td>
                                        <td>Time</td>                                      
                                        <td>Scheduled Class</td>
                                        <td>Room</td>
                                        {/* <td>Repeat</td> */}
                                        <td>Actions</td>
                                    </tr>
                                </thead>
                                <tbody className="adminModule_table_body">
                                    {viewSchedules && viewSchedules.filter
                                        (viewSchedule=>
                                            schedKeys.some(key=>viewSchedule[key].toLowerCase().includes(scheduleQuery))
                                        ).map((viewSchedule) => (
                                            <ScheduleTable 
                                                key={viewSchedule._id}
                                                viewSchedule={viewSchedule}
                                                editSchedule={editSchedule}
                                                checkDeleteSched={checkDeleteSched}
                                            />
                                        ))
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>

                <div className="adminModule_create_sched_modal">
                    <CreateSchedModal 
                    addSchedule={addSchedule}
                    resetSchedInputs={resetSchedInputs}
                    setSchedUserID={setSchedUserID}
                    setSchedTask={setSchedTask}
                    setSchedTime={setSchedTime}
                    setSchedSubjID={setSchedSubjID}
                    setSchedClass={setSchedClass}
                    setSchedRoom={setSchedRoom}
                    setSchedRepeat={setSchedRepeat}
                    schedUserID={schedUserID}
                    schedTask={schedTask}
                    schedTime={schedTime}
                    schedSubjID={schedSubjID}
                    schedClass={schedClass}
                    schedRoom={schedRoom}
                    schedRepeat={schedRepeat}
                    />
                </div>

                <div className="adminModule_edit_sched_modal">
                    <EditScheduleModal
                    editSchedValue={editSchedValue}
                    updateSchedule={updateSchedule}
                    resetSchedInputs={resetSchedInputs}
                    setSchedUserID={setSchedUserID}
                    setSchedTask={setSchedTask}
                    setSchedTime={setSchedTime}
                    setSchedSubjID={setSchedSubjID}
                    setSchedClass={setSchedClass}
                    setSchedRoom={setSchedRoom}
                    setSchedRepeat={setSchedRepeat}
                    schedUserID={schedUserID}
                    schedTask={schedTask}
                    schedTime={schedTime}
                    schedSubjID={schedSubjID}
                    schedClass={schedClass}
                    schedRoom={schedRoom}
                    schedRepeat={schedRepeat}
                    />
                </div>

                <div className="confirmDelete_sched_modal_wrap-admin">
                    <div className="editAtt_Modal_Container">
                        <div className="editAtt_Modal_label">Are you sure you want<br></br>to delete the schedule?</div>
                        <button className="editAtt_cancel_button" onClick={confirmDeleteSched}>Yes</button>
                        <button className="editAtt_update_button" onClick={cancelDeleteSched}>No</button>
                    </div>
                </div>

{/*====================================================================================================================*/}
                <div className="adminModule_L1_Announcements_wrap" ref={adminAnnRef}>
                    <div className="adminModule_L1_Announcements">
                        <div className="dashboard_L1_Upcoming_label">
                            <span>ANNOUNCEMENTS</span>
                        </div>

                        <div className="adminModule_L1_Accounts_top_wrap">
                            <div className="adminModule_L1_Create_Search">
                                <img className="adminModule_create_search_icon" src={search_icon} alt="search"></img>
                                <input 
                                    type="text" 
                                    className="adminModule_create_search_input" 
                                    placeholder="Search" 
                                    onChange={e=> setAnnounceQuery(e.target.value)}>
                                </input>
                            </div>

                            <div className="adminModule_button_wrap">
                                <button className="winAtt_viewStudent_refdelButton"
                                    onClick={refreshAnnounceTable}>
                                    <img src={refresh_icon}
                                        alt="refresh" 
                                        className="winAtt_viewStudent_refdelIcon"/>
                                </button>

                                <button 
                                    className="adminModule_create_button"
                                    onClick={createAnnounce}> Add Announcement
                                </button>
                            </div>
                        </div>

                        <div className="adminModule_table_main_wrap">
                            <div className="winAtt_viewStudent_table_wrap table-admin-wrap">
                                <table className="winAtt_viewStudent_table table-admin">
                                    <thead>
                                        <tr className="winAtt_viewStudent_table_header-b announce-tb-header">
                                            <td>Type</td>
                                            <td>Title</td>
                                            <td>Date</td>                                      
                                            <td>Time</td>
                                            <td>Place</td>
                                            <td>Actions</td>
                                        </tr>
                                    </thead>
                                    <tbody className="adminModule_table_body">
                                        {viewAnnouncements && viewAnnouncements.filter
                                            (viewAnnouncement=>
                                                announceKeys.some(key=>viewAnnouncement[key].toLowerCase().includes(announceQuery))
                                            ).map((viewAnnouncement) => (
                                                <AnnouncementTable 
                                                    key={viewAnnouncement._id}
                                                    viewAnnouncement={viewAnnouncement}
                                                    editAnnounce={editAnnounce}
                                                    checkDeleteAnnounce={checkDeleteAnnounce}
                                                    // editSchedule={editSchedule}
                                                    // checkDeleteSched={checkDeleteSched}
                                                />
                                            ))
                                        }
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="adminModule_create_announce_modal">
                    <CreateAnnounceModal 
                    addAnnounce={addAnnounce}
                    resetAnnounceInputs={resetAnnounceInputs}
                    setAnnounceType={setAnnounceType}
                    setAnnounceName={setAnnounceName}
                    setAnnounceDate={setAnnounceDate}
                    setAnnounceTime={setAnnounceTime}
                    setAnnouncePlace={setAnnouncePlace}
                    announceType={announceType}
                    announceName={announceName}
                    announceDate={announceDate}
                    announceTime={announceTime}
                    announcePlace={announcePlace}
                    />
                </div>

                <div className="adminModule_edit_announce_modal">
                    <EditAnnounceModal
                    // editSchedValue={editSchedValue}
                    updateAnnounce={updateAnnounce}
                    resetAnnounceInputs={resetAnnounceInputs}
                    setAnnounceType={setAnnounceType}
                    setAnnounceName={setAnnounceName}
                    setAnnounceDate={setAnnounceDate}
                    setAnnounceTime={setAnnounceTime}
                    setAnnouncePlace={setAnnouncePlace}
                    announceType={announceType}
                    announceName={announceName}
                    announceDate={announceDate}
                    announceTime={announceTime}
                    announcePlace={announcePlace}
                    />
                </div>

                <div className="confirmDelete_announce_modal_wrap-admin">
                    <div className="editAtt_Modal_Container">
                        <div className="editAtt_Modal_label">Are you sure you want<br></br>to delete the schedule?</div>
                        <button className="editAtt_cancel_button" onClick={confirmDeleteAnnounce}>Yes</button>
                        <button className="editAtt_update_button" onClick={cancelDeleteAnnounce}>No</button>
                    </div>
                </div>

            </div>   
        </div>


        {/* </animated.div> */}
    </>
    )
}