async function linearSearch() {
    const target = parseInt(document.getElementById("searchTarget").value);
    if (isNaN(target)) {
        alert("Please enter a number to search!");
        return;
    }

    const cells = document.getElementsByClassName("search-cell");

    try {
        for (let cell of cells) cell.style.background = "#00eaff";

        for (let i = 0; i < searchArr.length; i++) {
            if (stopRequested) throw "Algorithm stopped";

            cells[i].style.background = "yellow"; 
            await sleep();
            if (stopRequested) throw "Algorithm stopped";

            if (searchArr[i] === target) {
                cells[i].style.background = "limegreen";
                await sleep();
                alert(`Element ${target} found at index ${i}`);
                return;
            } else {
                cells[i].style.background = "#ff5050"; 
                await sleep();
                if (stopRequested) throw "Algorithm stopped";
                cells[i].style.background = "#00eaff";
            }
        }

        alert("Element not found");
    } catch (e) {
        if (e === "Algorithm stopped") {
            for (let cell of cells) {
                cell.style.background = "#00eaff";
            }
            return;
        } else {
            console.error(e);
        }
    }
}
