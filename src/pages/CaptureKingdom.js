import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { doc, setDoc, getDoc, updateDoc, arrayUnion } from "firebase/firestore";
import { db } from "../firebase/config";

export default function CaptureKingdom() {
  const { user } = useAuth();
  const [showNaming, setShowNaming] = useState(false);
  const [customName, setCustomName] = useState("");
  const navigate = useNavigate();

  const defaultName = `${
    user?.displayName?.split(" ")[0] || "Player"
  }'s Kingdom`;

  const handleCapture = async () => {
    const kingdomName =
      showNaming && customName.trim() ? customName : defaultName;

    const userRef = doc(db, "users", user.uid);
    const snapshot = await getDoc(userRef);

    const newKingdom = {
      name: kingdomName,
      lat: 0, // Placeholder until GPS is integrated
      lng: 0,
      date: new Date().toISOString(),
    };

    try {
      if (!snapshot.exists()) {
        await setDoc(userRef, {
          username: user.displayName,
          email: user.email,
          playerId: Date.now() % 100000, // Simple playerId logic
          souls: 10,
          expLevel: 1,
          capturedKingdoms: [newKingdom],
        });
      } else {
        const userData = snapshot.data();
        const currentSouls = userData.souls || 0;
        const updatedKingdoms = arrayUnion(newKingdom);

        await updateDoc(userRef, {
          souls: currentSouls + 10,
          capturedKingdoms: updatedKingdoms,
        });
      }

      alert(
        `🏰 "${kingdomName}" has been captured and added to your dominion!`
      );
      navigate("/");
    } catch (error) {
      console.error("Error capturing kingdom:", error);
      alert("⚠️ Something went wrong. Try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col justify-center items-center p-6">
      <div className="bg-gray-800 p-6 rounded-lg max-w-md w-full shadow-xl text-center">
        <h2 className="text-2xl font-bold mb-4">🎉 Banner Raised!</h2>
        <p className="mb-4">
          Congratulations! You've conquered a kingdom. Do you want to give it a
          custom name?
        </p>

        <div className="flex flex-col space-y-3 items-center">
          <button
            onClick={() => setShowNaming(true)}
            className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded"
          >
            Yes, Name My Kingdom
          </button>
          <button
            onClick={handleCapture}
            className="bg-green-600 hover:bg-green-700 px-4 py-2 rounded"
          >
            No, Keep Default
          </button>
        </div>

        {showNaming && (
          <div className="mt-6">
            <input
              type="text"
              placeholder="Enter custom kingdom name"
              className="w-full p-2 rounded bg-gray-700 text-white"
              value={customName}
              onChange={(e) => setCustomName(e.target.value)}
            />
            <button
              onClick={handleCapture}
              className="mt-3 bg-purple-600 hover:bg-purple-700 px-4 py-2 rounded w-full"
            >
              Confirm & Capture
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
