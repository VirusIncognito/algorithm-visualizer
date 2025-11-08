async function selectionSort() {
    try {
        let n = arr.length;
        const bars = document.getElementsByClassName("bar");

        for (let i = 0; i < n; i++) {
            if (stopRequested) throw "Algorithm stopped";

            let minIndex = i;

            if (bars[i]) bars[i].style.background = "yellow";
            await sleep();
            if (stopRequested) throw "Algorithm stopped";

            for (let j = i + 1; j < n; j++) {
                if (stopRequested) throw "Algorithm stopped";

                if (bars[j]) bars[j].style.background = "#ffae00";
                await sleep();

                if (arr[j] < arr[minIndex]) {
                    if (bars[minIndex]) bars[minIndex].style.background = "#00eaff";
                    minIndex = j;
                    if (bars[minIndex]) bars[minIndex].style.background = "purple";
                } else {
                    if (bars[j]) bars[j].style.background = "#00eaff";
                }
            }

            if (stopRequested) throw "Algorithm stopped";

            [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
            drawBars(i, minIndex);

            if (bars[i]) bars[i].style.background = "#ff5050"; // swapped bar
            if (bars[minIndex]) bars[minIndex].style.background = "#ff5050";
            await sleep();
            if (stopRequested) throw "Algorithm stopped";

            if (bars[i]) bars[i].style.background = "limegreen";

            for (let k = i + 1; k < n; k++) {
                if (bars[k]) bars[k].style.background = "#00eaff";
            }
        }

        if (!stopRequested) await markSorted();
    } catch (e) {
        if (e.message === "Algorithm stopped") {
            const bars = document.getElementsByClassName("bar");
            for (let bar of bars) bar.style.background = "#00eaff";
        } else {
            console.error(e);
        }
    } finally {
        drawBars();
    }
}
