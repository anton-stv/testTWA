let secretNumber = Math.floor(Math.random() * 100) + 1;

function checkGuess() {
    const guess = Number(document.getElementById('guessInput').value);
    const message = document.getElementById('message');
    if (guess === secretNumber) {
        message.textContent = "Congratulations! You've guessed the right number!";
    } else if (guess < secretNumber) {
        message.textContent = "Try a higher number!";
    } else {
        message.textContent = "Try a lower number!";
    }
}
