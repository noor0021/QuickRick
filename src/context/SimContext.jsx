import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';

const SimContext = createContext();

export const useSim = () => useContext(SimContext);

export const SimProvider = ({ children }) => {
  const [viewMode, setViewMode] = useState('passenger'); // 'passenger' or 'driver'
  const [userLocation, setUserLocation] = useState({ lat: 12.9716, lng: 77.5946 }); // Bangalore default
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [demands, setDemands] = useState([]);
  const [autos, setAutos] = useState([]);
  const [isLocating, setIsLocating] = useState(false);

  // Initialize simulated autos
  useEffect(() => {
    const initialAutos = Array.from({ length: 15 }).map((_, i) => ({
      id: `auto-${i}`,
      position: {
        lat: userLocation.lat + (Math.random() - 0.5) * 0.02,
        lng: userLocation.lng + (Math.random() - 0.5) * 0.02,
      },
      heading: Math.random() * 360,
    }));
    setAutos(initialAutos);
  }, []);

  // Simulate auto movement
  useEffect(() => {
    const interval = setInterval(() => {
      setAutos(prevAutos => prevAutos.map(auto => ({
        ...auto,
        position: {
          lat: auto.position.lat + (Math.random() - 0.5) * 0.0002,
          lng: auto.position.lng + (Math.random() - 0.5) * 0.0002,
        },
        heading: auto.heading + (Math.random() - 0.5) * 20,
      })));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const login = (phone) => {
    setIsLoggedIn(true);
    setUser({ phone });
  };

  const logout = () => {
    setIsLoggedIn(false);
    setUser(null);
  };

  const addDemand = useCallback(() => {
    const newDemand = {
      id: `demand-${Date.now()}`,
      position: {
        lat: userLocation.lat + (Math.random() - 0.5) * 0.001,
        lng: userLocation.lng + (Math.random() - 0.5) * 0.001,
      },
      timestamp: Date.now(),
    };
    setDemands(prev => [...prev, newDemand]);
  }, [userLocation]);

  const locateUser = () => {
    setIsLocating(true);
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const coords = { lat: position.coords.latitude, lng: position.coords.longitude };
        setUserLocation(coords);
        setIsLocating(false);
      }, () => {
        setIsLocating(false);
      });
    } else {
      setIsLocating(false);
    }
  };

  return (
    <SimContext.Provider value={{
      viewMode,
      setViewMode,
      userLocation,
      setUserLocation,
      demands,
      autos,
      addDemand,
      locateUser,
      isLocating,
      isLoggedIn,
      login,
      logout,
      user
    }}>
      {children}
    </SimContext.Provider>
  );
};
