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
      const speakText = `Welcome to Capture Kingdom! I'm your guide. Let's start by capturing your first kingdom.`;
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
