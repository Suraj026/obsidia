import React, { useEffect, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

const MAZE_SIZE = 9;
const START_POS = { x: 0, y: 0 };
const END_POS = { x: MAZE_SIZE - 1, y: MAZE_SIZE - 1 };
const TARGET_LOCATION = { lat: 28.6129, lng: 77.2295 }; // Replace with dynamic location later if needed

export default function MazePuzzle() {
  const [playerPos, setPlayerPos] = useState(START_POS);
  const [maze, setMaze] = useState([]);
  const [won, setWon] = useState(false);
  const [started, setStarted] = useState(false);
  const [timer, setTimer] = useState(60);
  const intervalRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    const generateMaze = () => {
      const grid = Array(MAZE_SIZE)
        .fill(null)
        .map(() => Array(MAZE_SIZE).fill(1));
      const directions = [
        [0, 2],
        [2, 0],
        [0, -2],
        [-2, 0],
      ];
      const inBounds = (x, y) =>
        x >= 0 && y >= 0 && x < MAZE_SIZE && y < MAZE_SIZE;

      const carve = (x, y) => {
        grid[x][y] = 0;
        directions.sort(() => Math.random() - 0.5);
        for (let [dx, dy] of directions) {
          const nx = x + dx,
            ny = y + dy;
          const mx = x + dx / 2,
            my = y + dy / 2;
          if (inBounds(nx, ny) && grid[nx][ny] === 1) {
            grid[mx][my] = 0;
            carve(nx, ny);
          }
        }
      };

      carve(0, 0);
      grid[END_POS.x][END_POS.y] = 0;
      return grid;
    };

    setMaze(generateMaze());
  }, []);

  useEffect(() => {
    const handleKey = (e) => {
      if (!started || won) return;
      const { x, y } = playerPos;
      let nx = x,
        ny = y;
      if (e.key === "ArrowUp") nx--;
      if (e.key === "ArrowDown") nx++;
      if (e.key === "ArrowLeft") ny--;
      if (e.key === "ArrowRight") ny++;
      move(nx, ny);
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [playerPos, started, won]);

  useEffect(() => {
    if (!started || won) return;
    intervalRef.current = setInterval(() => {
      setTimer((prev) => {
        if (prev <= 1) {
          clearInterval(intervalRef.current);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(intervalRef.current);
  }, [started, won]);

  const move = (x, y) => {
    if (
      x >= 0 &&
      y >= 0 &&
      x < MAZE_SIZE &&
      y < MAZE_SIZE &&
      maze[x][y] === 0
    ) {
      setPlayerPos({ x, y });
      if (x === END_POS.x && y === END_POS.y) {
        setWon(true);
        clearInterval(intervalRef.current);
        window.speechSynthesis.speak(
          new SpeechSynthesisUtterance("Congratulations! You solved the maze.")
        );
        // 🎯 Save target location and redirect
        localStorage.setItem("targetLocation", JSON.stringify(TARGET_LOCATION));
        setTimeout(() => navigate("/map"), 3000);
      }
    }
  };

  const startGame = () => {
    setStarted(true);
    setTimer(60);
    setPlayerPos(START_POS);
    setWon(false);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-black text-white px-4">
      <h1 className="text-2xl font-bold mb-4">🧩 Maze Puzzle</h1>

      {!started ? (
        <button
          onClick={startGame}
          className="bg-blue-600 px-6 py-2 rounded mb-6"
        >
          Start Puzzle
        </button>
      ) : (
        <>
          <div className="text-lg mb-2">⏳ Time Left: {timer}s</div>
          <div className="grid grid-cols-9 gap-1 border border-white p-2 bg-gray-800 rounded">
            {maze.map((row, x) =>
              row.map((cell, y) => {
                const isPlayer = x === playerPos.x && y === playerPos.y;
                const isEnd = x === END_POS.x && y === END_POS.y;
                let bg = cell === 1 ? "bg-gray-700" : "bg-white";
                if (isPlayer) bg = "bg-blue-500 animate-pulse";
                else if (isEnd) bg = "bg-green-500";

                return (
                  <div
                    key={`${x}-${y}`}
                    className={`${bg} w-6 h-6 rounded-sm border border-gray-300`}
                  ></div>
                );
              })
            )}
          </div>

          {/* Mobile Controls */}
          <div className="mt-6 space-y-2">
            <div className="flex justify-center gap-4">
              <button onClick={() => move(playerPos.x - 1, playerPos.y)}>
                ⬆️
              </button>
            </div>
            <div className="flex justify-center gap-4">
              <button onClick={() => move(playerPos.x, playerPos.y - 1)}>
                ⬅️
              </button>
              <button onClick={() => move(playerPos.x, playerPos.y + 1)}>
                ➡️
              </button>
            </div>
            <div className="flex justify-center gap-4">
              <button onClick={() => move(playerPos.x + 1, playerPos.y)}>
                ⬇️
              </button>
            </div>
          </div>

          {won && (
            <div className="mt-4 text-green-400 font-semibold text-lg">
              🎉 You won the maze!
            </div>
          )}
        </>
      )}
    </div>
  );
}
