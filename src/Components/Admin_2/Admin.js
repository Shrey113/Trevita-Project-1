import React, { useState, useEffect } from "react";
import "./Admin.css";

import more_options_no_active_icon from "./img/no_active/application.png";
import more_options_active_icon from "./img/active/application.png";

import database_management_icon from "./img/active/database-management.png";
import database_management_no_active_icon from "./img/no_active/database-management.png";

import analytics_icon from "./img/active/analytics.png";
import analytics_no_active_icon from "./img/no_active/analytics.png";

import user_icon from "./img/active/user.png";
import user_no_active_icon from "./img/no_active/user.png";

// import calendar_icon from "./img/active/calendar.png";
// import calendar_no_active_icon from "./img/no_active/calendar.png";

import setting_icon from "./img/active/setting.png";
import Setting_no_active_icon from "./img/no_active/setting.png";


import Dashboard from "./sub_part/Dashboard/Dashboard.js";
import TitleBar from "./sub_part/Title_bar/TitleBar.js";
import ProfileManager from "./sub_part/Profile_Manager/ProfileManager.js";
import AdminProfile from "./sub_part/AdminProfile/AdminProfile.js";
import Charts from "./sub_part/Chart/Chart.js";
import Setting from "./sub_part/Setting/Setting.js";
import {localstorage_key_for_admin_settings,localstorage_key_for_admin_login,Server_url} from './../../redux/AllData'




function Admin2() {
  const [activeRow, setActiveRow] = useState(0);
  const [adminSettings, setAdminSettings] = useState(null);
  const [admin_email, set_admin_email] = useState('gfapk63@gmail.com');

  function get_admin_settings(){
    const savedSettings = localStorage.getItem(localstorage_key_for_admin_settings);
    if (savedSettings) {
      setAdminSettings(JSON.parse(savedSettings));
    }else{
      setAdminSettings({
        show_animation: true,
        show_navbar: true,
        dark_mode: false,
      })
    }
  }


  
    useEffect(() => {
      const checkAdminToken = async () => {
        const jwtToken = localStorage.getItem(localstorage_key_for_admin_login);

        if (!jwtToken) return;
  
        try {
          const response = await fetch(`${Server_url}/Admin/check-jwt`, {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify({ token: jwtToken }),
          });
  
          const result = await response.json();
    
          if (response.ok) {

            if(result.message === "Token is valid"){
             
              
              if(result.data.user_email){
                set_admin_email(result.data.user_email)
              }
            }
            
          } else {
            console.log(result);
          }
        } catch (err) {
          console.error("Admin token check error:", err);
        }
      };
  
      checkAdminToken();
    }, []);


  useEffect(() => {
    get_admin_settings()
  }, []);

  useEffect(() => {
    if (!admin_email || admin_email.trim() === "") {
      return;
    }
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
  }, [admin_email]);

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

        <div className="icon" onClick={()=> { setActiveRow(1); }} title="Database Manager" >
          <img src={activeRow===1 ? database_management_icon : database_management_no_active_icon} alt="" />
          
        </div>

        <div className="icon" onClick={()=> { setActiveRow(2); }} title="Analytics" >
          <img src={ activeRow===2 ? analytics_icon : analytics_no_active_icon } alt="" />
        </div>

        <div className="icon" onClick={()=> { setActiveRow(3); }} title="Notification" >
          <img src={activeRow===3 ? user_icon : user_no_active_icon} alt="" />
        </div>

        <div className="icon" onClick={()=> { setActiveRow(4); }} title="Calender" >
          <img src={activeRow===4 ? setting_icon : Setting_no_active_icon} alt="" />
        </div>

      </div>
    </div>
  </div>
  <div className="admin_body_main">

    <TitleBar adminSettings={adminSettings}  setActiveRow={setActiveRow}/>

    {
      activeRow === 0 &&  <Dashboard  adminSettings={adminSettings} activeRow={activeRow} setActiveRow={setActiveRow}/>
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
    {
      activeRow === 4 && <Setting get_admin_settings={get_admin_settings}/>
    }

  </div>

</div>
  );
}

export default Admin2;
