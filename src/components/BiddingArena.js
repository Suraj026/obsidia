import React, { useState } from "react";

// Mock user
const currentUser = {
  username: "PlayerX",
  souls: 800, // You can make this dynamic later
};

// Initial kingdom data
const initialKingdoms = [
  {
    name: "Mystvale",
    level: 3,
    owner: "Player1",
    price: 300,
    bidder: "Player1",
  },
  {
    name: "Oblivion Keep",
    level: 5,
    owner: "Player7",
    price: 500,
    bidder: "Player7",
  },
  {
    name: "Echoforge",
    level: 2,
    owner: "Player2",
    price: 200,
    bidder: "Player2",
  },
];

export default function BiddingArena() {
  const [kingdoms, setKingdoms] = useState(initialKingdoms);
  const [selectedKingdomIndex, setSelectedKingdomIndex] = useState(null);
  const [bidAmount, setBidAmount] = useState(0);

  const openBidDialog = (index) => {
    setSelectedKingdomIndex(index);
    setBidAmount(kingdoms[index].price + 1);
  };

  const placeBid = () => {
    if (bidAmount > kingdoms[selectedKingdomIndex].price) {
      const updated = [...kingdoms];
      updated[selectedKingdomIndex].price = bidAmount;
      updated[selectedKingdomIndex].bidder = currentUser.username;
      setKingdoms(updated);
      closeDialog();
    } else {
      alert("Your bid must be higher than the current bid.");
    }
  };

  const closeDialog = () => {
    setSelectedKingdomIndex(null);
    setBidAmount(0);
  };

  return (
    <div className="bg-white dark:bg-gray-800 text-black dark:text-white p-4 rounded-xl h-full overflow-y-auto shadow-lg transition-colors duration-300 relative">
      <h3 className="text-lg font-bold mb-4">🏰 Arena of Accord</h3>

      <ul className="space-y-3">
        {kingdoms.map((k, idx) => (
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
            <div className="text-sm text-yellow-600 dark:text-yellow-300">
              💰 Highest Bid: {k.price} 🧿 by {k.bidder}
            </div>
            <button
              className="mt-2 bg-indigo-600 hover:bg-indigo-700 px-3 py-1 rounded text-sm text-white"
              onClick={() => openBidDialog(idx)}
            >
              Place Bid
            </button>
          </li>
        ))}
      </ul>

      {/* Dialog */}
      {selectedKingdomIndex !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-white dark:bg-gray-900 p-6 rounded-lg shadow-2xl w-96 max-w-full text-center space-y-4">
            <h2 className="text-xl font-bold mb-2">Place Your Bid</h2>
            <p className="text-sm text-gray-700 dark:text-gray-300">
              Bidding for:{" "}
              <span className="font-semibold text-indigo-600">
                {kingdoms[selectedKingdomIndex].name}
              </span>
            </p>
            <input
              type="range"
              min={kingdoms[selectedKingdomIndex].price + 1}
              max={currentUser.souls}
              value={bidAmount}
              onChange={(e) => setBidAmount(Number(e.target.value))}
              className="w-full accent-indigo-600"
            />
            <div className="text-sm">
              🧿 Bid Amount:{" "}
              <span className="font-semibold text-indigo-700">{bidAmount}</span>
            </div>

            <div className="flex justify-center gap-4 mt-4">
              <button
                onClick={placeBid}
                className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
              >
                Place Bid
              </button>
              <button
                onClick={closeDialog}
                className="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
