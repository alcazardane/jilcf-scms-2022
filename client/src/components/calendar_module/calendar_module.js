import { Fragment, useState, useEffect } from "react";
// import components
import HookCalendar from "../dashboard/hooks/hookCalendar"

import "../../styles/calendar_module_styles.css"
import AddIcon from "../../images/add_FILL0_wght400_GRAD0_opsz48.png"

const getDateObj = (day, month, year) => {
    return new Date(year, month, day);
}

const convertDate = (dateString) => {
    return new Date(dateString);
}

const istheDateSame = (first, second) => {
    return ( 
        first.getFullYear() === second.getFullYear() &&
        first.getMonth() === second.getMonth() && 
        first.getDate() === second.getDate()
    )
}

// const sampleEvents = [
//     { name: "Back to school", type: "random", date: new Date(2023, 1, 4), time: "random", location: "Room" },
//     { name: "Back to suffering", type: "random", date: new Date(2023, 1, 6), time: "random", location: "Room" }
// ]

const CalendarModule = ({ allEvents, openAddEvent }) => {
    const { calendarRows, selectedDate, todayFormatted, 
            weekdays, months, getNextMonth, getPrevMonth,
            currentMonth, currentYear} = HookCalendar();

    var root = document.querySelector(":root");

    const [allAnnouncements, setAllAnnouncements] = useState([]);

    useEffect(() =>{
        const fetchAnnouncement= async () => {
            const response = await fetch('http://localhost:5000/api/announcements')
            const json = await response.json()
            if (response.ok){
                setAllAnnouncements(json)
            }
        }
        fetchAnnouncement()
        // console.log(viewAnnouncements)
    }, [])

    return (
        <>
        <Fragment>
            <div className="calendar_module_wrap">
                <div className="calendar_module_topbar_wrap">
                    <div className="calendar_module_monthyear">
                        {`${months[selectedDate.getMonth()]}` + " " + `${selectedDate.getFullYear()}`}
                    </div>
                    <div className="calendar_module_prevnext_btn_wrap">
                        <div className="calendar_module_prevnext_btn" onClick={getPrevMonth}>&#10094;</div>
                        <div className="calendar_module_prevnext_btn" onClick={getNextMonth}>&#10095;</div>
                    </div>
                </div>

                <div className="calendar_module_body_wrap">
                    <div className="calendar_module_weekdays_wrap">
                        {weekdays.map(day => (
                            <span className="calendar_module_weekdays" key={day}>{day}</span>
                        ))}
                    </div>

                    <div className="calendar_module_days_wrap">
                        {
                            Object.values(calendarRows).map(cols => {
                                return <div key={cols[0].date} className="calendar_module_days_container">
                                    {cols.map(col => (
                                        col.date === todayFormatted
                                        ?
                                        <div className="calendar_module_days_box"  key={col.date}
                                            // onClick={() => openAddEvent(months[col.currentmon] + " " + col.value + ", " + col.currentyr,
                                            //     getDateObj(col.value, col.currentmon, col.currentyr))}
                                            >
                                            <div className="calendar_module_days_topwrap">
                                                <div id="calendar_module_days" className={`${col.classes} calendar_module_days_today`}>
                                                    {col.value}
                                                </div>
                                                <img className="calendar_module_add_btn" src={AddIcon} alt="Add_Schedule"></img>
                                            </div>
                                            <div className="calendar_module_days_eventswrap">
                                                {allAnnouncements && allAnnouncements.map((ev) => (
                                                    istheDateSame(getDateObj(col.value, col.currentmon - 1, col.currentyr), convertDate(ev.date)) &&
                                                    <div key={ev._id} className="calendar_module_events">{ev.name}</div>
                                                ))}
                                            </div>
                                        </div>

                                        : <div className="calendar_module_days_box" key={col.date}
                                                // onClick={() => openAddEvent(months[col.currentmon]  + " " + col.value + ", " + col.currentyr,
                                                //     getDateObj(col.value, col.currentmon, col.currentyr))}
                                            >
                                            <div className="calendar_module_days_topwrap">
                                                <div id="calendar_module_days" className={col.classes}>
                                                    {col.value}
                                                </div>
                                                <img className="calendar_module_add_btn" src={AddIcon} alt="Add_Schedule"></img>
                                            </div>
                                            <div className="calendar_module_days_eventswrap">
                                                {allAnnouncements && allAnnouncements.map((ev) => (
                                                    istheDateSame(getDateObj(col.value, col.currentmon - 1, col.currentyr), convertDate(ev.date)) &&
                                                    <div key={ev._id} className="calendar_module_events">{ev.name}</div>
                                                ))}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            })
                        }
                    </div>
                </div>
            </div>
        </Fragment>
        </>
    )
}

export default CalendarModule