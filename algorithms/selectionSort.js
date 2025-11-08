async function selectionSort() {
    let n = arr.length;
    for (let i = 0; i < n; i++) {
        let minIndex = i;
        for (let j = i; j < n; j++) {
            if (arr[j] < arr[minIndex])
                minIndex = j;
        }
        drawBars(i, minIndex);
        await sleep(delay);
        let temp = arr[i];
        arr[i] = arr[minIndex];
        arr[minIndex] = temp;
        drawBars(i, minIndex);
        await sleep();
    }
    await markSorted();
}