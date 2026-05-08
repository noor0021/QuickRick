import React, { useState } from 'react';
import SimpleMap from '../components/SimpleMap';

export default function Dashboard({ role, name, handleLogout }) {
  const [isSignaling, setIsSignaling] = useState(false);

  // Jab button click hoga, toh signal ON/OFF hoga
  const buttonClicked = () => {
    if (isSignaling === true) {
      setIsSignaling(false);
    } else {
      setIsSignaling(true);
    }
  }

  return (
    <div className="dashboard animate-fade">
      
      {/* 1. LEFT SIDE: MAP */}
      <div className="map-section">
        {/* Map ka saara complex code maine SimpleMap.jsx me chupaa diya hai */}
        <SimpleMap isSignaling={isSignaling} />
      </div>


      {/* 2. RIGHT SIDE: MENU */}
      <div className="sidebar">
        
        {/* Logo and Logout */}
        <div className="sidebar-header">
          <h2>QuickRick</h2>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>

        {/* User Details */}
        <div className="user-info">
          <h3>Hi, {name}!</h3>
          <p>You are a <b>{role}</b></p>
        </div>

        <br />

        {/* Agar user PASSENGER hai, toh yeh dikhao: */}
        {role === "passenger" ? (
          <div>
            <p>Where do you want to go?</p>
            <input type="text" placeholder="Enter destination..." />
            
            <br /><br />
            
            <button className="signal-btn" onClick={buttonClicked}>
              {isSignaling === true ? "Stop Signal" : "Send Signal"}
            </button>
          </div>
        ) : null}


        {/* Agar user DRIVER hai, toh yeh dikhao: */}
        {role === "driver" ? (
          <div className="status-card">
            <h3>Nearby Rides</h3>
            <p>3 Passengers are looking for a ride!</p>
          </div>
        ) : null}

      </div>
    </div>
  )
}
