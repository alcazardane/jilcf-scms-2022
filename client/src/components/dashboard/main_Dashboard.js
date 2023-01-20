// need to install "@use-gesture/react" and "react-spring" first
import { useDrag } from '@use-gesture/react'
import { useSpring, animated } from 'react-spring'
import { useState, useRef } from 'react'


//dashboard components
import Upcoming from './Upcoming'
import RedYellowNotice from './Red_Yellow_Notice'
import Attendance from './Attendance'
import Assessment from './Assessment'
import '../../styles/Dashboard_Styles/mainDashboard_styles.css'
import '../../styles/Dashboard_Styles/upcoming_styles.css'
import '../../styles/Dashboard_Styles/redyellowNotice_styles.css'
import '../../styles/Dashboard_Styles/attendance_styles.css'
import '../../styles/Dashboard_Styles/assessment_styles.css'


import useWindowDimensions from './hooks/useWindowDimensions'

export default function MainDashboard({dashUpRef, dashNoticeRef, dashAttRef}) {

    var root = document.querySelector(":root");


    return (
    <>
        <div className="main_container" id="dashbord_L2_main_container">
          <div className="top_wrap">
            <Upcoming dashUpRef={dashUpRef}/>
            <RedYellowNotice dashNoticeRef={dashNoticeRef}/>
          </div>
          <Attendance dashAttRef={dashAttRef}/>
          {/* <Assessment /> */}
        </div>
    </>
    )
}