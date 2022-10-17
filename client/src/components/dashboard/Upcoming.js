import { useEffect, useState} from 'react'

//Components
import MyCalendar from './Calendar'
import UpcomingDetails from './dashboard_details/UpcomingDetails' 

//Upcoming container
const Upcoming = () => {
    const [upcomings, setUpcoming] = useState(null)

    // Fetching the data from the collection "upcoming_sched" in the database
    useEffect(() =>{
        const fetchUpcoming = async () => {
            const response = await fetch('http://localhost:5000/upcoming_sched')
            const json = await response.json()

            if (response.ok){
                setUpcoming(json)
            }
        }

        fetchUpcoming()
    }, [])

    return (
        <div className="upcoming_container" id="upcoming_container">
        <div className="container_labels">UPCOMING<span className="view_calendar" id="view_calendar">View Calendar &#10095;</span></div>
            <div className="upcoming_container_wrap">
                <div className="class_scheds_wrap">
                    {upcomings && upcomings.map((upcoming) => (
                        <UpcomingDetails key={upcoming._id} upcoming={upcoming} />
                    ))}
                </div>
                <div className="calendar_wrap">
                    <MyCalendar />
                </div> 
            </div>
        </div>
    )
}

export default Upcoming