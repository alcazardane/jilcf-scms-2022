import { useRef, useState, useEffect } from "react"
import Sidebar from "../SIDEBAR/sidebar"
import { useAuthContext } from "../../hooks/useAuthContext"
import AdminModule from "../admin_module/admin_module"
import { Link } from "react-router-dom"

const NotificationPreview = ({ notificationIsOpen }) => {

    const { user } = useAuthContext()

    const [announcements, setAnnouncements] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/announcements/')
        .then(res => res.json())
        .then(data => setAnnouncements(data))
        .catch(err => console.log(err));
    }, [notificationIsOpen]);

    let notificationPreview;
    if (user.level === '1'){
        notificationPreview = "/home/L1/notification"
    }
    else if (user.level === '2'){
        notificationPreview = "/home/L2/notification"
    }
    else if (user.level === '3'){
        notificationPreview = "/home/L3/notification"
    }
    else {
        return
    }

    return (
        <> 
        <div className="notification_preview_item_wrap">
            <div className="notification_preview_title">Notifications</div>
            {announcements && announcements.map(announce => (
                <div key={announce._id} className="notification_preview_item_container">
                    <Link to={notificationPreview} style={{ textDecoration: 'none' }}>                   
                        <div className="notification_preview_item_title">{announce.name}</div>
                        <div className="notification_preview_item_desc">{"- " + announce.description}</div>
                        <div className="notification_preview_item_label">Type: {announce.type}</div>
                        <div className="notification_preview_item_label">Date: {announce.date}</div>                  
                    </Link>
                </div>
            ))}
        </div>
        </>
    )
  }
  
  export default NotificationPreview