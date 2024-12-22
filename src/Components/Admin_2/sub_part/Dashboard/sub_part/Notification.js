import React from 'react';
import './Notification.css';

// import ok_icon from './img/check.png'
// import warning_icon from './img/warning.png'
// import information_icon from './img/information.png'



const Notification = ({ set_img, notificationType, notificationTitle, notificationMessage,notificationTime, onClick }) => {

  return (
    <div className={`notification ${notificationType}`} onClick={onClick}>
      <img src={set_img} alt="user_icon" className={`user_icon ${notificationType}`}/>
      <div className="data">
            <h3 className={`notification-title ${notificationType}`}>{notificationTitle}</h3>
            <span>
            <p className="notification-message">{notificationMessage}</p>
            <p className="notification-time">{notificationTime}</p>
            </span>
      </div>

    </div>
  );
};

export default Notification;
