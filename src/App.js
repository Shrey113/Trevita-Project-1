// import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import React, { useState,useEffect  } from "react";

import Login from "./Components/Owener/Login_Register.js";
import LoginRegister from './Components/Client/login_register.js'
import ShowLoder from './Components/Owener/sub_components/show_loder.js';
import { useDispatch } from 'react-redux';
import Dashboard from './Components/Owener/Dashboard.js';

const localstorage_key_for_jwt_user_side_key = 'Jwt_user_localstorage_key_on_photography_website';


function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const dispatch = useDispatch();
  useEffect(() => {
    const checkAuthentication = async () => {
      const token = window.localStorage.getItem(localstorage_key_for_jwt_user_side_key);

      if (token) {
      
        try {
          const response = await fetch('http://localhost:4000/get_user_data_from_jwt', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({ jwt_token: token }),
          });

          const data = await response.json();
          console.log(data);
          if (data.user) {
            const userData = {
              client_id: 1,
              user_name: data.user.user_name || null,
              user_email: data.user.user_email || null,
              user_password: data.user.user_password || null,
              business_name:data.user.business_name || null,
              business_address: data.user.business_address || null,
              mobile_number: data.user.mobile_number || null,
              gst_number: data.user.gst_number || null,
            };
            dispatch({ type: "SET_USER", payload: userData });
            console.log("data set");
            
            setIsAuthenticated(true);
          } else {
            setIsAuthenticated(false);
          }
        } catch (error) {
          console.error('Error fetching user data:', error);
          setIsAuthenticated(false);
        }
      } else {
        setIsAuthenticated(false);
      }
    };

    checkAuthentication();
  }, [dispatch]);

  if (isAuthenticated === null) {
    return <ShowLoder/>;
  }
  return (
    <Router>
      <Routes>
        <Route path='/' element={ isAuthenticated ? <Dashboard/> :<Login/> } />
        <Route path='/1' element={<LoginRegister/>} />
      </Routes>
    </Router>
  );
}

export default App;
  