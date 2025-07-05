// src/components/Maze.js
import React, { useEffect, useState } from "react";

const ROWS = 10;
const COLS = 10;

// Maze generator with guaranteed start and end
function generateMaze(rows = ROWS, cols = COLS) {
  const maze = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => (Math.random() < 0.25 ? 1 : 0))
  );
  maze[0][0] = 0;
  maze[rows - 1][cols - 1] = 0;
  return maze;
}

export default function Maze() {
  const [maze, setMaze] = useState(generateMaze());
  const [playerPos, setPlayerPos] = useState({ row: 0, col: 0 });
  const [path, setPath] = useState([{ row: 0, col: 0 }]);
  const [timer, setTimer] = useState(60);
  const [gameOver, setGameOver] = useState(false);

  // Handle arrow keys
  useEffect(() => {
    const handleKey = (e) => {
      if (gameOver) return;
      if (["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
        e.preventDefault();
        move(e.key.replace("Arrow", "").toLowerCase());
      }
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [playerPos, gameOver]);

  // Timer countdown
  useEffect(() => {
    if (timer > 0 && !gameOver) {
      const interval = setInterval(() => setTimer((t) => t - 1), 1000);
      return () => clearInterval(interval);
    } else if (timer === 0 && !gameOver) {
      setGameOver(true);
      alert("⏱️ Time's up! Try again.");
    }
  }, [timer, gameOver]);

  // Move function (supports mobile buttons too)
  const move = (dir) => {
    let { row, col } = playerPos;
    if (dir === "up") row--;
    else if (dir === "down") row++;
    else if (dir === "left") col--;
    else if (dir === "right") col++;

    if (
      row >= 0 &&
      row < ROWS &&
      col >= 0 &&
      col < COLS &&
      maze[row][col] === 0
    ) {
      setPlayerPos({ row, col });
      setPath((prev) => [...prev, { row, col }]);

      // Win condition
      if (row === ROWS - 1 && col === COLS - 1) {
        setGameOver(true);
        alert("🎉 You solved the maze!");
      }
    }
  };

  return (
    <div className="p-4 bg-white dark:bg-gray-900 rounded-xl shadow-md text-center max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-2">🧩 Maze Puzzle</h2>
      <p className="mb-4 text-sm text-gray-700 dark:text-gray-300">
        Solve this maze in 60 seconds to capture the kingdom!
      </p>

      <p className="text-lg font-semibold mb-4 text-blue-500">
        ⏱ Time Left: {timer}s
      </p>

      <div className="grid grid-cols-10 gap-1 justify-center">
        {maze.map((row, rowIdx) =>
          row.map((cell, colIdx) => {
            const isCurrent =
              playerPos.row === rowIdx && playerPos.col === colIdx;
            const isPath = path.some(
              (p) => p.row === rowIdx && p.col === colIdx
            );
            const isGoal = rowIdx === ROWS - 1 && colIdx === COLS - 1;

            return (
              <div
                key={`${rowIdx}-${colIdx}`}
                className={`w-6 h-6 border rounded-sm transition-all duration-300
                  ${
                    cell === 1
                      ? "bg-black"
                      : isCurrent
                      ? "bg-green-400 animate-pulse"
                      : isGoal
                      ? "bg-yellow-300"
                      : isPath
                      ? "bg-blue-400"
                      : "bg-white dark:bg-gray-700"
                  }`}
              />
            );
          })
        )}
      </div>

      {/* Mobile Controls */}
      <div className="mt-6 flex flex-col items-center space-y-2 md:hidden">
        <button
          onClick={() => move("up")}
          className="bg-blue-500 text-white px-6 py-2 rounded"
        >
          ↑
        </button>
        <div className="flex space-x-4">
          <button
            onClick={() => move("left")}
            className="bg-blue-500 text-white px-6 py-2 rounded"
          >
            ←
          </button>
          <button
            onClick={() => move("down")}
            className="bg-blue-500 text-white px-6 py-2 rounded"
          >
            ↓
          </button>
          <button
            onClick={() => move("right")}
            className="bg-blue-500 text-white px-6 py-2 rounded"
          >
            →
          </button>
        </div>
      </div>
    </div>
  );
}
