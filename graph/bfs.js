async function bfs() {
    const delay = parseInt(document.getElementById("speed").value);
    const startRow = parseInt(startNode.dataset.row);
    const startCol = parseInt(startNode.dataset.col);
    const endRow = parseInt(endNode.dataset.row);
    const endCol = parseInt(endNode.dataset.col);

    const queue = [[startRow, startCol]];
    const visited = new Set([`${startRow}-${startCol}`]);
    const directions = [[1,0], [-1,0], [0,1], [0,-1]];
    const parent = {};

    while (queue.length > 0) {
        const [r, c] = queue.shift();
        const cell = grid[r][c];

        if (cell !== startNode && cell !== endNode)
            cell.style.backgroundColor = "yellow"; 
        await sleep();

        if (r === endRow && c === endCol) {
            reconstructPath(parent, endRow, endCol, startRow, startCol);
            return;
        }

        for (const [dr, dc] of directions) {
            const nr = r + dr, nc = c + dc;
            if (nr >= 0 && nr < grid.length && nc >= 0 && nc < grid[0].length) {
                const nextCell = grid[nr][nc];
                const key = `${nr}-${nc}`;
                if (
                    !visited.has(key) &&
                    !nextCell.classList.contains("wall")
                ) {
                    visited.add(key);
                    queue.push([nr, nc]);
                    parent[key] = [r, c];
                }
            }
        }

        if (cell !== startNode && cell !== endNode)
            cell.style.backgroundColor = "lightgreen";
    }

    alert("No path found!");
}
