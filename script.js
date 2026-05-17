let quiz = [];
let index = 0;
let showAnswer = false;
let answered = 0;

const card = document.getElementById("card");
const btn = document.getElementById("btn");
const progressText = document.getElementById("progressText");
const barFill = document.getElementById("barFill");

// JSON laden
fetch("questions.json")
    .then(res => res.json())
    .then(data => {
        quiz = data;
        update();
    });

function formatAnswer(answer) {
    let text = "";

    if (answer.definition) {
        text += "<b>Definition:</b><br>" + answer.definition + "<br><br>";
    }

    if (answer.eigenschaften) {
        text += "<b>Eigenschaften:</b><br>" + answer.eigenschaften.join("<br>") + "<br><br>";
    }

    if (answer.beispiel) {
        text += "<b>Beispiel:</b><br><pre>" + answer.beispiel + "</pre>";
    }

    return text;
}

function update() {
    const total = quiz.length;

    if (total === 0) {
        card.textContent = "Lade Fragen...";
        return;
    }

    if (index >= total) {
        card.textContent = "Fertig!";
        progressText.textContent = `Durchlaufen: ${answered} von ${total}`;
        barFill.style.width = "100%";
        btn.style.display = "none";
        return;
    }

    progressText.textContent = `Frage ${index + 1} von ${total} | Durchlaufen: ${answered}`;

    const percent = (answered / total) * 100;
    barFill.style.width = percent + "%";

    card.innerHTML = showAnswer
        ? formatAnswer(quiz[index].answer)
        : quiz[index].question;

    btn.textContent = showAnswer ? "Nächste Frage" : "Antwort anzeigen";
}

btn.addEventListener("click", () => {
    if (!showAnswer) {
        showAnswer = true;
    } else {
        showAnswer = false;
        index++;
        answered++;
    }
    update();
});