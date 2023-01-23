const UpcomingDetails = ({schedules}) => {

    return (
        <>
            <div className="dashboard_L3_act_container">
                <div className="dashboard_L3_act_label act_name">
                    {schedules.class_type + ", " + 
                    schedules.class_start_hh + ":" + schedules.class_start_mm + " " + schedules.class_start_pa +
                    " - " + 
                    schedules.class_end_hh + ":" + schedules.class_end_mm + " " + schedules.class_end_pa}
                </div>
                <div className="dashboard_L3_act_label act_subj">{schedules.subject_name}</div>
                <div className="dashboard_L3_act_label act_date">{schedules.class_room}</div>
            </div>        
        </>
    )
}

export default UpcomingDetails