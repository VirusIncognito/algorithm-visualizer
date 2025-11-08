async function quickSortWrapper() {
    try {
        await quickSort(arr, 0, arr.length - 1);
        if (!stopRequested) await markSorted();
    } catch (e) {
        if (e.message !== "Algorithm stopped") console.error(e);
    } finally {
        drawBars();
    }
}

async function quickSort(arr, low, high) {
    if (stopRequested) throw "Algorithm stopped";
    if (low < high) {
        const pivot = await partition(arr, low, high);
        if (stopRequested) throw "Algorithm stopped";
        await quickSort(arr, low, pivot - 1);
        if (stopRequested) throw "Algorithm stopped";
        await quickSort(arr, pivot + 1, high);
    }
}

async function partition(arr, low, high) {
    if (stopRequested) throw "Algorithm stopped";

    const bars = document.getElementsByClassName("bar");
    let pivot = arr[high];
    let i = low - 1;

    if (bars[high]) bars[high].style.background = "purple";

    for (let j = low; j < high; j++) {
        if (stopRequested) throw "Algorithm stopped";

        drawBars(j, high);
        if (bars[j]) bars[j].style.background = "yellow";
        await sleep();

        if (arr[j] < pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];

            drawBars(i, j);
            if (bars[i]) bars[i].style.background = "#ffae00";
            await sleep();
        }

        if (bars[j]) bars[j].style.background = "#00eaff";
        if (bars[i]) bars[i].style.background = "#00eaff";
    }

    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    drawBars(i + 1, high);
    if (bars[i + 1]) bars[i + 1].style.background = "limegreen";
    await sleep();

    if (bars[high]) bars[high].style.background = "#00eaff";

    return i + 1;
}
