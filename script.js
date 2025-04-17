function disabledElements() {
    choiceInput.style.cursor = "not-allowed";
    choiceInput.disabled = true;

    submit.style.cursor = "not-allowed";
    submit.classList.remove("hoverables");
    submit.disabled = true;
    reset.style.cursor = "pointer";
    reset.classList.add("hoverables");
    reset.disabled = false;
    
}

function goodAnswer() {
    message.innerHTML = `Bravo! Vous avez trouvé le nombre mystère ${mystery} en ${attempts} essais.`;
    message.style.color = "green";
    choiceInput.value = "";

    disabledElements();
}


function valid() {
    alertMessage.innerHTML = "";
    if (choiceInput.value == "") {
        alertMessage.innerHTML = "Veuillez entrer un nombre !";
        return;
    }
    
    let choice = parseInt(choiceInput.value, 10);
    attempts++;
    score.innerHTML = attempts;
    
    if (choice == mystery) {
        goodAnswer();
    } else if (choice < mystery) {
        message.innerHTML = "Trop petit!";
        message.style.color = "red";
    } else {
        message.innerHTML = "Trop grand!";
        message.style.color = "red";
    }
}


function resetGame() {
    mystery = Math.ceil(Math.random() * 100);
    
    if (scoreMin == 0) {
        scoreMin = attempts;
    } else if (attempts < scoreMin){
        scoreMin = attempts;
    }
    
    result.innerHTML = scoreMin;
    localStorage.setItem("scoreMin", scoreMin);

    attempts = 0;

    score.innerHTML = attempts;
    message.innerHTML = "";

    choiceInput.style.cursor = "default";
    choiceInput.disabled = false;

    submit.style.cursor = "pointer";
    submit.classList.add("hoverables");
    submit.disabled = false;

    reset.style.cursor = "not-allowed";
    reset.classList.remove("hoverables");
    reset.disabled = true;


}



const choiceInput = document.getElementById("guess");
const message = document.getElementById("message");
const submit = document.getElementById("submit");
const reset = document.getElementById("reset");
const alertMessage = document.getElementById("alert");
const score = document.getElementById("score");
const result = document.getElementById("result");

let mystery = Math.ceil(Math.random() * 100); // 1 à 100 pareil que Math.floor(Math.random() * 100) + 1
let attempts = 0;
let scoreMin = 0;

if (localStorage.getItem("scoreMin") !== null) {
    scoreMin = parseInt(localStorage.getItem("scoreMin"), 10);
    result.innerHTML = scoreMin;
}


document.addEventListener("keydown", e => {
    if (e.key === "Enter") {
        if (submit.disabled) {
            resetGame();
        } else {
            valid();
        }
    }

});
