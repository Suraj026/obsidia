import React, { useEffect, useState } from "react";
import { generateMaze } from "../utils/mazeGenerator";
import { useNavigate } from "react-router-dom";

export default function MazePuzzle() {
  const [maze, setMaze] = useState([]);
  const [timer, setTimer] = useState(60);
  const navigate = useNavigate();

  useEffect(() => {
    setMaze(generateMaze(11, 11));
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => {
        if (prev === 1) {
          clearInterval(interval);
          alert("⏱️ Time’s up! Maze failed.");
          navigate("/"); // Go back
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [navigate]);

  const handleCellClick = (x, y) => {
    if (x === 9 && y === 9) {
      alert("🎉 You solved the maze!");
      navigate("/teaser");
    }
  };

  return (
    <div className="p-4 bg-black text-white min-h-screen">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-xl font-bold">🧩 Labyrinth of Trials</h1>
        <div className="text-yellow-400 font-mono">Time Left: {timer}s</div>
      </div>

      <div className="grid grid-cols-11 gap-[2px]">
        {maze.map((row, y) =>
          row.map((cell, x) => (
            <div
              key={`${x}-${y}`}
              onClick={() => handleCellClick(x, y)}
              className={`w-6 h-6 cursor-pointer ${
                x === 1 && y === 1
                  ? "bg-green-500"
                  : x === 9 && y === 9
                  ? "bg-red-500"
                  : cell === 1
                  ? "bg-gray-800"
                  : "bg-white"
              }`}
            />
          ))
        )}
      </div>

      <p className="mt-4 text-sm text-gray-400">
        Start at 🟩 and reach 🟥 before time runs out!
      </p>
    </div>
  );
}
