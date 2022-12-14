import { useEffect, useState} from 'react'
import { Link } from 'react-router-dom'

//Components
import AttendanceDetails from './dashboard_details/AttendanceDetails'

const Attendance = ({dashAttRef}) => {

    const [attendances, setAttendance] = useState(null)

    // Fetching the data from the collection "attendance_per_classroom" in the database
    useEffect(() =>{
        const fetchAttendance = async () => {
            const response = await fetch('http://localhost:5000/attendance_per_classroom')
            const json = await response.json()

            if (response.ok){
                setAttendance(json)
            }
        }

        fetchAttendance()
    }, [])


    // For the sliders
    const slideRight = () =>{
        var slider = document.getElementById("attendance_sub_container_wrap");
        slider.scrollLeft = slider.scrollLeft + 325;
    }
    const slideLeft = () =>{
        var slider = document.getElementById("attendance_sub_container_wrap");
        slider.scrollLeft = slider.scrollLeft - 325;
    }

    return (
        <div className="attendance_container" ref={dashAttRef}>
        <div className="attendance_header">
            <div className="container_labels-b">ATTENDANCE PER CLASSROOM</div>
            <div className="view_attendance"><Link className="link" to={"/attendance"}>View Attendance &#10095;</Link></div>
        </div>
            <div className="slide_buttons_wrap">
                <div className="slide_button_wrap_left-b">
                    <span className="material-symbols-outlined" onClick={slideLeft}>arrow_circle_left</span>
                </div>
                <div className="slide_button_wrap_right-b">
                    <span className="material-symbols-outlined" onClick={slideRight}>arrow_circle_right</span>
                </div>
            </div>
            <div className="attendance_sub_container_wrap" id="attendance_sub_container_wrap">
                {attendances && attendances.map((attendance) => (
                    <AttendanceDetails key={attendance._id} attendance={attendance} />
                ))}
            </div>
        </div>
    )
}

export default Attendance