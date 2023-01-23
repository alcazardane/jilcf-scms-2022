import { useState } from "react";
const CreateSchedule =({ refreshSchedTable }) => {

    var root = document.querySelector(":root");

    const [schedClassSecID, setSchedClassSecID] = useState("ADMIN");
    const [schedType, setSchedType] = useState("Meeting");
    const [schedStartTimeH, setSchedStartTimeH] = useState("01");
    const [schedStartTimeM, setSchedStartTimeM] = useState("00");
    const [schedStartTimeS, setSchedStartTimeS] = useState("AM");
    const [schedEndTimeH, setSchedEndTimeH] = useState("01");
    const [schedEndTimeM, setSchedEndTimeM] = useState("00");
    const [schedEndTimeS, setSchedEndTimeS] = useState("AM");
    const [schedDay, setSchedDay] = useState("Monday");
    const [schedRoom, setSchedRoom] = useState("BLDG A - RM503");
    const [schedSubject, setSchedSubject] = useState("General Mathematics");


    const handleCancel = (e) => {
        e.preventDefault()
        root.style.setProperty('--adminModule_create_sched_modal-pointer-events', "none");
        root.style.setProperty('--adminModule_create_sched_modal-opacity', "0");
    }

    
    const handleSubmit = async (e) => {
        e.preventDefault();
        refreshSchedTable();

        let databody = {
            "class_id": schedClassSecID,
            "class_start_hh": schedStartTimeH,
            "class_start_mm": schedStartTimeM,
            "class_start_pa": schedStartTimeS,
            "class_end_hh": schedEndTimeH,
            "class_end_mm": schedEndTimeM,
            "class_end_pa": schedEndTimeS,
            "class_day": [schedDay],
            "subject_name": schedSubject,
            "class_type": schedType,
            "class_room": schedRoom
        }

        try {
            const res = await fetch('http://localhost:5000/api/upcoming-schedules/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(databody),
            });
            const data = await res.json();
            console.log(data);
            } catch (err) {
            console.error(err);
        }

        root.style.setProperty('--adminModule_create_sched_modal-pointer-events', "none");
        root.style.setProperty('--adminModule_create_sched_modal-opacity', "0");
        resetData();
        refreshSchedTable();
    }

    const resetData = () => {
        setSchedClassSecID("");
        setSchedType("");
        setSchedStartTimeH("");
        setSchedStartTimeM("");
        setSchedStartTimeS("");
        setSchedEndTimeH("");
        setSchedEndTimeM("");
        setSchedEndTimeS("");
        setSchedDay("");
        setSchedRoom("");
        setSchedSubject("");
    }

    return (
        <>
            <form className="adminModule_create_account_con" onSubmit={handleSubmit}>
                <div className="editAtt_Modal_label-b">Create Schedule</div>

                <div className="adminModule_create_input_wrap">
                    <div className="adminModule_create_input_inside announce-input">
                        <span className="adminModule_create_label">Class Section:</span>
                        <select
                            className="create_select"
                            value={schedClassSecID} 
                            onChange={(e) => setSchedClassSecID(e.target.value)}>
                                <option value="ADMIN">ADMIN</option>
                                <option value="ACADEMIC-12-STEM-A">12 STEM A</option>
                                <option value="ACADEMIC-12-STEM-B">12 STEM B</option>
                                <option value="ACADEMIC-12-STEM-C">12 STEM C</option>
                                <option value="ACADEMIC-12-HUMMS-A">12 HUMMS A</option>
                                <option value="ACADEMIC-12-HUMMS-B">12 HUMMS B</option>
                                <option value="ACADEMIC-12-STEM-C">12 STEM C</option>
                                <option value="TVL-12-TVL-A">12 TVL A</option>
                        </select>
                    </div>
                    <div className="adminModule_create_input_inside announce-input">
                        <span className="adminModule_create_label">Type:</span>
                        <select
                            className="create_select"
                            value={schedType} 
                            onChange={(e) => setSchedType(e.target.value)}>
                                <option value="Meeting">Meeting</option>
                                <option value="Class">Class</option>
                        </select>
                    </div>
                </div>

                <div className="adminModule_create_input_wrap">
                    <div className="adminModule_create_input_inside announce-input">
                        <span className="adminModule_create_label">Start Time:</span>
                        <select
                            className="create_select-e"
                            value={schedStartTimeH} 
                            onChange={(e) => setSchedStartTimeH(e.target.value)}>
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
                        </select>
                        <select
                            className="create_select-e"
                            value={schedStartTimeM} 
                            onChange={(e) => setSchedStartTimeM(e.target.value)}>
                                <option value="00">00</option>
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
                                <option value="32">32</option>
                                <option value="33">33</option>
                                <option value="34">34</option>
                                <option value="35">35</option>
                                <option value="36">36</option>
                                <option value="37">37</option>
                                <option value="38">38</option>
                                <option value="39">39</option>
                                <option value="40">40</option>
                                <option value="41">41</option>
                                <option value="42">42</option>
                                <option value="43">43</option>
                                <option value="44">44</option>
                                <option value="45">45</option>
                                <option value="46">46</option>
                                <option value="47">47</option>
                                <option value="48">48</option>
                                <option value="49">49</option>
                                <option value="50">50</option>
                                <option value="51">51</option>
                                <option value="52">52</option>
                                <option value="53">53</option>
                                <option value="54">54</option>
                                <option value="55">55</option>
                                <option value="56">56</option>
                                <option value="57">57</option>
                                <option value="58">58</option>
                                <option value="59">59</option>
                        </select>
                        <select
                            className="create_select-e"
                            value={schedStartTimeS} 
                            onChange={(e) => setSchedStartTimeS(e.target.value)}>
                                <option value="AM">AM</option>
                                <option value="PM">PM</option>
                        </select>
                    </div>
                    <div className="adminModule_create_input_inside announce-input">
                        <span className="adminModule_create_label">End Time:</span>
                        <select
                            className="create_select-e"
                            value={schedEndTimeH} 
                            onChange={(e) => setSchedEndTimeH(e.target.value)}>
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
                        </select>
                        <select
                            className="create_select-e"
                            value={schedEndTimeM} 
                            onChange={(e) => setSchedEndTimeM(e.target.value)}>
                                <option value="00">00</option>
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
                                <option value="32">32</option>
                                <option value="33">33</option>
                                <option value="34">34</option>
                                <option value="35">35</option>
                                <option value="36">36</option>
                                <option value="37">37</option>
                                <option value="38">38</option>
                                <option value="39">39</option>
                                <option value="40">40</option>
                                <option value="41">41</option>
                                <option value="42">42</option>
                                <option value="43">43</option>
                                <option value="44">44</option>
                                <option value="45">45</option>
                                <option value="46">46</option>
                                <option value="47">47</option>
                                <option value="48">48</option>
                                <option value="49">49</option>
                                <option value="50">50</option>
                                <option value="51">51</option>
                                <option value="52">52</option>
                                <option value="53">53</option>
                                <option value="54">54</option>
                                <option value="55">55</option>
                                <option value="56">56</option>
                                <option value="57">57</option>
                                <option value="58">58</option>
                                <option value="59">59</option>
                        </select>
                        <select
                            className="create_select-e"
                            value={schedEndTimeS} 
                            onChange={(e) => setSchedEndTimeS(e.target.value)}>
                                <option value="AM">AM</option>
                                <option value="PM">PM</option>
                        </select>
                    </div>
                </div>

                <div className="adminModule_create_input_wrap">
                    <div className="adminModule_create_input_inside">
                        <label className="adminModule_create_label">Day:</label>
                        <select
                            className="create_select"
                            value={schedDay} 
                            onChange={(e) => setSchedDay(e.target.value)}>
                                <option value="Monday">Monday</option>
                                <option value="Tuesday">Tuesday</option>
                                <option value="Wednesday">Wednesday</option>
                                <option value="Thursday">Thursday</option>
                                <option value="Friday">Friday</option>
                                <option value="Saturday">Saturday</option>
                                <option value="Sunday">Sunday</option>
                        </select>
                    </div>

                    <div className="adminModule_create_input_inside">
                        <label className="adminModule_create_label">Room:</label>
                        <select
                            className="create_select"
                            value={schedRoom} 
                            onChange={(e) => setSchedRoom(e.target.value)}>
                                <option value="BLDG A - RM503">BLDG A - RM503</option>
                                <option value="BLDG A - RM504">BLDG A - RM504</option>
                                <option value="BLDG A - Discipline's Office">BLDG A - Discipline's Office</option>
                        </select>
                    </div>

                    <div className="adminModule_create_input_inside">
                        <label className="adminModule_create_label">Subject:</label>
                        <select
                            className="create_select"
                            value={schedSubject} 
                            onChange={(e) => setSchedSubject(e.target.value)}>
                                <option value="General Mathematics">General Mathematics</option>
                                <option value="Oral Communications">Oral Communications</option>
                                <option value="Computer Programming">Computer Programming</option>
                                <option value="Faculty Meeting">Faculty Meeting</option>
                        </select>
                    </div>
                </div>

                <button className="editAtt_cancel_button" onClick={handleCancel}>Cancel</button>
                <button className="editAtt_update_button" onClick={handleSubmit}>Add</button>
            </form>
        </>
    )
}
export default CreateSchedule

