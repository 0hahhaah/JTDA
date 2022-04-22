import React from 'react';
import './App.css';
import StateCount from './components/StateCount';
import CircleChart from './components/CircleChart';
import Main from './page/main';
import Detail from "./page/detail";

function App() {
  return (
    <div className="App">
      {/* <Main/> */}
      <Detail/>
      {/* <StateCount /> */}
      {/* <CircleChart /> */}
    </div>
  );
}

export default App;
