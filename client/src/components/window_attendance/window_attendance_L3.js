import { useEffect, useState} from 'react'

// need to install "@use-gesture/react" and "react-spring" first
import { useDrag } from '@use-gesture/react'
import { useSpring, animated } from 'react-spring'

// hook for window size
import useWindowDimensions from '../dashboard/hooks/useWindowDimensions'


//Components
import '../../styles/windowAttendance_styles.css'

// import images
import refresh_icon from "../../images/refresh_FILL1_wght400_GRAD0_opsz48.png"

const WindowAttendanceL3 = () => {

    // const [studentInfo, setStudentInfo] = useState(null)

    // useEffect(() => {
    //     const fetchStudentInfo = async () => {
    //         const response = await fetch('http://localhost:5000/student_info')
    //         const json = await response.json()
    
    //         if (response.ok){
    //             setStudentInfo(json)
    //         }
    //     }
    //     fetchStudentInfo()
    // }, [])  


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
        root.style.setProperty('--windowAttendance-L3-display', "none")

        root.style.setProperty('--windowAttendance-width', "77vw")
        root.style.setProperty('--windowAttendance-height', "80vh")
        root.style.setProperty('--windowAttendance-top', "20px")
        root.style.setProperty('--windowAttendance-left', "20px")
        root.style.setProperty('--windowAttendance-border-radius', "7px")
        root.style.setProperty('--windowAttendance-drag-display', "block")

        // console.log("x: " + xVal + ", y: " + yVal);

        setWindowAttendanceIsMininimized(true)
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
            root.style.setProperty('--windowAttendance-drag-display', "none")

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
            root.style.setProperty('--windowAttendance-drag-display', "block")

            setWindowAttendanceIsMininimized(true)
        }
    }

    const [viewStudentInfo, setViewStudentInfo] = useState([])
    const [viewStudentAttendance, setViewStudentAttendance] = useState([])

    useEffect(() => {
        fetch('http://localhost:5000/student_info/11-0000006').then(res => res.json()).then(result => {
            setViewStudentInfo(result)
        })
    },[viewStudentInfo])

    useEffect (() => {
        fetch('http://localhost:5000/student_attendance/11-0000006').then(res => res.json()).then(result => {
            setViewStudentAttendance(result)
        })
    }, [viewStudentAttendance])


    const refreshViewStudentTable = () => {
        fetch('http://localhost:5000/student_attendance/11-0000006').then(res => res.json()).then(result => {
            setViewStudentAttendance(result);
        })
    }

    const [studentAttQuery, setStudentAttQuery] = useState("")
    const studAttKeys = ["status"]


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
            <div className="winAtt_viewStudent_wrap">
                <div className="winAtt_viewStudent_top_wrap">
                    <div className="winAtt_viewStudent_profile_wrap">
                        <div className="winAtt_viewStudent_profile_picture"></div>
                        <div className="winAtt_viewStudent_info_wrap">
                            <div>
                                <div className="winAtt_viewStudent_stud_name"> {viewStudentInfo.lname + ", " + viewStudentInfo.fname}</div>
                                <div className="winAtt_viewStudent_stud_id">{viewStudentInfo.userID}</div>
                                <div className="winAtt_viewStudent_stud_section">{viewStudentInfo.track}</div>
                            </div>

                            <div className="winAtt_viewStudent_sortCB_wrap">
                                <div className="winAtt_viewStudent_sortCB_inside">
                                    <div className="winAtt_viewStudent_sortCB_label">Subject:</div>
                                    <select className="winAtt_viewStudent_sortCB sortCB-long" 
                                        onChange={e => setStudentAttQuery(e.target.value)}
                                    >
                                        <option value="CP">Computer Programming</option>
                                        <option value="OC">Oral Communication</option>
                                        <option value="GM">General Mathematics</option>
                                        <option value="ELS">Earth and Life Science</option>
                                    </select>
                                </div>

                                <div className="winAtt_viewStudent_sortCB_inside">
                                    <div className="winAtt_viewStudent_sortCB_label">School Year/Sem:</div>
                                    <select className="winAtt_viewStudent_sortCB sortCB-long" 
                                        onChange={e => setStudentAttQuery(e.target.value)}
                                    >
                                        <option value="22-23-first-sem">2022-2023 First Sem</option>
                                        <option value="22-23-second-sem">2022-2023 Second Sem</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="winAtt_viewStudent_notifyButton_wrap">
                        <button className="winAtt_viewStudent_notifyButton"
                            onClick={refreshViewStudentTable}>
                            Refresh
                            <img src={refresh_icon}
                                alt="refresh" 
                                className="winAtt_viewStudent_notifyIcon"/>
                        </button>
                    </div>                   
                </div>

                <div className="winAtt_viewStudent_table_wrap">
                    <table className="winAtt_viewStudent_table">
                        <thead>
                            <tr className="winAtt_viewStudent_table_header-b">
                                <td>Date</td>
                                <td>Subject</td>
                                <td>School Year/Term</td>
                                <td>Status</td>
                            </tr>
                        </thead>
                        <tbody>
                            {viewStudentAttendance && viewStudentAttendance.filter
                            (viewstudatt=>
                                studAttKeys.some(key=>viewstudatt[key].toLowerCase().includes(studentAttQuery))
                            ).map((viewstudatt) => (
                                <tr key={viewstudatt._id} className="winAtt_viewStudent_table_body-b">
                                    <td>{viewstudatt.timestamp}</td>
                                    <td>Computer Programming</td>
                                    <td>2022-2023 First Term</td>
                                    <td>{viewstudatt.status}</td>
                                </tr>
                                ))
                            }
                        </tbody>
                    </table>
                </div>

            </div>
        </div>
    
        </animated.div>
        </>
    )
}

export default WindowAttendanceL3