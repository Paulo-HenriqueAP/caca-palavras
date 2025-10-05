function summaryWord(summaryIt) {
    const p = document.getElementById("summ_" + summaryIt);
    p.classList.toggle("hidden");//sem isso o print buga
    if (!p.textContent == "") return;
    const word = summaryIt;
    const url = `https://${languageSRC.id}.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(word)}`;

    p.textContent = UI_loading[languageSRC.index];

    fetch(url, {
        headers: {
            "User-Agent": "Caça palavras (https://paulo-henriqueap.github.io/caca-palavras/)"
        }
    })
        .then(response => {
            if (response.ok) {
                return response.json();
            } else {
                throw new Error("falha na consulta");
            }
        })
        .then(data => {
            const resultado = {
                definicao: data.extract,
                link: data.content_urls.desktop.page
            };

            p.innerHTML = resultado.definicao;

            const a = document.createElement("a");
            a.target = "_blank";
            a.classList = "aLink";
            a.innerHTML = "<br><br>Wikipédia";
            a.href = resultado.link;

            p.appendChild(a);

        })
        .catch(err => {
            p.textContent = ""
            const a = document.createElement("a");
            a.target = "_blank";
            a.classList = "aLink";
            a.href = `https://duckduckgo.com/?q=${encodeURIComponent(summaryIt)}`;
            a.textContent = summaryIt + " 🔎";
            p.appendChild(a);
        });
}

async function tempShare() {
    document.getElementById("wordsLi").classList.toggle("hiddenForPNG");

    const onScreen = [];

    onScreen.push({
        "time": document.getElementById("timer").textContent,
        "title": document.getElementById("title").textContent,
        "word": document.getElementById("tempWord").textContent
    }
    )

    const tempDiv = document.createElement("div");

    tempDiv.innerHTML =
        `<div id="timer" style="color:gray;  font-size: medium; opacity: 50%">${onScreen[0].time}</div>
         <h2 style="color: white;">${onScreen[0].title}</h2>
         <h2 id="tempWord">${onScreen[0].word}</h2>`

    document.getElementById("tShare").append(tempDiv)

    try {

        const canvas = await html2canvas(document.getElementById("main"), {
            backgroundColor: "#1e1e1e",
            useCORS: true,
            scale: 2
        });

        const dataUrl = canvas.toDataURL("image/png");

        const link = document.createElement("a");
        link.href = dataUrl;
        link.download = `caca-palavras - ${new Date().toLocaleString()}.png`
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    } catch (error) {
        console.error("Erro ao capturar imagem:", error);
        alert(error);
    }

    tempDiv.remove()
    document.getElementById("wordsLi").classList.toggle("hiddenForPNG");
}
