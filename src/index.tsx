import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Mainpage from "./components/MainPage";

ReactDOM.render(
  <React.StrictMode>
    <Mainpage json="123"/>
  </React.StrictMode>,
  document.getElementById('root')
);