import '../../styles/mainWindow_styles.css'
import "../../styles/calendar_module_styles.css"

const AddScheduleModal = ({ setNewEvent, newEvent, handleAddEvent, clickedDate }) => {

  var root = document.querySelector(":root");

  const cancelAdd = () => {
    root.style.setProperty('--calendarAddSchedule_modal-PointerEvents', "none")
    root.style.setProperty('--calendarAddSchedule_modal-Opacity', "0")
  }
  //const [newEvent, setNewEvent] = useState({ name: "", type: "", date: "", time: "", location: ""})

  return (
    <>
      <div className="editAtt_Modal_Container">
        <div className="editAtt_Modal_label">{"Add Event on " + clickedDate}</div>

        <div className="addEvent_input_container">
          <div className="addEvent_input_wrap">
            <span className="addEvent_span">Name:</span>
            <input
              className="addEvent_input" 
              type="text"
              placeholder="Enter Event Name"
              value={newEvent.name}
              onChange={(e) => setNewEvent({...newEvent, name: e.target.value})}>
            </input>
          </div>

          <div className="addEvent_input_wrap">
            <span className="addEvent_span">Type:</span>
            <select
                className="addEvent_select"
                value={newEvent.type} 
                onChange={(e) => setNewEvent({...newEvent, type: e.target.value})}>
              <option value="School Program">School Program</option>
              <option value="Seminar">Seminar</option>
              <option value="Competition">Competition</option>
            </select>
          </div>
        </div>

        <button className="editAtt_cancel_button" onClick={handleAddEvent}>Create</button>
        <button className="editAtt_update_button" onClick={cancelAdd}>Cancel</button>
      </div>
    </>
  )
}

export default AddScheduleModal