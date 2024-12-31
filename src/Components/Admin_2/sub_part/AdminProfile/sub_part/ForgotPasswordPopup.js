import React from 'react';
import './ForgotPasswordPopup.css';

const ForgotPasswordPopup = ({ closeFunction, admin_email }) => {
  return (
    <div className="popup-overlay" id='ForgotPasswordPopup'>
      <div className="popup-content">
        <p className="popup-message">
          Password will be sent to your email <strong>{admin_email}</strong>. Please check and reset if needed.
        </p>
        <button className="ok-button" onClick={closeFunction}>
          OK
        </button>
      </div>
    </div>
  );
};

export default ForgotPasswordPopup;