async function dijkstra() {
    const delay = parseInt(document.getElementById("speed").value);
    const startRow = parseInt(startNode.dataset.row);
    const startCol = parseInt(startNode.dataset.col);
    const endRow = parseInt(endNode.dataset.row);
    const endCol = parseInt(endNode.dataset.col);

    const rows = grid.length, cols = grid[0].length;
    const key = (r, c) => `${r}-${c}`;
    const dirs = [[1,0], [-1,0], [0,1], [0,-1]];

    const dist = {};
    const parent = {};
    for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) dist[key(r, c)] = Infinity;
    }
    const startKey = key(startRow, startCol);
    const endKey = key(endRow, endCol);
    dist[startKey] = 0;

    const minHeap = new MinHeap();
    minHeap.push([0, startKey]);

    while (minHeap.size() > 0) {
        const [d, curKey] = minHeap.pop();
        const [r, c] = curKey.split("-").map(Number);
        const cell = grid[r][c];

        if (cell !== startNode && cell !== endNode)
            cell.style.backgroundColor = "yellow";
        await sleep();

        if (curKey === endKey) {
            await reconstructPath(parent, endRow, endCol, startRow, startCol);
            return;
        }

        for (const [dr, dc] of dirs) {
            const nr = r + dr, nc = c + dc;
            if (nr < 0 || nc < 0 || nr >= rows || nc >= cols) continue;
            const nCell = grid[nr][nc];
            if (nCell.classList.contains("wall")) continue;

            const nKey = key(nr, nc);
            const newDist = dist[curKey] + 1; // edge weight = 1

            if (newDist < dist[nKey]) {
                dist[nKey] = newDist;
                parent[nKey] = [r, c];
                minHeap.push([newDist, nKey]);
            }
        }

        if (cell !== startNode && cell !== endNode)
            cell.style.backgroundColor = "lightgreen";
    }

    alert("No path found!");
}
