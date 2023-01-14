import { useState } from "react";
const CreateSchedule =({}) => {

    const [schedClassSecID, setSchedClassSecID] = useState("");
    const [schedStartTimeH, setSchedStartTimeH] = useState("");
    const [schedStartTimeM, setSchedStartTimeM] = useState("");
    const [schedStartTimeS, setSchedStartTimeS] = useState("");
    const [schedDay, setSchedDay] = useState("");
    const [schedRoomName, setSchedRoomName] = useState("");
    const [schedSubjectID, setSchedSubjectID] = useState("");
    const [schedTeacherName, setSchedteacherName] = useState("");

    
    const handleSubmitt = (e) => {
        e.preventDefault()
        console.log("schedClassSecID" + schedClassSecID)
        console.log("schedStartTimeH" + schedStartTimeH)
        console.log("schedStartTimeM" + schedStartTimeM)
        console.log("schedStartTimeS" + schedStartTimeS)
        console.log("schedDay" + schedDay)
        console.log("schedRoomName" + schedRoomName)
        console.log("schedSubjectID" + schedSubjectID)
        console.log("schedTeacherName" + schedTeacherName)
    }
    return (
     <form className="adminModule_createSched_Container" onSubmit={handleSubmitt}>
        <div className="adminModule_create_sched">Create Schedule</div>
        <div className="adminModule_createSched_input">
            <span className="adminModule_createSched_label">Class Section ID: </span>
            <select 
                className="createSched_select"
                value={schedClassSecID}
                onChange={(e)=> setSchedClassSecID(e.target.value)}>
                <option value="section1">section1</option>
                <option value="section2">section2</option>
                <option value="section3">section3</option>
                </select>
     </div> 
        <div className="adminModule_createSched_input_wrap">
            <div className="adminModule_createSched_input">
               <span className="adminModule_createSched_label">Time </span>
                    <div>
                    <span className="adminModule_createSched_label">Hour </span>
                        <select
                        className="createSched_select"
                        value={schedStartTimeH}
                        onChange={(e)=> setSchedStartTimeH(e.target.value)}>
                        <option value="1:00">1:00</option>
                        <option value="2:00">2:00</option>
                        <option value="3:00">3:00</option>
                        <option value="4:00">4:00</option>
                        <option value="5:00">5:00</option>
                        <option value="6:00">6:00</option>
                        <option value="7:00">7:00</option>
                        <option value="8:00">8:00</option>
                        <option value="9:00">9:00</option>
                        <option value="10:00">10:00</option>
                        <option value="11:00">11:00</option>
                        <option value="12:00">12:00</option>
                        </select>
                    </div> 
                    <div>
                    <span className="adminModule_createSched_label">Minute </span>
                        <select
                        className="createSched_select"
                        value={schedStartTimeM}
                        onChange={(e)=> setSchedStartTimeM(e.target.value)}>
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
                    </div>
                    <div>
                    <span className="adminModule_createSched_label">Morning/Afternoon </span>
                        <select 
                        className="createSched_select"
                        value={schedStartTimeS}
                        onChange={(e)=>setSchedStartTimeS(e.target.value)}>
                        <option value="a.m.">a.m.</option>
                        <option value="p.m.">p.m.</option>
                        </select>
                    </div>
                </div>
            
            </div>
            <div className="adminModule_createSched_input">
                <span className="adminModule_createSched_label">Day:</span>
                <select 
                className="createSched_select"
                value={schedDay}
                onChange={(e)=>setSchedDay(e.target.value)}>
                <option value="Monday">Monday</option>
                <option value="Tuesday">Tuesday</option>
                <option value="Wednesday">Wednesday</option>
                <option value="Thursday">Thursday</option>
                <option value="Friday">Friday</option>
                 <option value="Saturday">Saturday</option>
                <option value="Sunday">Sunday</option>
                </select>
            </div>
            <div className="adminModule_createSched_input">
                <span className="adminModule_createSched_label">Room:</span>
                <select 
                className="createSched_select"
                value={schedRoomName}
                onChange={(e)=>setSchedRoomName(e.target.value)}>
                <option value="Room 1">Room 1</option>
                <option value="Room 2">Room 2</option>
                <option value="Room 3">Room 3</option>
                </select>
            </div>
            <div className="adminModule_createSched_input">
                <span className="adminModule_createSched_label">Subject ID:</span>
                <select 
                className="createSched_select"
                value={schedSubjectID}
                onChange={(e)=>setSchedSubjectID(e.target.value)}>
                <option value="English">English</option>
                <option value="Science">Science</option>
                <option value="Mathematics">Mathematics</option>
                </select>
        </div>
            <div className="adminModule_createSched_input">
                <span className="adminModule_createSched_label">Teacher's Name:</span>
                <select 
                className="createSched_select"
                value={schedTeacherName}
                onChange={(e)=>setSchedteacherName(e.target.value)}>
                <option value="teacher1">teacher1</option>
                <option value="teacher2">teacher2</option>
                <option value="teacher3">teacher3</option>
                </select>
                </div>

                <button className="editAtt_cancel_button" >Cancel</button>
                <button className="editAtt_update_button" onClick={handleSubmitt}>Add</button>
       </form>

    )
}
export default CreateSchedule

