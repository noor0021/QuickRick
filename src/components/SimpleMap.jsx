import React from 'react';
import { MapContainer, TileLayer, Marker, Circle } from 'react-leaflet';

// Yeh component map banane ke liye hai.
// Dashboard file ko chota karne ke liye isko alag file me daal diya hai.
export default function SimpleMap({ isSignaling }) {
  const mapCenter = [28.6139, 77.209]; // Delhi location

  return (
    <MapContainer center={mapCenter} zoom={15} className="map-frame">
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
      <Marker position={mapCenter} />
      
      {/* Agar signal ON hai, toh ek bada yellow circle dikhao */}
      {isSignaling === true ? (
        <Circle
          center={mapCenter}
          radius={200}
          pathOptions={{ fillColor: '#eab308', color: '#eab308', fillOpacity: 0.3 }}
        />
      ) : null}
    </MapContainer>
  )
}
