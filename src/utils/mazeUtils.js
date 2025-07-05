// src/utils/mazeUtils.js
export function generateMaze(rows, cols) {
  const maze = Array.from({ length: rows }, () =>
    Array.from({ length: cols }, () => 1)
  );

  // Create path from top-left to bottom-right
  let x = 0,
    y = 0;
  while (x < cols || y < rows) {
    maze[y][x] = 0; // 0 = walkable

    if (x < cols - 1 && Math.random() > 0.3) x++;
    else if (y < rows - 1) y++;
    else break;
  }

  maze[rows - 1][cols - 1] = 0;
  return maze;
}

export function solveMaze(maze) {
  const rows = maze.length;
  const cols = maze[0].length;
  const path = [];
  const visited = new Set();

  function dfs(r, c) {
    if (
      r < 0 ||
      c < 0 ||
      r >= rows ||
      c >= cols ||
      maze[r][c] === 1 ||
      visited.has(`${r},${c}`)
    )
      return false;

    visited.add(`${r},${c}`);
    path.push([r, c]);

    if (r === rows - 1 && c === cols - 1) return true;

    if (dfs(r + 1, c) || dfs(r, c + 1) || dfs(r - 1, c) || dfs(r, c - 1))
      return true;

    path.pop();
    return false;
  }

  dfs(0, 0);
  return path;
}
