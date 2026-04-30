import React, { useState, useCallback } from 'react';
import { GoogleMap, useJsApiLoader, Marker, InfoWindow } from '@react-google-maps/api';
import { useSim } from '../context/SimContext';

const containerStyle = {
  width: '100%',
  height: '100%'
};

// Night mode style for Google Maps
const mapStyles = [
  { "elementType": "geometry", "stylers": [{ "color": "#f5f5f5" }] },
  { "elementType": "labels.icon", "stylers": [{ "visibility": "off" }] },
  { "elementType": "labels.text.fill", "stylers": [{ "color": "#616161" }] },
  { "elementType": "labels.text.stroke", "stylers": [{ "color": "#f5f5f5" }] },
  { "featureType": "administrative.land_parcel", "elementType": "labels.text.fill", "stylers": [{ "color": "#bdbdbd" }] },
  { "featureType": "poi", "elementType": "geometry", "stylers": [{ "color": "#eeeeee" }] },
  { "featureType": "poi", "elementType": "labels.text.fill", "stylers": [{ "color": "#757575" }] },
  { "featureType": "poi.park", "elementType": "geometry", "stylers": [{ "color": "#e5e5e5" }] },
  { "featureType": "poi.park", "elementType": "labels.text.fill", "stylers": [{ "color": "#9e9e9e" }] },
  { "featureType": "road", "elementType": "geometry", "stylers": [{ "color": "#ffffff" }] },
  { "featureType": "road.arterial", "elementType": "labels.text.fill", "stylers": [{ "color": "#757575" }] },
  { "featureType": "road.highway", "elementType": "geometry", "stylers": [{ "color": "#dadada" }] },
  { "featureType": "road.highway", "elementType": "labels.text.fill", "stylers": [{ "color": "#616161" }] },
  { "featureType": "road.local", "elementType": "labels.text.fill", "stylers": [{ "color": "#9e9e9e" }] },
  { "featureType": "transit.line", "elementType": "geometry", "stylers": [{ "color": "#e5e5e5" }] },
  { "featureType": "transit.station", "elementType": "geometry", "stylers": [{ "color": "#eeeeee" }] },
  { "featureType": "water", "elementType": "geometry", "stylers": [{ "color": "#c9c9c9" }] },
  { "featureType": "water", "elementType": "labels.text.fill", "stylers": [{ "color": "#9e9e9e" }] }
];

const MyGoogleMap = () => {
  const { userLocation, autos, demands, viewMode } = useSim();
  
  // NOTE: Replace 'YOUR_GOOGLE_MAPS_API_KEY' with a real key
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: "" 
  });

  const [map, setMap] = useState(null);

  const onLoad = useCallback(function callback(map) {
    setMap(map);
  }, []);

  const onUnmount = useCallback(function callback(map) {
    setMap(null);
  }, []);

  if (!isLoaded) return <div className="w-full h-full bg-gray-100 animate-pulse"></div>;

  return (
    <GoogleMap
      mapContainerStyle={containerStyle}
      center={userLocation}
      zoom={15}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{
        styles: mapStyles,
        disableDefaultUI: true,
        zoomControl: false,
      }}
    >
      {/* User Location Marker */}
      <Marker
        position={userLocation}
        icon={{
          path: window.google.maps.SymbolPath.CIRCLE,
          scale: 7,
          fillColor: "#000",
          fillOpacity: 1,
          strokeWeight: 2,
          strokeColor: "#fff",
        }}
      />

      {/* Show Autos for Passengers */}
      {viewMode === 'passenger' && autos.map(auto => (
        <Marker
          key={auto.id}
          position={auto.position}
          icon={{
            url: 'https://cdn-icons-png.flaticon.com/512/3202/3202926.png', // Rickshaw icon
            scaledSize: new window.google.maps.Size(24, 24),
            rotation: auto.heading
          }}
        />
      ))}

      {/* Show Demands for Drivers */}
      {viewMode === 'driver' && demands.map(demand => (
        <Marker
          key={demand.id}
          position={demand.position}
          icon={{
            path: window.google.maps.SymbolPath.CIRCLE,
            scale: 6,
            fillColor: "#f00",
            fillOpacity: 0.8,
            strokeWeight: 0,
          }}
        />
      ))}
    </GoogleMap>
  );
};

export default React.memo(MyGoogleMap);
