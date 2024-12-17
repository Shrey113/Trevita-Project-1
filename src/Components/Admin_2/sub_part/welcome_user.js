import React from 'react'
import './welcome_user.css'
import welcome_bg from './sub_img/welcome-bg.png'

function WelcomeUser({user_name}) {
  return (
    <div className='welcome_message_con'>
      <div className="data">
        <div className="data_1">
            <div className="title">Welcome {user_name}</div>
            <div className="info">Check all the statastics</div>
        </div>
        <div className="data_2">
            <button>Visit Now</button>
        </div>
        
      </div>
      <div className="bg_welcome_img">
        <img src={welcome_bg} alt="" />
      </div>
    </div>
  )
}

export default WelcomeUser;
