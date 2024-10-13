// Get necessary DOM elements for the game
const gameBoard = document.querySelector(".container"),   // Main container for the game
    userChoiceImg = document.querySelector(".user_result img"),  // Image element to show the user's choice
    pcChoiceImg = document.querySelector(".pc_result img"),      // Image element to show the PC's choice
    gameResultText = document.querySelector(".result"),          // Text element to display the game result
    choiceButtons = document.querySelectorAll(".option_image");  // List of option buttons (rock, paper, scissors)
    userScoreDisplay = document.getElementById("userScore"),     // User score display element
    pcScoreDisplay = document.getElementById("pcScore");         // PC score display element

// Initialize user and PC scores
let userScore = 0;
let pcScore = 0;

// Add click event listeners to each option button
choiceButtons.forEach((button, index) => {
    button.addEventListener("click", (e) => {
        // Mark the clicked option as active
        button.classList.add("active");

        // Reset both user and PC images to rock at the beginning of the round
        userChoiceImg.src = pcChoiceImg.src = "assets/rock.png";
        gameResultText.textContent = "Waiting...";  // Display "Waiting..." during the animation phase

        // Loop through all choice buttons and remove "active" class from the others
        choiceButtons.forEach((otherButton, otherIndex) => {
            if (index !== otherIndex) {
                otherButton.classList.remove("active");  // Remove active state from non-selected options
            }
        });

        // Add "start" class to trigger shaking animation
        gameBoard.classList.add("start");

        // Set a timeout to simulate the delay for the result (like in a real game)
        let time = setTimeout(() => {
            gameBoard.classList.remove("start");  // Remove the shaking animation after the delay

            // Get the clicked option's image and set it as the user's choice
            let userChoiceSrc = e.target.querySelector("img").src;
            userChoiceImg.src = userChoiceSrc;

            // Generate a random choice for the PC (0 = rock, 1 = paper, 2 = scissors)
            let pcRandomIndex = Math.floor(Math.random() * 3);
            let pcImages = ["assets/rock.png", "assets/paper.png", "assets/scissors.png"];
            pcChoiceImg.src = pcImages[pcRandomIndex];  // Set PC's choice image

            // Map random PC choice to a letter (R = rock, P = paper, S = scissors)
            let pcChoice = ["R", "P", "S"][pcRandomIndex]; 
            // Map user's choice (based on the clicked index)
            let userChoice = ["R", "P", "S"][index];

            // Define all possible outcomes based on the user's and PC's choices
            let outcomes = {
                RR: "Draw ┐(￣ヘ￣)┌",  // Rock vs Rock
                RP: "PC Wins... (」°ロ°)」	",    // Rock vs Paper (PC wins)
                RS: "User Wins! °˖✧◝(⁰▿⁰)◜✧˖°",  // Rock vs Scissors (User wins)
                PP: "Draw ┐(￣ヮ￣)┌",  // Paper vs Paper
                PR: "User Wins! ＼(＾▽＾)／",  // Paper vs Rock (User wins)
                PS: "PC Wins... ＼(º □ º l|l)/",    // Paper vs Scissors (PC wins)
                SS: "Draw ┐( ˘ ､ ˘ )┌",  // Scissors vs Scissors
                SP: "User Wins! ٩(｡•́‿•̀｡)۶",  // Scissors vs Paper (User wins)
                SR: "PC Wins... (╥﹏╥)"     // Scissors vs Rock (PC wins)
            };

            // Determine and display the result
            let resultValue = outcomes[userChoice + pcChoice];  // Get the result based on the combination
            gameResultText.textContent = resultValue;  // Display the result with the desired text and emoticons

            // Update scores based on the result
            if (resultValue.includes("User Wins!")) {
                userScore++;  // Increment user score
                userScoreDisplay.textContent = userScore;  // Update user score display
            } else if (resultValue.includes("PC Wins...")) {
                pcScore++;  // Increment PC score
                pcScoreDisplay.textContent = pcScore;  // Update PC score display
            }

        }, 2500);  // 2.5-second delay to simulate the "thinking" phase of the game
    });
});