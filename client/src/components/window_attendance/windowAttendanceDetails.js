import notify_icon from "../../images/notifications_active_FILL1_wght400_GRAD0_opsz48.png"
import view_icon from "../../images/visibility_FILL1_wght400_GRAD0_opsz48.png"
import React, { useState } from 'react';

const WindowAttendanceDetails = ({ studinfo, goToViewStudent }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        setEmail('lczrdaniel@gmail.com')
        setName('John Daniel B. Alcazar')
        setMessage('Attendance Notification: Attendance Count: 1; Absent: 2')
      const res = await fetch('http://localhost:5000/api/send-email', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, message }),
      });
      console.log(await res.text());
    } catch (err) {
      console.error(err);
    }
  };

    return (
        <>
        <tr>
            <td>Alcazar, John Daniel B.</td>
            <td>191008</td>
            <td>12 TVL C</td>
            <td>2</td>
            <td>1</td>
            <td>
                <button className="windowAttendance_notify" onClick={handleSubmit}><img src={notify_icon} alt="notify"></img></button>
                <button className="windowAttendance_view">
                    <img src={view_icon} alt="view"></img>
                </button>
            </td>
        </tr>
        <tr>
            <td>{studinfo.lname + ", " + studinfo.fname + " " + studinfo.mname + "."}</td>
            <td>{studinfo.userID}</td>
            <td>{studinfo.grade_level + " " + studinfo.strand + " " + studinfo.section}</td>
            <td>0</td>
            <td>0</td>
            <td>
                <button className="windowAttendance_notify"><img src={notify_icon} alt="notify"></img></button>
                <button className="windowAttendance_view" onClick={event => goToViewStudent(event, studinfo.userID)}>
                    <img src={view_icon} alt="view"></img>
                </button>
            </td>
        </tr>
        </>
    )
}

export default WindowAttendanceDetails