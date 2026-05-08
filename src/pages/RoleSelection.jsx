// ───────────────────────────────────────────
// 📄 PAGE 1 — ROLE SELECTION
// ───────────────────────────────────────────
// Yeh sabse pehla page hai.
// User yahan choose karta hai ki wo Passenger hai ya Driver.

import React from 'react';

// Config se saari settings lao
import {
  APP_NAME, APP_TAG,
  WELCOME_HEADING, WELCOME_SUBTITLE,
  PASSENGER_LABEL, PASSENGER_ICON, PASSENGER_DESC,
  DRIVER_LABEL, DRIVER_ICON, DRIVER_DESC
} from '../config';




function RoleSelection({ setRole, setView }) {

  // ─── JAB PASSENGER BUTTON DABAYE ───
  function passengerClick() {
    setRole('passenger');   // App ko batao ki user Passenger hai
    setView('signup');      // Agla page (Signup) dikhao
  }

  // ─── JAB DRIVER BUTTON DABAYE ───
  function driverClick() {
    setRole('driver');      // App ko batao ki user Driver hai
    setView('signup');      // Agla page (Signup) dikhao
  }

  // ─── PAGE KA DESIGN ───
  return (
    <div className="auth-container">
      <div className="auth-card animate-fade role-card">

        {/* App ka naam aur tag */}
        <div className="brand">
          {APP_NAME} <span>{APP_TAG}</span>
        </div>


        
        {/* Badi heading */}
        <h1>{WELCOME_HEADING}</h1>

        {/* Choti line */}
        <p className="subtitle">{WELCOME_SUBTITLE}</p>

        {/* Do buttons — Passenger aur Driver */}
        <div className="role-grid">

          {/* Button 1: Passenger */}
          <button className="role-choice" onClick={passengerClick}>
            <div className="role-choice-icon">{PASSENGER_ICON}</div>
            <div className="role-choice-title">{PASSENGER_LABEL}</div>
            <div className="role-choice-desc">{PASSENGER_DESC}</div>
          </button>

          {/* Button 2: Driver */}
          <button className="role-choice" onClick={driverClick}>
            <div className="role-choice-icon">{DRIVER_ICON}</div>
            <div className="role-choice-title">{DRIVER_LABEL}</div>
            <div className="role-choice-desc">{DRIVER_DESC}</div>
          </button>

        </div>
      </div>
    </div>
  );
}

export default RoleSelection;
