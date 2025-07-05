import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase/config";

export default function ProfilePanel() {
  const { user } = useAuth();
  const [userData, setUserData] = useState(null);
  const [darkMode, setDarkMode] = useState(() => {
    return localStorage.getItem("theme") === "dark";
  });

  useEffect(() => {
    if (user) {
      const fetchData = async () => {
        const ref = doc(db, "users", user.uid);
        const snap = await getDoc(ref);
        if (snap.exists()) {
          setUserData(snap.data());
        }
      };
      fetchData();
    }
  }, [user]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
    localStorage.setItem("theme", darkMode ? "dark" : "light");
  }, [darkMode]);

  if (!userData) return null;

  return (
    <div className="bg-gray-900 text-white p-4 rounded-xl w-72 shadow-md">
      <div className="flex items-center space-x-4 mb-4">
        <div className="h-14 w-14 rounded-full bg-gray-700 flex items-center justify-center text-2xl">
          🏳️
        </div>
        <div>
          <div className="text-xl font-bold">{userData.displayName}</div>
          <div className="text-sm text-gray-400">
            Sigil Mark: #{userData.playerId}
          </div>
        </div>
      </div>

      <div className="text-sm space-y-2">
        <div>
          <span className="font-semibold">Ascension Rank:</span> {userData.exp}
        </div>
        <div>
          <span className="font-semibold">Captured:</span> {userData.captured} /{" "}
          {userData.exp}
        </div>
        <div>
          <span className="font-semibold">Echoflame Shards:</span>{" "}
          {userData.souls} 🔮
        </div>
        <div>
          <span className="font-semibold">Voidglass:</span> {userData.obsidian}{" "}
          🧿
        </div>
        <div>
          <span className="font-semibold">Flame of Resolve:</span>{" "}
          {userData.streak?.current || 0} 🔥 (Max:{" "}
          {userData.streak?.longest || 0})
        </div>
      </div>

      <button
        className="mt-4 w-full py-2 bg-blue-600 rounded hover:bg-blue-700"
        onClick={() => setDarkMode((prev) => !prev)}
      >
        Toggle {darkMode ? "Light" : "Dark"} Mode
      </button>
    </div>
  );
}
