let arr = [];
let grid = [];
let startNode = null;
let endNode = null;
let searchArr = [];
let isRunning = false;
let stopRequested = false;

function toggleUI(disabled) {
    const elements = document.querySelectorAll(
        "button, select, input[type='range'], input[type='number']"
    );
    elements.forEach(el => {
        if (el.id === "speed") return;
        el.disabled = disabled;
    });
}

function toggleButton(section, isRunningNow) {
    const button = document.querySelector(`#${section}Start`);
    if (!button) return;

    if (isRunningNow) {
        button.textContent = "Stop";
        button.classList.add("stop-btn");
    } else {
        button.textContent = "Start";
        button.classList.remove("stop-btn");
    }
}

function generateArray() {
    const size = document.getElementById("size").value;
    arr = [];
    for (let i = 0; i < size; i++)
        arr.push(Math.floor(Math.random() * 250) + 10);
    drawBars();
}

function drawBars(high1 = -1, high2 = -1) {
    const bars = document.getElementById("bars");
    bars.innerHTML = "";
    arr.forEach((value, index) => {
        const bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.height = value + "px";
        if (index === high1 || index === high2)
            bar.style.background = "yellow";
        bars.appendChild(bar);
    });
}
async function markSorted() {
    for (let i = 0; i < arr.length; i++) {
        const bars = document.getElementsByClassName("bar");
        bars[i].style.backgroundColor = "limegreen";
        await sleep(15);
    }
}
async function sleep() {
    const delay = parseInt(document.getElementById("speed").value);
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (stopRequested) reject(new Error("Algorithm stopped"));
            else resolve();
        }, delay);
    });
}

async function startSort() {
    if (isRunning) {
        stopRequested = true;
        return;
    }
    delay = document.getElementById("speed").value;
    const algo = document.getElementById("algoselect").value;
    isRunning = true;
    stopRequested = false;
    toggleUI(true);
    toggleButton("sort", true);
    switch (algo) {
        case "bubble":
            await bubbleSort();
            break;
        case "selection":
            await selectionSort();
            break;
        case "insertion":
            await insertionSort();
            break;
        case "merge":
            await mergeSortWrapper();
            break;
        case "quick":
            await quickSortWrapper();
            break;
        case "heap":
            await heapSortWrapper();
            break;
        case "radix":
            await radixSortWrapper();
            break;
        default:
            break;
    }
    drawBars();
    isRunning = false;
    stopRequested = false;
    toggleButton("sort", false);
    toggleUI(false);
}

function generateGraph() {
    const graphCanvas = document.getElementById("graphCanvas");
    const gridSize = parseInt(document.getElementById("graphSize").value);
    const rows = gridSize;
    const cols = gridSize;
    const gridPixelSize = 500;
    const cellSize = gridPixelSize / gridSize;
    graphCanvas.innerHTML = "";
    graphCanvas.style.width = `${gridPixelSize}px`;
    graphCanvas.style.height = `${gridPixelSize}px`;
    graphCanvas.style.gridTemplateRows = `repeat(${rows}, ${cellSize}px)`;
    graphCanvas.style.gridTemplateColumns = `repeat(${cols}, ${cellSize}px)`;
    grid = [];
    startNode = null;
    endNode = null;
    for (let r = 0; r < rows; r++) {
        const row = [];
        for (let c = 0; c < cols; c++) {
            const cell = document.createElement("div");
            cell.classList.add("cell");
            cell.style.width = `${cellSize}px`;
            cell.style.height = `${cellSize}px`;
            cell.dataset.row = r;
            cell.dataset.col = c;
            cell.addEventListener("click", handleCellClick);
            graphCanvas.appendChild(cell);
            row.push(cell);
        }
        grid.push(row);
    }
}

