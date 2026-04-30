import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, useMap, useMapEvents } from 'react-leaflet';
import L from 'leaflet';
import { useSim } from '../context/SimContext';

// Custom icons using CSS classes defined in index.css
const createHtmlIcon = (className) => new L.DivIcon({
  className: '',
  html: `<div class="${className}"></div>`,
  iconSize: [12, 12],
  iconAnchor: [6, 6],
});

const autoIcon = createHtmlIcon('auto-dot');
const demandIcon = createHtmlIcon('demand-dot');

const MapUpdater = ({ center }) => {
  const map = useMap();
  useEffect(() => {
    map.setView(center);
  }, [center, map]);
  return null;
};

const MapEvents = () => {
  const { setUserLocation } = useSim();
  useMapEvents({
    click(e) {
      // Allow users to click on map to set simulated location
      setUserLocation([e.latlng.lat, e.latlng.lng]);
    },
  });
  return null;
};

const Map = () => {
  const { userLocation, autos, demands, viewMode } = useSim();

  return (
    <div className="h-full w-full relative">
      <MapContainer 
        center={userLocation} 
        zoom={15} 
        scrollWheelZoom={true}
        zoomControl={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        <MapUpdater center={userLocation} />
        <MapEvents />

        {/* User Location Marker */}
        <Marker 
          position={userLocation} 
          icon={new L.DivIcon({
            className: '',
            html: `
              <div class="relative flex items-center justify-center">
                <div class="absolute w-8 h-8 bg-blue-500/20 rounded-full animate-ping"></div>
                <div class="w-4 h-4 bg-blue-500 border-2 border-white rounded-full shadow-lg"></div>
              </div>
            `,
            iconSize: [32, 32],
            iconAnchor: [16, 16],
          })} 
        />

        {/* Show Autos for Passengers */}
        {viewMode === 'passenger' && autos.map(auto => (
          <Marker 
            key={auto.id} 
            position={auto.position} 
            icon={autoIcon} 
          />
        ))}

        {/* Show Demands for Drivers */}
        {viewMode === 'driver' && (
          <>
            {/* Heatmap Zones (Simulated) */}
            {demands.length > 3 && (
              <div className="pointer-events-none">
                {/* We'll use large circles with high blur for heatmap effect */}
                {demands.slice(0, 3).map((d, i) => (
                  <Marker 
                    key={`zone-${i}`} 
                    position={d.position} 
                    icon={new L.DivIcon({
                      className: '',
                      html: `<div class="w-64 h-64 bg-red-500/20 blur-[60px] rounded-full -translate-x-1/2 -translate-y-1/2"></div>`,
                      iconSize: [0, 0],
                    })}
                  />
                ))}
              </div>
            )}
            {demands.map(demand => (
              <Marker 
                key={demand.id} 
                position={demand.position} 
                icon={demandIcon} 
              />
            ))}
          </>
        )}

        {/* In Driver mode, we can also show autos (competitors) or hide them.
            For simplicity, let's show only demands for drivers. */}
      </MapContainer>
    </div>
  );
};

export default Map;
