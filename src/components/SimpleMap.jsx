// ───────────────────────────────────────────
// 🗺️ COMPONENT — SIMPLE MAP
// ───────────────────────────────────────────
// Yeh Leaflet library se map dikhata hai.
// Signal ON ho toh yellow circle bhi dikhata hai.

import React from 'react';
import { MapContainer, TileLayer, Marker, Circle } from 'react-leaflet';
import { MAP_CENTER, MAP_ZOOM, SIGNAL_RADIUS, SIGNAL_COLOR, SIGNAL_OPACITY } from '../config';

function SimpleMap({ isSignaling }) {

  return (
    <MapContainer center={MAP_CENTER} zoom={MAP_ZOOM} className="map-frame">

      {/* Internet se map ki photo laata hai */}
      <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

      {/* Map pe ek pin */}
      <Marker position={MAP_CENTER} />

      {/* Agar signal ON hai toh yellow circle dikhao */}
      {isSignaling ? (
        <Circle
          center={MAP_CENTER}
          radius={SIGNAL_RADIUS}
          pathOptions={{
            fillColor: SIGNAL_COLOR,
            color: SIGNAL_COLOR,
            fillOpacity: SIGNAL_OPACITY
          }}
        />
      ) : null}

    </MapContainer>
  );
}

export default SimpleMap;
