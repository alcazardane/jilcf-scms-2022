import React, {useEffect, useState, useRef} from 'react'

// import components


// import images
import logout_icon from "../../../images/logout_FILL0_wght400_GRAD0_opsz48.png"

const Navbar = ({ confirmLogout }) => {

  return (
    <>
    <div className="sidebar_Navbar">
        <div className="sidebar_Navbar_sub_wrap">
            {/* <div className="sidebar_Navbar_profile"></div> */}
            <div className="sidebar_Navbar_name_wrap">
                <div className="sidebar_Navbar_username">Juan Dela Cruz</div>
                <div className="sidebar_Navbar_userPosition">Teacher</div>
            </div>
            <div className="sidebar_Navbar_name_wrap_2">
                <img className="sidebar_Navbar_icons" onClick={ confirmLogout } src={logout_icon} alt="logout_icon" />
            </div>
        </div>
    </div>
    </>
  )
}

export default Navbar