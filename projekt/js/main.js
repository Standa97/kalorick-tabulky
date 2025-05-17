let zaznamy = JSON.parse(localStorage.getItem("zaznamy")) || [];

const formular = document.getElementById("formular");
const tabulka = document.getElementById("tabulka");
const tbody = document.getElementById("tbody");
const celkemSpan = document.getElementById("celkem");

function spocitejCelkem() {
    const celkem = zaznamy.reduce((součet, z) => součet + z.kalorie, 0);
    celkemSpan.textContent = celkem + " kcal";
}

function aktualizujTabulku() {
    tbody.innerHTML = "";
    zaznamy.forEach((z, index) => {
        const radek = document.createElement("tr");

        const jidloTd = document.createElement("td");
        jidloTd.textContent = z.jidlo;

        const kalorieTd = document.createElement("td");
        kalorieTd.textContent = z.kalorie;

        const akceTd = document.createElement("td");
        const btnSmazat = document.createElement("button");
        btnSmazat.textContent = "🗑️";
        btnSmazat.onclick = () => {
            zaznamy.splice(index, 1);
            ulozData();
        };
        akceTd.appendChild(btnSmazat);

        radek.appendChild(jidloTd);
        radek.appendChild(kalorieTd);
        radek.appendChild(akceTd);

        tbody.appendChild(radek);
    });

    spocitejCelkem();
}

function ulozData() {
    localStorage.setItem("zaznamy", JSON.stringify(zaznamy));
    aktualizujTabulku();
}

formular.addEventListener("submit", (e) => {
    e.preventDefault();

    const jidlo = document.getElementById("jidlo").value.trim();
    const kalorie = parseInt(document.getElementById("kalorie").value);

    if (jidlo && !isNaN(kalorie)) {
        zaznamy.push({ jidlo, kalorie });
        ulozData();
        formular.reset();
    }
});

aktualizujTabulku();
