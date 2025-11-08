async function insertionSort(){
    let n = arr.length;
    for(let i = 1; i < n; i++){
        j = i;
        while(j > 0 && arr[j - 1] > arr[j]){
            temp = arr[j];
            arr[j] =  arr[j - 1];
            arr[j - 1] = temp;
            drawBars(j - 1);
            await sleep();
            j--;
        }
    }
    await markSorted();
}