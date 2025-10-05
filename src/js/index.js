const wordsPack = [
    { path: "src/words/en.txt", id: "en", index: 0 }, { path: "src/words/es.txt", id: "es", index: 1 },

    { path: "src/words/fr.txt", id: "fr", index: 2 }, { path: "src/words/it.txt", id: "it", index: 3 },

    { path: "src/words/br.txt", id: "pt", index: 4 },  { path: "src/words/sv.txt", id: "sv", index: 5 },

];

const mainBody = document.getElementById("main");
const loading = document.getElementById("loading");

let languageSRC = [Math.floor(Math.random() * wordsPack.length)];

let dragg = false;

let arrayTXT = [];
let findIt = [];
let caixas = [];
let valid = [];
let valid_cList = [];
let validWords = 0;
let gridW = 15;
let gridH = 15;
let maxTry = 128;

let tipos = [
    { "horizontal": 1 },
    { "vertical": gridW },
    { "cruzado": gridW + 1 },
    { "cruzado2": gridW - 1 }
];

document.addEventListener("DOMContentLoaded", () => {
    if (localStorage.getItem("lastSaved")) {
        lastSaved = localStorage.getItem("lastSaved");
        const gridS = localStorage.getItem("gridSize");
        gridSize(gridS);
        document.getElementById("gridS").value = gridS;
        languageSRC = wordsPack[localStorage.getItem("languageSRC")];
        document.getElementById(languageSRC.id).classList.add("sel");

        createTable();
    } else {
        txtToArray(languageSRC);
    }
})

function txtToArray(index) {
    title.textContent = "";
    loading.textContent = UI_loading[index];
    if (localStorage.getItem("lastSaved") && !window.confirm("Deletar o jogo salvo? " + lastSaved)) {
        return
    } else {
        localStorage.clear();
    }

    languageSRC = wordsPack[index];

    wordsPack.forEach(function (i) {
        document.getElementById(i.id).classList.remove("sel");
    })

    document.getElementById(languageSRC.id).classList.add("sel");

    mainBody.classList.add("hidden");
    document.getElementById("opt").classList.add("hidden");

    fetch(languageSRC.path)
        .then((res) => res.text())
        .then((data) => {
            (arrayTXT = data.split(/\r?\n/));
        })

        .then(function () {
            createTable();

        })
}

function createTable() {
    caixas = [];
    valid_cList = [];
    dragg = false;
    clearInterval(timer);
    sec = 0;
    min = 0;
    hour = 0;

    let tempoSalvo = JSON.parse(localStorage.getItem("gameTime"));
    if (tempoSalvo) {
        sec = tempoSalvo.seconds;
        min = tempoSalvo.minutes;
        hour = tempoSalvo.hours;
    }

    timerOn();

    try {
        document.getElementById("bodyTable").remove()

        const bodyTable = document.createElement("table");
        bodyTable.id = "bodyTable";
        mainBody.appendChild(bodyTable);
        validWords = 0;
        findIt = [];
        let count = 0;

        while (count < gridH) {
            const tr = document.createElement("tr");
            tr.id = "tr" + count;
            bodyTable.appendChild(tr);

            for (let i = 0; i < gridW; i++) {
                const td = document.createElement("td");
                td.id = `TD${count * gridW + i}`
                td.textContent = alp[Math.floor(Math.random() * alp.length)];
                document.getElementById(tr.id).appendChild(td);
                caixas.push(td);
            }
            count++;
        }

        bodyTable.addEventListener("mousedown", (e) => {
            if (e.target.tagName === "TD") {
                e.preventDefault();
                const td = e.target;
                if (td.classList.contains("marcado") && !td.classList.contains("valido")) {
                    td.classList.remove("marcado");
                    td.style.backgroundColor = "";
                    td.style.color = "";
                    if (intervalId) clearInterval(intervalId);
                    checkWord("remove", td);
                } else {
                    td.classList.add("marcado");
                    td.style.backgroundColor = color;
                    td.style.color = textColor;
                    checkWord("add", td);
                }
                dragg = true;
            }
        });

        bodyTable.addEventListener("contextmenu", (e) => {
            if (e.target.tagName === "TD") {
                e.preventDefault();
            }
        });

        bodyTable.addEventListener("mouseup", (e) => {
            if (e.target.tagName === "TD") {
                playSound();
            }

            if (dragg) {
                startLoadBar();
                dragg = false;
            }

        });

        bodyTable.addEventListener("mouseover", (e) => {
            if (dragg && e.target.tagName === "TD") {
                const td = e.target;
                playSound();
                if (td.classList.contains("marcado") && !td.classList.contains("valido")) {
                    td.classList.remove("marcado");
                    td.style.backgroundColor = "";
                    td.style.color = "";
                    checkWord("remove", td);
                } else {
                    td.classList.add("marcado");
                    td.style.backgroundColor = color;
                    td.style.color = textColor;
                    checkWord("add", td);
                }
            }
        });

    } catch (err) {
        alert("Ocorreu uma falha! Tente novamente. > " + err);
        location.reload();
    } finally {
        if (localStorage.getItem("lastSaved")) {
            loadGame();
        } else {
            for (let i = 0; i < maxTry; i++) {
                validTD(tipos[Math.floor(Math.random() * tipos.length)]);
            }
        }

        document.getElementById("wordsLi").remove();

        const divLi = document.createElement("div");
        divLi.id = "wordsLi";
        mainBody.append(divLi);

        findIt.sort((a, b) =>
            a.localeCompare(b, undefined, { sensitivity: "base" })
        );

        findIt.forEach((name) => {
            const el = document.createElement("div");
            el.id = name;
            el.classList = "wordList";

            const details = document.createElement("details");

            const summary = document.createElement("summary");
            summary.textContent = name;

            summary.addEventListener("click", () => {
                summaryWord(summary.textContent);
            });

            const p = document.createElement("p");
            p.id = "summ_" + name;
            p.classList.add("hidden");

            details.appendChild(summary);
            details.appendChild(p);

            el.append(details);

            divLi.appendChild(el);
            validWords++;
        });
    }

    document.querySelectorAll("td").forEach(td => {
        td.classList.remove("horizontal", "vertical", "cruzado", "cruzado2", "marcado");
    })//debugar


    let w = 0;
    valid_cList.forEach(item => {
        if (item.found) {
            item.index.forEach(idx => {
                const td = document.getElementById(`TD${idx}`);
                if (td) {
                    td.classList.add("valido");
                    td.classList.remove("marcado");
                }
            });
            document.getElementById(item.word).style.opacity = "20%";
            document.getElementById(item.word).style.border = "1px solid green";
            w++
        }
    });

    if (w == valid_cList.length) {
        clearInterval(saveGameTime);
        vSoundPlay();
    }

    if (gridW >= 20) {
        document.getElementById("fontSize").value = 16;
    }

    fontSize(document.getElementById("fontSize").value);
    uiLanguage(languageSRC.id);
    loading.textContent = "";
    mainBody.classList.remove("hidden");
    document.getElementById("opt").classList.remove("hidden");
}

