// import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';

import Login from "./Components/Owener/Login.js";

function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Login/>} />
      </Routes>
    </Router>
  );
}

export default App;
  