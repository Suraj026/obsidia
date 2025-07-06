import React, { useEffect, useState } from "react";

export default function StoryAvatar() {
  const [hasSpoken, setHasSpoken] = useState(false);
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const firstVisit = localStorage.getItem("first_visit_done");
    const closedAvatar = localStorage.getItem("story_avatar_closed");

    if (closedAvatar === "true") {
      setVisible(false);
      return;
    }

    if (!firstVisit && !hasSpoken) {
      const speakText = `Welcome to OBSIDIA, brave adventurer! 
Your mission is to explore mystical kingdoms around your real-world location. 
Here's how it works:

First, locate nearby kingdoms using the Realmwatch Ledger. 
Some kingdoms may be ghosted, so choose wisely.

When you select a kingdom, you must solve an ancient maze. 
Only the worthy can complete it.

After the maze, journey to the kingdom's real-world location.
If you're close enough, a brain teaser will appear.

Answer it correctly to capture the kingdom and earn souls.

Use your souls to bid in the Arena or trade in the Arcane Bazaar.
The higher your level, the more powerful your rule becomes.

Now go forth, conquer, and become the legend of OBSIDIA!`;
      const utterance = new SpeechSynthesisUtterance(speakText);
      speechSynthesis.speak(utterance);

      localStorage.setItem("first_visit_done", "true");
      setHasSpoken(true);
    }
  }, [hasSpoken]);

  const handleClose = () => {
    setVisible(false);
    localStorage.setItem("story_avatar_closed", "true");
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <div className="relative flex items-center space-x-2 bg-yellow-200 p-3 rounded shadow-md">
        {/* ❌ Close Button */}
        <button
          onClick={handleClose}
          className="absolute -top-2 -right-2 bg-red-600 text-white rounded-full w-5 h-5 text-xs flex items-center justify-center shadow"
          title="Close"
        >
          ×
        </button>

        {/* Avatar and Text */}
        <span role="img" aria-label="avatar" className="text-3xl">
          🤴
        </span>
        <p className="text-sm font-medium">Welcome, adventurer!</p>
      </div>
    </div>
  );
}
