let sec = 0;
let min = 0;
let hour = 0;
let timerSpan = document.getElementById("timer");

function timerOn() {
    timer = setInterval(function () {
        sec++;
        if (sec >= 60) {
            min++;
            sec = 0;
        }

        if (min == 60) {
            hour++;
            min = 0;
        }

        hour > 0 ? timerSpan.textContent = `${hour.toString().padStart(2, "0")} : ${min.toString().padStart(2, "0")} : ${sec.toString().padStart(2, "0")}` : timerSpan.textContent = `${min.toString().padStart(2, "0")} : ${sec.toString().padStart(2, "0")}`
    }, 1000)
}

let tempArr = [];
let bar = 0;
let intervalId = null;
let loadBar = document.getElementById("loadBar");

const loadBarSize = "..............................";
document.getElementById("loadBar").textContent = loadBarSize;

function startLoadBar() {
    if (!dragg || tempArr.length < 1) return;
    if (intervalId) clearInterval(intervalId);

    loadBar.textContent = loadBarSize;

    intervalId = setInterval(() => {
        bar++;
        if (bar >= 30) {
            clearInterval(intervalId);
            intervalId = null;
            bar = 0;
            loadBar.textContent = loadBarSize;
            tempWord.textContent = "> ";

            let palavra = "";
            let selectedIds = tempArr.map(td => Number(td.id.replace("TD", "")));

            tempArr.forEach(td => {
                palavra += td.textContent;
            });

            let match = valid_cList.find(o => o.word === palavra);
            if (match && tempArr.length === match.word.length) {
                let isValid = selectedIds.every((id, i) => id === match.index[i])
                if (tempArr.every(td => td.classList.contains("valido"))) return;

                if (isValid) {
                    document.getElementById(palavra).style.opacity = "20%";
                    document.getElementById(palavra).style.border = "1px solid green";

                    tempArr.forEach((td) => {
                        td.classList.add("valido");
                        td.classList.remove("marcado");
                    });

                    tempArr = [];

                    if (soundOn) tSoundPlay();

                    match.found = true;

                    saveGame()

                    let w = 0;
                    valid_cList.forEach(el => {
                        if (el.found) {
                            w++;
                        }
                    })

                    if (w == valid_cList.length) vSoundPlay();
                    randomColors();
                } else {
                    //console.log("IDs não correspondem");
                    stopLoadBar();
                }
            } else {
                //console.log("palavra ou tamanho incorreto");
                stopLoadBar();
            }
            return;
        }

        loadBar.textContent = loadBar.textContent.slice(0, -1);
    }, 100);
}

function stopLoadBar() {
    if (intervalId) {
        clearInterval(intervalId);
        intervalId = null;
    }

    dragg = false;
    loadBar.textContent = loadBarSize;
    tempWord.textContent = "> ";

    tempArr.forEach((td) => {
        td.classList.remove("marcado");

        if (!td.classList.contains("valido")) {
            td.style.backgroundColor = "";
            td.style.color = "";
        }
    });

    tempArr = [];
    if (soundOn) breakLineSound.play();
    document.getElementById("bodyTable").classList.add("errorAni")
    setTimeout(function () {
        document.getElementById("bodyTable").classList.remove("errorAni")
    }, 4000)
    randomColors();
}