import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import "leaflet/dist/leaflet.css?inline";
import L from "leaflet";
import { useNavigate } from "react-router-dom";
import "../utils/fixLeafletIcons"; // Fix default marker icons

export default function MapView() {
  const navigate = useNavigate();
  const [userPos, setUserPos] = useState(null);
  const [distance, setDistance] = useState(null);

  const target = JSON.parse(localStorage.getItem("kingdomTarget"));

  const getDistance = (lat1, lon1, lat2, lon2) => {
    const R = 6371e3;
    const toRad = (deg) => (deg * Math.PI) / 180;
    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);
    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) * Math.sin(dLon / 2) ** 2;
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  useEffect(() => {
    if (!target) {
      alert("No kingdom location found. Solve a maze first!");
      navigate("/maze");
      return;
    }

    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        setUserPos([latitude, longitude]);

        const dist = getDistance(latitude, longitude, target.lat, target.lng);
        setDistance(dist);

        if (dist <= 25) {
          navigator.geolocation.clearWatch(watchId);
          navigate("/teaser");
        }
      },
      () => alert("Please allow location access to proceed."),
      { enableHighAccuracy: true }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, [navigate, target]);

  if (!userPos || !target) return <div className="p-4">📡 Locating...</div>;

  return (
    <div className="h-screen w-full">
      <MapContainer
        center={userPos}
        zoom={17}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* User Marker */}
        <Marker position={userPos}>
          <Popup>
            📍 You are here!
            <br />
            Distance to target: {Math.round(distance)}m
          </Popup>
        </Marker>

        {/* Target Marker */}
        <Marker position={[target.lat, target.lng]}>
          <Popup>🎯 Kingdom Location</Popup>
        </Marker>

        {/* 25m radius circle */}
        <Circle
          center={[target.lat, target.lng]}
          radius={25}
          pathOptions={{ color: "green", fillColor: "green", fillOpacity: 0.3 }}
        />
      </MapContainer>
    </div>
  );
}
