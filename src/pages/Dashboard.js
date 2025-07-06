import React, { useEffect, useState } from "react";
import ProfileHeader from "../components/ProfileHeader";
import NewsChatPanel from "../components/NewsChatPanel";
import Leaderboard from "../components/Leaderboard";
import EarthBackground from "../components/EarthBackground";
import MapPanel from "../components/MapPanel";
import NearbyKingdoms from "../components/NearbyKingdoms";
import BiddingArena from "../components/BiddingArena";
import Shop from "../components/Shop";
import ProfilePanel from "../components/Dashboard/ProfilePanel";
import StoryAvatar from "../components/StoryAvatar";
import StarryBackground from "../components/StarryBackground";

export default function Dashboard() {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const theme = localStorage.getItem("theme");
    setIsDark(theme === "dark");
  }, []);

  return (
    <div className="relative min-h-screen bg-white dark:bg-black text-black dark:text-neonGreen transition-colors duration-300 overflow-hidden font-[MedievalSharp]">
      {/* 🌌 Render starry background only in dark mode */}
      {isDark && <StarryBackground />}

      {/* 🌍 3D Earth background */}
      <EarthBackground />

      {/* 🧙 Story guide avatar */}
      <StoryAvatar />

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 py-6 space-y-10">
        {/* 🔝 Top row: Profile + Leaderboard + Stats */}
        <div className="flex flex-wrap items-start gap-4 w-full">
          <div className="w-full md:w-auto flex-none shadow-lg hover:scale-105 transition-transform duration-300">
            <ProfileHeader />
          </div>

          <div className="flex-grow shadow-lg hover:scale-105 transition-transform duration-300">
            <div className="w-full h-[200px]">
              <Leaderboard />
            </div>
          </div>

          <div className="w-full md:w-auto flex-none shadow-lg hover:scale-105 transition-transform duration-300">
            <ProfilePanel />
          </div>
        </div>

        {/* 🗞️ News feed & chat */}
        <div className="w-full shadow-lg hover:scale-105 transition-transform duration-300">
          <NewsChatPanel />
        </div>

        {/* 🏰 Nearby, Map, Bidding */}
        <div className="flex flex-wrap justify-between gap-6">
          <div className="flex-1 min-w-[300px] shadow-lg hover:scale-105 transition-transform duration-300">
            <NearbyKingdoms />
          </div>

          <div className="flex-1 min-w-[300px] shadow-lg hover:scale-105 transition-transform duration-300">
            <MapPanel />
          </div>

          <div className="flex-1 min-w-[300px] shadow-lg hover:scale-105 transition-transform duration-300">
            <BiddingArena />
          </div>
        </div>

        {/* 🛒 Shop Section */}
        <div className="w-full shadow-lg hover:scale-105 transition-transform duration-300">
          <Shop />
        </div>
      </div>
    </div>
  );
}
