//import React, {useEffect, useState, useRef} from 'react'
// import { useNavigate } from 'react-router-dom'

// Import components
// import { useLogout } from '../../../hooks/useLogout'

// Import images
import logout_icon from "../../../images/logout_FILL0_wght400_GRAD0_opsz48.png"

const Navbar_L1 = ({ confirmLogout }) => {

    // const [userCred, setUserCred] = useState([])

    // // setAdminID("22-0000000")
    // useEffect(() =>{
    //     const fetchUser= async () => {
    //         const response = await fetch('http://localhost:5000/record/user/'+ user.idNumber)
    //         const json = await response.json()

    //         if (response.ok){
    //             setUserCred(json)
    //         }
    //     }
    //     fetchUser()
    // }, [])



  return (
    <>
    <div className="sidebar_Navbar">
        <div className="sidebar_Navbar_sub_wrap">
            {/* <div className="sidebar_Navbar_profile"></div> */}
            <div className="sidebar_Navbar_name_wrap">
                <div className="sidebar_Navbar_username">Juan Dela Cruz</div>
                <div className="sidebar_Navbar_userPosition">Admin</div>
            </div>
            <div className="sidebar_Navbar_name_wrap_2">
                <img className="sidebar_Navbar_icons" onClick={ confirmLogout } src={logout_icon} alt="logout_icon" />
            </div>
        </div>
    </div>
    </>
  )
}

export default Navbar_L1