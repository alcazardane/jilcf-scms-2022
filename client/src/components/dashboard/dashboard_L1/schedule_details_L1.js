const ScheduleDetails = ({ schedules }) => {

    return (
        <>
        <div className="dashboard_L1_Upcoming_scheds">
            <div className="dashboard_L1_Upcoming_scheds_inside">
                <div className="l1_scheds_time">
                    <span>{schedules.task + ", " + schedules.time}</span>
                </div>
                <div className="l1_scheds_room">
                    <span>{schedules.sched_class}</span>
                </div>
                <div className="l1_scheds_room">
                    <span>{schedules.room}</span>
                </div>
            </div>

            <div className="dashboard_L1_Upcoming_scheds_insideB">
                <li className="l1_arrow_forward">&#10095;</li>
            </div>
        </div>
        </>
    )
}

export default ScheduleDetails