import { useState, useEffect } from "react";

const EditAnnouncement = ({ announcementID, refreshAnnounceTable }) => {

    var root = document.querySelector(":root");

    const [announcement, setAnnouncement] = useState([])
    const [announceName, setAnnounceName] = useState("");
    const [announceDesc, setAnnounceDesc] = useState("");
    const [announceType, setAnnounceType] = useState("");
    const [announcePlace, setAnnouncePlace] = useState("");

    // const [annYear, annMonth, annDay] = announceFullDate.split("-")
    const [announceMonth, setAnnounceMonth] = useState("");
    const [announceDay, setAnnounceDay] = useState("");
    const [announceYear, setAnnounceYear] = useState("");
    const [announceFullDate, setAnnounceFullDate] = useState("");

    const [announceStartTime, setAnnounceStartTime] = useState("");
    const [announceEndTime, setAnnounceEndTime] = useState("");
    const [announceFullTime, setAnnounceFullTime] = useState("");
    
    let daysOption;
    if (
        announceMonth === "01" ||
        announceMonth === "03" ||
        announceMonth === "05" ||
        announceMonth === "07" ||
        announceMonth === "08" ||
        announceMonth === "10" ||
        announceMonth === "12"){

            daysOption = 
            <>
                <option value="">Day</option>
                <option value="01">01</option>
                <option value="02">02</option>
                <option value="03">03</option>
                <option value="04">04</option>
                <option value="05">05</option>
                <option value="06">06</option>
                <option value="07">07</option>
                <option value="08">08</option>
                <option value="09">09</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
                <option value="13">13</option>
                <option value="14">14</option>
                <option value="15">15</option>
                <option value="16">16</option>
                <option value="17">17</option>
                <option value="18">18</option>
                <option value="19">19</option>
                <option value="20">20</option>
                <option value="21">21</option>
                <option value="22">22</option>
                <option value="23">23</option>
                <option value="24">24</option>
                <option value="25">25</option>
                <option value="26">26</option>
                <option value="27">27</option>
                <option value="28">28</option>
                <option value="29">29</option>
                <option value="30">30</option>
                <option value="31">31</option>
            </>
    }
    else if (
            announceMonth === "04" ||
            announceMonth === "06" ||
            announceMonth === "09" ||
            announceMonth === "11" ){
                daysOption = 
            <>
                <option value="">Day</option>
                <option value="01">01</option>
                <option value="02">02</option>
                <option value="03">03</option>
                <option value="04">04</option>
                <option value="05">05</option>
                <option value="06">06</option>
                <option value="07">07</option>
                <option value="08">08</option>
                <option value="09">09</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
                <option value="13">13</option>
                <option value="14">14</option>
                <option value="15">15</option>
                <option value="16">16</option>
                <option value="17">17</option>
                <option value="18">18</option>
                <option value="19">19</option>
                <option value="20">20</option>
                <option value="21">21</option>
                <option value="22">22</option>
                <option value="23">23</option>
                <option value="24">24</option>
                <option value="25">25</option>
                <option value="26">26</option>
                <option value="27">27</option>
                <option value="28">28</option>
                <option value="29">29</option>
                <option value="30">30</option>
            </>
    }
    else {
        daysOption = 
            <>
                <option value="">Day</option>
                <option value="01">01</option>
                <option value="02">02</option>
                <option value="03">03</option>
                <option value="04">04</option>
                <option value="05">05</option>
                <option value="06">06</option>
                <option value="07">07</option>
                <option value="08">08</option>
                <option value="09">09</option>
                <option value="10">10</option>
                <option value="11">11</option>
                <option value="12">12</option>
                <option value="13">13</option>
                <option value="14">14</option>
                <option value="15">15</option>
                <option value="16">16</option>
                <option value="17">17</option>
                <option value="18">18</option>
                <option value="19">19</option>
                <option value="20">20</option>
                <option value="21">21</option>
                <option value="22">22</option>
                <option value="23">23</option>
                <option value="24">24</option>
                <option value="25">25</option>
                <option value="26">26</option>
                <option value="27">27</option>
                <option value="28">28</option>
                <option value="29">29</option>
            </>
    }

    useEffect(() => {
        const fetchData = async () => {
          try {
            const res = await fetch(`http://localhost:5000/api/announcements/${announcementID}`);
            const data = await res.json();
            setAnnouncement(data);
            setAnnounceName(data.name);
            setAnnounceDesc(data.description);
            setAnnounceType(data.type);
            setAnnounceYear(data.ann_year);
            setAnnounceMonth(data.ann_month);
            setAnnounceDay(data.ann_day);
            setAnnounceStartTime(data.start_time);
            setAnnounceEndTime(data.end_time);
            setAnnouncePlace(data.place);
          } catch (err) {
            console.error(err);
          }
        };
        fetchData();
    }, [announcementID]);

    const cancelCreate = (e) => {
        e.preventDefault();
        root.style.setProperty('--adminModule_edit_announce_modal-pointer-events', "none");
        root.style.setProperty('--adminModule_edit_announce_modal-opacity', "0");
    }

    const handleCreateAnnounce = async (e) => {
        e.preventDefault();
        refreshAnnounceTable();
        // setAnnounceFullDate(announceYear + "-" + announceMonth + "-" + announceDay);
        // setAnnounceFullTime(announceStartTime + " - " + announceEndTime);

        let databody = {
            "name": announceName,
            "description": announceDesc,
            "type": announceType,
            "ann_year": announceYear,
            "ann_month": announceMonth,
            "ann_day": announceDay,
            "start_time": announceStartTime,
            "end_time": announceEndTime,
            "place": announcePlace,
        }

        try {
        const res = await fetch(`http://localhost:5000/api/announcements/${announcementID}`, {
            method: 'PATCH',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(databody),
        });
        const data = await res.json();
        console.log(data);
        } catch (err) {
        console.error(err);
        }

        root.style.setProperty('--adminModule_edit_announce_modal-pointer-events', "none");
        root.style.setProperty('--adminModule_edit_announce_modal-opacity', "0");
        refreshAnnounceTable();
    }


    return (
        <>
            <form className="adminModule_create_account_con" onSubmit={handleCreateAnnounce}>
                <div className="editAtt_Modal_label-b">Edit Announcement</div>

                <div className="adminModule_create_input_wrap">
                    <div className="adminModule_create_input_inside announce-input">
                        <span className="adminModule_create_label">Title:</span>
                        <input 
                            type="text" 
                            className="create_input" 
                            placeholder="Enter Announcement Name"
                            value={announceName}
                            onChange={(e) => setAnnounceName(e.target.value)}>
                        </input>
                    </div>
                    <div className="adminModule_create_input_inside announce-input">
                        <span className="adminModule_create_label">Description:</span>
                        <input 
                            type="text" 
                            className="create_input" 
                            placeholder="Enter Announcement Name"
                            value={announceDesc}
                            onChange={(e) => setAnnounceDesc(e.target.value)}>
                        </input>
                    </div>
                </div>

                <div className="adminModule_create_input_wrap">
                    <div className="adminModule_create_input_inside announce-input">
                        <span className="adminModule_create_label">Type:</span>
                        <select
                            className="create_select"
                            value={announceType} 
                            onChange={(e) => setAnnounceType(e.target.value)}>
                                <option value="School Program">School Program</option>
                                <option value="Seminar">Seminar</option>
                                <option value="Competition">Competition</option>
                        </select>
                    </div>
                    <div className="adminModule_create_input_inside announce-input">
                        <span className="adminModule_create_label">Place:</span>
                        <input 
                            type="text" 
                            className="create_input" 
                            placeholder="Enter Schedule Time"
                            value={announcePlace}
                            onChange={(e) => setAnnouncePlace(e.target.value)}>
                        </input>
                    </div>
                </div>

                <div className="adminModule_create_input_wrap">
                    <div className="adminModule_create_input_inside announce-input">
                        <span className="adminModule_create_label">Date:</span>
                        <select
                            className="create_select-b"
                            value={announceMonth} 
                            onChange={(e) => setAnnounceMonth(e.target.value)}>
                                <option value="">Month</option>
                                <option value="01">January</option>
                                <option value="02">February</option>
                                <option value="03">March</option>
                                <option value="04">April</option>
                                <option value="05">May</option>
                                <option value="06">June</option>
                                <option value="07">July</option>
                                <option value="08">August</option>
                                <option value="09">September</option>
                                <option value="10">October</option>
                                <option value="11">November</option>
                                <option value="12">December</option>
                        </select>
                        <select
                            className="create_select-c"
                            value={announceDay} 
                            onChange={(e) => setAnnounceDay(e.target.value)}>
                                {daysOption}
                        </select>
                        <select
                            className="create_select-c"
                            value={announceYear} 
                            onChange={(e) => setAnnounceYear(e.target.value)}>
                                <option value="">Year</option>
                                <option value="2020">2020</option>
                                <option value="2021">2021</option>
                                <option value="2022">2022</option>
                                <option value="2023">2023</option>
                                <option value="2024">2024</option>
                                <option value="2025">2025</option>
                                <option value="2026">2026</option>
                                <option value="2027">2027</option>
                                <option value="2028">2028</option>
                                <option value="2029">2029</option>
                                <option value="2030">2030</option>
                        </select>
                    </div>
                    <div className="adminModule_create_input_inside announce-input">
                        <span className="adminModule_create_label">Time:</span>
                        <select
                            className="create_select-d"
                            value={announceStartTime} 
                            onChange={(e) => setAnnounceStartTime(e.target.value)}>
                                <option value="">Start Time</option>
                                <option value="12:00 AM">12:00 AM</option>
                                <option value="01:00 AM">01:00 AM</option>
                                <option value="02:00 AM">02:00 AM</option>
                                <option value="03:00 AM">03:00 AM</option>
                                <option value="04:00 AM">04:00 AM</option>
                                <option value="05:00 AM">05:00 AM</option>
                                <option value="06:00 AM">06:00 AM</option>
                                <option value="07:00 AM">07:00 AM</option>
                                <option value="08:00 AM">08:00 AM</option>
                                <option value="09:00 AM">09:00 AM</option>
                                <option value="10:00 AM">10:00 AM</option>
                                <option value="11:00 AM">11:00 AM</option>
                                <option value="12:00 PM">12:00 PM</option>
                                <option value="01:00 PM">01:00 PM</option>
                                <option value="02:00 PM">02:00 PM</option>
                                <option value="03:00 PM">03:00 PM</option>
                                <option value="04:00 PM">04:00 PM</option>
                                <option value="05:00 PM">05:00 PM</option>
                                <option value="06:00 PM">06:00 PM</option>
                                <option value="07:00 PM">07:00 PM</option>
                                <option value="08:00 PM">08:00 PM</option>
                                <option value="09:00 PM">09:00 PM</option>
                                <option value="10:00 PM">10:00 PM</option>
                                <option value="11:00 PM">11:00 PM</option>
                        </select>
                        <select
                            className="create_select-d"
                            value={announceEndTime} 
                            onChange={(e) => setAnnounceEndTime(e.target.value)}>
                                <option value="">End Time</option>
                                <option value="12:00 AM">12:00 AM</option>
                                <option value="01:00 AM">01:00 AM</option>
                                <option value="02:00 AM">02:00 AM</option>
                                <option value="03:00 AM">03:00 AM</option>
                                <option value="04:00 AM">04:00 AM</option>
                                <option value="05:00 AM">05:00 AM</option>
                                <option value="06:00 AM">06:00 AM</option>
                                <option value="07:00 AM">07:00 AM</option>
                                <option value="08:00 AM">08:00 AM</option>
                                <option value="09:00 AM">09:00 AM</option>
                                <option value="10:00 AM">10:00 AM</option>
                                <option value="11:00 AM">11:00 AM</option>
                                <option value="12:00 PM">12:00 PM</option>
                                <option value="01:00 PM">01:00 PM</option>
                                <option value="02:00 PM">02:00 PM</option>
                                <option value="03:00 PM">03:00 PM</option>
                                <option value="04:00 PM">04:00 PM</option>
                                <option value="05:00 PM">05:00 PM</option>
                                <option value="06:00 PM">06:00 PM</option>
                                <option value="07:00 PM">07:00 PM</option>
                                <option value="08:00 PM">08:00 PM</option>
                                <option value="09:00 PM">09:00 PM</option>
                                <option value="10:00 PM">10:00 PM</option>
                                <option value="11:00 PM">11:00 PM</option>
                        </select>
                    </div>
                </div>



                <button className="editAtt_cancel_button" onClick={cancelCreate}>Cancel</button>
                <button className="editAtt_update_button" onClick={handleCreateAnnounce}>Update</button>
            </form>
        </>
    )
}

export default EditAnnouncement