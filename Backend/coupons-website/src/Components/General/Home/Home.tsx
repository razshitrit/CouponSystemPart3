import React from 'react';
import './Home.css';

const Home = () => {
  return (
    <div className="home">
      <div className="home-content">
        <img
          src="https://dealcoupon.co.il/storage/medialibrary/1418/conversions/groo-logo-logo.png"
          alt="Store Banner"
          className="home-image"
        />
        <h1 className="home-title">ברוכה הבאה לחנות הקופונים שלנו</h1>
        <p className="home-description">
          קצת עלינו: בלה בלה בלה, חנות הקופונים הטובה ביותר! כאן תוכלו למצוא קופונים מעולים לכל תחום.
        </p>
      </div>
    </div>
  );
}

export default Home;