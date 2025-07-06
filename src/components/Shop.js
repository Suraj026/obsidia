import React, { useState } from "react";

const shopItems = [
  {
    title: "🧙 Veil of Shadows",
    description: "Hide your kingdom",
  },
  {
    title: "📈 Crown of Surge",
    description: "Boost kingdom level",
  },
  {
    title: "🌀 Soul Leech Sigil",
    description: "Drain souls from invaders",
  },
  {
    title: "⏳ Hourglass of Confusion",
    description: "Reduce teaser time",
  },
  {
    title: "➕ Wyrm's Whisper",
    description: "Add teaser options",
  },
  {
    title: "🧠 Oracle's Hint",
    description: "Reveal teaser clues",
  },
  {
    title: "⚔️ Blade of Truth",
    description: "Auto-solve teaser once",
  },
  {
    title: "🛡️ Mystic Ward",
    description: "Block ghost traps",
  },
];

export default function Shop() {
  const [soulCount] = useState(500); // You can wire this to Firebase later
  const [obsidianCount, setObsidianCount] = useState(50);

  const handleBuy = (itemName) => {
    if (obsidianCount >= 10) {
      setObsidianCount((prev) => prev - 10);
      alert(`✅ Purchased ${itemName}`);
    } else {
      alert("❌ Insufficient Obsidian!");
    }
  };

  return (
    <div className="flex flex-wrap gap-6 bg-[#0e0e1a] dark:bg-[#0e0e1a] text-white p-6 rounded-xl shadow-2xl">
      {/* Sidebar */}
      <div className="min-w-[180px] flex flex-col gap-2 p-2">
        <h3 className="text-2xl font-bold mb-2 text-white">🛒 Arcane Bazaar</h3>
        <div className="text-md text-blue-300">
          💎 Souls: <span className="font-bold text-white">{soulCount}</span>
        </div>
        <div className="text-md text-orange-300">
          🧱 Obsidian:{" "}
          <span className="font-bold text-white">{obsidianCount}</span>
        </div>
      </div>

      {/* Shop Items Grid */}
      <div className="flex-grow grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {shopItems.map((item, index) => (
          <div
            key={index}
            className="bg-[#141826] dark:bg-[#141826] border border-purple-700 hover:shadow-purple-700 hover:scale-105 transition-all duration-300 rounded-xl p-4 shadow-md"
          >
            <h4 className="text-lg font-bold text-purple-300 mb-1">
              {item.title}
            </h4>
            <p className="text-sm text-gray-300">{item.description}</p>
            <button
              onClick={() => handleBuy(item.title)}
              className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-1 mt-4 rounded shadow-lg transition"
            >
              Buy for 10 🧱
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
