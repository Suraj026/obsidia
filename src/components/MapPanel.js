import React, { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";

// Custom icons
const blueIcon = new L.Icon({
  iconUrl:
    "https://chart.googleapis.com/chart?chst=d_map_pin_icon&chld=flag|00f",
  iconSize: [30, 50],
  iconAnchor: [15, 50],
});

const redIcon = new L.Icon({
  iconUrl:
    "https://chart.googleapis.com/chart?chst=d_map_pin_icon&chld=flag|f00",
  iconSize: [30, 50],
  iconAnchor: [15, 50],
});

export default function MapPanel() {
  const [userPos, setUserPos] = useState(null);
  const [capturedKingdoms, setCapturedKingdoms] = useState([]);
  const [unlockedKingdoms, setUnlockedKingdoms] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = [pos.coords.latitude, pos.coords.longitude];
        setUserPos(coords);

        // 💡 Stubbed captured locations
        setCapturedKingdoms([
          [coords[0] + 0.001, coords[1] + 0.001],
          [coords[0] - 0.001, coords[1] - 0.001],
        ]);

        // 💡 Stubbed unlocked location (after solving maze)
        setUnlockedKingdoms([[coords[0] + 0.002, coords[1] - 0.0015]]);
      },
      (err) => {
        alert("Location access required for map features.");
      }
    );
  }, []);

  return (
    <div className="h-[500px] w-full rounded-xl overflow-hidden shadow-md">
      {userPos && (
        <MapContainer
          center={userPos}
          zoom={16}
          style={{ height: "100%", width: "100%" }}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="© OpenStreetMap"
          />

          {/* User marker */}
          <Marker position={userPos}>
            <Popup>You are here</Popup>
          </Marker>

          {/* Captured kingdoms - blue flags */}
          {capturedKingdoms.map((pos, i) => (
            <Marker key={i} position={pos} icon={blueIcon}>
              <Popup>🏯 Captured Kingdom #{i + 1}</Popup>
            </Marker>
          ))}

          {/* New target kingdoms - red flags */}
          {unlockedKingdoms.map((pos, i) => (
            <Marker key={i} position={pos} icon={redIcon}>
              <Popup>⚔️ Marked Kingdom - Solve to Capture</Popup>
            </Marker>
          ))}
        </MapContainer>
      )}
    </div>
  );
}
