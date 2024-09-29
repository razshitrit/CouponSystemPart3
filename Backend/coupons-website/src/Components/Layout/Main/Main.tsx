import React from 'react';
import './Main.css';
import Routing from '../Routing/Routing';
import { Outlet } from 'react-router-dom';

const Main = () => {
  return (
    <div className='main'>
      <h2 className='main-title'>ברוכים הבאים לחנות הקופונים שלנו</h2>
      <Routing />
      <div className='content'>
        <Outlet />
      </div>
    </div>
  );
};

export default Main;