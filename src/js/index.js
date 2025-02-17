const alp = [
    "a", "b", "c", "d", "e", "f", "g", "h", "i",
    "j", "k", "l", "m", "n", "o", "p", "q", "r",
    "s", "t", "u", "v", "w", "x", "y", "z", "ç",
    'á', 'à', 'â', 'ã', 'é', 'ê', 'í', 'ó', 'ô',
    'õ', 'ú'
    //'á', 'à', 'â', 'ã', 'é', 'è', 'ê', 'ẽ', 'í',
    //'ì', 'î', 'ĩ', 'ó', 'ò', 'ô', 'õ', 'ú', 'ù',
    //'û', 'ũ', 'ý', 'ỳ', 'ŷ', 'ỹ'
];

let findIt = [];
let arrayTXT = [];
let word = alp[Math.floor(Math.random() * alp.length)];
let validWords = 0;

document.addEventListener("DOMContentLoaded", txtToArray("src/words/br.txt"));

function txtToArray(txtSrc) {
    validWords = 0;
    findIt = [];
    document.getElementById("bodyTable").remove();

    let table = document.createElement("table");
    table.id = "bodyTable";
    document.getElementById("main").appendChild(table)

    fetch(txtSrc)
        .then((res) => res.text())
        .then((data) => {
            (arrayTXT = data.split(/\r?\n/));

            let Hsize = 0;

            while (Hsize < 10) {
                const tr = document.createElement("tr");
                tr.id = "tr" + Hsize;
                Hsize++;
                table.appendChild(tr);

                if (Math.floor(Math.random() * 999) % 2 === 0) {
                    randomTD(tr.id)
                } else if (validWords < 5) {
                    createValidWord(tr.id)
                    validWords++
                } else {
                    randomTD(tr.id)
                }
            };
        })

        .then(function () {
            document.getElementById("wordsLi").remove();

            let ul = document.createElement("ul");
            ul.id = "wordsLi";
            document.getElementById("main").appendChild(ul);

            findIt.sort();

            findIt.forEach((function (name) {
                li = document.createElement("li");
                li.textContent = name;
                ul.appendChild(li)
            }))

            document.getElementById("main").classList.remove("hidden")
            transformL("MAIUSCULA");
        })

}

function createValidWord(idName) {
    text = arrayTXT[Math.floor(Math.random() * arrayTXT.length)];
    console.log(text)
    word = text;

    findIt.push(word)

    if (Math.floor(Math.random() * 999) % 2 === 0) {
        //console.log(word + " | antes")
        word = word.split("").reverse().join("")
        //console.log(word + " | depois")
    }

    startPoint = Math.floor(Math.random() * word.length)

    let beforeWord = "";

    for (i = 0; i < startPoint; i++) {
        beforeWord += alp[Math.floor(Math.random() * alp.length)];
    }

    beforeWord += word;
    word = beforeWord

    if (word.length < 23) {
        for (i = word.length; i < 23; i++) {
            word += alp[Math.floor(Math.random() * alp.length)];
        };
    }

    Array.from(word).forEach(singleLetter => {
        const td = document.createElement("td");
        td.textContent = singleLetter
        document.getElementById(idName).appendChild(td);
        //td.classList.add("valido")
    });

};


function randomTD(idName) {
    for (let i = 0; i < 23; i++) {
        w = alp[Math.floor(Math.random() * alp.length)]
        word += w;

        const td = document.createElement("td");

        td.textContent = alp[Math.floor(Math.random() * alp.length)];

        document.getElementById(idName).appendChild(td);
        //td.classList.add("invalido")
    };
    //console.log(word)
};

function transformL(makeIt) {
    document.body.classList.remove("upper", "low")
    makeIt == "MAIUSCULA" ? document.body.classList.add("upper") : document.body.classList.add("low");
};

document.addEventListener("keydown", function (event) {
    event.key == "F4" ? window.print() : null;
})