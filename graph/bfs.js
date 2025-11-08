async function bfs() {
    try {
        const delay = parseInt(document.getElementById("speed").value);
        const startRow = parseInt(startNode.dataset.row);
        const startCol = parseInt(startNode.dataset.col);
        const endRow = parseInt(endNode.dataset.row);
        const endCol = parseInt(endNode.dataset.col);

        const queue = [[startRow, startCol]];
        const visited = new Set([`${startRow}-${startCol}`]);
        const directions = [[1, 0], [-1, 0], [0, 1], [0, -1]];
        const parent = {};

        while (queue.length > 0) {
            if (stopRequested) throw "Algorithm stopped";

            const [r, c] = queue.shift();
            const cell = grid[r][c];

            if (cell !== startNode && cell !== endNode)
                cell.style.backgroundColor = "yellow";

            await sleep();
            if (stopRequested) throw "Algorithm stopped";

            if (r === endRow && c === endCol) {
                await reconstructPath(parent, endRow, endCol, startRow, startCol);
                return;
            }

            for (const [dr, dc] of directions) {
                if (stopRequested) throw "Algorithm stopped";

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

                        if (nextCell !== startNode && nextCell !== endNode)
                            nextCell.style.backgroundColor = "#87cefa";
                    }
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
            if (
                !cell.classList.contains("start") &&
                !cell.classList.contains("end") &&
                !cell.classList.contains("wall")
            )
                cell.style.backgroundColor = "";
        }
    }
}

function resetGridColors() {
    for (let r = 0; r < grid.length; r++) {
        for (let c = 0; c < grid[r].length; c++) {
            const cell = grid[r][c];
            if (
                !cell.classList.contains("start") &&
                !cell.classList.contains("end") &&
                !cell.classList.contains("wall")
            ) {
                cell.style.backgroundColor = "";
            }
        }
    }
}
