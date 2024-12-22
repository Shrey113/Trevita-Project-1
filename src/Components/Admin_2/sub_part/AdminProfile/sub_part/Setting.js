import React, { useState } from 'react';
import './Setting.css';

const Setting = ({ onClose }) => {

  const [settings, setSettings] = useState({
    show_animation: true,
    show_notification: true,
  });

  const handleToggle = (key) => {
    setSettings(prev => ({
      ...prev,
      [key]: !prev[key]
    }));
  };

  const handleItemClick = (key) => {
    handleToggle(key);
  };

  return (
    <div className="settings-wrapper">
      <div className="settings-overlay" onClick={onClose}></div>
      <div className="settings-container">
        <div className="settings-section">
          <div className="settings-header">
            <h1>Email notifications</h1>
            <button className="close-button" onClick={onClose}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M18 6L6 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                <path d="M6 6L18 18" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          <div className="settings-content">
            <div className="setting-item" onClick={() => handleItemClick('show_animation')}>
              <div className="setting-info">
                <h2>Show Animation</h2>
              </div>
              <label className="toggle-switch" onClick={(e) => e.stopPropagation()}>
                <input
                  type="checkbox"
                  checked={settings.show_animation}
                  onChange={() => handleToggle('show_animation')}
                />
                <span className="slider"></span>
              </label>
            </div>

            <div className="setting-item" onClick={() => handleItemClick('show_notification')}>
              <div className="setting-info">
                <h2>Show Notification</h2>
                <p>All Admin,Owner Notification</p>
              </div>
              <label className="toggle-switch" onClick={(e) => e.stopPropagation()}>
                <input
                  type="checkbox"
                  checked={settings.show_notification}
                  onChange={() => handleToggle('show_notification')}
                />
                <span className="slider"></span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Setting;
