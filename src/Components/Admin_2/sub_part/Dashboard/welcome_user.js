import React from 'react'
import './welcome_user.css'
// import welcome_bg from './sub_img/welcome-bg.png'
import Notification from './sub_part/Notification';

import user_icon_1 from './profile_pic/user1.jpg'
import user_icon_2 from './profile_pic/user2.jpg'
import user_icon_3 from './profile_pic/user3.jpg'
import user_icon_4 from './profile_pic/user4.jpg'

function WelcomeUser({setActiveRow}) {
  return (
    <div className='welcome_message_con'>
      <h2>Latest Notifications</h2>
           <Notification
        notificationType="info"
        notificationTitle="Owner Pending Request"
        notificationMessage="gfapk@gmail.com will be Pending Request"
        notificationTime={"10:35"}
        onClick={()=>{setActiveRow(1)}}
        set_img={user_icon_1}
      />
        <Notification
        notificationType="warning"
        notificationTitle="Admin Reject Account"
        notificationMessage="gfapk@gmail.com will be Reject account"
        onClick={()=>{setActiveRow(1)}}
        notificationTime={"10:35"}
        set_img={user_icon_2}
      />
      <Notification
        notificationType="error"
        notificationTitle="Server Error"
        notificationMessage="Failed to process your payment. Please try again."
        onClick={()=>{setActiveRow(1)}}
          notificationTime={"12:35"}
          set_img={user_icon_3}
      />
        <Notification
        notificationType="warning"
        notificationTitle="Owner Deleted Account"
        notificationMessage="gfapk@gmail.com will be deleted account"
        onClick={()=>{setActiveRow(1)}}
          notificationTime={"10:35"}

          set_img={user_icon_3}
      />
      <Notification
        notificationType="error"
        notificationTitle="Payment Error"
        notificationMessage="Failed to process your payment. Please try again."
        onClick={()=>{}}
          notificationTime={"05:35"}
          set_img={user_icon_4}
      />
      <Notification
        notificationType="error"
        notificationTitle="Payment Error"
        notificationMessage="Failed to process your payment. Please try again."
        onClick={()=>{}}
          notificationTime={"1:35"}
          set_img={user_icon_3}
      />
      <Notification
        notificationType="error"
        notificationTitle="Payment Error"
        notificationMessage="Failed to process your payment. Please try again."
        onClick={()=>{}}
          notificationTime={"00:35"}
          set_img={user_icon_2}
      />
    </div>
  )
}

export default WelcomeUser;
