// ───────────────────────────────────────────
// 📄 PAGE 4 — DOCUMENT UPLOAD (Sirf Driver ke liye)
// ───────────────────────────────────────────
// Is page mein Driver 2 photos upload karta hai:
// 1. Aadhaar Card
// 2. License / Vehicle RC
// Dono upload karne ke baad Dashboard khulega.

import React from 'react';
import StepIndicator from '../components/StepIndicator';
import FileUploadCard from '../components/FileUploadCard';

// Config se settings lao
import {
  APP_NAME, DOC_HEADING, DOC_SUBTITLE, DOC_SUBMIT_BUTTON,
  DOC_1_LABEL, DOC_1_ICON, DOC_1_ID, DOC_1_ERROR,
  DOC_2_LABEL, DOC_2_ICON, DOC_2_ID, DOC_2_ERROR,
  DRIVER_TOTAL_STEPS
} from '../config';


function DocumentUpload({ aadhaarFile, setAadhaarFile, licenseFile, setLicenseFile, setView }) {

  // ─── JAB "SUBMIT" BUTTON DABAYE ───
  function handleSubmit() {
    // Check 1: Aadhaar upload hua ya nahi
    if (!aadhaarFile) {
      alert(DOC_1_ERROR);
      return; // Nahi hua toh ruk jao
    }
    // Check 2: License upload hua ya nahi
    if (!licenseFile) {
      alert(DOC_2_ERROR);
      return; // Nahi hua toh ruk jao
    }
    // Dono ho gaye — Dashboard dikhao
    setView('dashboard');
  }

  // ─── JAB "BACK" BUTTON DABAYE ───
  function goBack() {
    setView('otp');
  }

  // ─── PAGE KA DESIGN ───
  return (
    <div className="auth-container">
      <div className="auth-card animate-fade doc-card">

        {/* Back button */}
        <button className="back-btn" onClick={goBack}>← Back</button>

        {/* App ka naam */}
        <div className="brand">{APP_NAME}</div>

        {/* Progress dots */}
        <StepIndicator current={2} total={DRIVER_TOTAL_STEPS} />

        {/* Heading aur subtitle */}
        <h1>{DOC_HEADING}</h1>
        <p className="subtitle">{DOC_SUBTITLE}</p>

        {/* Upload cards */}
        <div className="upload-list">

          {/* Card 1: Aadhaar */}
          <FileUploadCard
            label={DOC_1_LABEL}
            icon={DOC_1_ICON}
            file={aadhaarFile}
            onFileChange={setAadhaarFile}
            id={DOC_1_ID}
          />

          {/* Card 2: License */}
          <FileUploadCard
            label={DOC_2_LABEL}
            icon={DOC_2_ICON}
            file={licenseFile}
            onFileChange={setLicenseFile}
            id={DOC_2_ID}
          />

        </div>

        {/* Submit button */}
        <button className="btn btn-primary" onClick={handleSubmit}>
          {DOC_SUBMIT_BUTTON}
        </button>

      </div>
    </div>
  );
}

export default DocumentUpload;