function handleCellClick(e) {
    const cell = e.target;
    if (!startNode) {
        startNode = cell;
        cell.classList.add("start");
    }
    else if (!endNode && cell !== startNode) {
        endNode = cell;
        cell.classList.add("end");
    }
    else if (cell !== startNode && cell !== endNode) {
        cell.classList.toggle("wall");
    }
}

async function reconstructPath(parent, endRow, endCol, startRow, startCol) {
    const delay = parseInt(document.getElementById("speed").value);
    let key = `${endRow}-${endCol}`;
    const path = [];
    while (key in parent) {
        const [r, c] = parent[key];
        path.push([r, c]);
        key = `${r}-${c}`;
    }
    for (let i = path.length - 1; i >= 0; i--) {
        const [r, c] = path[i];
        const cell = grid[r][c];
        if (cell !== startNode && cell !== endNode)
            cell.style.backgroundColor = "red";
        await new Promise(res => setTimeout(res, delay / 2));
    }
}

function heuristic(a, b, type = "manhattan") {
    const [x1, y1] = a, [x2, y2] = b;
    switch (type) {
        case "euclidean":
            return Math.sqrt((x1 - x2) ** 2 + (y1 - y2) ** 2);
        case "diagonal":
            return Math.max(Math.abs(x1 - x2), Math.abs(y1 - y2));
        case "manhattan":
        default:
            return Math.abs(x1 - x2) + Math.abs(y1 - y2);
    }
}

async function startGraphTraversal() {
    if (isRunning) {
        stopRequested = true;
        return;
    }
    const algo = document.getElementById("graphAlgoSelect").value;
    const heuristicType = document.getElementById("heuristicSelect")?.value || "manhattan";

    if (!startNode || !endNode) {
        alert("Please select start and end nodes first!");
        return;
    }
    isRunning = true;
    stopRequested = false;
    toggleUI(true);
    toggleButton("graph", true);
    switch (algo) {
        case "bfs": await bfs(); break;
        case "dfs": await dfs(); break;
        case "dijkstra": await dijkstra(); break;
        case "bestfirst": await bestFirstSearch(heuristicType); break;
        case "astar": await aStarSearch(heuristicType); break;
        default: break;
    }
    isRunning = false;
    stopRequested = false;
    toggleButton("graph", false);
    toggleUI(false);
}

function generateSearchArray() {
    const size = parseInt(document.getElementById("searchSize").value);
    searchArr = [];
    const container = document.getElementById("searchArray");
    container.innerHTML = "";

    for (let i = 0; i < size; i++) {
        const value = Math.floor(Math.random() * 100);
        searchArr.push(value);
    }

    const algo = document.getElementById("searchSelect").value;
    if (algo === "binary") {
        searchArr.sort((a, b) => a - b);
    }
    for (let i = 0; i < searchArr.length; i++) {
        const cell = document.createElement("div");
        cell.classList.add("search-cell");
        cell.textContent = searchArr[i];
        container.appendChild(cell);
    }
}


async function startSearch() {
    if (isRunning) {
        stopRequested = true;
        return;
    }
    const algo = document.getElementById("searchSelect").value;
    if (searchArr.length === 0) generateSearchArray();
    isRunning = true;
    stopRequested = false;
    toggleUI(true);
    toggleButton("search", true);
    switch (algo) {
        case "linear": await linearSearch(); break;
        case "binary": await binarySearch(); break;
        default: break;
    }
    isRunning = false;
    stopRequested = false;
    toggleButton("search", false);
    toggleUI(false);
}

window.onload = () => {
    generateArray();
    generateGraph();
    generateSearchArray();
    document.getElementById("algoselect").addEventListener("change", () => {
        if (!isRunning) generateArray();
    });
    document.getElementById("searchSelect").addEventListener("change", () => {
        if (!isRunning) generateSearchArray();
    });
    document.getElementById("graphAlgoSelect").addEventListener("change", () => {
        if (!isRunning) generateGraph();
    });
    document.getElementById("searchSelect").addEventListener("change", () => {
        generateSearchArray();
    });
};
