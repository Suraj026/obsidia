import React from "react";

const mockKingdoms = [
  { name: "Mystvale", level: 3, owner: "Player1", price: 300 },
  { name: "Oblivion Keep", level: 5, owner: "Player7", price: 500 },
  { name: "Echoforge", level: 2, owner: "Player2", price: 200 },
];

export default function BiddingArena() {
  return (
    <div className="bg-white dark:bg-gray-800 text-black dark:text-white p-4 rounded-xl h-full overflow-y-auto shadow-lg transition-colors duration-300">
      <h3 className="text-lg font-bold mb-4">🏰 Arena of Accord</h3>
      <ul className="space-y-3">
        {mockKingdoms.map((k, idx) => (
          <li
            key={idx}
            className="bg-gray-100 dark:bg-gray-900 p-3 rounded border border-indigo-400 dark:border-indigo-500 transition"
          >
            <div className="font-semibold text-indigo-600 dark:text-indigo-400">
              {k.name}
            </div>
            <div className="text-sm text-gray-700 dark:text-gray-300">
              Level: {k.level} | Owner: {k.owner}
            </div>
            <div className="text-sm text-yellow-600 dark:text-yellow-300 mb-2">
              💰 Starting Bid: {k.price} 🧿
            </div>
            <button className="bg-indigo-600 hover:bg-indigo-700 px-3 py-1 rounded text-sm text-white">
              Place Bid
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
