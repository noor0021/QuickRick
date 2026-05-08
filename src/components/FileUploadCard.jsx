// ───────────────────────────────────────────
// 📤 COMPONENT — FILE UPLOAD CARD
// ───────────────────────────────────────────
// Yeh ek dabba banata hai jisme user photo/file upload kar sakta hai.
// <label> trick use ki hai — poore card pe click karo toh file chooser khulta hai.
// Koi useRef nahi chahiye!

import React from 'react';

function FileUploadCard({ label, icon, file, onFileChange, id }) {

  // ─── CARD KA COLOR DECIDE KARO ───
  var cardClass = "upload-card";         // Default: grey border

  if (file) {
    cardClass = "upload-card has-file";  // File hai toh: green border
  }

  // ─── JAB USER FILE SELECT KARE ───
  function handleFile(e) {
    var selectedFile = e.target.files[0]; // Pehli file uthao
    onFileChange(selectedFile);           // Upar bhej do save karne ke liye
  }

  // ─── CARD KA DESIGN ───
  return (
    // <label> + htmlFor = poora card click karne par file input click hoga
    <label className={cardClass} htmlFor={id}>

      {/* Chhupa hua file input — dikhta nahi hai */}
      <input
        id={id}
        type="file"
        accept="image/*,.pdf"
        style={{ display: 'none' }}
        onChange={handleFile}
      />

      {/* Emoji icon */}
      <div className="upload-icon">{icon}</div>

      {/* Text area */}
      <div className="upload-info">
        {/* Card ka title (jaise "Aadhaar Card") */}
        <span className="upload-label">{label}</span>

        {/* File hai toh naam dikhao, nahi toh "Tap to upload" */}
        {file ? (
          <span className="upload-filename">{file.name}</span>
        ) : (
          <span className="upload-hint">Tap to upload</span>
        )}
      </div>

      {/* File upload ho gayi toh tick mark */}
      {file ? <div className="upload-check">✓</div> : null}

    </label>
  );
}

export default FileUploadCard;
