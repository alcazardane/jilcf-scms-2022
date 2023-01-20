import { useEffect, useState} from 'react'

// need to install "@use-gesture/react" and "react-spring" first
import { useDrag } from '@use-gesture/react'
import { useSpring, animated } from 'react-spring'

import useWindowDimensions from '../dashboard/hooks/useWindowDimensions'
import AssessmentWindowDetails from '../assessment/assessment_window_detail'
import '../../styles/windowAssessment/windowAssessment.css'

const AssessmentWindow = () => {
    const [assessments, setAssessment] = useState(null)

    useEffect(() =>{
        const fetchAssessment = async () => {
            const response = await fetch('/assessment_record')
            const json = await response.json()

            if (response.ok){
                setAssessment(json)
            }
        }

        fetchAssessment()
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
        root.style.setProperty('--windowAssessment-display', "none")

        root.style.setProperty('--windowAssessment-width', "77vw")
        root.style.setProperty('--windowAssessment-height', "80vh")
        root.style.setProperty('--windowAssessment-top', "20px")
        root.style.setProperty('--windowAssessment-left', "20px")
        root.style.setProperty('--windowAssessment-border-radius', "7px")
        root.style.setProperty('--windowAssessment-td-height', "3vh")
        root.style.setProperty('--windowAssessment-buttons-width', "8vw")
        root.style.setProperty('--windowAssessment-buttons-height', "3vw")
        root.style.setProperty('--windowAssessment-buttons-font', "0.8vw")
        root.style.setProperty('--windowAssessment-search-width', "30vw")
        root.style.setProperty('--windowAssessment-drag-display', "block")
        root.style.setProperty('--windowAssessment-table-height', "45vh")
        root.style.setProperty('--windowAssessment-500-button-width', "32vw")

        // console.log("x: " + xVal + ", y: " + yVal);

        setwindowAssessmentIsMininimized(true)
        // backToTable();
    }

    // For minimizing and maximizing window_Attendance
    const [windowAssessmentIsMinimized,  setwindowAssessmentIsMininimized] = useState(true);
    const minmaxAttendance = () => {
        if (windowAssessmentIsMinimized === true){
            root.style.setProperty('--windowAssessment-width', "calc(100% - 4px)")
            root.style.setProperty('--windowAssessment-height', "calc(100vh - 49px)")
            root.style.setProperty('--windowAssessment-top', `${-yVal}px`)
            root.style.setProperty('--windowAssessment-left', `${-xVal}px`)
            root.style.setProperty('--windowAssessment-border-radius', "0px")
            root.style.setProperty('--windowAssessment-td-height', "3.8vh")
            root.style.setProperty('--windowAssessment-buttons-width', "10vw")
            root.style.setProperty('--windowAssessment-buttons-height', "3.5vw")
            root.style.setProperty('--windowAssessment-buttons-font', "1vw")
            root.style.setProperty('--windowAssessment-search-width', "40vw")
            root.style.setProperty('--windowAssessment-drag-display', "none")
            root.style.setProperty('--windowAssessment-table-height', "60vh")

            root.style.setProperty('--windowAssessment-500-button-width', "43vw")

            attendancePos.set({
                x: xVal,
                y: yVal,
            });
            setwindowAssessmentIsMininimized(false)
        }
        else {
            root.style.setProperty('--windowAssessment-width', "77vw")
            root.style.setProperty('--windowAssessment-height', "80vh")
            root.style.setProperty('--windowAssessment-top', "20px")
            root.style.setProperty('--windowAssessment-left', "20px")
            root.style.setProperty('--windowAssessment-border-radius', "7px")
            root.style.setProperty('--windowAssessment-td-height', "3vh")
            root.style.setProperty('--windowAssessment-buttons-width', "8vw")
            root.style.setProperty('--windowAssessment-buttons-height', "3vw")
            root.style.setProperty('--windowAssessment-buttons-font', "0.8vw")
            root.style.setProperty('--windowAssessment-search-width', "30vw")
            root.style.setProperty('--windowAssessment-drag-display', "block")
            root.style.setProperty('--windowAssessment-table-height', "45vh")

            root.style.setProperty('--windowAssessment-500-button-width', "32vw")

            setwindowAssessmentIsMininimized(true)
        }
    }

    

    return (
        <>
        <animated.div className="windowAssessment_draggable_area"
        {...bindAttendancePos()} style={{
            x, y      
        }} />
        <animated.div className="attendance_window" id="attendance_window"
        style={{
            x, y        
        }}>
        <div className="windowAssessment_topbar" id="windowAssessment_topbar">Assessment
            <div>
                <span id="dashboard_minmax" className="material-symbols-outlined" onClick={minmaxAttendance}>web_asset</span>
                <span id="dashboard_close" className="material-symbols-outlined" onClick={closeAttendance}>close</span>
            </div>
        </div>
        <div className="assessment_sub_container_wrap_out" id="assessment_sub_container_wrap_out">
                {assessments && assessments.map((assessment) => (
                    <AssessmentWindowDetails key={assessment._id} assessment={assessment} />
                ))}
            </div>
        

        </animated.div>
        </>
    )
}

export default AssessmentWindow