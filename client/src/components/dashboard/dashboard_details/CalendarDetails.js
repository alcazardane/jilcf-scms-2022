import React, { Fragment } from 'react';

import hookCalendar from '../hooks/hookCalendar'


// Will fill in the Calendar
const CalendarDetails = () => {
    const { calendarRows, selectedDate, todayFormatted, weekdays, months, getNextMonth, getPrevMonth} = hookCalendar();

    const dateClickHandler = date => {
        console.log(date);
    }
    
    return (
        <Fragment>
            <div className="calendar_header_wrap">
                <button className='button' onClick={getPrevMonth}>&#10094;</button>
                    <div className="month_year">
                        <div>{`${months[selectedDate.getMonth()]}`}</div>
                        <div>{`${selectedDate.getFullYear()}`}</div>
                    </div>
                <button className='button' onClick={getNextMonth}>&#10095;</button>
            </div>

            <div className="calendar_weekdays_header">
                {weekdays.map(day => (
                    <span className="calendar_weekdays" key={day}>{day}</span>
                ))}
            </div>
            
            <div className="table_calendar">
                <div>
                    {
                        Object.values(calendarRows).map(cols => {
                            return <div key={cols[0].date} className="calendar_days">
                                {cols.map(col => (
                                    col.date === todayFormatted
                                    ? <span id="days" key={col.date} className={`${col.classes} today`} onClick={() => dateClickHandler(col.date)}>
                                        {col.value}
                                    </span>
                                    : <span id="days" key={col.date} className={col.classes} onClick={() => dateClickHandler(col.date)}>
                                        {col.value}
                                    </span>
                                ))}
                            </div>
                        })
                    }
                </div>
            </div>
        </Fragment>
    )
}

export default CalendarDetails;