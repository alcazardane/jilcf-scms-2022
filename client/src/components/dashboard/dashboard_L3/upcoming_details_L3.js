const UpcomingDetails = ({schedules}) => {

    return (
        <>
            <div className="dashboard_L3_act_container">
                <div className="dashboard_L3_act_label act_name">{schedules.task + ", " + schedules.time}</div>
                <div className="dashboard_L3_act_label act_subj">{schedules.sched_class}</div>
                <div className="dashboard_L3_act_label act_date">{schedules.room}</div>
            </div>        
        </>
    )
}

export default UpcomingDetails