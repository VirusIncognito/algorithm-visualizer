async function radixSortWrapper() {
    try {
        await radixSort(arr);
        if (!stopRequested) await markSorted();
    } catch (e) {
        if (e.message !== "Algorithm stopped") console.error(e);
    } finally {
        drawBars();
    }
}

async function radixSort(arr) {
    if (stopRequested) throw "Algorithm stopped";
    const maxNum = Math.max(...arr);
    let exp = 1;

    while (Math.floor(maxNum / exp) > 0) {
        if (stopRequested) throw "Algorithm stopped";
        await countingSortByDigit(arr, exp);
        exp *= 10;
    }
}

async function countingSortByDigit(arr, exp) {
    if (stopRequested) throw "Algorithm stopped";

    const output = new Array(arr.length).fill(0);
    const count = new Array(10).fill(0);
    const bars = document.getElementsByClassName("bar");

    for (let i = 0; i < arr.length; i++) {
        if (stopRequested) throw "Algorithm stopped";
        const digit = Math.floor(arr[i] / exp) % 10;
        count[digit]++;

        drawBars(i);
        if (bars[i]) bars[i].style.background = "yellow";
        await sleep();
        if (stopRequested) throw "Algorithm stopped";
        if (bars[i]) bars[i].style.background = "#00eaff";
    }

    for (let i = 1; i < 10; i++) count[i] += count[i - 1];

    for (let i = arr.length - 1; i >= 0; i--) {
        if (stopRequested) throw "Algorithm stopped";
        const digit = Math.floor(arr[i] / exp) % 10;
        output[count[digit] - 1] = arr[i];
        count[digit]--;
    }

    for (let i = 0; i < arr.length; i++) {
        if (stopRequested) throw "Algorithm stopped";

        arr[i] = output[i];
        drawBars(i);

        if (bars[i]) bars[i].style.background = "yellow";
        await sleep();
        if (stopRequested) throw "Algorithm stopped";
        if (bars[i]) bars[i].style.background = "#00eaff";
    }

    drawBars();
}
