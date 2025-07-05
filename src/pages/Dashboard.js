import React from "react";
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

export default function Dashboard() {
  return (
    <div className="relative bg-white dark:bg-black text-black dark:text-white min-h-screen overflow-y-auto transition-colors duration-300">
      {/* 🌍 3D Earth Background */}
      <EarthBackground />

      <div className="flex flex-col space-y-6 px-4 pt-6">
        {/* 🔝 Top Row: Profile, Leaderboard, User Info */}
        <div className="flex justify-between items-start gap-4 flex-wrap">
          <ProfileHeader />
          <Leaderboard />
          <ProfilePanel />
        </div>

        {/* 🗣️ Row 2: News */}
        <div className="flex justify-start gap-6 pt-4">
          <NewsChatPanel />
        </div>

        {/* Spacer */}
        <div className="h-12" />

        {/* 🏰 Row 3: Realmwatch, Map, Arena - spaced lower */}
        <div className="flex justify-between gap-6 pt-12 flex-wrap">
          <NearbyKingdoms />
          <MapPanel />
          <BiddingArena />
        </div>

        {/* 🛒 Scrollable Shop Section */}
        <div className="mt-16 w-full overflow-x-auto pb-10">
          <Shop />
        </div>
      </div>

      {/* 🧙‍♂️ Story Mode Avatar */}
      <StoryAvatar />
    </div>
  );
}
