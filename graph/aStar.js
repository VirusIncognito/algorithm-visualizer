async function aStarSearch(heuristicType = "manhattan") {
    try {
        const delay = parseInt(document.getElementById("speed").value);
        const startRow = parseInt(startNode.dataset.row);
        const startCol = parseInt(startNode.dataset.col);
        const endRow = parseInt(endNode.dataset.row);
        const endCol = parseInt(endNode.dataset.col);

        const rows = grid.length, cols = grid[0].length;
        const key = (r, c) => `${r}-${c}`;
        const dirs = [[1, 0], [-1, 0], [0, 1], [0, -1]];

        const dist = {};
        const parent = {};
        const visited = new Set();

        const startKey = key(startRow, startCol);
        const endKey = key(endRow, endCol);

        for (let r = 0; r < rows; r++) {
            for (let c = 0; c < cols; c++) dist[key(r, c)] = Infinity;
        }
        dist[startKey] = 0;

        const heap = new MinHeap();
        const startHeuristic = heuristic([startRow, startCol], [endRow, endCol], heuristicType);
        heap.push([startHeuristic, startKey]);

        while (heap.size() > 0) {
            if (stopRequested) throw "Algorithm stopped";

            const [fScore, curKey] = heap.pop();
            if (visited.has(curKey)) continue;
            visited.add(curKey);

            const [r, c] = curKey.split('-').map(Number);
            const cell = grid[r][c];

            if (cell !== startNode && cell !== endNode)
                cell.style.backgroundColor = "yellow";
            await sleep();
            if (stopRequested) throw "Algorithm stopped";

            if (curKey === endKey) {
                await reconstructPath(parent, endRow, endCol, startRow, startCol);
                return;
            }

            for (const [dr, dc] of dirs) {
                if (stopRequested) throw "Algorithm stopped";

                const nr = r + dr, nc = c + dc;
                if (nr < 0 || nc < 0 || nr >= rows || nc >= cols) continue;

                const nCell = grid[nr][nc];
                if (nCell.classList.contains("wall")) continue;

                const nKey = key(nr, nc);
                const g = dist[curKey] + 1;
                const h = heuristic([nr, nc], [endRow, endCol], heuristicType);
                const f = g + h;

                if (g < dist[nKey]) {
                    dist[nKey] = g;
                    parent[nKey] = [r, c];
                    heap.push([f, nKey]);
                }
            }

            if (cell !== startNode && cell !== endNode)
                cell.style.backgroundColor = "lightgreen";
        }

        alert("No path found!");
    } catch (e) {
        if (e.message === "Algorithm stopped") {
            resetGridColors();
        } else {
            console.error(e);
        }
    } finally {
        const cells = document.querySelectorAll(".cell");
        for (let cell of cells) {
            if (!cell.classList.contains("start") && !cell.classList.contains("end") && !cell.classList.contains("wall"))
                cell.style.backgroundColor = "";
        }
    }
}

function resetGridColors() {
    for (let r = 0; r < grid.length; r++) {
        for (let c = 0; c < grid[r].length; c++) {
            const cell = grid[r][c];
            if (!cell.classList.contains("start") && !cell.classList.contains("end") && !cell.classList.contains("wall")) {
                cell.style.backgroundColor = "";
            }
        }
    }
}
