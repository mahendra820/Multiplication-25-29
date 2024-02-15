const factors1 = [2, 3, 4, 5, 6, 7, 8, 9];
const factors2 = [2, 3, 4, 5, 6, 7, 8, 9,];
let factor1, factor2, answer;
let feedbackMessages = [];

// Update factors1 based on user selections
function updateFactors1() {
    const selectedFactors = Array.from(document.querySelectorAll("#factor2Select input:checked")).map(input => parseInt(input.value));
    factors1.length = 0; // Clear factors1 array
    factors1.push(...selectedFactors); // Add selected factors to factors1
}

// Call updateFactors1 whenever selection changes
document.querySelectorAll("#factor2Select input").forEach(input => {
    input.addEventListener("change", updateFactors1);
});

function generateQuestion() {
    factor1 = factors1[Math.floor(Math.random() * factors1.length)];
    factor2 = factors2[Math.floor(Math.random() * factors2.length)];
    answer = factor1 * factor2;

    document.getElementById("factor1").textContent = factor1;
    document.getElementById("factor2").textContent = factor2;
    document.getElementById("userAnswer").value = ""; // Clear previous answer

    // Show feedback of previous question
    if (feedbackMessages.length > 0) {
        showFeedback(feedbackMessages.shift());
    }
}

function checkAnswer() {
    const userAnswer = parseInt(document.getElementById("userAnswer").value);

    if (userAnswer === answer) {
        feedbackMessages.push("Correct!");
        showFeedback("Correct!", "correct");
    } else {
        feedbackMessages.push(`Incorrect. ${factor1} x ${factor2} = ${answer}`);
        showFeedback(`Incorrect. ${factor1} x ${factor2} = ${answer}`, "Incorrect");
    }
}

function showFeedback(message, className) {
    const feedbackElement = document.getElementById("feedback");
    feedbackElement.textContent = message;
    feedbackElement.classList.remove("correct", "Incorrect");
    feedbackElement.classList.add(className);
}

function loadNextProblem() {
    generateQuestion();
}

document.addEventListener("DOMContentLoaded", generateQuestion);

const submitButton = document.getElementById("submitButton");
const userAnswerInput = document.getElementById("userAnswer");

submitButton.addEventListener("click", () => {
    checkAnswer();
    loadNextProblem(); // Load another problem when submit button is clicked
});

userAnswerInput.addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
        event.preventDefault(); // Prevent default form submission behavior
        checkAnswer();
        loadNextProblem(); // Load another problem when Enter is pressed
    }
});
