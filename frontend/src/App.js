import React from 'react';
import './App.css';

import Logo from './assets/logo.svg';

import Routes from './routes';

// tempo de video: 1:16:30 
//
function App() {


  return (
    <div className="container">
      <img src={Logo} alt="AirCnC" />

      <div className="content">
        <Routes />

      </div>
    </div>
  );
}

export default App;
