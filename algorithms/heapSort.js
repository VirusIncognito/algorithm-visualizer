async function heapSortWrapper() {
    try {
        await heapSort(arr);
        if (!stopRequested) await markSorted();
    } catch (e) {
        if (e !== "Algorithm stopped") console.error(e);
    } finally {
        drawBars();
    }
}

async function heapSort(arr) {
    let n = arr.length;

    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        if (stopRequested) throw "Algorithm stopped";
        await heapify(arr, n, i);
    }

    for (let i = n - 1; i > 0; i--) {
        if (stopRequested) throw "Algorithm stopped";
        [arr[0], arr[i]] = [arr[i], arr[0]];

        drawBars(0, i);
        await sleep();
        if (stopRequested) throw "Algorithm stopped";

        await heapify(arr, i, 0);
    }
}

async function heapify(arr, n, i) {
    if (stopRequested) throw "Algorithm stopped";

    let largest = i;
    let left = 2 * i + 1;
    let right = 2 * i + 2;

    const bars = document.getElementsByClassName("bar");
    if (bars[i]) bars[i].style.background = "yellow";
    if (bars[left]) bars[left].style.background = "#ffae00";
    if (bars[right]) bars[right].style.background = "#ffae00";
    await sleep();
    if (stopRequested) throw "Algorithm stopped";

    if (left < n && arr[left] > arr[largest]) largest = left;
    if (right < n && arr[right] > arr[largest]) largest = right;

    if (largest !== i) {
        [arr[i], arr[largest]] = [arr[largest], arr[i]];

        drawBars(i, largest);
        await sleep();
        if (stopRequested) throw "Algorithm stopped";

        await heapify(arr, n, largest);
    }

    if (bars[i]) bars[i].style.background = "#00eaff";
    if (bars[left]) bars[left].style.background = "#00eaff";
    if (bars[right]) bars[right].style.background = "#00eaff";
}
