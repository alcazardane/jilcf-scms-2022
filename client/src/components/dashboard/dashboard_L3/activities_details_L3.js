const ActivityDetails = ({activities}) => {

    return (
        <>
            <div className="dashboard_L3_act_container act-con">
                <div className="dashboard_L3_act_label act_name">{activities.activity_nm}</div>
                <div className="dashboard_L3_act_label act_subj">{activities.subj_name}</div>
                    <div className="dashboard_L3_act_label act_date">{"Due: " + activities.due_date + ", " + activities.due_time}</div>
            </div>        
        </>
    )
}

export default ActivityDetails