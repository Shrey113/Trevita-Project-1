import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import React, { useState, useEffect } from "react";

import LoginRegisterOwener from "./Components/Owener/Login_Register.js";
import LoginRegisterClient from "./Components/Client/login_register.js";
import ShowLoder from "./Components/Owener/sub_components/show_loder.js";
import { useDispatch } from "react-redux";
import Dashboard from "./Components/Owener/Dashboard.js";
import HomePage from "./Components/Client/HomePage.js";
import PageNotFound from'./PageNotFound.js'

import {localstorage_key_for_client,localstorage_key_for_jwt_user_side_key,Server_url,localstorage_key_for_admin_login} from './redux/AllData.js'
// import Admin from "./Components/Admin/Admin.js";
import BeforeLogin from "./Components/BeforeLogin/BeforeLogin.js";
import Admin2 from "./Components/Admin_2/Admin.js";
import BottomRightMenu from "./BottomRightMenu.js";
// import Admin from "./Components/Admin/Admin.js";
// import Calendar from "./Components/Admin_2/sub_part/Calendar.js";

import { io } from 'socket.io-client';

const socket = io('http://localhost:4000'); // Ensure the URL matches your server's URL and port



function App() {
  useEffect(() => {
    // Listen for messages from the server
    socket.on('message', (msg) => {
        console.log(msg);
        
    });

    // Cleanup on unmount
    return () => {
      socket.off('message');
    };
  }, []);


  const [authStatus, setAuthStatus] = useState({ Admin:null,owner: null, client: null });
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAdminToken = async () => {
      const jwtToken = localStorage.getItem(localstorage_key_for_admin_login);
      if (!jwtToken) return;

      try {
        const response = await fetch(`${Server_url}/Admin/check-jwt`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token: jwtToken }),
        });

        const result = await response.json();
        if (response.ok) {
          result.message === "Token is valid" && setAuthStatus((prev) => ({ ...prev, admin: true }));
        } else {
          setAuthStatus((prev) => ({ ...prev, admin: false }));
        }
      } catch (err) {
        console.error("Admin token check error:", err);
        setAuthStatus((prev) => ({ ...prev, admin: false }));
      }
    };

    checkAdminToken();
  }, []);

  useEffect(() => {
    const authenticateUser = async () => {
      const ownerToken = window.localStorage.getItem(localstorage_key_for_jwt_user_side_key);
      const clientToken = window.localStorage.getItem(localstorage_key_for_client);

      try {
        // 1
        if (ownerToken) {
          const response = await fetch(`${Server_url}/get_user_data_from_jwt`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ jwt_token: ownerToken }),
          });

          const data = await response.json();
          
          if (data.user) {
            dispatch({ type: "SET_USER_Owner", payload: {
              client_id: 1,
              user_name: data.user.user_name || null,
              user_email: data.user.user_email || null,
              user_password: data.user.user_password || null,
              business_name: data.user.business_name || null,
              business_address: data.user.business_address || null,
              mobile_number: data.user.mobile_number || null,
              gst_number: data.user.gst_number || null,
              user_Status: data.user.user_Status || null,
              admin_message: data.user.admin_message || null,
              set_status_by_admin: data.user.set_status_by_admin || null,
            }});
            setAuthStatus((prev) => ({ ...prev, owner: true }));
          } else {
            setAuthStatus((prev) => ({ ...prev, owner: false }));
          }
        } else {
          setAuthStatus((prev) => ({ ...prev, owner: false }));
        }
// 2
        if (clientToken) {
          const response = await fetch("http://localhost:4000/get_client_data_from_jwt", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ jwt_token: clientToken }),
          });

          const data = await response.json();
          if (data.user) {
            dispatch({ type: "SET_USER_Client", payload: {
              client_id: 1,
              user_name: data.user.user_name || null,
              user_email: data.user.user_email || null,
              user_password: data.user.user_password || null,
              business_name: data.user.business_name || null,
              business_address: data.user.business_address || null,
              mobile_number: data.user.mobile_number || null,
              gst_number: data.user.gst_number || null,
            }});
            setAuthStatus((prev) => ({ ...prev, client: true }));
          } else {
            setAuthStatus((prev) => ({ ...prev, client: false }));
          }
        } else {
          setAuthStatus((prev) => ({ ...prev, client: false }));
        }
//  last 
      } catch (error) {
        console.error("Authentication error:", error);
        setAuthStatus({ owner: false, client: false });
      }
    };

    authenticateUser();
  }, [dispatch]);

  if (authStatus.owner === null || authStatus.client === null || authStatus.admin === null) {
    return <ShowLoder />;
  }

  return (
    <Router>
      <Routes>
        {/* testing part */}
        <Route path="/Admin2" element={<Admin2/> } />
        {/* <Route path="/Admin1" element={<Admin/> } /> */}
        <Route path="/BeforeLogin" element={<BeforeLogin/> } />

        
        {/* Default route */}

        {/* <Route path="/" element={ authStatus.client ? <HomePage /> : authStatus.owner ? <Dashboard /> : <BeforeLogin /> } /> */}
                {/* Default route */}
                <Route path="/" element={ authStatus.client ? (<HomePage />) :
                 authStatus.owner ? ( <Dashboard />) : 
                 authStatus.admin ? ( <Admin2 />) : (
                      <BeforeLogin />
            )
          }
        />

        {/* Client routes */}
        <Route path="/Client" element={authStatus.client ? <HomePage /> : <LoginRegisterClient />} />
        <Route path="/Client/HomePage" element={authStatus.client ? <HomePage /> : <LoginRegisterClient />} />

        {/* Owner routes */}
        <Route path="/Owner" element={authStatus.owner ? <Dashboard /> : <LoginRegisterOwener />} />
        <Route path="/Owner/Dashboard" element={authStatus.owner ? <Dashboard /> : <LoginRegisterOwener />} />

        {/* 404 Page */}
        <Route path="*" element={<PageNotFound />} />
      </Routes>
      <BottomRightMenu />
    </Router>
  );
}

export default App;
