let gameBoard = document.querySelector(".gameBoard");
let scoreElement = document.querySelector(".score");
let highScoreElement = document.querySelector(".maxscore");
let controls = document.querySelectorAll(".controls i");

let gameOver = false;
let foodX, foodY;
let snakeX = 5, snakeY = 5;
let velocityX = 0, velocityY = 0;
let score = 0;
let highScore = localStorage.getItem("highScore") ? parseInt(localStorage.getItem("highScore")) : 0;  // Initialize high score
let snakeBody = [];
let setIntervalID;

// Display the initial high score when the game loads
highScoreElement.innerHTML = `High Score : ${highScore}`;

const changeFood = () => {
    foodX = Math.floor(Math.random() * 30) + 1;
    foodY = Math.floor(Math.random() * 30) + 1;
};

const GameOverfunc = () => {
    clearInterval(setIntervalID);
    alert("Game Over! You touched the boundary!!");
    if (score > highScore) {
        highScore = score;
        localStorage.setItem("highScore", JSON.stringify(highScore));  // Save new high score
    }
    location.reload();  // Reload the page to restart the game
};

const startGame = () => {
    if (gameOver) {
        return GameOverfunc();
    }

    let foodHTML = `<div class="food" style="grid-area: ${foodX}/${foodY};"></div>`;

    // Snake eats food
    if (snakeX === foodX && snakeY === foodY) {
        changeFood();
        snakeBody.push([foodX, foodY]);  // Add new part to the snake
        score++;
        scoreElement.innerHTML = `Score : ${score}`;

        // Update high score if the current score is higher
        if (score > highScore) {
            highScore = score;
            localStorage.setItem("highScore", JSON.stringify(highScore));
            highScoreElement.innerHTML = `High Score : ${highScore}`;
        }
    }

    // Move the snake's body
    for (let i = snakeBody.length - 1; i > 0; i--) {
        snakeBody[i] = snakeBody[i - 1];
    }
    snakeBody[0] = [snakeX, snakeY];

    snakeX += velocityX;
    snakeY += velocityY;

    // Check for wall collisions
    if (snakeX <= 0 || snakeX > 30 || snakeY <= 0 || snakeY > 30) {
        gameOver = true;
    }

    // Render the snake and check for self-collision
    for (let i = 0; i < snakeBody.length; i++) {
        foodHTML += `<div class="snake" style="grid-area: ${snakeBody[i][0]}/${snakeBody[i][1]};"></div>`;
        if (i !== 0 && snakeBody[0][0] === snakeBody[i][0] && snakeBody[0][1] === snakeBody[i][1]) {
            gameOver = true;
        }
    }

    gameBoard.innerHTML = foodHTML;
};

changeFood();
setIntervalID = setInterval(startGame, 250);

// Handle arrow key presses
document.addEventListener("keydown", (e) => {
    let moved = false;
    if (e.key === "ArrowDown" && velocityX !== -1) {
        velocityX = 1;
        velocityY = 0;
        moved = true;
    } else if (e.key === "ArrowUp" && velocityX !== 1) {
        velocityX = -1;
        velocityY = 0;
        moved = true;
    } else if (e.key === "ArrowLeft" && velocityY !== 1) {
        velocityX = 0;
        velocityY = -1;
        moved = true;
    } else if (e.key === "ArrowRight" && velocityY !== -1) {
        velocityX = 0;
        velocityY = 1;
        moved = true;
    }
    if (moved) {
        startGame();  // Trigger movement immediately
    }
});

controls.forEach((control)=>{
    control.addEventListener("click",()=>{
        let keypress = control.getAttribute("id");
        let moved = false;
        if (keypress === "ArrowDown" && velocityX !== -1) {
            velocityX = 1;
            velocityY = 0;
            moved = true;
        } else if (keypress === "ArrowUp" && velocityX !== 1) {
            velocityX = -1;
            velocityY = 0;
            moved = true;
        } else if (keypress === "ArrowLeft" && velocityY !== 1) {
            velocityX = 0;
            velocityY = -1;
            moved = true;
        } else if (keypress === "ArrowRight" && velocityY !== -1) {
            velocityX = 0;
            velocityY = 1;
            moved = true;
        }
        if (moved) {
            startGame();  // Trigger movement immediately
        }
    })
})