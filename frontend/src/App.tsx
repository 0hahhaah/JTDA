import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Main from './page/main';
import Detail from "./page/detail";
import ScrollToTop from './components/ScrollToTop';

function App() {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Main />}/>
        <Route path="/detail" element={<Detail />}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
