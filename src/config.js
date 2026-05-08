// ============================================
// 🔧 MASTER SETTINGS FILE — VIVA MEIN SIRF YAHI KHOLO
// ============================================
// Sir kuch bhi bole — yahan value badlo, poora app apne aap badal jayega
// Save karo (Ctrl+S) aur browser refresh karo — bas!


// ──────────────────────────────────────
// 📱 APP KA NAAM AUR TAGLINE
// ──────────────────────────────────────
var APP_NAME = "QuickRick";
var APP_TAG = "BETA";                // Hatana ho toh "" kar do


// ──────────────────────────────────────
// 🔑 OTP SETTINGS
// ──────────────────────────────────────
var DEMO_OTP = "123456";             // Sahi OTP — yeh badal do toh naya OTP lagega
var OTP_LENGTH = 6;                  // OTP kitne digit ka hoga


// ──────────────────────────────────────
// 📞 MOBILE SETTINGS
// ──────────────────────────────────────
var MOBILE_LENGTH = 10;              // Phone number kitne digit ka hoga
var MOBILE_PLACEHOLDER = "9876543210";


// ──────────────────────────────────────
// 🗺️ MAP SETTINGS
// ──────────────────────────────────────
// Delhi     = [28.6139, 77.209]
// Mumbai    = [19.076, 72.8777]
// Bangalore = [12.9716, 77.5946]
// Hyderabad = [17.385, 78.4867]
// Chennai   = [13.0827, 80.2707]
// Kolkata   = [22.5726, 88.3639]
// Pune      = [18.5204, 73.8567]
// Jaipur    = [26.9124, 75.7873]
var MAP_CENTER = [28.6139, 77.209];
var MAP_ZOOM = 15;                   // 13=door, 15=normal, 17=paas


// ──────────────────────────────────────
// 🟡 SIGNAL CIRCLE SETTINGS
// ──────────────────────────────────────
var SIGNAL_RADIUS = 200;             // Circle kitna bada (meters)
var SIGNAL_COLOR = "#eab308";        // Circle ka color (yellow)
var SIGNAL_OPACITY = 0.3;            // Circle kitna transparent (0=invisible, 1=solid)


// ──────────────────────────────────────
// 🎨 APP COLORS (CSS variables set karega)
// ──────────────────────────────────────
// Primary color = buttons, highlights
// Badalna ho toh bas yeh value badlo!
var COLOR_PRIMARY = "#eab308";       // Yellow (buttons, highlights)
var COLOR_PRIMARY_HOVER = "#ca9a04"; // Button hover color (dark yellow)
var COLOR_BACKGROUND = "#0f0f1a";    // Page ka background (dark blue-black)
var COLOR_CARD = "#1a1a2e";          // Card ka background (dark purple-blue)
var COLOR_TEXT = "#ffffff";           // Main text color (white)
var COLOR_TEXT_DIM = "#94a3b8";      // Halka text color (grey)
var COLOR_SUCCESS = "#22c55e";       // Green (success, done steps)
var COLOR_DANGER = "#ef4444";        // Red (errors)
var COLOR_BORDER = "#2a2a4a";        // Card ke border ka color


// ──────────────────────────────────────
// 👤 ROLE SETTINGS
// ──────────────────────────────────────
var PASSENGER_LABEL = "Passenger";
var PASSENGER_ICON = "🧑‍💼";
var PASSENGER_DESC = "Book a rick & go anywhere";

var DRIVER_LABEL = "Driver";
var DRIVER_ICON = "🛺";
var DRIVER_DESC = "Accept rides & earn money";


// ──────────────────────────────────────
// 📝 PAGE HEADINGS & TEXTS
// ──────────────────────────────────────
var WELCOME_HEADING = "Welcome!";
var WELCOME_SUBTITLE = "How would you like to use " + APP_NAME + "?";

