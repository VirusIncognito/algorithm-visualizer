async function quickSortWrapper() {
    await quickSort(arr, 0, arr.length - 1);
    await markSorted();
}
async function quickSort(arr, low, high) {
    if (low < high) {
        const pivot = await partition(arr, low, high);
        await quickSort(arr, low, pivot - 1);
        await quickSort(arr, pivot + 1, high);
    }
}
async function partition(arr, low, high) {
    let pivot = arr[high];
    let i = low - 1;
    for (let j = low; j < high; j++) {
        drawBars(j, high);
        await sleep();
        if (arr[j] < pivot) {
            i++;
            [arr[i], arr[j]] = [arr[j], arr[i]];
            drawBars(i, j);
            await sleep();
        }
    }
    [arr[i + 1], arr[high]] = [arr[high], arr[i + 1]];
    drawBars(i + 1, high);
    await sleep();
    return i + 1;
}