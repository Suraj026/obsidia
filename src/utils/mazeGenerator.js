export function generateMaze(rows = 10, cols = 10) {
  const maze = Array.from({ length: rows }, () => Array(cols).fill(1));

  const visit = (x, y) => {
    maze[y][x] = 0;
    const dirs = [
      [0, -1],
      [1, 0],
      [0, 1],
      [-1, 0],
    ].sort(() => Math.random() - 0.5); // Shuffle directions

    for (const [dx, dy] of dirs) {
      const nx = x + dx * 2;
      const ny = y + dy * 2;
      if (ny > 0 && ny < rows && nx > 0 && nx < cols && maze[ny][nx] === 1) {
        maze[y + dy][x + dx] = 0;
        visit(nx, ny);
      }
    }
  };

  visit(1, 1); // Start in top-left corner
  return maze;
}
