import React, { useEffect, useState } from "react";

export default function StoryAvatar() {
  const [hasSpoken, setHasSpoken] = useState(false);

  useEffect(() => {
    const firstVisit = localStorage.getItem("first_visit_done");

    if (!firstVisit && !hasSpoken) {
      const speakText = `Welcome to Capture Kingdom! I'm your guide. Let's start by capturing your first kingdom.`;
      const utterance = new SpeechSynthesisUtterance(speakText);
      speechSynthesis.speak(utterance);

      localStorage.setItem("first_visit_done", "true");
      setHasSpoken(true);
    }
  }, [hasSpoken]);

  return (
    <div className="fixed bottom-4 left-4 z-50">
      <div className="flex items-center space-x-2 bg-yellow-200 p-3 rounded shadow-md">
        <span role="img" aria-label="avatar" className="text-3xl">
          🤴
        </span>
        <p className="text-sm font-medium">Welcome, adventurer!</p>
      </div>
    </div>
  );
}
