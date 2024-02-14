const factors1 = [2, 3, 4, 5];
const factors2 = [2, 3, 4, 5, 6, 7, 8, 9,];
let factor1, factor2, answer;
let feedbackMessages = [];

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
        feedbackMessages.push(`Wrong. ${factor1} x ${factor2} = ${answer}`);
        showFeedback(`Wrong. ${factor1} x ${factor2} = ${answer}`, "wrong");
    }
}

function showFeedback(message, className) {
    const feedbackElement = document.getElementById("feedback");
    feedbackElement.textContent = message;
    feedbackElement.classList.remove("correct", "wrong");
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

userAnswerInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault(); // Prevent default form submission behavior
        checkAnswer();
        loadNextProblem(); // Load another problem when Enter is pressed
    }
});