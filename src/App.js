// import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Login from "./Components/Owener/Login.js";
import LoginRegister from './Components/Client/login_register.js'

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login/>} />
        <Route path='/1' element={<LoginRegister/>} />
      </Routes>
    </Router>
  );
}

export default App;
  