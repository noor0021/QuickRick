// ───────────────────────────────────────────
// 📄 PAGE 2 — SIGNUP
// ───────────────────────────────────────────
// Is page mein user apna NAAM aur PHONE NUMBER daalega.
// Sab sahi hai toh agla page (OTP) khulega.

import React from 'react';
import StepIndicator from '../components/StepIndicator';

// Config se settings lao
import {
  APP_NAME, SIGNUP_SUBTITLE,
  NAME_LABEL, NAME_PLACEHOLDER,
  MOBILE_LENGTH, MOBILE_PLACEHOLDER,
  SEND_OTP_BUTTON,
  PASSENGER_TOTAL_STEPS, DRIVER_TOTAL_STEPS,
  PASSENGER_LABEL, DRIVER_LABEL
} from '../config';


function Signup({ role, name, setName, mobile, setMobile, setView, setRole }) {

  // ─── TOTAL STEPS DECIDE KARO ───
  // Passenger ke liye 3 steps hain, Driver ke liye 4 (documents extra)
  var totalSteps = PASSENGER_TOTAL_STEPS;
  if (role === 'driver') {
    totalSteps = DRIVER_TOTAL_STEPS;
  }

  // ─── PAGE KI HEADING DECIDE KARO ───
  var title = PASSENGER_LABEL + " Sign Up";
  if (role === 'driver') {
    title = DRIVER_LABEL + " Sign Up";
  }

  // ─── JAB "SEND OTP" BUTTON DABAYE ───
  function handleSignup() {
    // Check 1: Naam khali toh nahi?
    if (name === '') {
      alert('Enter your name');
      return; // Yahin ruk jao
    }
    // Check 2: Phone number poora hai ya nahi?
    if (mobile.length !== MOBILE_LENGTH) {
      alert('Enter ' + MOBILE_LENGTH + '-digit mobile number');
      return; // Yahin ruk jao
    }
    // Sab sahi hai — agla page dikhao
    setView('otp');
  }

  // ─── JAB "BACK" BUTTON DABAYE ───
  function goBack() {
    setView('role');  // Pehle page pe wapas jao
    setRole('');      // Role bhi mita do
  }

  // ─── JAB MOBILE BOX MEIN TYPE KARE ───
  // Sirf numbers allow hain (letters hata do)
  function handleMobileType(e) {
    var typed = e.target.value;                       // Jo type kiya
    var onlyNumbers = typed.replace(/[^0-9]/g, '');   // Letters hata do
    setMobile(onlyNumbers);                           // Saaf number save karo
  }

  // ─── PAGE KA DESIGN ───
  return (
    <div className="auth-container">
      <div className="auth-card animate-fade">

        {/* Back button */}
        <button className="back-btn" onClick={goBack}>← Back</button>

        {/* App ka naam */}
        <div className="brand">{APP_NAME}</div>

        {/* Progress dots */}
        <StepIndicator current={0} total={totalSteps} />

        {/* Heading aur subtitle */}
        <h1>{title}</h1>
        <p className="subtitle">{SIGNUP_SUBTITLE}</p>

        {/* Naam ka input box */}
        <div className="input-group">
          <label className="label">{NAME_LABEL}</label>
          <input
            type="text"
            placeholder={NAME_PLACEHOLDER}
            value={name}
            onChange={function(e) { setName(e.target.value); }}
          />
        </div>

        {/* Mobile number ka input box */}
        <div className="input-group">
          <label className="label">Mobile Number</label>
          <input
            type="tel"
            placeholder={MOBILE_PLACEHOLDER}
            maxLength={MOBILE_LENGTH}
            value={mobile}
            onChange={handleMobileType}
          />
        </div>

        {/* Send OTP button */}
        <button className="btn btn-primary" onClick={handleSignup}>
          {SEND_OTP_BUTTON}
        </button>

      </div>
    </div>
  );
}

export default Signup;
