import React, { useState, useEffect, useRef } from 'react';
import { useSelector } from 'react-redux';
import './css/HomePage.css';

// import test from './img/home.png';
// import user_option from './img/user.png';
import user4 from './img/user4.jpg';
import app_icon from './img/app-store.png';
import toggle_button_icon from './img/burger-menu.png';
import toggle_close_button_icon from './img/close.png';


import dashboard_icon from './img/active/dashboard.png';
import dashboard_no_active_icon from './img/no_active/dashboard.png';

import Event_icon from './img/active/calendar.png'
import Event_no_active_icon  from './img/no_active/calendar.png'


import Team_icon from './img/active/group.png'
import Team_no_active_icon from './img/no_active/group.png'

import client_icon from './img/active/client.png'
import client_no_active_icon from './img/no_active/client.png'

import Packages_icon from './img/active/photo.png'
import Packages_no_active_icon from './img/no_active/photo.png'
// import OwnerProfile from './sub_part/OwnerProfile';
import OwnerHome from './sub_part/OwnerHome';
import Profile from './sub_part/Profile';
import TeamOverview from './sub_part/TeamOverview';


function HomePage() {
  const user = useSelector((state) => state.user);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const sidebarRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setIsSidebarOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const menuItems = [
    { name: 'Dashboard', icon:dashboard_icon  ,active_icon:dashboard_no_active_icon},
    { name: 'Event Management', icon: Event_icon, active_icon: Event_no_active_icon },
    { name: 'Team Management', icon: Team_icon, active_icon: Team_no_active_icon},
    { name: 'Client Management', icon: client_icon ,active_icon: client_no_active_icon},
    { name: 'Packages and Pricing', icon: Packages_icon,active_icon: Packages_no_active_icon},
  ];

  const handleItemClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className="Owner_main_home_pag_con">
      
      <div className="side_bar" ref={sidebarRef} style={{width: isSidebarOpen ? '340px' : '70px'}}>

        <div className="toggle_button_con" onClick={()=>{setIsSidebarOpen(!isSidebarOpen)}}>
          {isSidebarOpen ?
          <img src={toggle_close_button_icon} alt="" />
          :
          <img src={ toggle_button_icon} alt="" />
          
        }
          
        </div>
        <div className="side_bar_title">
          <div className="title_bar_img">
            <img src={app_icon} alt="" />
          </div>
          {isSidebarOpen && <div className="title_bar_text">Owner {user.user_Status}</div>}
        </div>

        <div className="category_con">
          {activeIndex <= menuItems.length && 
          
        
          <div className={`active_me_slider ${isSidebarOpen ? '' : ''}`} style={{
              top: `${activeIndex * 60}px`,
              transition: "all 0.2s ease-in-out",
            }}>
              {isSidebarOpen && <div className="side_menu"></div>}
            </div>

}

          {menuItems.map((item, index) => (
            <div
              key={index}
              className={`item ${index === activeIndex && "active"}`}
              onClick={() => handleItemClick(index)}
            >
              <div className="icon">
                {item.active_icon ? (
                  activeIndex === index ? (
                    <img src={item.active_icon} alt={item.name} />
                  ) : (
                    <img src={item.icon} alt={item.name} />
                  )
                ) : (
                  <img src={item.icon} alt={item.name} />
                )}
              </div>
                {isSidebarOpen && 
                <div className={`text`}>
                  {item.name}
                </div>}
            </div>
          ))}
        </div>

        <div className="user_profile"  onClick={() => setActiveIndex(menuItems.length + 1)}>
          <div className="user_icon_1">
            <img src={user4} alt="" />
          </div>
          {isSidebarOpen && <div className="user_data">
            <div className="user_name">{user.user_name}</div>
            <div className="user_email">{user.user_email}</div>
          </div>}
        </div>
      </div>

      <div className="main_part">

        

          {activeIndex === 0 && <OwnerHome/>}
          {activeIndex === 2 && <TeamOverview/>}
          {activeIndex === menuItems.length + 1 && <Profile/>}
        


        {/* <div className="other_part">{menuItems[activeIndex].name}</div> */}
      </div>
    </div>
  );
}

export default HomePage;
