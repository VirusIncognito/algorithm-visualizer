async function binarySearch() {
    const target = parseInt(document.getElementById("searchTarget").value);
    if (isNaN(target)) {
        alert("Please enter a number to search!");
        return;
    }

    const cells = document.getElementsByClassName("search-cell");
    let left = 0;
    let right = searchArr.length - 1;

    try {
        while (left <= right) {
            if (stopRequested) throw "Algorithm stopped";

            const mid = Math.floor((left + right) / 2);

            for (let i = 0; i < searchArr.length; i++) {
                if (stopRequested) throw "Algorithm stopped";
                if (i >= left && i <= right)
                    cells[i].style.background = "#87cefa"; 
                else
                    cells[i].style.background = "#ddd"; 
            }

            // Mark midpoint
            cells[mid].style.background = "yellow";
            await sleep();
            if (stopRequested) throw "Algorithm stopped";

            if (searchArr[mid] === target) {
                cells[mid].style.background = "limegreen";
                await sleep();
                alert(`Element ${target} found at index ${mid}`);
                return;
            } else if (searchArr[mid] < target) {
                cells[mid].style.background = "#ff5050"; 
                left = mid + 1;
            } else {
                cells[mid].style.background = "#ff5050"; 
                right = mid - 1;
            }

            await sleep();
            if (stopRequested) throw "Algorithm stopped";
        }

        alert("Element not found");
    } catch (e) {
        if (e === "Algorithm stopped") {
            for (let i = 0; i < cells.length; i++) {
                cells[i].style.background = "#00eaff";
            }
            return;
        } else {
            console.error(e);
        }
    }
}
