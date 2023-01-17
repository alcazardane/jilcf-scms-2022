import { Link } from "react-router-dom"
const AnnouncementDetails = ({announcements}) => {

    return (
        <>
            <div className="dashboard_L3_act_container ann-con">
            <Link to="/home/L3/notification"style={{ textDecoration: 'none' }}> 
                <div className="dashboard_L3_act_label act_name">{announcements.name}</div>
                <div className="dashboard_L3_act_label act_subj">{announcements.type}</div>
                <div className="dashboard_L3_act_label act_date">{announcements.date + ", " + announcements.time}</div>
            </Link>  
            </div>    
        </>
    )
}

export default AnnouncementDetails