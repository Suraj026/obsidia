import React, { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import { Moon, Sun } from "lucide-react";
import avatar from "../assets/avatar.jpg";
import { onSnapshot, doc } from "firebase/firestore";
import { db } from "../firebase/config";

export default function ProfileHeader() {
  const { user } = useAuth();
  const [darkMode, setDarkMode] = useState(() => {
    if (localStorage.getItem("theme")) {
      return localStorage.getItem("theme") === "dark";
    }
    return window.matchMedia("(prefers-color-scheme: dark)").matches;
  });

  const [profileData, setProfileData] = useState({
    souls: 100,
    obsidian: 2,
    exp: 1,
    playerId: "000",
    streak: 0,
  });

  useEffect(() => {
    if (user?.uid) {
      const unsub = onSnapshot(doc(db, "users", user.uid), (docSnap) => {
        if (docSnap.exists()) {
          setProfileData((prev) => ({
            ...prev,
            ...docSnap.data(),
          }));
        }
      });
      return () => unsub();
    }
  }, [user]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  const toggleTheme = () => {
    const newTheme = darkMode ? "light" : "dark";
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle("dark", newTheme === "dark");
    localStorage.setItem("theme", newTheme);
  };

  return (
    <div className="bg-gray-100 dark:bg-gray-900 rounded-xl p-4 shadow-lg text-black dark:text-white max-w-xs">
      <div className="flex items-center space-x-4">
        <img
          src={avatar}
          alt="avatar"
          className="w-14 h-14 rounded-full border-2 border-blue-500"
        />
        <div>
          <h2 className="text-lg font-semibold">
            {user?.displayName || "Unknown Hero"}
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Sigil Mark: #{profileData.playerId}
          </p>
        </div>
        <button onClick={toggleTheme} className="ml-auto p-2">
          {darkMode ? (
            <Sun className="w-5 h-5 text-yellow-400" />
          ) : (
            <Moon className="w-5 h-5 text-gray-800" />
          )}
        </button>
      </div>

      <div className="mt-4 space-y-2 text-sm">
        <div>
          🔥 Ascension Rank: <strong>{profileData.exp}</strong>
        </div>
        <div>
          💎 Echoflame Shards: <strong>{profileData.souls}</strong>
        </div>
        <div>
          🧱 Voidglass: <strong>{profileData.obsidian}</strong>
        </div>
        <div>
          🔥 Streak: <strong>{profileData.streak} days</strong>
        </div>
      </div>
    </div>
  );
}
