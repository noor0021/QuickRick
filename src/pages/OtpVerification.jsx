// ───────────────────────────────────────────
// 📄 PAGE 3 — OTP VERIFICATION
// ───────────────────────────────────────────
// Is page mein user OTP daalega.
// Sahi OTP daalega toh aage jayega.
// Demo OTP config.js mein set hai.

import React from 'react';
import StepIndicator from '../components/StepIndicator';

// Config se settings lao
import {
  APP_NAME, DEMO_OTP, OTP_LENGTH,
  OTP_HEADING, RESEND_TEXT, RESEND_BUTTON,
  PASSENGER_TOTAL_STEPS, DRIVER_TOTAL_STEPS
} from '../config';


function OtpVerification({ role, mobile, otp, setOtp, setView }) {

  // ─── TOTAL STEPS DECIDE KARO ───
  var totalSteps = PASSENGER_TOTAL_STEPS;
  if (role === 'driver') {
    totalSteps = DRIVER_TOTAL_STEPS;
  }

  // ─── BUTTON TEXT DECIDE KARO ───
  // Passenger ke liye "Verify & Enter" (seedha andar jayega)
  // Driver ke liye "Verify & Continue" (documents page aayega)
  var buttonText = "Verify & Enter";
  if (role === 'driver') {
    buttonText = "Verify & Continue";
  }

  // ─── JAB "VERIFY" BUTTON DABAYE ───
  function handleVerify() {
    // Check: OTP sahi hai ya nahi
    if (otp !== DEMO_OTP) {
      alert('Invalid OTP! Use ' + DEMO_OTP);
      return; // Galat hai toh yahin ruk jao
    }

    // Sahi OTP daala — ab kahan bhejein?
    if (role === 'driver') {
      setView('documents');   // Driver ko documents page pe bhejo
    } else {
      setView('dashboard');   // Passenger ko seedha dashboard pe bhejo
    }
  }

  // ─── JAB OTP BOX MEIN TYPE KARE ───
  // Sirf numbers allow hain
  function handleOtpType(e) {
    var typed = e.target.value;
    var onlyNumbers = typed.replace(/[^0-9]/g, '');
    setOtp(onlyNumbers);
  }

  // ─── JAB "BACK" BUTTON DABAYE ───
  function goBack() {
    setView('signup');
  }

  // ─── JAB "RESEND OTP" DABAYE ───
  function handleResend() {
    alert('OTP Resent!');
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
        <StepIndicator current={1} total={totalSteps} />

        {/* Heading */}
        <h1>{OTP_HEADING}</h1>

        {/* Kis number pe OTP gaya + sahi OTP bata rahe hain demo ke liye */}
        <p className="subtitle">
          OTP sent to +91 {mobile}. Use <strong>{DEMO_OTP}</strong>
        </p>

        {/* OTP daalne ka bada input box */}
        <div className="otp-group">
          <input
            type="text"
            className="otp-input"
            placeholder="● ● ● ● ● ●"
            maxLength={OTP_LENGTH}
            value={otp}
            onChange={handleOtpType}
          />
        </div>

        {/* Verify button */}
        <button className="btn btn-primary" onClick={handleVerify}>
          {buttonText}
        </button>

        {/* Resend OTP link */}
        <p className="resend-text">
          {RESEND_TEXT}{' '}
          <button className="link-btn" onClick={handleResend}>
            {RESEND_BUTTON}
          </button>
        </p>

      </div>
    </div>
  );
}

export default OtpVerification;