function validTD(tipo) {
    const tipoName = Object.keys(tipo)[0];
    const incremento = tipo[tipoName];
    let startPoint = caixas[Math.floor(Math.random() * caixas.length)];
    let text = arrayTXT[Math.floor(Math.random() * arrayTXT.length)];
    let index = Number(startPoint.id.replace("TD", ""));
    let valid = [];
    let validIndex = [];

    try {
        let reverse = Math.floor(Math.random() * 999) % 2 === 0;
        let displayText = text;
        if (reverse) {
            text = text.split("").reverse().join("");
        }

        if (tipoName === "horizontal" && Math.floor(index / gridW) !== Math.floor((index + text.length - 1) / gridW)) {
            throw new Error("não cabe na linha");
        }
        if (tipoName === "vertical" && index + (text.length - 1) * gridW >= caixas.length) {
            throw new Error("não cabe na coluna");
        }
        if (tipoName === "cruzado" && (Math.floor(index / gridW) + text.length - 1 >= gridH ||
            index + (text.length - 1) * (gridW + 1) >= caixas.length ||
            (index % gridW) + text.length - 1 >= gridW)) {
            throw new Error("não cabe na diagonal");
        }
        if (tipoName === "cruzado2" && (Math.floor(index / gridW) + text.length - 1 >= gridH ||
            index + (text.length - 1) * (gridW - 1) >= caixas.length ||
            (index % gridW) - (text.length - 1) < 0)) {
            throw new Error("não cabe na diagonal inversa");
        }

        Array.from(text).forEach((letter, i) => {
            let falseIndex = index + i * incremento;
            let td = document.getElementById(`TD${falseIndex}`);
            if (!td || (td.classList.length > 0 && td.textContent !== letter)) {
                throw new Error("incompatível");
            }
            valid.push({ td, letter });
            validIndex.push(falseIndex);
            td.classList.remove("horizontal", "vertical", "cruzado", "cruzado2");
            td.classList.add(tipoName);
        });

        valid.forEach(({ td, letter }) => {
            td.textContent = letter;
        });

        findIt.push(displayText);
        valid_cList.push({ word: displayText, found: false, index: reverse ? validIndex.reverse() : validIndex });
    } catch (err) {
        // console.log("Erro:", err.message);
        return;
    }
}
window.onbeforeprint = function () {
    document.title = `${document.getElementById("title").textContent} - ${new Date().toLocaleString()}`
}