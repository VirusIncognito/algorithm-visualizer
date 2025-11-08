async function bubbleSort() {
    let n = arr.length;
    for (let i = 0; i < n; i++) {
        if(stopRequested) throw "Algorithm stopped";
        for (let j = 0; j < n - i - 1; j++) {
            if(stopRequested) throw "Algorithm stopped";
            drawBars(j, j + 1);
            await sleep();
            if(stopRequested) throw "Algorithm stopped";
            if (arr[j] > arr[j + 1]) {
                [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
                drawBars(j, j + 1);
                await sleep();
            }
        }
    }
    await markSorted();
}