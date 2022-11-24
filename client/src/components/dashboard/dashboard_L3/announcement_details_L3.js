const AnnouncementDetails = ({announcements}) => {

    return (
        <>
            <div className="dashboard_L3_act_container ann-con">
                <div className="dashboard_L3_act_label act_name">{announcements.announcement_type}</div>
                <div className="dashboard_L3_act_label act_subj">{announcements.announcement_name}</div>
                <div className="dashboard_L3_act_label act_date">{announcements.announcement_date + ", " + announcements.announcement_time}</div>
            </div>      
        </>
    )
}

export default AnnouncementDetails