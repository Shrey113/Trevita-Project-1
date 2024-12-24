import React, { useState } from 'react';
import './Setting.css';
import { localstorage_key_for_admin_settings } from '../../../../redux/AllData';


const SettingItem = ({ title, description, isChecked, onToggle }) => {
  return (
    <div className="setting-item" onClick={onToggle}>
      <div className="setting-info">
        <h2>{title}</h2>
        <p>{description}</p>
      </div>
      <label className="toggle-switch" onClick={(e) => e.stopPropagation()}>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={onToggle}
        />
        <span className="slider"></span>
      </label>
    </div>
  );
};




const Setting = ({ onClose, get_admin_settings }) => {
  const [settings, setSettings] = useState(() => {
    const savedSettings = localStorage.getItem(localstorage_key_for_admin_settings);
    return savedSettings
      ? JSON.parse(savedSettings)
      : {
          show_animation: true,
          show_navbar: true,
          show_notification: true,
          email_alerts: true,
          push_notifications: true,
        };
  });

  const handleToggle = (key) => {
    setSettings((prev) => {
      const newSettings = {
        ...prev,
        [key]: !prev[key],
      };
      localStorage.setItem(localstorage_key_for_admin_settings, JSON.stringify(newSettings));
      get_admin_settings();
      return newSettings;
    });
  };

  return (
    <div className="settings-wrapper">
      <div className="settings-overlay" onClick={onClose}></div>
      <div className="settings-container">
        {/* UI Settings Section */}
        <div className="settings-section">
          <div className="settings-header">
            <h1>UI Settings</h1>
          </div>
          <div className="settings-content">
            <SettingItem
              title="Show Animation"
              description="Enable/disable UI animations"
              isChecked={settings.show_animation}
              onToggle={() => handleToggle('show_animation')}
            />
            <SettingItem
              title="Fixed Navbar"
              description="Fixed Navbar when scrolling"
              isChecked={settings.show_navbar}
              onToggle={() => handleToggle('show_navbar')}
            />
          </div>
        </div>

        {/* Notification Settings Section */}
        <div className="settings-section">
          <div className="settings-header">
            <h1>Notification Settings</h1>
          </div>
          <div className="settings-content">
            <SettingItem
              title="Show Notifications"
              description="All Admin & Owner Notifications"
              isChecked={settings.show_notification}
              onToggle={() => handleToggle('show_notification')}
            />
            <SettingItem
              title="Email Alerts"
              description="Receive notifications via email"
              isChecked={settings.email_alerts}
              onToggle={() => handleToggle('email_alerts')}
            />
            <SettingItem
              title="Push Notifications"
              description="Browser push notifications"
              isChecked={settings.push_notifications}
              onToggle={() => handleToggle('push_notifications')}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Setting;
