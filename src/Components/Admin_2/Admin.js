import React, { useState,useEffect } from "react";
import "./Admin.css";
import { gsap } from "gsap";
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

//

import search_icon from "./img/search.png";
import setting_icon from "./img/setting.png";
import bell_b_icon from "./img/bell_b.png";
import mail_icon from "./img/mail.png";
// import test_0 from "./bg/test_1.webp";
import ProfitExpensesChart from "./sub_part/ProfitExpensesChart";
import WelcomeUser from "./sub_part/welcome_user";
import user_profile from "./profile_pic/user2.jpg";

// import icon_1 from './sub_part/sub_img/icon-biology.png'
import credit_card_icon from './img/profile/credit-card.png'
import shield_icon from './img/profile/shield.png'
import wallet_icon from './img/profile/wallet.png'

import p_set from './shape/p_set.png'
import dollar_set from './shape/dollar-symbol.png'
import shape_1 from './shape/top-info-shape.png'
import shape_2 from './shape/top-error-shape.png'
import shape_3 from './shape/top-warning-shape.png'


import UserDataList from './sub_part/UserDataList.js'
import Calendar from "./sub_part/Calendar";
import ChartWithData from "./sub_part/ChartWithData.js";
const Profile = ()=>{


  return (
    <div className="profile_con_full">
    <div className="user_con">


      <div className="data">
        <div className="user_profile">
          <img src={user_profile} alt="" />
        </div>
     

      <div className="profile_data">
        <div className="name">Shrey Patel</div>
        <div className="type">Admin</div>
        <div className="email">info@gmail.com</div>
      </div>

      </div>

      <div className="more_option">

        <div className="more_data">
          <div className="icon" style={{background:"#e5f3fb"}}>
            <img src={wallet_icon} alt="" />
          </div>
          <div className="info" >
            <div className="name">My Profile</div>
            <div className="name_info">Account Settings</div>
          </div>
        </div>
        

        <div className="more_data">
          <div className="icon" style={{background:"#defff2"}}>
            <img src={shield_icon} alt="" />
          </div>
          <div className="info">
            <div className="name">My Inbox</div>
            <div className="name_info">Messages & Email</div>
          </div>
        </div>

        <div className="more_data">
          <div className="icon" style={{background:"#feece9"}}>
            <img src={credit_card_icon} alt="" />
          </div>
          <div className="info">
            <div className="name">My Tasks</div>
            <div className="name_info">To-do and Daily Tasks</div>
          </div>
        </div>


        <button>Logout</button>

      </div>


    </div>
      
  </div>
  )
}

const MainBox = ({fix_img,main_img,amount,other_amount,title})=>{
  return (
    <div className="admin_first_page_box">
      <div className="fix_img">
        <img src={fix_img} alt="" />
      </div>
      <div className="main_img">
        <img src={main_img} alt="" />
      </div>
      
      <span>
      <div className="data">
        <div className="amount">{amount}</div>
        <div className="other_amount">{other_amount}</div>
      </div>
      <div className="title">{title}</div>
      </span>
    </div>
  )
}

function Admin2() {

  
  const [activeRow, setActiveRow] = useState(0);
  const [show_user_profile, set_show_user_profile] = useState(false);

  useEffect(() => {
    // Set initial position with `from()`
    gsap.from(".admin_body_main", {
      opacity: 0,
      y: 100,  // Start 100px below the final position
      duration: 1,
      stagger: 0.2,  // Delay each element's animation slightly
    });
  
    // Optionally, animate to final position with `to()`
    gsap.to(".admin_body_main", {
      opacity: 1,
      y: 0,  // Move to its final position (no vertical offset)
      duration: 1,
    });
  }, []);
  

  return (
    <div className="admin_body">
  <div className="admin_side_bar_con">
    <div className="admin_side_bar">
      <div className="wrap">
        <div className="active_bar" style={{ top: `${55 * activeRow}px` }}></div>
        {/* <div className="active_bar"></div> */}

        <div className="icon" onClick={()=> {
          setActiveRow(0);
          }}
          >
          <img src={ activeRow===0 ? more_options_active_icon : more_options_no_active_icon } alt="" />
        </div>

        <div className="icon" onClick={()=> {
          setActiveRow(1);
          }}
          >
          <img src={activeRow===1 ? user_icon : user_no_active_icon} alt="" />
        </div>

        <div className="icon" onClick={()=> {
          setActiveRow(2);
          }}
          >
          <img src={ activeRow===2 ? analytics_icon : analytics_no_active_icon } alt="" />
        </div>

        <div className="icon" onClick={()=> {
          setActiveRow(3);
          }}
          >
          <img src={activeRow===3 ? bell_icon : bell_no_active_icon} alt="" />
        </div>

        <div className="icon" onClick={()=> {
          setActiveRow(4);
          }}
          >
          <img src={activeRow===4 ? calendar_icon : calendar_no_active_icon} alt="" />
        </div>
      </div>
    </div>
  </div>
  <div className="admin_body_main">
    <div className="title_bar">
      <div className="left_title_con">
        <div className="title">Dashboard</div>
        <div className="title_info">Payment Updates</div>
      </div>

      <div className="custom_input">
        <div className="icon">
          <img src={search_icon} alt="" />
        </div>
        <input type="text" placeholder="Search" />
      </div>

      <div className="other_option">
        <div className="icon">
          <img src={mail_icon} alt="" />
        </div>
        <div className="icon">
          <img src={bell_b_icon} alt="" />
        </div>
        <div className="icon">
          <img src={setting_icon} alt="" />
        </div>
        <div className="profile_con" onClick={()=>{set_show_user_profile(!show_user_profile)}}>
          <div className="profile">
            <img src={user_profile} alt="" />
          </div>
          <div className="data">
            <div className="name">Shrey Patel</div>
            <div className="type">Admin</div>
          </div>
        </div>
      </div>

      {show_user_profile &&
      <Profile />}

    </div>

    <div className="section_1_admin">
      <WelcomeUser user_name={"Shrey Deo"} />
      <MainBox fix_img={shape_1} main_img={p_set} amount={"2358"} other_amount={"+26%"} title={"Sales"} />
      <MainBox fix_img={shape_2} main_img={dollar_set} amount={"356"} other_amount={"+8%"} title={"Refunds"} />
      <MainBox fix_img={shape_3} main_img={dollar_set} amount={"235.8"} other_amount={"-3%"} title={"Earnings"} />
      <MainBox fix_img={shape_1} main_img={p_set} amount={"2358"} other_amount={"+26%"} title={"Sales"} />
    </div>

    <div className="section_2_admin">
    <ProfitExpensesChart />
    <UserDataList />
    </div>
    <div className="section_3_admin">
    <Calendar />
    <ChartWithData/>
    </div>
    


    <br />
    <br />
    <br />
  </div>
  {/* <button onClick={()=>{setActiveRow(activeRow + 1)}}>ok</button> */}
</div>
  );
}

export default Admin2;
