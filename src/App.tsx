import React from 'react';
// import logo from './logo.svg';
import { Routes, Route } from "react-router-dom";
import CssBaseline from '@mui/material/CssBaseline';


import './App.css';

import Page1 from './pages/page1/Page1';
import Sign from './pages/sign/sign';
import PlayGround from './pages/playground/PlayGorund';


const App = ():JSX.Element=> {
  return (
    <>
      <CssBaseline/>
      <Routes>
        <Route path="/playground" element={<PlayGround />} />
        <Route path="/sign" element={<Sign />} />
        <Route path="/" element={<Page1 />} />
      </Routes>
    </>
  );
}

export default App;
