import React, { useState, useEffect } from "react";
import "./Admin.css";

import more_options_no_active_icon from "./img/no_active/application.png";
import more_options_active_icon from "./img/active/application.png";

import user_icon from "./img/active/user.png";
import user_no_active_icon from "./img/no_active/user.png";

import analytics_icon from "./img/active/analytics.png";
import analytics_no_active_icon from "./img/no_active/analytics.png";

import bell_icon from "./img/active/bell.png";
import bell_no_active_icon from "./img/no_active/bell.png";

import calendar_icon from "./img/active/calendar.png";
import calendar_no_active_icon from "./img/no_active/calendar.png";


import Dashboard from "./sub_part/Dashboard/Dashboard.js";
import TitleBar from "./sub_part/Title_bar/TitleBar.js";
import ProfileManager from "./sub_part/Profile_Manager/ProfileManager.js";
import AdminProfile from "./sub_part/AdminProfile/AdminProfile.js";
import Charts from "./sub_part/Chart/Chart.js";

const admin_email = 'gfapk63@gmail.com'

function Admin2() {
  const [activeRow, setActiveRow] = useState(0);

  useEffect(() => {
    const updateLastLogin = async () => {
      try {
        const response = await fetch('http://localhost:4000/Admin/update-last-login', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            admin_email: admin_email
          })
        });

        const data = await response.json();
        if (!response.ok) {
          console.error('Failed to update last login:', data.error);
        }
      } catch (error) {
        console.error('Error updating last login:', error);
      }
    };

    updateLastLogin();
  }, []);

  return (
    <div className="admin_body">
  <div className="admin_side_bar_con">
    <div className="admin_side_bar">
      <div className="wrap">
        <div className="active_bar" style={{ top: `${55 * activeRow}px` }}></div>
        {/* <div className="active_bar"></div> */}

        <div className="icon" onClick={()=> {setActiveRow(0);}} title="Dashboard" >
          <img src={ activeRow===0 ? more_options_active_icon : more_options_no_active_icon } alt="" />
          {/* {is_hover && <span>Dashboard</span>} */}
        </div>

        <div className="icon" onClick={()=> { setActiveRow(1); }} title="Profile" >
          <img src={activeRow===1 ? user_icon : user_no_active_icon} alt="" />
          
        </div>

        <div className="icon" onClick={()=> { setActiveRow(2); }} title="analytics" >
          <img src={ activeRow===2 ? analytics_icon : analytics_no_active_icon } alt="" />
        </div>

        <div className="icon" onClick={()=> { setActiveRow(3); }} title="notification" >
          <img src={activeRow===3 ? bell_icon : bell_no_active_icon} alt="" />
        </div>

        <div className="icon" onClick={()=> { setActiveRow(4); }} title="Calender" >
          <img src={activeRow===4 ? calendar_icon : calendar_no_active_icon} alt="" />
        </div>

      </div>
    </div>
  </div>
  <div className="admin_body_main">

    <TitleBar/>

    {
      activeRow === 0 &&  <Dashboard activeRow={activeRow} setActiveRow={setActiveRow}/>
    }
    {
      activeRow === 1 &&  <ProfileManager activeRow={activeRow} admin_email={admin_email}/>
    }
    {
      activeRow === 2 && <Charts activeRow={activeRow} setActiveRow={setActiveRow}/>
    }
    {
      activeRow === 3 && <AdminProfile activeRow={activeRow} setActiveRow={setActiveRow} admin_email={admin_email}/>
    }

    {/* {
      activeRow === 3 && <Notification activeRow={activeRow} setActiveRow={setActiveRow}/>
    }
    {
      activeRow === 4 && <Calender activeRow={activeRow} setActiveRow={setActiveRow}/>
    } */}

  </div>

</div>
  );
}

export default Admin2;
