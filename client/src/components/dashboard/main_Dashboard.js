// need to install "@use-gesture/react" and "react-spring" first
import { useDrag } from '@use-gesture/react'
import { useSpring, animated } from 'react-spring'
import { useState } from 'react'


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

export default function MainDashboard() {

    var root = document.querySelector(":root");

    // For window snapping
    const { height, width } = useWindowDimensions();
    var rightBound = width - (width * 0.775) - 38 + 4;
    var bottomBound = height - (height * 0.815) - 18 - 50 + 4;
    var leftBound = 30;
    var topBound = 15;

    // For if statements. Basically works just like true or false.
    //var max = 1;
    //var dis = 2;

    // Get the x and y values to use it for maximizing the window
    var xVal = 0;
    var yVal = 0;

    // For dragging
    //const dashboardPos = useSpring({ x: 0, y: 0});
    //const bindDashboardPos = useDrag((params) => {

      //xVal = params.offset[0];
      //yVal = params.offset[1];

      //dashboardPos.x.set(xVal);
      //dashboardPos.y.set(yVal);

      // Logs the x and y values. Just to see it
      //console.log("x: " + params.offset[0] + " y: " + params.offset[1]);
    //},
    //{
      //bounds: { left: -leftBound, right: rightBound, top: -topBound, bottom: bottomBound }
    //});


    const [{ x, y }, dashboardPos] = useSpring(() => ({ x: 0, y: 0 }));
    const bindDashboardPos = useDrag((state) => {
        xVal = state.offset[0];
        yVal = state.offset[1];
        dashboardPos.set({
            x: xVal,
            y: yVal
        });
        console.log("x: " + xVal + ", y: " + yVal);
    }, {
        from: () => {
            return [x.get(), y.get()];
        },
        bounds: () => {
            return {left: -leftBound, right: rightBound, top: -topBound, bottom: bottomBound};
        },
    });


    // For minimize and maximize button
    const [dashboardIsMinimized,  setDashboardIsMininimized] = useState(true);
    const minmaxDashboard = () => {

      if(dashboardIsMinimized === true){
          root.style.setProperty('--max-width', "calc(100% - 4px)")
          root.style.setProperty('--max-width-b', "max-content")
          root.style.setProperty('--max-height', "calc(100vh - 49px)")
          root.style.setProperty('--max-height-b', "calc(100vh - 49px)")
          //root.style.setProperty('--upcoming-width', "47.5vw")
          root.style.setProperty('--upcoming-width', "650px")
          root.style.setProperty('--upcoming-width-1000', "440px")
          root.style.setProperty('--upcoming-container-wrap-width', "50%")
          root.style.setProperty('--upcoming-width-b', "96.5vw")
          root.style.setProperty('--dashboard-bottom-container-width', "95.5vw")

          root.style.setProperty('--calendar-display', "block")
          root.style.setProperty('--view-calendar-display', "none")

          root.style.setProperty('--calendar-pointer-events', "all")
          root.style.setProperty('--calendar-opacity', "1")

          root.style.setProperty('--wrappers-width', "90vw")

          root.style.setProperty('--border-radius', "0")
          root.style.setProperty('--border-radius-b', "0")

          root.style.setProperty('--top', `${-yVal}px`)
          root.style.setProperty('--left', `${-xVal}px`)

          root.style.setProperty('--display-b', "none")

          dashboardPos.set({
            x: xVal,
            y: yVal
          });

          //max = 2;

          setDashboardIsMininimized(false)
      }
      else{
          root.style.setProperty('--max-width', "77.5vw")
          root.style.setProperty('--max-width-b', "77.5vw")
          root.style.setProperty('--max-height', "81.5vh")
          root.style.setProperty('--max-height-b', "81.5vh")
          //root.style.setProperty('--upcoming-width', "25vw")
          root.style.setProperty('--upcoming-width', "340px")
          root.style.setProperty('--upcoming-width-1000', "250px")
          root.style.setProperty('--upcoming-container-wrap-width', "100%")
          root.style.setProperty('--upcoming-width-b', "75vw")
          root.style.setProperty('--dashboard-bottom-container-width', "73.3vw")

          root.style.setProperty('--calendar-display', "none")
          root.style.setProperty('--view-calendar-display', "block")

          root.style.setProperty('--calendar-pointer-events', "none")
          root.style.setProperty('--calendar-opacity', "0")

          root.style.setProperty('--wrappers-width', "68.3vw")
          root.style.setProperty('--border-radius', "7px")
          root.style.setProperty('--border-radius-b', "7px 7px 0 0")

          root.style.setProperty('--top', "15px")
          root.style.setProperty('--left', "30px")

          root.style.setProperty('--display-b', "block")

          //max = 1;

          setDashboardIsMininimized(true)
      }
    }

    // For close or exit button
    const closeDashboard = () => {
      root.style.setProperty('--windowDashboard-display', "none")
      root.style.setProperty('--display-b', "none")

      //root.style.setProperty('--max-width', "77.5vw")
      root.style.setProperty('--upcoming-width', "340px")
      root.style.setProperty('--max-width-b', "77.5vw")
      root.style.setProperty('--max-height', "81.5vh")
      root.style.setProperty('--max-height-b', "81.5vh")
      root.style.setProperty('--upcoming-width', "25vw")
      root.style.setProperty('--upcoming-width-1000', "250px")
      root.style.setProperty('--upcoming-container-wrap-width', "100%")
      root.style.setProperty('--upcoming-width-b', "75vw")
      root.style.setProperty('--dashboard-bottom-container-width', "73.3vw")

      root.style.setProperty('--calendar-display', "none")
      root.style.setProperty('--view-calendar-display', "block")

      root.style.setProperty('--calendar-pointer-events', "none")
      root.style.setProperty('--calendar-opacity', "0")

      root.style.setProperty('--wrappers-width', "68.3vw")
      root.style.setProperty('--border-radius', "7px")
      root.style.setProperty('--border-radius-b', "7px 7px 0 0")

      root.style.setProperty('--top', "15px")
      root.style.setProperty('--left', "30px")

      //max = 1;
      setDashboardIsMininimized(true)
    }

    //x: dashboardPos.x,
    //y: dashboardPos.y,

    return (
    <>
        <animated.div className="dashboard_draggable_area"
        {...bindDashboardPos()} style={{
          x, y
        }} />
        <animated.div className="dashboard_window" id="dashboard_window"
        style={{
          x, y
        }}>
        <div className="dashboard_window_topbar" id="dashboard_window_topbar">Dashboard
            <div>
                <span id="dashboard_minmax" className="material-symbols-outlined" onClick={minmaxDashboard}>web_asset</span>
                <span id="dashboard_close" className="material-symbols-outlined" onClick={closeDashboard}>close</span>
            </div>
        </div>
        <div className="main_container" id="main_container">
          <div className="top_wrap">
            <Upcoming />
            <RedYellowNotice />
          </div>
          <Attendance />
          <Assessment />
        </div>
        </animated.div>
    </>
    )
}