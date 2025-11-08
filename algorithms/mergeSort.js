async function mergeSortWrapper() {
    try {
        await mergeSort(arr, 0, arr.length - 1);
        if (!stopRequested) await markSorted();
    } catch (e) {
        if (e !== "Algorithm stopped") console.error(e);
    } finally {
        drawBars(); 
    }
}

async function mergeSort(arr, left, right) {
    if (stopRequested) throw "Algorithm stopped";
    if (left >= right) return;

    const mid = left + Math.floor((right - left) / 2);

    await mergeSort(arr, left, mid);
    if (stopRequested) throw "Algorithm stopped";

    await mergeSort(arr, mid + 1, right);
    if (stopRequested) throw "Algorithm stopped";

    await merge(arr, left, mid, right);
    if (stopRequested) throw new "Algorithm stopped";
}

async function merge(arr, left, mid, right) {
    if (stopRequested) throw "Algorithm stopped";

    const temp = [];
    let i = left, j = mid + 1;
    const bars = document.getElementsByClassName("bar");

    while (i <= mid && j <= right) {
        if (stopRequested) throw "Algorithm stopped";

        drawBars(i, j);
        if (bars[i]) bars[i].style.background = "yellow";
        if (bars[j]) bars[j].style.background = "#ffae00";
        await sleep();

        if (arr[i] <= arr[j]) {
            temp.push(arr[i]);
            i++;
        } else {
            temp.push(arr[j]);
            j++;
        }

        if (bars[i - 1]) bars[i - 1].style.background = "#00eaff";
        if (bars[j - 1]) bars[j - 1].style.background = "#00eaff";
    }

    while (i <= mid) {
        if (stopRequested) throw "Algorithm stopped";
        temp.push(arr[i]);
        i++;
    }

    while (j <= right) {
        if (stopRequested) throw "Algorithm stopped";
        temp.push(arr[j]);
        j++;
    }

    for (let k = 0; k < temp.length; k++) {
        if (stopRequested) throw "Algorithm stopped";

        arr[left + k] = temp[k];
        drawBars(left + k);
        if (bars[left + k]) bars[left + k].style.background = "lightgreen";
        await sleep();
        if (bars[left + k]) bars[left + k].style.background = "#00eaff";
    }
}
