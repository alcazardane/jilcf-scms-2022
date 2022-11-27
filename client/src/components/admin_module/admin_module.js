import { useDrag } from '@use-gesture/react'
import { useSpring, animated } from 'react-spring'
import { useState, useEffect } from 'react'


//dashboard components
// import Calendar from "./calendar_L1"
// import ScheduleDetails from './schedule_details_L1'
// import AccountDetails from './accounts_details'
// import AnalyticsDetails from './analytics_details'
// import '../../styles/Dashboard_Styles/mainDashboard_styles.css'
import '../../styles/admin_module_styles.css'

// Import Images
import edit_icon from "../../images/edit_FILL0_wght400_GRAD0_opsz48.png";
import delete_icon from "../../images/delete_FILL0_wght400_GRAD0_opsz48.png";


import useWindowDimensions from '../dashboard/hooks/useWindowDimensions'

export default function AdminModule() {

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

        root.style.setProperty('--adminModule-L1-window-width', "60%")
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
      root.style.setProperty('--adminModule-L1-window-width', "60%")
      root.style.setProperty('--adminModule-L1-window-height', "70%")

      root.style.setProperty('--adminModule_L1_display', "none")
      root.style.setProperty('--adminModule-display-b', "none")

      root.style.setProperty('--border-radius', "7px")
      root.style.setProperty('--border-radius-b', "7px 7px 0 0")

      root.style.setProperty('--adminModule-top', "15px")
      root.style.setProperty('--adminModule-left', "30px")

    setAdminModuleIsMininimized(true)
    }

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

    const [accountName, setAccountName] = useState();
    const [accountUserID, setAccountUserID] = useState();
    const [accountPassword, setAccountPassword] = useState();
    const [accountLevel, setAccountLevel] = useState();
    const [accountTrack, setAccountTrack] = useState();
    const [accountStrand, setAccountStrand] = useState();
    const [accountSecAdv, setAccountSecAdv] = useState();
    //const [accountProfilePic, setAccountProfilePic] = useState();

    // Creating account
    const createAccount = () => {

        root.style.setProperty('--adminModule_create_modal-pointer-events', "all");
        root.style.setProperty('--adminModule_create_modal-opacity', "1");

        resetInputs();
        refreshTable();
    }

    const addAccount = () => {

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

    const cancelCreate = () => {
        root.style.setProperty('--adminModule_create_modal-pointer-events', "none");
        root.style.setProperty('--adminModule_create_modal-opacity', "0");

        resetInputs();
    }

    const resetInputs = () => {
        setAccountName('');
        setAccountUserID('');
        setAccountPassword('');
        setAccountLevel('');
        setAccountTrack('');
        setAccountStrand('');
        setAccountSecAdv('');
    }

    const refreshTable = () => {
        fetch('http://localhost:5000/record').then(res => res.json()).then(result => {
            setViewAccounts(result)
        })
    }

    return (
    <>
        <animated.div className="adminModule_L1_draggable_area"
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
        </div>

        <div className="adminModule_L1_Main_Container">
            <div className="adminModule_Main_Container_wrap">

                <div className="adminModule_L1_Accounts">
                    <div className="dashboard_L1_Upcoming_label">
                        <span>ACCOUNTS</span>
                    </div>

                    <div className="dashboard_L1_Upcoming_label">
                        <button 
                            className="adminModule_create_button"
                            onClick={createAccount}> Create Account
                        </button>
                    </div>

                    <div className="winAtt_viewStudent_table_wrap table-admin">
                        <table className="winAtt_viewStudent_table">
                            <thead>
                                <tr className="winAtt_viewStudent_table_header-b">
                                    <td>Name</td>
                                    <td>User ID</td>
                                    <td>Password</td>
                                    <td>Level</td>
                                    <td>Actions</td>
                                </tr>
                            </thead>
                            <tbody>
                                {viewAccounts && viewAccounts.map((viewAccount) => (
                                    <tr key={viewAccount._id} className="winAtt_viewStudent_table_body-b">
                                        <td>{viewAccount.name}</td>
                                        <td>{viewAccount.userID}</td>
                                        <td>{viewAccount.password}</td>
                                        <td>{viewAccount.level}</td>
                                        <td>
                                            <button className="windowAttendance_notify"><img src={edit_icon} alt="notify"></img></button>
                                            <button className="windowAttendance_notify"><img src={delete_icon} alt="notify"></img></button>
                                        </td>
                                    </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                </div>

                <div className="adminModule_create_account_modal">
                    <div className="adminModule_create_account_con">
                        <div className="editAtt_Modal_label-b">Create an Account</div>

                        <div className="adminModule_create_input_inside">
                            <span className="adminModule_create_label">Name:</span>
                            <input 
                                type="text" 
                                className="editAtt_input-b" 
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
                                    className="editAtt_input-b" 
                                    placeholder="Enter User ID"
                                    value={accountUserID}
                                    onChange={(e) => setAccountUserID(e.target.value)}>
                                </input>
                            </div>

                            <div className="adminModule_create_input_inside">
                                <span className="adminModule_create_label">Password:</span>
                                <input 
                                    type="text" 
                                    className="editAtt_input-b" 
                                    placeholder="Enter Password"
                                    value={accountPassword}
                                    onChange={(e) => setAccountPassword(e.target.value)}>
                                </input>
                            </div>

                            <div className="adminModule_create_input_inside">
                                <span className="adminModule_create_label">Level:</span>
                                <input 
                                    type="text" 
                                    className="editAtt_input-b" 
                                    placeholder="Enter User Level"
                                    value={accountLevel}
                                    onChange={(e) => setAccountLevel(e.target.value)}>
                                </input>
                            </div>
                        </div>

                        <div className="adminModule_create_input_wrap">
                            <div className="adminModule_create_input_inside">
                                <span className="adminModule_create_label">Track:</span>
                                <input 
                                    type="text" 
                                    className="editAtt_input-b" 
                                    placeholder="Enter Track"
                                    value={accountTrack}
                                    onChange={(e) => setAccountTrack(e.target.value)}>
                                </input>
                            </div>

                            <div className="adminModule_create_input_inside">
                                <span className="adminModule_create_label">Strand:</span>
                                <input 
                                    type="text" 
                                    className="editAtt_input-b" 
                                    placeholder="Enter Strand"
                                    value={accountStrand}
                                    onChange={(e) => setAccountStrand(e.target.value)}>
                                </input>
                            </div>

                            <div className="adminModule_create_input_inside">
                                <span className="adminModule_create_label">Section:</span>
                                <input 
                                    type="text" 
                                    className="editAtt_input-b" 
                                    placeholder="Enter Section"
                                    value={accountSecAdv}
                                    onChange={(e) => setAccountSecAdv(e.target.value)}>
                                </input>
                            </div>
                        </div>


                        <button className="editAtt_cancel_button" onClick={cancelCreate}>Cancel</button>
                        <button className="editAtt_update_button" onClick={addAccount}>Create</button>
                    </div>
                </div>

            </div>   
        </div>


        </animated.div>
    </>
    )
}