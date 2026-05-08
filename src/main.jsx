// ───────────────────────────────────────────
// 📱 MAIN FILE — POORE APP KA CONTROL CENTER
// ───────────────────────────────────────────
// Yeh file sabse pehle chalti hai.
// Isme 2 kaam hote hain:
// 1. Saara data (states) yahan save hota hai
// 2. Konsa page dikhana hai — yeh decide hota hai

// React library import karo (har file mein zaroori hai)
import React, { useState } from 'react';

// ReactDOM — yeh app ko browser pe dikhata hai
import ReactDOM from 'react-dom/client';

// Map ki CSS file (bina iske map tut jayega)
import 'leaflet/dist/leaflet.css';

// Apni design file
import './styles.css';

// ─── MAP KA PIN FIX ───
// React mein Leaflet ka pin apne aap nahi dikhta, isliye manually set karna padta hai
import L from 'leaflet';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

var myIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41]
});
L.Marker.prototype.options.icon = myIcon;

// ─── CONFIG SE COLORS IMPORT ───
// config.js mein jo colors set kiye hain, unhe yahan lao
import {
  COLOR_PRIMARY, COLOR_PRIMARY_HOVER, COLOR_BACKGROUND,
  COLOR_CARD, COLOR_TEXT, COLOR_TEXT_DIM, COLOR_SUCCESS,
  COLOR_DANGER, COLOR_BORDER
} from './config';

// ─── COLORS KO CSS MEIN LAGAO ───
// Yeh code config.js ke colors ko poori app ki CSS mein set karta hai
// Isse tum config.js mein color badloge toh poora app ka color badlega
var style = document.documentElement.style;
style.setProperty('--color-primary', COLOR_PRIMARY);
style.setProperty('--color-primary-hover', COLOR_PRIMARY_HOVER);
style.setProperty('--color-bg', COLOR_BACKGROUND);
style.setProperty('--color-card', COLOR_CARD);
style.setProperty('--color-text', COLOR_TEXT);
style.setProperty('--color-text-dim', COLOR_TEXT_DIM);
style.setProperty('--color-success', COLOR_SUCCESS);
style.setProperty('--color-danger', COLOR_DANGER);
style.setProperty('--color-border', COLOR_BORDER);

// ─── SAARE PAGES IMPORT KARO ───
// Har page ek alag file mein hai
import RoleSelection from './pages/RoleSelection';
import Signup from './pages/Signup';
import OtpVerification from './pages/OtpVerification';
import DocumentUpload from './pages/DocumentUpload';
import Dashboard from './pages/Dashboard';


// ═══════════════════════════════════════
// APP FUNCTION — YAHI POORA APP HAI
// ═══════════════════════════════════════
function App() {

  // ─── STATES (yaad rakhne wali cheezein) ───
  
  // "view" yaad rakhta hai ki ABHI konsa page dikhana hai
  // Shuru mein "role" page dikhega (Passenger/Driver choose karo)
  var [view, setView] = useState('role');

  // User ne kya choose kiya — "passenger" ya "driver"
  var [role, setRole] = useState('');

  // User ka naam
  var [name, setName] = useState('');

  // User ka phone number
  var [mobile, setMobile] = useState('');

  // User ne OTP box mein kya type kiya
  var [otp, setOtp] = useState('');

  // Driver ka Aadhaar photo (shuru mein kuch nahi = null)
  var [aadhaarFile, setAadhaarFile] = useState(null);

  // Driver ka License photo
  var [licenseFile, setLicenseFile] = useState(null);


  // ─── LOGOUT FUNCTION ───
  // Jab user "Logout" dabayega toh sab kuch mita do aur pehle page pe le jao
  function handleLogout() {
    setView('role');
    setRole('');
    setName('');
    setMobile('');
    setOtp('');
    setAadhaarFile(null);
    setLicenseFile(null);
  }


  // ═══════════════════════════════════════
  // KONSA PAGE DIKHANA HAI — SIMPLE IF-ELSE
  // ═══════════════════════════════════════

  // Page 1: Role choose karo (Passenger ya Driver)
  if (view === 'role') {
    return (
      <RoleSelection
        setRole={setRole}
        setView={setView}
      />
    );
  }

  // Page 2: Naam aur Mobile number bharo
  if (view === 'signup') {
    return (
      <Signup
        role={role}
        name={name}
        setName={setName}
        mobile={mobile}
        setMobile={setMobile}
        setView={setView}
        setRole={setRole}
      />
    );
  }

  // Page 3: OTP daalo
  if (view === 'otp') {
    return (
      <OtpVerification
        role={role}
        mobile={mobile}
        otp={otp}
        setOtp={setOtp}
        setView={setView}
      />
    );
  }

  // Page 4: Documents upload karo (sirf Driver ke liye)
  if (view === 'documents') {
    return (
      <DocumentUpload
        aadhaarFile={aadhaarFile}
        setAadhaarFile={setAadhaarFile}
        licenseFile={licenseFile}
        setLicenseFile={setLicenseFile}
        setView={setView}
      />
    );
  }

  // Page 5: Dashboard (Map + Menu)
  if (view === 'dashboard') {
    return (
      <Dashboard
        role={role}
        name={name}
        handleLogout={handleLogout}
      />
    );
  }

  // Agar galti se koi page match nahi hua toh Loading dikhao
  return <div>Loading...</div>;
}


// ─── APP KO BROWSER MEIN DIKHAO ───
// index.html mein ek <div id="root"> hai — usme App daal do
var rootElement = document.getElementById('root');
var root = ReactDOM.createRoot(rootElement);
root.render(<App />);