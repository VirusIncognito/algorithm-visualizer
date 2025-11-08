async function radixSortWrapper() {
    await radixSort(arr);
    await markSorted();
}

async function radixSort(arr) {
    const maxNum = Math.max(...arr);
    let exp = 1;

    while (Math.floor(maxNum / exp) > 0) {
        await countingSortByDigit(arr, exp);
        exp *= 10;
    }
}

async function countingSortByDigit(arr, exp) {
    const output = new Array(arr.length).fill(0);
    const count = new Array(10).fill(0);

    for (let i = 0; i < arr.length; i++) {
        const digit = Math.floor(arr[i] / exp) % 10;
        count[digit]++;
        drawBars(i);
        const bars = document.getElementsByClassName("bar");
        bars[i].style.background = "yellow"; 
        await sleep();
        bars[i].style.background = "#00eaff";
    }

    for (let i = 1; i < 10; i++) count[i] += count[i - 1];

    for (let i = arr.length - 1; i >= 0; i--) {
        const digit = Math.floor(arr[i] / exp) % 10;
        output[count[digit] - 1] = arr[i];
        count[digit]--;
    }
    for (let i = 0; i < arr.length; i++) {
        arr[i] = output[i];
        drawBars(i);
        const bars = document.getElementsByClassName("bar");
        bars[i].style.background = "yellow";
        await sleep();
        bars[i].style.background = "#00eaff";
    }

    drawBars();
}
