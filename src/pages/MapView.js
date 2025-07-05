import React from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "../utils/fixLeafletIcons"; // Fixes missing marker icons

export default function MapView() {
  const center = [28.6139, 77.209]; // New Delhi coordinates

  return (
    <div className="h-screen w-full">
      <MapContainer
        center={center}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={center}>
          <Popup>
            You are here! <br /> Welcome to Obsidia Map.
          </Popup>
        </Marker>
      </MapContainer>
    </div>
  );
}
