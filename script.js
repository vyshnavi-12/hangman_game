// Word list
const words = ["javascript", "python", "ruby", "java", "csharp"];

// Game variables
let word, guessedLetters, mistakes, maxMistakes;

// Canvas variables
const hangmanCanvas = document.getElementById("hangman-canvas");
const ctx = hangmanCanvas.getContext("2d");

// Game elements
const wordContainer = document.getElementById("word-container");
const messageContainer = document.getElementById("message");
const letterInput = document.getElementById("letter-input");
const guessButton = document.getElementById("guess-button");

// Draw the hangman figure
function drawHangman(mistakes) {
    ctx.clearRect(0, 0, hangmanCanvas.width, hangmanCanvas.height);
    ctx.beginPath();
    ctx.lineWidth = 5;
    ctx.strokeStyle = "#333333";

    // Draw the base
    ctx.moveTo(50, 350);
    ctx.lineTo(350, 350);

    // Draw the upright
    ctx.moveTo(100, 350);
    ctx.lineTo(100, 50);

    // Draw the top beam
    ctx.moveTo(100, 50);
    ctx.lineTo(250, 50);

    // Draw the hangman figure based on mistakes
    if (mistakes > 0) {
        // Draw the head
        ctx.moveTo(250, 70);
        ctx.arc(250, 70, 20, 0, Math.PI * 2);
    }
    if (mistakes > 1) {
        // Draw the body
        ctx.moveTo(250, 90);
        ctx.lineTo(250, 230);
    }
    if (mistakes > 2) {
        // Draw the left arm
        ctx.moveTo(250, 150);
        ctx.lineTo(210, 120);
    }
    if (mistakes > 3) {
        // Draw the right arm
        ctx.moveTo(250, 150);
        ctx.lineTo(290, 120);
    }
    if (mistakes > 4) {
        // Draw the left leg
        ctx.moveTo(250, 230);
        ctx.lineTo(210, 280);
    }
    if (mistakes > 5) {
        // Draw the right leg
        ctx.moveTo(250, 230);
        ctx.lineTo(290, 280);
    }
    ctx.stroke();
}

// Update the word display
function updateWordDisplay() {
    let displayWord = "";
    for (let i = 0; i < word.length; i++) {
        if (guessedLetters.includes(word[i])) {
            displayWord += word[i] + " ";
        } else {
            displayWord += "_ ";
        }
    }
    wordContainer.textContent = displayWord.trim();
}

// Check if the game is over
function checkGameOver() {
    if (mistakes >= maxMistakes) {
        messageContainer.textContent = `You lost! The word was "${word}".`;
        guessButton.disabled = true;
        letterInput.disabled = true;
    } else if (!wordContainer.textContent.includes("_")) {
        messageContainer.textContent = "You won!";
        guessButton.disabled = true;
        letterInput.disabled = true;
    }
}

// Restart the game
function restartGame() {
    word = words[Math.floor(Math.random() * words.length)];
    guessedLetters = [];
    mistakes = 0;
    maxMistakes = 6;
    updateWordDisplay();
    drawHangman(mistakes);
    messageContainer.textContent = "";
    guessButton.disabled = false;
    letterInput.disabled = false;
    letterInput.value = "";
}

// Event listener for the guess button
guessButton.addEventListener("click", () => {
    const letter = letterInput.value.toLowerCase();
    if (letter.length === 1 && /^[a-z]$/.test(letter)) {
        if (!guessedLetters.includes(letter)) {
            guessedLetters.push(letter);
            if (!word.includes(letter)) {
                mistakes++;
                drawHangman(mistakes);
            }
            updateWordDisplay();
            checkGameOver();
        }
    }
    letterInput.value = "";
});

// Start the game
restartGame();