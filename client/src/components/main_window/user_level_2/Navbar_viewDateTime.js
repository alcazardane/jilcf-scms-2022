import React, { useEffect, useState} from 'react'

const NavbarViewDateTime = () => {

    const [timeStateLong, setTimeStateLong] = useState();
    const [dateStateLong, setDateStateLong] = useState();

    useEffect(() => {
        setInterval(() =>{
            const date = new Date();
            setTimeStateLong(date.toLocaleTimeString([], {hour: '2-digit', minute:'2-digit', second:'2-digit'}));
            setDateStateLong(date.toLocaleDateString([], {weekday:'long', month: 'long', day: 'numeric', year: 'numeric'}));
        }, 1000)
    }, []);


    return (
        <div className="calendar_datetime_wrap">
            <div className="calendar_time">{timeStateLong}</div>
            <div className="calendar_date">{dateStateLong}</div>
        </div>
    )
}

export default NavbarViewDateTime