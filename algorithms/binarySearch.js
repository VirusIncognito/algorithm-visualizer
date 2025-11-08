async function binarySearch() {
    const target = parseInt(document.getElementById("searchTarget").value);
    if (isNaN(target)) {
        alert("Please enter a number to search!");
        return;
    }

    const delay = parseInt(document.getElementById("speed").value);
    const cells = document.getElementsByClassName("search-cell");

    let left = 0;
    let right = searchArr.length - 1;

    while (left <= right) {
        const mid = Math.floor((left + right) / 2);

        for (let i = 0; i < searchArr.length; i++) {
            if (i >= left && i <= right)
                cells[i].style.background = "#87cefa";
            else
                cells[i].style.background = "#ddd";
        }

        cells[mid].style.background = "yellow";
        await sleep();

        if (searchArr[mid] === target) {
            cells[mid].style.background = "limegreen";
            return;
        } else if (searchArr[mid] < target) {
            cells[mid].style.background = "#ff5050";
            left = mid + 1;
        } else {
            cells[mid].style.background = "#ff5050";
            right = mid - 1;
        }

        await sleep();
    }

    alert("Element not found");
}
