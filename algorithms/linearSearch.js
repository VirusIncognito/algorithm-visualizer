async function linearSearch() {
    const target = parseInt(document.getElementById("searchTarget").value);
    const cells = document.getElementsByClassName("search-cell");
    const delay = parseInt(document.getElementById("speed").value);

    for (let i = 0; i < searchArr.length; i++) {
        cells[i].style.background = "yellow";
        await sleep();

        if (searchArr[i] === target) {
            cells[i].style.background = "limegreen";
            return;
        } else {
            cells[i].style.background = "#ff5050";
            await sleep();
            cells[i].style.background = "#00eaff";
        }
    }

    alert("Element not found");
}