async function bubbleSort() {
    let n = arr.length;
    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n - i - 1; j++) {
            drawBars(j, j + 1);
            await sleep();
            if (arr[j] > arr[j + 1]) {
                let temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp;
                drawBars(j, j + 1);
                await sleep();
            }
        }
    }
    await markSorted();
}