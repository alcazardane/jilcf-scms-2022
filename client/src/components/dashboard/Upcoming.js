import { useEffect, useState, useRef} from 'react'
import { Link } from 'react-router-dom'
import { useAuthContext } from '../../hooks/useAuthContext'

//Components
import MyCalendar from './Calendar'
import UpcomingDetails from './dashboard_details/UpcomingDetails' 

//Upcoming container
const Upcoming = ({ dashUpRef }) => {
    const { user } = useAuthContext()

    const weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

    const [upcomings, setUpcoming] = useState(null);
    const [idNumber, setIdNumber] = useState(user.idNumber);
    const [weekday, setWeekday] = useState(weekdays[new Date().getDay()]);

    // Fetching the data from the collection "upcoming_sched" in the database
    // useEffect(() =>{
    //     const fetchUpcoming = async () => {
    //         const response = await fetch('http://localhost:5000/upcoming_sched')
    //         const json = await response.json()

    //         if (response.ok){
    //             setUpcoming(json)
    //         }
    //     }
    //     fetchUpcoming()
    // }, [])

    useEffect(() => {
        fetch(`http://localhost:5000/api/upcoming-schedules/teacher-schedule/${idNumber}/${weekday}`)
          .then(res => res.json())
          .then(data => setUpcoming(data))
          .catch(err => console.log(err));
      }, [idNumber,weekday]);

    return (
        <div className="upcoming_container" id="upcoming_container" ref={dashUpRef}>
        {/* <div className="container_labels">UPCOMING<span className="view_calendar" id="view_calendar" ><Link className="link" to={"/calendar"}>View Calendar &#10095; </Link></span></div> */}
        <div className="container_labels">SCHEDULE FOR THE DAY<span className="view_calendar" id="view_calendar" ></span></div>
            <div className="class_scheds_wrap">
                {!upcomings ? 
                <div>No Upcomings</div>
                : 
                <>
                {upcomings && upcomings.map((upcoming) => (
                    <UpcomingDetails key={upcoming._id} upcoming={upcoming} />
                ))}
                </>
                }
            </div>
            {/* <div className="calendar_wrap">
                <MyCalendar />
            </div>  */}
        </div>
    )
}

export default Upcoming