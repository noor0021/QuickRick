// ───────────────────────────────────────────
// 📄 PAGE 5 — DASHBOARD (Final Page)
// ───────────────────────────────────────────
// Left = MAP, Right = MENU

import React, { useState } from 'react';
import SimpleMap from '../components/SimpleMap';
import {
  APP_NAME, DASHBOARD_QUESTION, DESTINATION_PLACEHOLDER,
  SIGNAL_ON_TEXT, SIGNAL_OFF_TEXT, NEARBY_RIDES, NEARBY_TEXT
} from '../config';

function Dashboard({ role, name, handleLogout }) {

  // Signal ON ya OFF? Shuru mein OFF
  var [isSignaling, setIsSignaling] = useState(false);

  // Signal button dabaye toh toggle karo
  function toggleSignal() {
    if (isSignaling === true) {
      setIsSignaling(false);
    } else {
      setIsSignaling(true);
    }
  }

  // Button pe kya likha hoga
  var buttonText = SIGNAL_OFF_TEXT;
  if (isSignaling === true) {
    buttonText = SIGNAL_ON_TEXT;
  }

  return (
    <div className="dashboard animate-fade">

      {/* LEFT SIDE: MAP */}
      <div className="map-section">
        <SimpleMap isSignaling={isSignaling} />
      </div>

      {/* RIGHT SIDE: MENU */}
      <div className="sidebar">

        {/* App naam + Logout */}
        <div className="sidebar-header">
          <h2>{APP_NAME}</h2>
          <button className="logout-btn" onClick={handleLogout}>Logout</button>
        </div>

        {/* User ki info */}
        <div className="user-info">
          <h3>Hi, {name}!</h3>
          <p>You are a <b>{role}</b></p>
        </div>

        <br />

        {/* Passenger ka menu — sirf passenger ko dikhega */}
        {role === 'passenger' ? (
          <div>
            <p>{DASHBOARD_QUESTION}</p>
            <input type="text" placeholder={DESTINATION_PLACEHOLDER} />
            <br /><br />
            <button className="signal-btn" onClick={toggleSignal}>{buttonText}</button>
          </div>
        ) : null}

        {/* Driver ka menu — sirf driver ko dikhega */}
        {role === 'driver' ? (
          <div className="status-card">
            <h3>Nearby Rides</h3>
            <p>{NEARBY_RIDES}{NEARBY_TEXT}</p>
          </div>
        ) : null}

      </div>
    </div>
  );
}

export default Dashboard;
