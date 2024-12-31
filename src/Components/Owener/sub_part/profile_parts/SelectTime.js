import React from 'react'
import './SelectTime.css'

function SelectTime() {
  const [timezone, setTimezone] = React.useState('');

  React.useEffect(() => {
    const userTimeZone = Intl.DateTimeFormat().resolvedOptions().timeZone;
    setTimezone(userTimeZone);
  }, []);

  return (
    <div className="collaboration-preferences">
<h2>Photography Session Preferences</h2>
<p className="description">
  Letting photographers know your preferred timing and availability helps ensure a smooth and timely session.
</p>

      <div className="time-selection-container">
        <div className="time-section">
          <div className="section-header">
            <span className="clock-icon">🕐</span>
            <h3>When do you prefer to schedule your photography sessions?</h3>
          </div>
          <p className="section-description">
      You may still receive suggestions for other times, but photographers will be aware of your preferred days and hours to ensure availability.
    </p>

          <div className="days-selection">
            <label>Select your preferred days</label>
            <span className="example">Ex. Mon-Fri or Sun-Sat</span>
            <div className="day-inputs">
              <select className="time-select">
                <option value="">Start day</option>
                <option value="sun">Sunday</option>
                <option value="mon">Monday</option>
                <option value="tue">Tuesday</option>
                <option value="wed">Wednesday</option>
                <option value="thu">Thursday</option>
                <option value="fri">Friday</option>
                <option value="sat">Saturday</option>
              </select>
              <span className="separator">-</span>
              <select className="time-select">
                <option value="">End day</option>
                <option value="sun">Sunday</option>
                <option value="mon">Monday</option>
                <option value="tue">Tuesday</option>
                <option value="wed">Wednesday</option>
                <option value="thu">Thursday</option>
                <option value="fri">Friday</option>
                <option value="sat">Saturday</option>
              </select>
            </div>
          </div>

          <div className="hours-selection">
            <div className="hours-header">
              <label>Then, choose your preferred hours</label>
              <span className="timezone">
                <span className="timezone-dot">●</span>
                {timezone || 'Loading...'}
              </span>
            </div>
            <div className="time-inputs">
              <select className="time-select">
                <option value="">Start time</option>
                <option value="6:00">6:00 AM</option>
                <option value="7:00">7:00 AM</option>
                <option value="8:00">8:00 AM</option>
                <option value="9:00">9:00 AM</option>
                <option value="10:00">10:00 AM</option>
                <option value="11:00">11:00 AM</option>
                <option value="12:00">12:00 PM</option>
                <option value="13:00">1:00 PM</option>
                <option value="14:00">2:00 PM</option>
                <option value="15:00">3:00 PM</option>
                <option value="16:00">4:00 PM</option>
                <option value="17:00">5:00 PM</option>
                <option value="18:00">6:00 PM</option>
                <option value="19:00">7:00 PM</option>
                <option value="20:00">8:00 PM</option>
                <option value="21:00">9:00 PM</option>
              </select>
              <span className="separator">-</span>
              <select className="time-select">
                <option value="">End time</option>
                <option value="6:00">6:00 AM</option>
                <option value="7:00">7:00 AM</option>
                <option value="8:00">8:00 AM</option>
                <option value="9:00">9:00 AM</option>
                <option value="10:00">10:00 AM</option>
                <option value="11:00">11:00 AM</option>
                <option value="12:00">12:00 PM</option>
                <option value="13:00">1:00 PM</option>
                <option value="14:00">2:00 PM</option>
                <option value="15:00">3:00 PM</option>
                <option value="16:00">4:00 PM</option>
                <option value="17:00">5:00 PM</option>
                <option value="18:00">6:00 PM</option>
                <option value="19:00">7:00 PM</option>
                <option value="20:00">8:00 PM</option>
                <option value="21:00">9:00 PM</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    
    <div className="save_button">
      Save
    </div>
    </div>
  )
}

export default SelectTime
