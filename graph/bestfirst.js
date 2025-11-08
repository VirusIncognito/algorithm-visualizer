async function bestFirstSearch(heuristicType = "manhattan") {
    const delay = parseInt(document.getElementById("speed").value);
    const startRow = parseInt(startNode.dataset.row);
    const startCol = parseInt(startNode.dataset.col);
    const endRow = parseInt(endNode.dataset.row);
    const endCol = parseInt(endNode.dataset.col);

    const rows = grid.length, cols = grid[0].length;
    const key = (r, c) => `${r}-${c}`;
    const dirs = [[1,0], [-1,0], [0,1], [0,-1]];
    const parent = {};
    const visited = new Set();

    const startKey = key(startRow, startCol);
    const endKey = key(endRow, endCol);

    const heap = new MinHeap();
    heap.push([heuristic([startRow, startCol], [endRow, endCol], heuristicType), startKey]);

    while (heap.size() > 0) {
        const [hVal, curKey] = heap.pop();
        const [r, c] = curKey.split('-').map(Number);
        if (visited.has(curKey)) continue;
        visited.add(curKey);

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
            if (!visited.has(nKey)) {
                parent[nKey] = [r, c];
                const h = heuristic([nr, nc], [endRow, endCol], heuristicType);
                heap.push([h, nKey]);
            }
        }

        if (cell !== startNode && cell !== endNode)
            cell.style.backgroundColor = "lightgreen";
    }

    alert("No path found!");
}
