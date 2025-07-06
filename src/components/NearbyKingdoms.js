import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Local image paths from public folder
const imagePaths = [
  "/images/kingdoms/kingdom1.jpeg",
  "/images/kingdoms/kingdom2.jpeg",
  "/images/kingdoms/kingdom3.jpeg",
  "/images/kingdoms/kingdom4.jpeg",
  "/images/kingdoms/kingdom5.jpeg",
];

// Generate nearby coordinates (~500m radius)
const generateNearbyCoords = (lat, lng, count = 5) => {
  const points = [];
  const radiusInMeters = 500;

  for (let i = 0; i < count; i++) {
    const r = radiusInMeters / 111300;
    const u = Math.random();
    const v = Math.random();
    const w = r * Math.sqrt(u);
    const t = 2 * Math.PI * v;
    const dx = w * Math.cos(t);
    const dy = w * Math.sin(t);

    const newLat = lat + dx;
    const newLng = lng + dy;

    points.push({
      id: i + 1,
      lat: newLat,
      lng: newLng,
      level: Math.floor(Math.random() * 4) + 1,
      image: imagePaths[i % imagePaths.length], // rotate through local images
    });
  }

  return points;
};

export default function NearbyKingdoms() {
  const [kingdoms, setKingdoms] = useState([]);
  const [ghostIds, setGhostIds] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const generated = generateNearbyCoords(latitude, longitude);
        setKingdoms(generated);

        const shuffled = [...generated]
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
      navigate("/maze");
    }
  };

  return (
    <div className="bg-white dark:bg-gray-900 text-black dark:text-white p-4 rounded-xl max-h-[500px] overflow-y-auto shadow-lg transition-colors duration-300">
      <h2 className="text-lg font-bold mb-4">🏯 Realmwatch Ledger</h2>
      <ul className="space-y-4">
        {kingdoms.map((kingdom) => (
          <li
            key={kingdom.id}
            onClick={() => handleSelect(kingdom)}
            className="cursor-pointer rounded-lg shadow-md hover:shadow-xl transition duration-300 overflow-hidden border border-indigo-500 dark:border-indigo-700"
          >
            <div className="relative h-32 w-full">
              <img
                src={kingdom.image}
                alt="kingdom"
                className="w-full h-full object-cover"
              />
              {ghostIds.includes(kingdom.id) && (
                <div className="absolute inset-0 bg-black bg-opacity-0 flex items-center justify-center text-white font-bold text-lg"></div>
              )}
            </div>

            <div className="p-3 bg-gray-100 dark:bg-gray-800">
              <div className="font-semibold text-indigo-700 dark:text-indigo-300">
                {ghostIds.includes(kingdom.id) ? "XXXXXXXXXX" : "XXXXXXXXXX"}
              </div>
              <div className="text-sm text-gray-600 dark:text-gray-300">
                Level: {kingdom.level}
              </div>
              <div className="mt-1 text-sm text-right text-blue-600 dark:text-blue-300">
                🗺️ {ghostIds.includes(kingdom.id) ? "Explore" : "Explore"}
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
