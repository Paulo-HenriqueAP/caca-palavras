function changeFont(fontName) {
    const family = fontName.getAttribute('data-font') || fontName.textContent;

    document.querySelectorAll("td").forEach(td => {
        td.style.fontFamily = family
    })

    document.getElementById("wordsLi").querySelectorAll("summary").forEach(li => {
        li.style.fontFamily = family
    })

    document.querySelectorAll("#fontList li").forEach(li => {
        li.classList.remove("sel");
    });

    fontName.classList.add("sel");
}

const turnBold = () => {
    document.getElementById("bodyTable").classList.toggle("bold");
    document.getElementById("wordsLi").classList.toggle("bold");
}

const fontSize = (size) => {
    if (size == "default") { size = 24; document.getElementById("fontSize").value = 24; }

    document.getElementById("fontPX").textContent = size;

    document.querySelectorAll("td").forEach(td => {
        td.style.fontSize = size + "px";
    })
}

const changeMaxTry = (m, el) => {
    maxTry = m

    for (i = 0; i < 3; i++) {
        document.getElementById("c" + i).classList.remove("sel");
    }

    document.getElementById(el).classList.add("sel");
}

const gridSize = (size) => {
    size = Math.max(5, Math.min(100, size));

    gridW = size;
    gridH = size;

    tipos = [
        { "horizontal": 1 },
        { "vertical": gridW },
        { "cruzado": gridW + 1 },
        { "cruzado2": gridW - 1 }
    ];
}

function toggleFullscreen() {
    if (!document.fullscreenElement) {
        document.documentElement.requestFullscreen();
    } else {
        document.exitFullscreen?.();
    }
    document.getElementById("fullscreenButton").classList.toggle("sel")
}

const UI_loading = [
    "Loading...",
    "Cargando...",
    "Chargement...",
    "Caricamento...",
    "Carregando...",
    "Laddar..."
]

function uiLanguage(idioma) {
    const titulo = document.getElementById("title");
    //const minuscula = document.getElementById("lowerCase");
    //const bordas = document.getElementById("borderOn");
    //const imprimir = document.getElementById("printButton");
    const fonte = document.getElementById("fh3");
    const geracaoPalavras = document.getElementById("gridSizeSpan");
    const poucas = document.getElementById("c0");
    const normal = document.getElementById("c1");
    const muitas = document.getElementById("c2");
    const largura = document.getElementById("ww");
    const altura = document.getElementById("hh");
    const validaProx = document.getElementById("info_wh");

    const UI_translations = {
        "en": {
            UI_titleName: `find ${validWords} words english`,
            UI_lowerCase: "lowercase",
            UI_borders: "borders",
            UI_print: "print",
            UI_font: "font",
            UI_bold: "bold",
            UI_wordSettings: "word settings",
            UI_wordS1: "few",
            UI_wordS2: "normal",
            UI_wordS3: "many",
            UI_wid: "width",
            UI_hei: "height",
            UI_info1: "* valid on next",
        },
        "es": {
            UI_titleName: `busca ${validWords} palabras español`,
            UI_lowerCase: "minúscula",
            UI_borders: "bordes",
            UI_print: "imprimir",
            UI_font: "fuente",
            UI_bold: "negrita",
            UI_wordSettings: "opciones de palabras",
            UI_wordS1: "poco",
            UI_wordS2: "normal",
            UI_wordS3: "muchas",
            UI_wid: "anchura",
            UI_hei: "altura",
            UI_info1: "* válido en la próx",
        },

        "fr": {
            UI_titleName: `trouve ${validWords} mots français`,
            UI_lowerCase: "minuscule",
            UI_borders: "bords",
            UI_print: "imprimer",
            UI_font: "police",
            UI_bold: "gras",
            UI_wordSettings: "paramètres des mots",
            UI_wordS1: "peu",
            UI_wordS2: "normal",
            UI_wordS3: "beaucoup",
            UI_wid: "largeur",
            UI_hei: "hauteur",
            UI_info1: "* valable à la prochaine",
        },
        "it": {
            UI_titleName: `ricerca ${validWords} parole in italiano`,
            UI_lowerCase: "minuscola",
            UI_borders: "bordi",
            UI_print: "stampa",
            UI_font: "carattere",
            UI_bold: "grassetto",
            UI_wordSettings: "impostazioni parole",
            UI_wordS1: "poche",
            UI_wordS2: "normale",
            UI_wordS3: "tante",
            UI_wid: "larghezza",
            UI_hei: "altezza",
            UI_info1: "* valido sul prossimo",
        },

        "pt": {
            UI_titleName: `caça ${validWords} palavras brasileiro`,
            UI_lowerCase: "minúscula",
            UI_borders: "bordas",
            UI_print: "imprimir",
            UI_font: "fonte",
            UI_bold: "negrito",
            UI_wordSettings: "geração de palavras",
            UI_wordS1: "pouco",
            UI_wordS2: "normal",
            UI_wordS3: "muitas",
            UI_wid: "largura",
            UI_hei: "altura",
            UI_info1: "* válido no próx",
        },
        
        "sv": {
            UI_titleName: `hitta ${validWords} ord på svenska`,
            UI_lowerCase: "gemener",
            UI_borders: "ramar",
            UI_print: "skriv ut",
            UI_font: "typsnitt",
            UI_bold: "fetstil",
            UI_wordSettings: "ordinställningar",
            UI_wordS1: "få",
            UI_wordS2: "normal",
            UI_wordS3: "många",
            UI_wid: "bredd",
            UI_hei: "höjd",
            UI_info1: "* gäller nästa gång"
        }

    };


    titulo.textContent = UI_translations[idioma].UI_titleName;
    //minuscula.textContent = UI_translations[idioma].UI_lowerCase;
    //bordas.textContent = UI_translations[idioma].UI_borders;
    //imprimir.textContent = UI_translations[idioma].UI_print;
    fonte.textContent = UI_translations[idioma].UI_font;
    geracaoPalavras.textContent = UI_translations[idioma].UI_wordSettings;
    poucas.textContent = UI_translations[idioma].UI_wordS1
    normal.textContent = UI_translations[idioma].UI_wordS2;
    muitas.textContent = UI_translations[idioma].UI_wordS3;
    largura.textContent = UI_translations[idioma].UI_wid;
    altura.textContent = UI_translations[idioma].UI_hei;
    validaProx.textContent = UI_translations[idioma].UI_info1
}