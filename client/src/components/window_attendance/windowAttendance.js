import { useEffect, useState} from 'react'

// need to install "@use-gesture/react" and "react-spring" first
import { useDrag } from '@use-gesture/react'
import { useSpring, animated } from 'react-spring'

// hook for window size
import useWindowDimensions from '../dashboard/hooks/useWindowDimensions'


//Components
import WindowAttendanceDetails from './windowAttendanceDetails'
import WinAttViewStudentDetails from './windowAttendance_ViewStudent_Details'
import EditAttReason from './editAttReason_Modal'
import EditAttIntervention from './editAttIntervention_Modal'
import MultiEditAttReason from './multiEditAttReasons_Modal'
import '../../styles/windowAttendance_styles.css'

// import images
import search_icon from "../../images/search_FILL0_wght400_GRAD0_opsz48.png"
import record_icon from "../../images/video_camera_front_FILL0_wght400_GRAD0_opsz48.png"
import download_icon from "../../images/cloud_download_FILL0_wght400_GRAD0_opsz48.png"
import refresh_icon from "../../images/refresh_FILL1_wght400_GRAD0_opsz48.png"
import notify_icon from "../../images/notifications_active_FILL1_wght400_GRAD0_opsz48.png"
import { FaceRec } from '../../App'

const WindowAttendance = () => {

    const [studentInfo, setStudentInfo] = useState(null)

    useEffect(() => {
        const fetchStudentInfo = async () => {
            const response = await fetch('http://localhost:5000/student_info')
            const json = await response.json()
    
            if (response.ok){
                setStudentInfo(json)
            }
        }
        fetchStudentInfo()
    }, [])

    var root = document.querySelector(":root");

    // For window snapping
    // 18 is for scrollbar width, 45 is for Navbar heght, and 4 is for border which is 2px+2px
    const { height, width } = useWindowDimensions();
    var rightBound = width - (width * 0.77) - 10 - 18 + 4;
    var bottomBound = height - (height * 0.80) - 10 - 18 - 45 + 4;
    var leftBound = 20;
    var topBound = 20;


    // Get the x and y values to use it for maximizing the window
    var xVal = 0;
    var yVal = 0;

    // For dragging
    const [{ x, y }, attendancePos] = useSpring(() => ({ x: 0, y: 0 }));
    const bindAttendancePos = useDrag((state) => {
        xVal = state.offset[0];
        yVal = state.offset[1];
        attendancePos.set({
            x: xVal,
            y: yVal,
        });
        //console.log("x: " + xVal + ", y: " + yVal);
    }, {
        from: () => {
            return [x.get(), y.get()];
        },
        bounds: () => {
            return {left: -leftBound, right: rightBound, top: -topBound, bottom: bottomBound};
        },
    });

    // For closing window_Attendance
    const closeAttendance = () => {
        root.style.setProperty('--windowAttendance-display', "none")

        root.style.setProperty('--windowAttendance-width', "77vw")
        root.style.setProperty('--windowAttendance-height', "80vh")
        root.style.setProperty('--windowAttendance-top', "20px")
        root.style.setProperty('--windowAttendance-left', "20px")
        root.style.setProperty('--windowAttendance-border-radius', "7px")
        root.style.setProperty('--windowAttendance-td-height', "3vh")
        root.style.setProperty('--windowAttendance-buttons-width', "8vw")
        root.style.setProperty('--windowAttendance-buttons-height', "3vw")
        root.style.setProperty('--windowAttendance-buttons-font', "0.8vw")
        root.style.setProperty('--windowAttendance-search-width', "30vw")
        root.style.setProperty('--windowAttendance-drag-display', "block")
        root.style.setProperty('--windowAttendance-table-height', "45vh")
        root.style.setProperty('--windowAttendance-500-button-width', "32vw")

        // console.log("x: " + xVal + ", y: " + yVal);

        setWindowAttendanceIsMininimized(true)
        backToTable();
    }

    // For minimizing and maximizing window_Attendance
    const [windowAttendanceIsMinimized,  setWindowAttendanceIsMininimized] = useState(true);
    const minmaxAttendance = () => {
        if (windowAttendanceIsMinimized === true){
            root.style.setProperty('--windowAttendance-width', "calc(100% - 4px)")
            root.style.setProperty('--windowAttendance-height', "calc(100vh - 49px)")
            root.style.setProperty('--windowAttendance-top', `${-yVal}px`)
            root.style.setProperty('--windowAttendance-left', `${-xVal}px`)
            root.style.setProperty('--windowAttendance-border-radius', "0px")
            root.style.setProperty('--windowAttendance-td-height', "3.8vh")
            root.style.setProperty('--windowAttendance-buttons-width', "10vw")
            root.style.setProperty('--windowAttendance-buttons-height', "3.5vw")
            root.style.setProperty('--windowAttendance-buttons-font', "1vw")
            root.style.setProperty('--windowAttendance-search-width', "40vw")
            root.style.setProperty('--windowAttendance-drag-display', "none")
            root.style.setProperty('--windowAttendance-table-height', "60vh")

            root.style.setProperty('--windowAttendance-500-button-width', "43vw")

            attendancePos.set({
                x: xVal,
                y: yVal,
            });
            setWindowAttendanceIsMininimized(false)
        }
        else {
            root.style.setProperty('--windowAttendance-width', "77vw")
            root.style.setProperty('--windowAttendance-height', "80vh")
            root.style.setProperty('--windowAttendance-top', "20px")
            root.style.setProperty('--windowAttendance-left', "20px")
            root.style.setProperty('--windowAttendance-border-radius', "7px")
            root.style.setProperty('--windowAttendance-td-height', "3vh")
            root.style.setProperty('--windowAttendance-buttons-width', "8vw")
            root.style.setProperty('--windowAttendance-buttons-height', "3vw")
            root.style.setProperty('--windowAttendance-buttons-font', "0.8vw")
            root.style.setProperty('--windowAttendance-search-width', "30vw")
            root.style.setProperty('--windowAttendance-drag-display', "block")
            root.style.setProperty('--windowAttendance-table-height', "45vh")

            root.style.setProperty('--windowAttendance-500-button-width', "32vw")

            setWindowAttendanceIsMininimized(true)
        }
    }

    // For searching
    const [query, setQuery] = useState("");
    const keys = ["lname", "fname", "mname", "grade_level", "track", "strand"]


//======================================================================================================================
// "View Student"(eye icon) button codes

    // Will return the student info (name, section, etc.) of the selected student to be viewed
    const [viewStudentInfo, setViewStudentInfo] = useState([])
    // Will return the attendance record of the selected student to be viewed
    const [viewStudentAttendance, setViewStudentAttendance] = useState([])
    // Will get the userID of the student to be viewed
    const [viewStudentID, setViewStudentID] = useState()

    // if the view student button is clicked, the window attendance will display student's attendance record
    const goToViewStudent = (event, studentID) => {

        event.preventDefault();

        fetch('http://localhost:5000/student_info/' + studentID).then(res => res.json()).then(result => {
            setViewStudentInfo(result)
        })

        fetch('http://localhost:5000/student_attendance/' + studentID).then(res => res.json()).then(result => {
            setViewStudentAttendance(result)
        })

        setViewStudentID(studentID)

        root.style.setProperty('--winAtt-Default-PointerEvents', "none");
        root.style.setProperty('--winAtt-Default-Opacity', "0");
        root.style.setProperty('--winAtt-Default-Transform', "100%");

        root.style.setProperty('--winAtt-ViewStudent-PointerEvents', "all");
        root.style.setProperty('--winAtt-ViewStudent-Opacity', "1");
        root.style.setProperty('--winAtt-ViewStudent-Transform', "0%");      
    }

    // if the "back to table" button is clicked, the window attendance will return to the original display
    const backToTable = () => {
        root.style.setProperty('--winAtt-Default-PointerEvents', "all");
        root.style.setProperty('--winAtt-Default-Opacity', "1");
        root.style.setProperty('--winAtt-Default-Transform', "0%");

        root.style.setProperty('--winAtt-ViewStudent-PointerEvents', "none");
        root.style.setProperty('--winAtt-ViewStudent-Opacity', "0");
        root.style.setProperty('--winAtt-ViewStudent-Transform', "100%");

        setMultiID([]);
        setSelectedAttRecord([]);
    }

//======================================================================================================================
// Edit attendance reasons codes

    // Will set the modal to Open and Close
    const [openEditReason, setOpenEditReason] = useState(false)
    // Will return the reason that the user wants to edit
    const [editReason, setEditReason] = useState([])

    // Will get the attendance reason the user wants to edit
    const editAttendanceReason = (event, editID) => {
        fetch('http://localhost:5000/student_attendance/edit_reason/' + editID).then(res => res.json()).then(result => {
            setEditReason(result)
        })

        root.style.setProperty('--editAttendance-Modals-PointerEvents', "all");
        root.style.setProperty('--editAttendance-Modals-Opacity', "1");
    }

    // Will return the new reason entered by the user
    const [newReason, setNewReason] = useState();
    // Will basically get the ID of the attendance reason to be updated
    const [updateReasonID, setUpdateReasonID] = useState(null);

    // Will update the attendance reasons based on the input entered by the user
    const updateAttendanceReason = (e) => {

        e.preventDefault();
        refreshViewStudentTable();
        
        let databody = {"reasons": newReason}
        fetch('http://localhost:5000/student_attendance/update_reason/' + updateReasonID, {
            method: 'POST',
            body: JSON.stringify(databody),
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(response => response.json());

        root.style.setProperty('--editAttendance-Modals-PointerEvents', "none");
        root.style.setProperty('--editAttendance-Modals-Opacity', "0");
        setOpenEditReason(false);

        refreshViewStudentTable();
    }


//======================================================================================================================
// Edit attendance interventions codes

    // Will set the modal to Open and Close
    const [openEditIntervention, setOpenEditIntervention] = useState(false)
    // Will return the intervention that the user wants to edit
    const [editIntervention, setEditIntervention] = useState([])

    // Will get the attendance intervention the user wants to edit
    const editAttendanceIntervention = (event, editID) => {
        fetch('http://localhost:5000/student_attendance/edit_intervention/' + editID).then(res => res.json()).then(result => {
            setEditIntervention(result)
        })

        root.style.setProperty('--editAttendanceInt-Modals-PointerEvents', "all");
        root.style.setProperty('--editAttendanceInt-Modals-Opacity', "1");
    }

    // Will return the new intervention entered by the user
    const [newIntervention, setNewIntervention] = useState();
    // Will basically get the ID of the attendance intervention to be updated
    const [updateInterventionID, setUpdateInterventionID] = useState(null);

    // Will update the attendance intervention based on the input entered by the user
    const updateAttendanceIntervention = (e) => {

        e.preventDefault();
        refreshViewStudentTable();

        let databody = {"intervention": newIntervention}
        fetch('http://localhost:5000/student_attendance/update_intervention/' + updateInterventionID, {
            method: 'POST',
            body: JSON.stringify(databody),
            headers: {
                'Content-Type': 'application/json'
            },
        })
        .then(response => response.json());

        root.style.setProperty('--editAttendanceInt-Modals-PointerEvents', "none");
        root.style.setProperty('--editAttendanceInt-Modals-Opacity', "0");
        setOpenEditIntervention(false);

        refreshViewStudentTable();
    }


    // For filtering the attendance record of the viewed student
    const [studentAttQuery, setStudentAttQuery] = useState("")
    const studAttKeys = ["status"]


//======================================================================================================================
    // This useState array will store the ObjectIDs of the selected items (checkbox)
    const [multiID, setMultiID] = useState([])

    // Will add the selected items to the array. If it is unselected, it will remove that item from the array
    const setDataToBeDeleted = (e, multipleID) => {

        if (multiID.includes(multipleID)){
            setMultiID(prev => prev.filter(prev => prev !== multipleID ));
        }
        else{
            setMultiID(arr => [...arr, multipleID]);
        }
    }


//======================================================================================================================
// Edit multiple attendance reasons and inteventions

    // For opening a modal for editing the reasons and interventions of the seleted items
    const [openMultiEditReasons, setOpenMultiEditReasons] = useState(false);

    // Will open the modal for editing the reasons and interventions of the seleted items at the same time
    const multipleEditAttReasons = (e) => {
        root.style.setProperty('--MultiEditAttendanceRes-Modals-PointerEvents', "all");
        root.style.setProperty('--MultiEditAttendanceRes-Modals-Opacity', "1");
        setOpenMultiEditReasons(true);
    }

    // Will update the reasons and interventions of the selected items
    const updateMultiAttReasons = (e) => {

        e.preventDefault();
        refreshViewStudentTable();

        // Update Reasons
        let databody = {"reasons": newReason}
        for (let i = 0; i < multiID.length; i++) {
            fetch('http://localhost:5000/student_attendance/update_reason/' + multiID[i], {
                method: 'POST',
                body: JSON.stringify(databody),
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            .then(response => response.json());
        }

        //Update Interventions
        let databodyB = {"intervention": newIntervention}
        for (let j = 0; j < multiID.length; j++) {
            fetch('http://localhost:5000/student_attendance/update_intervention/' + multiID[j], {
                method: 'POST',
                body: JSON.stringify(databodyB),
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            .then(response => response.json());
        }

        root.style.setProperty('--MultiEditAttendanceRes-Modals-PointerEvents', "none");
        root.style.setProperty('--MultiEditAttendanceRes-Modals-Opacity', "0");
        setOpenMultiEditReasons(false);

        refreshViewStudentTable();
    }


//======================================================================================================================
// Deleting Records

    // Will store attendance record to be deleted.
    const [selectedAttRecord, setSelectedAttRecord] = useState([]);

    // Checking if its working properly
    // useEffect(() => {
    //     console.log(selectedAttRecord);
    // }, [selectedAttRecord])

    // useEffect(() => {
    //     console.log(multiID);
    // }, [multiID])

    // Will set attendance record to be deleted.
    // const attRecordsToBeDeleted = (e, record) => {

    //     if (JSON.stringify(selectedAttRecord).includes(JSON.stringify(record))){
    //         setSelectedAttRecord(prev => prev.filter(p => p !== record));
    //     }
    //     else{
    //         setSelectedAttRecord(arr => [...arr, record])
    //     }
    // }

    const attRecordsToBeDeleted = () => {
        // Will get the ID from the useState array multiID to get the data to be deleted
        for (let j = 0; j < multiID.length; j++){
            fetch('http://localhost:5000/student_attendance/to_be_deleted/' + multiID[j]).then(res => res.json()).then(result => {
                setSelectedAttRecord(arr => [...arr, result]);
            })
        }
    }

    const deleteSelectedRecords = () => {

        for (let i = 0; i < selectedAttRecord.length; i++) {
    
            let databody = {
                "userID": selectedAttRecord[i].userID,
                "timestamp": selectedAttRecord[i].timestamp,
                "status": selectedAttRecord[i].status,
                "reasons": selectedAttRecord[i].reasons,
                "intervention": selectedAttRecord[i].intervention
            }
    
            fetch('http://localhost:5000/deleted_records/student_attendance/', {
                method: 'POST',
                body: JSON.stringify(databody),
                headers: {
                    'Content-Type': 'application/json'
                },
            })
            .then(response => response.json());

            fetch('http://localhost:5000/student_attendance/delete_attendance/' + selectedAttRecord[i]._id, {
                method: 'DELETE'
            })
            .then(response => response.json());             
        }
    }
    
    
    const checkIfDelete = (e) => {
        root.style.setProperty('--ConfirmDelete-Modal-PointerEvents', "all");
        root.style.setProperty('--ConfirmDelete-Modal-Opacity', "1"); 
        
        attRecordsToBeDeleted();
    }

    const confirmDelete = () => {
        refreshViewStudentTable();

        deleteSelectedRecords();
        root.style.setProperty('--ConfirmDelete-Modal-PointerEvents', "none");
        root.style.setProperty('--ConfirmDelete-Modal-Opacity', "0");

        setSelectedAttRecord([]);
        setMultiID([]);
        
        refreshViewStudentTable();
    }

    const cancelDelete = () => {
        root.style.setProperty('--ConfirmDelete-Modal-PointerEvents', "none");
        root.style.setProperty('--ConfirmDelete-Modal-Opacity', "0");

        setSelectedAttRecord([]);
    }

//======================================================================================================================
    // Use to refresh the view student table
    const refreshViewStudentTable = () => {
        fetch('http://localhost:5000/student_attendance/' + viewStudentID).then(res => res.json()).then(result => {
            setViewStudentAttendance(result)
        })
    }

//======================================================================================================================
    return (
        <>
        <animated.div className="windowAttendance_draggable_area"
        {...bindAttendancePos()} style={{
            x, y      
        }} />
        <animated.div className="attendance_window" id="attendance_window"
        style={{
            x, y        
        }}>
        <div className="windowAttendance_topbar" id="windowAttendance_topbar">Attendance
            <div>
                <span id="dashboard_minmax" className="material-symbols-outlined" onClick={minmaxAttendance}>web_asset</span>
                <span id="dashboard_close" className="material-symbols-outlined" onClick={closeAttendance}>close</span>
            </div>
        </div>


        <div className="windowAttendance_default_wrap">
            <div className="attendance_top_wrap">
                <div className="attendance_search_wrap">
                    <div className="attendance_search">
                        <img src={search_icon} alt="search_icon" className="attendance_search_icon"></img>
                        <input type="text" className="attendance_search_input" placeholder="Search student" onChange={e=> setQuery(e.target.value)}></input>
                    </div>
                    <span className="attendance_search_label">SUGGESTION/S:</span>
                    <span className="attendance_search_suggestions">12 STEM B</span>
                    <span className="attendance_search_suggestions">12 TVL B</span>
                </div>
                <div className="attendance_cbandbutton_wrap">
                    <div className="attendance_cb_wrap">
                        <label className="attendance_cb_label">Grade Level</label>
                        <div className="attendance_grade_level_wrap">
                            <select name="attendance_grade_level" id="attendance_grade_level" className="attendance_cb" onChange={e => setQuery(e.target.value)}>
                                <option value="11">11</option>
                                <option value="12">12</option>
                            </select>
                            <span className="attendance_cb_custom_arrow"></span>
                        </div>
                    </div>
                    <div className="attendance_cb_wrap">
                        <label className="attendance_cb_label">Strand / Track</label>
                        <div className="attendance_strand_track_wrap">
                            <select name="attendance_strand_track" id="attendance_strand_track" className="attendance_cb" onChange={e => setQuery(e.target.value)}>
                                <option value="stem">STEM</option>
                                <option value="humms">HUMMS</option>
                                <option value="tvl">TVL</option>
                            </select>
                            <span className="attendance_cb_custom_arrow"></span>
                        </div>
                    </div>
                    <div className="attendance_record_attendance_wrap">
                        <button className="attendance_record_attendance" onClick={FaceRec}>
                            <span className="attendance_button_label">Record<br></br>Attendance</span>
                            <img src={record_icon} alt="record_attendance_button" className="record_attendance_button"></img>
                        </button>
                    </div>
                    <div className="attendance_download_attendance_wrap">
                        <button className="attendance_download_attendance">
                            <span className="attendance_button_label">Download<br></br>Attendance</span>
                            <img src={download_icon} alt="download_attendance_button" className="download_attendance_button"></img>
                        </button>
                    </div>
                </div>
            </div>

            <div className="attendance_main_container" id="attendance_main_container">
                <div className="windowAttendance_container">
                    <div className="windowAttendance_table_wrap" id="windowAttendance_table_wrap">
                        <table className="windowAttendance_table">
                            <thead>
                                <tr className="windowAttendance_table_header">
                                    <td>Student Name</td>
                                    <td>Student ID</td>
                                    <td>Student Section</td>
                                    <td>Present/s</td>
                                    <td>Absent/s</td>
                                    <td>Actions</td>
                                </tr>
                            </thead>
                            <tbody className="windowAttendance_table_body">
                                {studentInfo && studentInfo.filter
                                    (studinfo=>
                                        keys.some(key=>studinfo[key].toLowerCase().includes(query))
                                    ).map((studinfo) => (
                                        <WindowAttendanceDetails key={studinfo._id} 
                                        studinfo={studinfo} 
                                        goToViewStudent={goToViewStudent}/>
                                        ))
                                }
                            </tbody>
                        </table>
                    </div>          
                </div>
            </div>
        </div>


        <div className="windowAttendance_view_wrap">
            <div className="winAtt_viewStudent_wrap">
                <div className="winAtt_viewStudent_back_button" onClick={backToTable}>&#10094; Back to table</div>
                <div className="winAtt_viewStudent_top_wrap">
                    <div className="winAtt_viewStudent_profile_wrap">
                        <div className="winAtt_viewStudent_profile_picture"></div>
                        <div className="winAtt_viewStudent_info_wrap">
                            <div>
                                <div className="winAtt_viewStudent_stud_name"> {viewStudentInfo.lname + ", " + viewStudentInfo.fname}</div>
                                <div className="winAtt_viewStudent_stud_id">{viewStudentInfo.userID}</div>
                                <div className="winAtt_viewStudent_stud_section">{viewStudentInfo.strand + "-" + viewStudentInfo.section}</div>
                            </div>

                            <div className="winAtt_viewStudent_sortCB_label">Sort by:</div>
                            <select className="winAtt_viewStudent_sortCB" onChange={e => setStudentAttQuery(e.target.value)}>
                                <option value="">Default</option>
                                <option value="date_asc">Date Ascending</option>
                                <option value="date_desc">Date Descending</option>
                                <option value="absent">Absents</option>
                                <option value="present">Presents</option>
                            </select>
                        </div>
                    </div>
                    <div className="winAtt_viewStudent_notifyButton_wrap">
                        <button className="winAtt_viewStudent_refdelButton"
                            onClick={refreshViewStudentTable}>
                            <img src={refresh_icon}
                                alt="refresh" 
                                className="winAtt_viewStudent_refdelIcon"/>
                        </button>
                        <button className="winAtt_viewStudent_notifyButton">
                            Notify
                            <img src={notify_icon}
                                alt="notify" 
                                className="winAtt_viewStudent_notifyIcon"/>
                        </button>
                    </div>                   
                </div>

                <div className="winAtt_viewStudent_table_wrap">
                    <table className="winAtt_viewStudent_table">
                        <thead>
                            <tr className="winAtt_viewStudent_table_header">
                                <td>
                                    {/* <input type="checkbox"></input> */}
                                </td>
                                <td>Date</td>
                                <td>Status</td>
                                <td>Reasons</td>
                                <td></td>
                                <td>Interventions</td>
                                <td></td>
                            </tr>
                        </thead>
                        <tbody>
                            {viewStudentAttendance && viewStudentAttendance.filter
                            (viewstudatt=>
                                studAttKeys.some(key=>viewstudatt[key].toLowerCase().includes(studentAttQuery))
                            ).map((viewstudatt) => (
                                <WinAttViewStudentDetails key={viewstudatt._id} 
                                viewstudatt={viewstudatt}
                                editAttendanceReason={editAttendanceReason}                                
                                setOpenEditReason={setOpenEditReason}
                                setUpdateReasonID={setUpdateReasonID}
                                setOpenEditIntervention={setOpenEditIntervention}
                                setUpdateInterventionID={setUpdateInterventionID}
                                editAttendanceIntervention={editAttendanceIntervention}
                                setDataToBeDeleted={setDataToBeDeleted}
                                // attRecordsToBeDeleted={attRecordsToBeDeleted}
                                />
                                ))
                            }
                        </tbody>
                    </table>
                </div>

                <div className="winAtt_viewStudent_bottom_wrap">
                    <button 
                        className="winAtt_viewStudent_edit_multiRecord"
                        onClick={multipleEditAttReasons}>Edit
                    </button>
                    <button 
                        className="winAtt_viewStudent_del_multiRecord"
                        onClick={checkIfDelete}>Delete
                    </button>
                </div>
            </div>
        </div>

        <div className="editReason_modal_wrap">
            <EditAttReason 
            openEditReason={openEditReason} 
            editReason={editReason}
            setOpenEditReason={setOpenEditReason}
            setNewReason={setNewReason}
            updateAttendanceReason={updateAttendanceReason}/>
        </div>

        <div className="editIntervention_modal_wrap">
            <EditAttIntervention
            openEditIntervention={openEditIntervention}
            editIntervention={editIntervention}
            setOpenEditIntervention={setOpenEditIntervention}
            setNewIntervention={setNewIntervention}
            updateAttendanceIntervention={updateAttendanceIntervention}/>
        </div>

        <div className="multiEditReasons_modal_wrap">
            <MultiEditAttReason
            openMultiEditReasons={openMultiEditReasons}
            setOpenMultiEditReasons={setOpenMultiEditReasons}
            setNewReason={setNewReason}
            setNewIntervention={setNewIntervention}
            updateMultiAttReasons={updateMultiAttReasons}/>
        </div>

        <div className="confirmDelete_modal_wrap">
            <div className="editAtt_Modal_Container">
                <div className="editAtt_Modal_label">Are you sure you want<br></br>to delete selected items?</div>
                <button className="editAtt_cancel_button" onClick={confirmDelete}>Yes</button>
                <button className="editAtt_update_button" onClick={cancelDelete}>No</button>
            </div>
        </div>
    
        </animated.div>
        </>
    )
}

export default WindowAttendance