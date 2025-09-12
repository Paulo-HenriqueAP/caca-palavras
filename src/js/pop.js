const popSounds = [
    "src/pop/pop1.ogg",
    "src/pop/pop2.ogg",
    "src/pop/pop3.ogg",
    "src/pop/pop4.ogg",
    "src/pop/pop5.ogg",
    "src/pop/pop6.ogg",
    "src/pop/pop7.ogg",
    "src/pop/pop8.ogg",
]

const trueSounds = [
    "src/pop/true.mp3",
    "src/pop/true2.wav",
]

const winSounds = [
    "src/pop/victory/vic1.mp3",
    "src/pop/victory/vic2.mp3",
    "src/pop/victory/vic3.mp3",
    "src/pop/victory/vic4.mp3",
    "src/pop/victory/vic5.mp3",
    "src/pop/victory/vic6.ogg",
    "src/pop/victory/vic7.wav",

]

let soundOn = true;

//https://opengameart.org/
//https://pixabay.com/users/floraphonic-38928062/

const breakLineSound = new Audio("src/pop/fail.wav");
const loadTrueSounds = trueSounds.map(src => new Audio(src));
const loadPopSounds = popSounds.map(src => new Audio(src));

let color;
let textColor;
randomColors();

function playSound() {
    if (soundOn) {
        const randomPop = Math.floor(Math.random() * loadPopSounds.length);
        loadPopSounds[randomPop].play();
    }

}

const tSoundPlay = () => {
    const randomTrueS = Math.floor(Math.random() * loadTrueSounds.length);
    loadTrueSounds[randomTrueS].play();
}

const vSoundPlay = () => {
    if (soundOn) {
        const win = new Audio(winSounds[Math.floor(Math.random() * winSounds.length)])
        win.play()
    }
    clearInterval(timer);
    tempWord.textContent = "🏆🥇🎉";
    timerSpan.textContent = `${hour.toString().padStart(2, "0")} : ${min.toString().padStart(2, "0")} : ${sec.toString().padStart(2, "0")}`;
}

function randomColors() {
    const R = Math.floor(Math.random() * 256);
    const G = Math.floor(Math.random() * 256);
    const B = Math.floor(Math.random() * 256);
    const finalColor = `rgb(${R},${G},${B})`;

    const luminance = 0.299 * R + 0.587 * G + 0.114 * B;
    textColor = luminance > 128 ? "#000000" : "#FFFFFF";
    color = finalColor;

    /* 
    ativar rainbow
    const { color, textColor } = randomColors();
    const textColor = luminance > 128 ? "#000000" : "#FFFFFF";
 
    return {
        color: finalColor,
        textColor: textColor
    };
    */

}

function checkWord(tipo, td) {
    tempWord.textContent = "> ";

    if (tipo == "add") {
        tempArr.push(td);

        if (td.classList.contains("valido")) {
            td.style.backgroundColor = "#000000";
            td.style.color = "white";
        }
    } else {
        tempArr = tempArr.filter(function (it) {
            return it !== td;
        })
    }

    tempArr.forEach(lett => {
        tempWord.textContent += lett.textContent
    })

    bar = 0;
    if (intervalId) clearInterval(intervalId);
}