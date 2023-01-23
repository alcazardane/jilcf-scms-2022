import { useRef, useState, useEffect } from "react"
import Sidebar from "../SIDEBAR/sidebar"
import { useAuthContext } from "../../hooks/useAuthContext"
import search_icon from "../../images/search_FILL0_wght400_GRAD0_opsz48.png"

const NotificationModule = () => {

    const { user } = useAuthContext()

    const [announcements, setAnnouncements] = useState([]);

    useEffect(() => {
        fetch('http://localhost:5000/api/announcements/')
        .then(res => res.json())
        .then(data => setAnnouncements(data))
        .catch(err => console.log(err));
    }, []);


    return (
      <>
        <div className="assessment_module_main_wrap">
            <div className="assessment_module_topwrap">
                <div className="assessment_module_back_wrap">
                  <span className="assessment_module_section_text">Notifications</span>
                </div>

                <div className="assessment_module_searchDLUP_wrap">
                    <div className="assessment_module_search_wrap-c">
                        <img src={search_icon} alt="search" className="assessment_module_search_icon"/>
                        <input 
                            type="text" 
                            className="assessment_module_search_input"
                            placeholder="Search a notification"
                        />
                    </div>
                </div>
            </div>
            <div className="notification_view_item_container_wrap">
              {announcements && announcements.map(announce => (
                  <div key={announce._id} className="notification_view_item_container">
                      <div className="notification_preview_item_title">{announce.name}</div>
                      <div className="notification_preview_item_title">{announce.description}</div>
                      <div className="notification_preview_item_label">Type: {announce.type}</div>
                      <div className="notification_preview_item_label">Date: {announce.date}</div>
                      <div className="notification_preview_item_label">Time: {announce.time}</div>
                      <div className="notification_preview_item_label">Place: {announce.place}</div>
                  </div>
              ))}
            </div>
        </div>
      </>
    )
  }
  
  export default NotificationModule