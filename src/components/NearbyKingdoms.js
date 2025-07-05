import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Utility to generate random coordinates within ~500m radius
const generateNearbyCoords = (lat, lng, count = 5) => {
  const points = [];
  const radiusInMeters = 500;

  for (let i = 0; i < count; i++) {
    const r = radiusInMeters / 111300; // 1 degree ≈ 111.3 km
    const u = Math.random();
    const v = Math.random();
    const w = r * Math.sqrt(u);
    const t = 2 * Math.PI * v;
    const dx = w * Math.cos(t);
    const dy = w * Math.sin(t);

    const newLat = lat + dx;
    const newLng = lng + dy;
    points.push({ id: i + 1, lat: newLat, lng: newLng });
  }

  return points;
};

export default function NearbyKingdoms() {
  const [kingdoms, setKingdoms] = useState([]);
  const [ghostIds, setGhostIds] = useState([]);
  const [userLevel] = useState(3); // Placeholder for current user level
  const navigate = useNavigate();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const newKingdoms = generateNearbyCoords(latitude, longitude);
        setKingdoms(newKingdoms);

        // Randomly pick 2 ghost kingdom IDs
        const shuffled = newKingdoms
          .map((k) => k.id)
          .sort(() => 0.5 - Math.random());
        setGhostIds(shuffled.slice(0, 2));
      },
      () => {
        alert("📍 Please enable location to find nearby kingdoms.");
      }
    );
  }, []);

  const handleSelect = (kingdom) => {
    if (ghostIds.includes(kingdom.id)) {
      alert("👻 Boo! You have been GHOSTED!");
    } else {
      navigate("/maze"); // 🚀 Redirect to maze
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 text-black dark:text-white p-4 rounded-xl max-h-[400px] overflow-y-auto shadow-lg transition-colors duration-300">
      <h2 className="text-lg font-bold mb-4">🏯 Realmwatch Ledger</h2>
      <ul className="space-y-2">
        {kingdoms.map((kingdom) => (
          <li
            key={kingdom.id}
            className="bg-gray-200 dark:bg-gray-800 hover:bg-gray-300 dark:hover:bg-gray-700 text-black dark:text-white p-3 rounded-lg cursor-pointer flex justify-between items-center transition"
            onClick={() => handleSelect(kingdom)}
          >
            <div>
              <div className="font-bold text-lg">XXXX</div>
              <div className="text-xs text-gray-600 dark:text-gray-400">
                Level {Math.floor(Math.random() * (userLevel + 1))}
              </div>
            </div>
            <div className="text-sm">🗺️ Explore</div>
          </li>
        ))}
      </ul>
    </div>
  );
}
