import React, { useEffect, useState } from "react";
import {
  collection,
  query,
  orderBy,
  limit,
  getDocs,
  where,
} from "firebase/firestore";
import { db } from "../firebase/config";

const FILTERS = [
  { label: "Souls", key: "souls" },
  { label: "EXP", key: "exp" },
  { label: "Kingdoms", key: "kingdomsCaptured" },
];

export default function Leaderboard() {
  const [players, setPlayers] = useState([]);
  const [filter, setFilter] = useState("souls");
  const [region, setRegion] = useState("global");

  useEffect(() => {
    fetchLeaderboard();
  }, [filter, region]);

  const fetchLeaderboard = async () => {
    let q = query(collection(db, "users"), orderBy(filter, "desc"), limit(10));

    if (region === "local") {
      const userCountry = "India"; // Stubbed: replace with geoIP logic
      q = query(
        collection(db, "users"),
        where("country", "==", userCountry),
        orderBy(filter, "desc"),
        limit(10)
      );
    }

    const snapshot = await getDocs(q);
    setPlayers(snapshot.docs.map((doc) => doc.data()));
  };

  return (
    <div className="bg-white dark:bg-gray-900 text-black dark:text-white rounded-xl p-4 max-w-lg mx-auto shadow-md transition-colors duration-300">
      <div className="flex justify-between items-center mb-2">
        <h2 className="text-lg font-bold">🏆 Hall of Legends</h2>
        {/* Toggle removed here */}
      </div>

      <div className="flex justify-between items-center mb-2">
        <div className="flex space-x-2">
          <button
            onClick={() => setRegion("global")}
            className={`px-2 py-1 rounded ${
              region === "global"
                ? "bg-blue-500 text-white"
                : "bg-gray-300 dark:bg-gray-700"
            }`}
          >
            Global
          </button>
          <button
            onClick={() => setRegion("local")}
            className={`px-2 py-1 rounded ${
              region === "local"
                ? "bg-blue-500 text-white"
                : "bg-gray-300 dark:bg-gray-700"
            }`}
          >
            Local
          </button>
        </div>

        <div>
          <label className="mr-2 text-sm">Filter by:</label>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="bg-gray-200 dark:bg-gray-800 text-black dark:text-white p-1 rounded text-sm"
          >
            {FILTERS.map((f) => (
              <option key={f.key} value={f.key}>
                {f.label}
              </option>
            ))}
          </select>
        </div>
      </div>

      <ul className="space-y-2">
        {players.map((player, i) => (
          <li
            key={player.playerId || i}
            className="bg-gray-100 dark:bg-gray-800 p-2 rounded flex justify-between"
          >
            <span>
              #{i + 1} {player.displayName || "Unknown"}
            </span>
            <span>
              {filter === "souls"
                ? `${player.souls} 🔮`
                : filter === "exp"
                ? `Lv. ${player.exp}`
                : `${player.kingdomsCaptured} 🏯`}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}
