// src/pages/BrainTeaser.js
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function BrainTeaser() {
  const [answer, setAnswer] = useState("");
  const [solved, setSolved] = useState(false);
  const navigate = useNavigate();

  const correctAnswer = "42";

  const handleSubmit = () => {
    if (answer.trim() === correctAnswer) {
      setSolved(true);
      alert("🎉 Kingdom Captured!");
      navigate("/dashboard");
    } else {
      alert("❌ Incorrect! Try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col items-center justify-center px-6">
      <h1 className="text-xl font-bold mb-4">🧠 Final Teaser</h1>
      <p className="mb-4">
        What is the answer to life, universe and everything?
      </p>
      <input
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
        className="p-2 text-black rounded mb-4"
        placeholder="Your Answer"
      />
      <button
        onClick={handleSubmit}
        className="bg-purple-600 px-4 py-2 rounded"
      >
        Submit
      </button>
    </div>
  );
}
