import React from "react";

export default function Shop() {
  const soulCount = 500;
  const obsidianCount = Math.floor(soulCount / 100);

  const items = [
    { name: "🕵️ Veil of Shadows", desc: "Hide your kingdom", cost: 10 },
    { name: "📈 Crown of Surge", desc: "Boost kingdom level", cost: 10 },
    {
      name: "🪤 Soul Leech Sigil",
      desc: "Drain souls from invaders",
      cost: 10,
    },
    { name: "⌛ Hourglass of Confusion", desc: "Reduce teaser time", cost: 10 },
    { name: "➕ Wyrm's Whisper", desc: "Add teaser options", cost: 10 },
    { name: "❌ Seal of Stillness", desc: "Disable refresh", cost: 10 },
    {
      name: "💥 Phantom Pathstone",
      desc: "Misdirect to ghost kingdoms",
      cost: 10,
    },
    { name: "🔥 Phoenix Emblem", desc: "Recover lost kingdom", cost: 10 },
  ];

  return (
    <div className="bg-white dark:bg-gray-800 text-black dark:text-white p-4 rounded-xl flex justify-between overflow-x-auto space-x-4 shadow-inner transition-colors duration-300">
      <div>
        <h3 className="text-lg font-bold mb-2">🛒 Arcane Bazaar</h3>
        <p>
          💎 Souls: <strong>{soulCount}</strong> | 🧱 Obsidian:{" "}
          <strong>{obsidianCount}</strong>
        </p>
      </div>

      {items.map((item, idx) => (
        <div
          key={idx}
          className="bg-gray-100 dark:bg-gray-900 border dark:border-purple-600 border-purple-300 rounded-lg p-3 w-56 flex-shrink-0 transition-colors duration-300"
        >
          <h4 className="font-bold text-purple-700 dark:text-purple-300">
            {item.name}
          </h4>
          <p className="text-xs text-gray-700 dark:text-gray-300">
            {item.desc}
          </p>
          <button className="mt-2 bg-purple-600 hover:bg-purple-700 dark:bg-purple-700 dark:hover:bg-purple-800 text-white px-3 py-1 rounded text-sm">
            Buy for {item.cost} 🧱
          </button>
        </div>
      ))}
    </div>
  );
}