var SIGNUP_SUBTITLE = "Tell us about yourself";
var NAME_LABEL = "Full Name";
var NAME_PLACEHOLDER = "Rahul Sharma";

var OTP_HEADING = "Verify OTP";
var SEND_OTP_BUTTON = "Send OTP";
var RESEND_TEXT = "Didn't receive?";
var RESEND_BUTTON = "Resend OTP";

var DOC_HEADING = "Upload Documents";
var DOC_SUBTITLE = "We need these to verify your identity";
var DOC_SUBMIT_BUTTON = "Submit & Enter";

var DASHBOARD_QUESTION = "Where do you want to go?";
var DESTINATION_PLACEHOLDER = "Enter destination...";
var SIGNAL_ON_TEXT = "Stop Signal";
var SIGNAL_OFF_TEXT = "Send Signal";

var NEARBY_RIDES = 3;
var NEARBY_TEXT = " Passengers are looking for a ride!";


// ──────────────────────────────────────
// 📄 DOCUMENT UPLOAD SETTINGS (Driver ke liye)
// ──────────────────────────────────────
var DOC_1_LABEL = "Aadhaar Card";
var DOC_1_ICON = "🪪";
var DOC_1_ID = "aadhaar-upload";
var DOC_1_ERROR = "Please upload Aadhaar Card";

var DOC_2_LABEL = "License Plate / Vehicle RC";
var DOC_2_ICON = "🚗";
var DOC_2_ID = "license-upload";
var DOC_2_ERROR = "Please upload License Plate Document";


// ──────────────────────────────────────
// 🔘 STEP INDICATOR SETTINGS
// ──────────────────────────────────────
var PASSENGER_TOTAL_STEPS = 3;       // Passenger ke liye 3 steps
var DRIVER_TOTAL_STEPS = 4;          // Driver ke liye 4 steps (documents extra)
var DONE_SYMBOL = "✓";               // Complete step ka symbol


// ──────────────────────────────────────
// 📤 EXPORT — IN SABKO BAAKI FILES USE KARENGI
// ──────────────────────────────────────
export {
  APP_NAME,
  APP_TAG,
  DEMO_OTP,
  OTP_LENGTH,
  MOBILE_LENGTH,
  MOBILE_PLACEHOLDER,
  MAP_CENTER,
  MAP_ZOOM,
  SIGNAL_RADIUS,
  SIGNAL_COLOR,
  SIGNAL_OPACITY,
  COLOR_PRIMARY,
  COLOR_PRIMARY_HOVER,
  COLOR_BACKGROUND,
  COLOR_CARD,
  COLOR_TEXT,
  COLOR_TEXT_DIM,
  COLOR_SUCCESS,
  COLOR_DANGER,
  COLOR_BORDER,
  PASSENGER_LABEL,
  PASSENGER_ICON,
  PASSENGER_DESC,
  DRIVER_LABEL,
  DRIVER_ICON,
  DRIVER_DESC,
  WELCOME_HEADING,
  WELCOME_SUBTITLE,
  SIGNUP_SUBTITLE,
  NAME_LABEL,
  NAME_PLACEHOLDER,
  OTP_HEADING,
  SEND_OTP_BUTTON,
  RESEND_TEXT,
  RESEND_BUTTON,
  DOC_HEADING,
  DOC_SUBTITLE,
  DOC_SUBMIT_BUTTON,
  DASHBOARD_QUESTION,
  DESTINATION_PLACEHOLDER,
  SIGNAL_ON_TEXT,
  SIGNAL_OFF_TEXT,
  NEARBY_RIDES,
  NEARBY_TEXT,
  DOC_1_LABEL,
  DOC_1_ICON,
  DOC_1_ID,
  DOC_1_ERROR,
  DOC_2_LABEL,
  DOC_2_ICON,
  DOC_2_ID,
  DOC_2_ERROR,
  PASSENGER_TOTAL_STEPS,
  DRIVER_TOTAL_STEPS,
  DONE_SYMBOL
};
