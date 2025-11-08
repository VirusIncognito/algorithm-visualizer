async function insertionSort() {
    try {
        let n = arr.length;
        const bars = document.getElementsByClassName("bar");

        for (let i = 1; i < n; i++) {
            if (stopRequested) throw "Algorithm stopped";

            let j = i;
            let key = arr[i];

            if (bars[i]) bars[i].style.background = "yellow";
            await sleep();
            if (stopRequested) throw "Algorithm stopped";

            while (j > 0 && arr[j - 1] > key) {
                if (stopRequested) throw "Algorithm stopped";

                arr[j] = arr[j - 1];
                drawBars(j - 1, j);

                if (bars[j - 1]) bars[j - 1].style.background = "#ff5050"; 
                if (bars[j]) bars[j].style.background = "yellow";
                await sleep();
                if (stopRequested) throw "Algorithm stopped";

                j--;
            }

            arr[j] = key;
            drawBars(j);
            await sleep();
            if (stopRequested) throw "Algorithm stopped";

            for (let k = 0; k <= i; k++) {
                bars[k].style.background = "#00eaff";
            }
        }

        if (!stopRequested) await markSorted();
    } catch (e) {
        if (e === "Algorithm stopped") {
            const bars = document.getElementsByClassName("bar");
            for (let bar of bars) {
                bar.style.background = "#00eaff";
            }
            return;
        } else {
            console.error(e);
        }
    } finally {
        drawBars(); 
    }
}
