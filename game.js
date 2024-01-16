let userScore = 0;
let compScore = 0;

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");

const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");

const clickSound = new Audio("sound2.mp3"); // Replace with the actual path to your sound file

// Check if Vibration API is supported
const isVibrationSupported = 'vibrate' in navigator;

const genCompChoice = () => {
    const options = ["rock", "paper", "scissors"];
    const randIdx = Math.floor(Math.random() * 3);
    return options[randIdx];
};

const drawGame = () => {
    msg.innerText = "Draw! Play again";
    msg.style.backgroundColor = "#081b31";
};

const showWinner = (userWin, userChoice, compChoice) => {
    if (userWin) {
        userScore++;
        userScorePara.innerText = userScore;
        msg.innerText = `Won! ${userChoice} beats ${compChoice}`;
        msg.style.backgroundColor = "green";
    } else {
        compScore++;
        compScorePara.innerText = compScore;
        msg.innerText = `Lost! ${compChoice} beats ${userChoice}`;
        msg.style.backgroundColor = "red";
    }
};

const playGame = (userChoice) => {
    // Play the click sound
    clickSound.play();

    // Vibrate for 100 milliseconds if supported
    if (isVibrationSupported) {
        navigator.vibrate(100);
    }

    // Generate computer choice
    const compChoice = genCompChoice();

    if (userChoice === compChoice) {
        // Draw Game
        drawGame();
    } else {
        let userWin = true;
        if (userChoice === "rock") {
            // Scissors, Paper
            userWin = compChoice === "paper" ? false : true;
        } else if (userChoice === "paper") {
            // Rock, Scissors
            userWin = compChoice === "scissors" ? false : true;
        } else {
            // Rock, Paper
            userWin = compChoice === "rock" ? false : true;
        }
        showWinner(userWin, userChoice, compChoice);
    }
};

choices.forEach((choice) => {
    choice.addEventListener("click", () => {
        const userChoice = choice.getAttribute("id");
        playGame(userChoice);
    });
});

// Check if Vibration API is supported
if (!isVibrationSupported) {
    console.log("Vibration is not supported on this device.");
}
