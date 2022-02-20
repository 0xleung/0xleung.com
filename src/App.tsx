import React from 'react';
// import logo from './logo.svg';
import { Routes, Route, Link } from "react-router-dom";
import CssBaseline from '@mui/material/CssBaseline';


import './App.css';

import Page1 from './pages/page1/Page1';
import Counter from './pages/counter/Counter';



const App = ():JSX.Element=> {
  return (
    <>
      <CssBaseline/>
      <div className="App">
      <header className="App-header">
        <nav>
          <Link to={'/'}>Page1</Link>
          <span> | </span>
          <Link to={'/counter'}>Counter</Link>
        </nav>
      </header>
      <Routes>
        <Route path="counter" element={<Counter />} />
        <Route path="/" element={<Page1 />} />
      </Routes>
    </div>
    </>
  );
}

export default App;
