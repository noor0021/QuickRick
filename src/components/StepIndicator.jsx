// ───────────────────────────────────────────
// 🔘 COMPONENT — STEP INDICATOR (Progress Dots)
// ───────────────────────────────────────────
// Yeh upar gol-gol circles banata hai — Step 1, 2, 3...
// Jo step ho chuka = green tick (✓)
// Jo step abhi chal raha = yellow glow
// Jo step baaki hai = grey number

import React from 'react';
import { DONE_SYMBOL } from '../config';

function StepIndicator({ current, total }) {

  // Ek khaali list banao — isme circles store honge
  var circles = [];

  // Loop — 0 se total tak (jaise 0, 1, 2, 3)
  for (var i = 0; i < total; i++) {

    // ─── CSS CLASS DECIDE KARO ───
    var className = "step-dot";       // Default: grey

    if (i < current) {
      className = "step-dot done";    // Purana step: green
    }

    if (i === current) {
      className = "step-dot active";  // Current step: yellow glow
    }

    // ─── CIRCLE KE ANDAR KYA LIKHNA HAI ───
    var text = i + 1;                 // Default: number (1, 2, 3...)

    if (i < current) {
      text = DONE_SYMBOL;            // Purana step: tick mark (✓)
    }

    // ─── CIRCLE BANAO AUR LIST MEIN DAALO ───
    circles.push(
      <div key={i} className={className}>
        {text}
      </div>
    );
  }

  // Saare circles ek line mein dikhao
  return (
    <div className="step-indicator">
      {circles}
    </div>
  );
}

export default StepIndicator;
