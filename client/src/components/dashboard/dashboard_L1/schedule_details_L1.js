const ScheduleDetails = ({ schedules }) => {

    return (
        <>
        <div className="dashboard_L1_Upcoming_scheds">
            <div className="dashboard_L1_Upcoming_scheds_inside">
                <div className="l1_scheds_time">
                    <span>{schedules.class_type + ", " + 
                        schedules.class_start_hh + ":" + schedules.class_start_mm + " " + schedules.class_start_pa +
                        " - " + 
                        schedules.class_end_hh + ":" + schedules.class_end_mm + " " + schedules.class_end_pa}</span>
                </div>
                <div className="l1_scheds_room">
                    <span>{schedules.subject_name}</span>
                </div>
                <div className="l1_scheds_room">
                    <span>{schedules.class_room}</span>
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