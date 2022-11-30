import { useState} from 'react'

// need to install "@use-gesture/react" and "react-spring" first
import { useDrag } from '@use-gesture/react'
import { useSpring, animated } from 'react-spring'

// hook for window size
import useWindowDimensions from '../dashboard/hooks/useWindowDimensions'

import '../../styles/about.css'

const AboutWindow = () => {

    var root = document.querySelector(":root");

    // For window snapping
    const { height, width } = useWindowDimensions();
    var rightBound = width - (width * 0.40) - 38 + 4;
    var bottomBound = height - (height * 0.70) - 18 - 50 + 4;
    var leftBound = 30;
    var topBound = 15;


    // Get the x and y values to use it for maximizing the window
    var xVal = 0;
    var yVal = 0;

    // For dragging
    const [{ x, y }, aboutPos] = useSpring(() => ({ x: 0, y: 0 }));
    const bindAboutPos = useDrag((state) => {
        xVal = state.offset[0];
        yVal = state.offset[1];
        aboutPos.set({
            x: xVal,
            y: yVal,
        });
        //console.log("x: " + xVal + ", y: " + yVal);
    }, {
        from: () => {
            return [x.get(), y.get()];
        },
        bounds: () => {
            return {left: -leftBound, right: rightBound, top: -topBound, bottom: bottomBound};
        },
    });


    // For minimize and maximize button
    const [aboutIsMinimized,  setAboutIsMininimized] = useState(true);
    const minmaxAbout = () => {

      if(aboutIsMinimized === true){

        root.style.setProperty('--aboutModule-L1-window-width', "calc(100% - 4px)")
        root.style.setProperty('--aboutModule-L1-window-height', "calc(100% - 49px)")

        root.style.setProperty('--border-radius', "0")
        root.style.setProperty('--border-radius-b', "0")

        root.style.setProperty('--top', `${-yVal}px`)
        root.style.setProperty('--left', `${-xVal}px`)

        root.style.setProperty('--about-display-b', "none")

        aboutPos.set({
            x: xVal,
            y: yVal
          });

          setAboutIsMininimized(false)
      }
      else{

        root.style.setProperty('--aboutModule-L1-window-width', "40%")
        root.style.setProperty('--aboutModule-L1-window-height', "70%")

        root.style.setProperty('--border-radius', "7px")
        root.style.setProperty('--border-radius-b', "7px 7px 0 0")

        root.style.setProperty('--top', "15px")
        root.style.setProperty('--left', "30px")

        root.style.setProperty('--about-display-b', "block")

          setAboutIsMininimized(true)
      }
    }

    // For close or exit button
    const closeAbout = () => {
        root.style.setProperty('--aboutModule-L1-window-width', "40%")
        root.style.setProperty('--aboutModule-L1-window-height', "70%")

        root.style.setProperty('--aboutModule-L1-display', "none")
        root.style.setProperty('--about-display-b', "none")

        root.style.setProperty('--border-radius', "7px")
        root.style.setProperty('--border-radius-b', "7px 7px 0 0")

        root.style.setProperty('--top', "15px")
        root.style.setProperty('--left', "30px")

        setAboutIsMininimized(true)
    }

    return(
        <>
            <animated.div className="aboutModule_draggable_area"
            {...bindAboutPos()} style={{
                x, y      
            }} />
            <animated.div className="aboutModule_window" id="aboutModule_window"
            style={{
                x, y        
            }}>
            <div className="aboutModule_topbar" id="aboutModule_topbar">About
                <div>
                    <span id="dashboard_L1_minmax" className="material-symbols-outlined" onClick={minmaxAbout}>web_asset</span>
                    <span id="dashboard_L1_close" className="material-symbols-outlined" onClick={closeAbout}>close</span>
                </div>
            </div>

                <div className="about_container">
                    <div className="sub-container">
                        <h1 className="abheader">About</h1>
                        <p className="pContainer"> A classroom monitoring system that provides information about grades, schedules, and subjects that both student and teachers takes, gives input and advice on how the students can improve their academic learning.
                        </p>
                    </div>
                    <div className="sub-container">
                        <h1 className="abheader">Privacy Policy</h1>
                        <p className="pContainer">This privacy policy describes our policies and procedures on the collection, use and disclosure of your information when you use the Service and tells you about your privacy rights and how the law protects you.
                        </p>
                        <p className="pContainer">We use Your Personal data to provide and improve the Service. By using the Service, You agree to the collection and use of information in accordance with this Privacy Policy.</p>
                    </div>
                    <div className="sub-container">
                        <h1 className="abheader">Terms & Conditions</h1>
                        <p className="pContainer"> If you continue to use this web application, you are agreeing to comply with the following terms and Conditions of use, which together with the privacy policy govern the developers of this web app relationship with you in relation to this web application.
                        </p>
                    </div>
                    <div className="sub-container-b">
                        <h1 className="abheader">Copyright</h1>
                        <p className="pContainer"> All rights, including copyright, in this web application are owned by the delvelopers of thisweb application. Any use of this website or its contents, including copying or storing it in whole or part, other than for your own personal, non-commercial use, without the permission of the developers is prohibited. You may not modify, distribute or re-post anything on this web application for any purpose.
                        </p>
                    </div>
                </div>
            </animated.div>
        </>
    )
} 

export default AboutWindow;