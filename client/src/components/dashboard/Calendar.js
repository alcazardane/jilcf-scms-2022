import CalendarDetails from "./dashboard_details/CalendarDetails"

const MyCalendar = () => {

    return (
      <div className="calendar" id="calendar">
        <div className="calendar_inside_wrap">
          <CalendarDetails />
        </div>
      </div>
    )
}

export default MyCalendar