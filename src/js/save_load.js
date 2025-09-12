let lastSaved = "";

function saveGame() {
    lastSaved = new Date().toLocaleString();

    let tdData = [];
    document.querySelectorAll("td").forEach(td => {
        let computedColor = getComputedStyle(td).color;
        let saveColor = computedColor === "rgb(255, 255, 255)" ? 0 : 1;
        let saveBackColor = td.style.backgroundColor.replace("rgb(", "").replace(")", "");

        tdData.push([
            td.textContent,
            saveBackColor,
            saveColor
        ]);
    });

    localStorage.setItem("tdData", JSON.stringify(tdData));
    localStorage.setItem("valid_cList", JSON.stringify(valid_cList));
    localStorage.setItem("findIt", JSON.stringify(findIt));
    localStorage.setItem("languageSRC", languageSRC.index);
    localStorage.setItem("lastSaved", lastSaved);
    localStorage.setItem("gridSize", gridW);
}

function loadGame() {
    const savedTdData = JSON.parse(localStorage.getItem("tdData"));
    valid_cList = JSON.parse(localStorage.getItem("valid_cList"));
    findIt = JSON.parse(localStorage.getItem("findIt"));

    document.querySelectorAll("td").forEach((td, index) => {
        const savedData = savedTdData[index];
        if (savedData) {
            td.textContent = savedData[0];
            td.style.backgroundColor = `rgb(${savedData[1]})`;
            td.style.color = savedData[2] === 0 ? "#FFFFFF" : "#000000";
        }
    });
}

function saveTimer() {
    const tempo = {
        seconds: sec,
        minutes: min,
        hours: hour
    };

    localStorage.setItem("gameTime", JSON.stringify(tempo));
}

const saveGameTime = setInterval(saveTimer, 30000)

window.addEventListener("beforeunload", saveTimer)