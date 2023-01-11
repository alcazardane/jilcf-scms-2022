import React, {useEffect, useState, useRef} from 'react'

// import components


// import images
import logout_icon from "../../../images/logout_FILL0_wght400_GRAD0_opsz48.png"

// const sampleTeacher = [{lname: "Alcantara", fname: "John", mname: "Suarez", level: "2"}]

const Navbar = ({ confirmLogout, idNumber }) => {

  const [userDetails, setUserDetails] = useState({});

  useEffect(() => {
    const fetchUserDetails = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/user/get-user-details?idNumber=${idNumber}`);
        const data = await res.json();
        setUserDetails(data);
      } catch (error) {
        console.error(error);
      }
    };

    if (idNumber) {
      fetchUserDetails();
    }
  }, [idNumber]);

  // useEffect(() => {
  //   setUserDetails({lname: "Alcantara", fname: "John", mname: "Suarez", level: "2"})
  // }, [idNumber])

  const getMiddleInitial = (initial) => {
    if(!initial){
      return
    }
    else{
      return initial.substring(0, 1)
    }
  }

  const getLevelString = (level) => {
    if (level === "1") {
      return 'Admin';
    } else if (level === "2") {
      return 'Teacher';
    } else if (level === "3") {
      return 'Student';
    }
    return 'Unknown';
  };

  return (
    <>
    <div className="sidebar_Navbar">
        <div className="sidebar_Navbar_sub_wrap">
            {/* <div className="sidebar_Navbar_profile"></div> */}
            <div className="sidebar_Navbar_name_wrap">
                <div className="sidebar_Navbar_username">{userDetails.lname + ", " + userDetails.fname + " " + getMiddleInitial(userDetails.mname) + "."}</div>
                <div className="sidebar_Navbar_userPosition">{getLevelString(userDetails.level)}</div>
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