import React, { useEffect, useRef, useState } from "react";

const dummyData = {
  global: [
    { username: "ShadowRider", level: 10, captures: 45 },
    { username: "LunaBlaze", level: 9, captures: 41 },
    { username: "StormKing", level: 8, captures: 39 },
    { username: "EchoWolf", level: 8, captures: 35 },
    { username: "NovaFang", level: 7, captures: 32 },
    { username: "DarkFlame", level: 6, captures: 30 },
    { username: "SkyGuard", level: 6, captures: 28 },
    { username: "IronVine", level: 5, captures: 25 },
    { username: "FrostHorn", level: 5, captures: 23 },
    { username: "StarClash", level: 4, captures: 21 },
  ],
  local: [
    { username: "MysticSeer", level: 7, captures: 30 },
    { username: "OblivionOne", level: 6, captures: 27 },
    { username: "WindCaller", level: 6, captures: 26 },
    { username: "RuneWarden", level: 5, captures: 24 },
    { username: "TerraKnight", level: 5, captures: 22 },
    { username: "FlareNova", level: 4, captures: 20 },
    { username: "GhostHunter", level: 4, captures: 19 },
    { username: "DuskDagger", level: 3, captures: 18 },
    { username: "CrystalFury", level: 3, captures: 17 },
    { username: "EmberClaw", level: 2, captures: 15 },
  ],
};

export default function Leaderboard() {
  const [activeTab, setActiveTab] = useState("global");
  const scrollRef = useRef(null);
  const scrollDirection = useRef(1);

  useEffect(() => {
    const interval = setInterval(() => {
      const el = scrollRef.current;
      if (!el) return;

      if (el.scrollTop + el.clientHeight >= el.scrollHeight) {
        scrollDirection.current = -1;
      } else if (el.scrollTop <= 0) {
        scrollDirection.current = 1;
      }

      el.scrollTop += scrollDirection.current * 1;
    }, 30);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="w-full h-full max-w-full overflow-hidden bg-white dark:bg-black border border-indigo-400 dark:border-indigo-600 rounded-xl shadow-lg p-4 text-black dark:text-white neon-glow">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">🏆 Leaderboard</h2>
        <div className="space-x-2">
          <button
            onClick={() => setActiveTab("global")}
            className={`px-3 py-1 rounded ${
              activeTab === "global"
                ? "bg-indigo-600 text-white"
                : "bg-gray-200 dark:bg-gray-800"
            }`}
          >
            Global
          </button>
          <button
            onClick={() => setActiveTab("local")}
            className={`px-3 py-1 rounded ${
              activeTab === "local"
                ? "bg-indigo-600 text-white"
                : "bg-gray-200 dark:bg-gray-800"
            }`}
          >
            Local
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="h-40 overflow-hidden relative scroll-smooth overflow-y-auto"
      >
        <ul className="space-y-2">
          {dummyData[activeTab].map((user, i) => (
            <li
              key={i}
              className="flex justify-between items-center bg-gray-100 dark:bg-gray-900 px-3 py-2 rounded hover:bg-indigo-100 dark:hover:bg-indigo-800 transition text-sm truncate"
            >
              <span className="font-medium truncate w-1/2">
                {user.username}
              </span>
              <span className="text-indigo-600 dark:text-indigo-400 text-xs w-1/2 text-right">
                Lv {user.level} | 👑 {user.captures}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
