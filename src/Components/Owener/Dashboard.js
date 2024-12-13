import React from 'react'
import { useSelector } from 'react-redux';
const localstorage_key_for_jwt_user_side_key = 'Jwt_user_localstorage_key_on_photography_website';

function Dashboard() {
    const user = useSelector((state) => state.user);
  return (
    <div>
        <h1>Dashboard</h1>
    <h2>User status : pending</h2>
    
    <hr />

    <p>Client ID: {user.client_id}</p>
    <p>Name: {user.user_name}</p>
    <p>Email: {user.user_email}</p>
    <p>password: {user.user_password}</p>
    <p>business name: {user.business_name}</p>
    <p>business address: {user.business_address}</p>
    <p>Mobile: {user.mobile_number}</p>
    <p>GST Number: {user.gst_number}</p>
    <br />
    <br />
    <button onClick={()=>{localStorage.removeItem(localstorage_key_for_jwt_user_side_key);window.location.reload()}}>Logout</button>
  </div>
  )
}

export default Dashboard;
