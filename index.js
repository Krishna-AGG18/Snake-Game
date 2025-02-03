//JS for Snake 
let gameBoard = document.querySelector(".gameBoard");
let foodX, foodY;
let snakeX = 5, snakeY = 5;
let velocityX = 0, velocityY = 0;
const changeFood = ()=>{
    foodX = Math.floor(Math.random()*30) + 1;
    foodY = Math.floor(Math.random()*30) + 1;
}
const startGame = ()=>{
    let foodHTML = `<div class="food" style="grid-area: ${foodX}/${foodY};"></div>`;
    snakeX += velocityX;
    snakeY += velocityY;
    if(snakeX === foodX && snakeY === foodY){
        changeFood();
    }
    foodHTML+= `<div class="snake" style="grid-area: ${snakeX}/${snakeY};"></div>`;
    gameBoard.innerHTML = foodHTML;
}

changeFood();
setInterval(startGame , 250);
document.addEventListener("keydown",(e)=>{
    let moved = false;
    if(e.key === "ArrowDown" && velocityX != -1){
        velocityX = 1;
        velocityY = 0;
        moved = true;
    }else if(e.key === "ArrowUp" && velocityX !=1){
        velocityX = -1;
        velocityY = 0;
        moved = true;
    }else if(e.key === "ArrowLeft" && velocityY !=1){
        velocityX = 0;
        velocityY = -1;
        moved = true;
    }else if(e.key === "ArrowRight" && velocityY != -1){
        velocityX = 0;
        velocityY = 1;
        moved = true;
    }
    if (moved) {
        startGame();  // Only run if an arrow key was pressed
    }
})