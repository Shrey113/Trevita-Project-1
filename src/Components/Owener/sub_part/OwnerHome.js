import React from 'react';
import { useSelector } from 'react-redux';
import './OwnerHome.css';
import { localstorage_key_for_jwt_user_side_key } from './../../../redux/AllData.js';

function OwnerHome() {
  const user = useSelector((state) => state.user);

  const handleLogout = () => {
    // Clear the JWT from local storage
    localStorage.removeItem(localstorage_key_for_jwt_user_side_key);

    // Optionally, you can redirect or reload the page
    // window.location.href = '/login'; // Uncomment if using a login page
    window.location.reload();
    console.log("User logged out successfully!");
  };

  return (
    <>
      <div className="title_bar">
        <div className="user_data">
          <div className="user_name">Hey, {user.user_name} 👋</div>
          <div className="user_message">
            Here's what's happening in your workspace
          </div>
        </div>
      </div>

      <button style={{ width: "fit-content" }} onClick={handleLogout}>
        Logout
      </button>
    </>
  );
}

export default OwnerHome;
