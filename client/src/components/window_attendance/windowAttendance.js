import { useEffect, useState} from 'react'

// need to install "@use-gesture/react" and "react-spring" first
import { useDrag } from '@use-gesture/react'
import { useSpring, animated } from 'react-spring'

// hook for window size
import useWindowDimensions from '../dashboard/hooks/useWindowDimensions'


//Components
import WindowAttendanceDetails from './windowAttendanceDetails'
import '../../styles/windowAttendance_styles.css'

const WindowAttendance = () => {

    const [windowAttendance, setWindowAttendance] = useState(null)

    // Fetching the data from the collection "assessmet_record" in the database
    useEffect(() =>{
        const fetchWindowAttendance = async () => {
            const response = await fetch('http://localhost:5000/assessment_record')
            const json = await response.json()

            if (response.ok){
                setWindowAttendance(json)
            }
        }

        fetchWindowAttendance()
    }, [])

    var root = document.querySelector(":root");

    // For window snapping
    // 18 is for scrollbar width, 45 is for Navbar heght, and 4 is for border which is 2px+2px
    const { height, width } = useWindowDimensions();
    var rightBound = width - (width * 0.77) - 18 + 4;
    var bottomBound = height - (height * 0.80) - 18 - 45 + 4;
    var leftBound = 10;
    var topBound = 10;

    // For if statements. Basically works just like true or false.
    var max = 1;

    // Get the x and y values to use it for maximizing the window
    var xVal = 0;
    var yVal = 0;

    // For dragging
    const attendancePos = useSpring({ x: 0, y: 0});
    const bindAttendancePos = useDrag((params) => {

        xVal = params.offset[0];
        yVal = params.offset[1];

        attendancePos.x.set(xVal);
        attendancePos.y.set(yVal);

        // Logs the x and y values. Just to see it
        console.log("x: " + params.offset[0] + " y: " + params.offset[1]);
    },
    {
        bounds: { left: -leftBound, right: rightBound, top: -topBound, bottom: bottomBound }
    });

    // For closing window_Attendance
    const closeAttendance = () => {
        root.style.setProperty('--windowAttendance-display', "none")

        root.style.setProperty('--windowAttendance-width', "77vw")
        root.style.setProperty('--windowAttendance-height', "80vh")
        root.style.setProperty('--windowAttendance-top', "10px")
        root.style.setProperty('--windowAttendance-left', "10px")
        root.style.setProperty('--windowAttendance-border-radius', "7px")
        root.style.setProperty('--windowAttendance-td-height', "3.2vh")
        root.style.setProperty('--windowAttendance-buttons-width', "8vw")
        root.style.setProperty('--windowAttendance-buttons-height', "6vh")
        root.style.setProperty('--windowAttendance-buttons-font', "0.8vw")
        root.style.setProperty('--windowAttendance-search-width', "30vw")
        root.style.setProperty('--windowAttendance-drag-display', "block")
        root.style.setProperty('--windowAttendance-table-height', "45vh")

        max = 1;
    }

    // For minimizing and maximizing window_Attendance
    const minmaxAttendance = () => {
        if (max === 1){
            root.style.setProperty('--windowAttendance-width', "calc(100% - 4px)")
            root.style.setProperty('--windowAttendance-height', "calc(100vh - 49px)")
            root.style.setProperty('--windowAttendance-top', `${-yVal}px`)
            root.style.setProperty('--windowAttendance-left', `${-xVal}px`)
            root.style.setProperty('--windowAttendance-border-radius', "0px")
            root.style.setProperty('--windowAttendance-td-height', "3.8vh")
            root.style.setProperty('--windowAttendance-buttons-width', "10vw")
            root.style.setProperty('--windowAttendance-buttons-height', "7.5vh")
            root.style.setProperty('--windowAttendance-buttons-font', "1vw")
            root.style.setProperty('--windowAttendance-search-width', "40vw")
            root.style.setProperty('--windowAttendance-drag-display', "none")
            root.style.setProperty('--windowAttendance-table-height', "60vh")

            max = 2;
        }
        else{
            root.style.setProperty('--windowAttendance-width', "77vw")
            root.style.setProperty('--windowAttendance-height', "80vh")
            root.style.setProperty('--windowAttendance-top', "10px")
            root.style.setProperty('--windowAttendance-left', "10px")
            root.style.setProperty('--windowAttendance-border-radius', "7px")
            root.style.setProperty('--windowAttendance-td-height', "3.2vh")
            root.style.setProperty('--windowAttendance-buttons-width', "8vw")
            root.style.setProperty('--windowAttendance-buttons-height', "6vh")
            root.style.setProperty('--windowAttendance-buttons-font', "0.8vw")
            root.style.setProperty('--windowAttendance-search-width', "30vw")
            root.style.setProperty('--windowAttendance-drag-display', "block")
            root.style.setProperty('--windowAttendance-table-height', "45vh")

            max = 1;
        }
    }

    // For searching
    const [query, setQuery] = useState("");
    const keys = ["student_lastname", "student_firstname", "student_middlename", "student_grade_level", "student_track", "student_strand"]


    return (
        <>
        <animated.div className="windowAttendance_draggable_area"
        {...bindAttendancePos()} style={{
          x: attendancePos.x,
          y: attendancePos.y,
        }} />
        <animated.div className="attendance_window" id="attendance_window"
        style={{
          x: attendancePos.x,
          y: attendancePos.y,
        }}>
        <div className="windowAttendance_topbar" id="windowAttendance_topbar">Attendance
            <div>
                <span id="dashboard_minmax" className="material-symbols-outlined" onClick={minmaxAttendance}>web_asset</span>
                <span id="dashboard_close" className="material-symbols-outlined" onClick={closeAttendance}>close</span>
            </div>
        </div>
        <div className="attendance_top_wrap">
            <div className="attendance_search_wrap">
                <div className="attendance_search">
                    <img src="search_FILL0_wght400_GRAD0_opsz48.png" alt="search_icon" className="attendance_search_icon"></img>
                    <input type="text" className="attendance_search_input" placeholder="Search student" onChange={e=> setQuery(e.target.value)}></input>
                </div>
                <span className="attendance_search_label">SUGGESTION/S:</span>
                <span className="attendance_search_suggestions">12 STEM B</span>
                <span className="attendance_search_suggestions">12 TVL B</span>
            </div>
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
                <button className="attendance_record_attendance">
                    <span className="attendance_button_label">Record Attendance</span>
                    <img src="video_camera_front_FILL0_wght400_GRAD0_opsz48.png" alt="record_attendance_button" className="record_attendance_button"></img>
                </button>
            </div>
            <div className="attendance_download_attendance_wrap">
                <button className="attendance_download_attendance">
                    <span className="attendance_button_label">Download Attendance</span>
                    <img src="cloud_download_FILL0_wght400_GRAD0_opsz48.png" alt="download_attendance_button" className="download_attendance_button"></img>
                </button>
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
                        {windowAttendance && windowAttendance.filter
                        (winattendance=>
                            keys.some(key=>winattendance[key].toLowerCase().includes(query))
                        ).map((winattendance) => (
                            <WindowAttendanceDetails key={winattendance._id} winattendance={winattendance} />
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

export default WindowAttendance