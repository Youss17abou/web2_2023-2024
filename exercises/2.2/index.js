const COUNTER_P = document.querySelector("#nbClic");
const MESSAGE_P = document.querySelector("#message");
let clickCounter = 0;

window.addEventListener("click", () => {
    clickCounter++;
    COUNTER_P.innerText = clickCounter;
    if (clickCounter === 9) {
        MESSAGE_P.textContent = "Vous êtes passé maître en l'art du clic !";
    } else if (clickCounter === 5) {
        MESSAGE_P.textContent = "Bravo, bel échauffement !";
    }
});



