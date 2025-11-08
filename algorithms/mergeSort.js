async function mergeSortWrapper() {
    await mergeSort(arr, 0, arr.length - 1);
    await markSorted();
}
async function mergeSort(arr, left, right) {
    if (left >= right) return;
    const mid = left + Math.floor((right - left) / 2);
    await mergeSort(arr, left, mid);
    await mergeSort(arr, mid + 1, right);
    await merge(arr, left, mid, right);
}
async function merge(arr, left, mid, right) {
    const temp = [];
    let i = left, j = mid + 1;
    while (i <= mid && j <= right) {
        drawBars(i, j);
        await sleep();
        if (arr[i] <= arr[j]) {
            temp.push(arr[i]);
            i++;
        }
        else {
            temp.push(arr[j]);
            j++;
        }
    }
    while (i <= mid) {
        temp.push(arr[i]);
        i++;
    }
    while (j <= right) {
        temp.push(arr[j]);
        j++;
    }
    for (let k = 0; k < temp.length; k++) {
        arr[left + k] = temp[k];
        drawBars(left + k);
        await sleep();
    }
}   