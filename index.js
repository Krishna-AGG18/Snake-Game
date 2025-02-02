//JS for Snake 
let gameBoard = document.querySelector(".gameBoard");
let foodX, foodY;
let snakeX = 5, snakeY = 5;
const changeFood = ()=>{
    foodX = Math.floor(Math.random()*30) + 1;
    foodY = Math.floor(Math.random()*30) + 1;
}
const startGame = ()=>{
    let foodHTML = `<div class="food" style="grid-area: ${foodX}/${foodY};"></div>`;
    foodHTML+= `<div class="snake" style="grid-area: ${snakeX}/${snakeY};"></div>`;
    gameBoard.innerHTML = foodHTML;
}

changeFood();
startGame();
document.addEventListener("keydown",(e)=>{
    if(e.key === "ArrowDown"){
        snakeY += 1;
    }else if(e.key === "ArrowUp"){

    }else if(e.key === "ArrowLeft"){

    }else if(e.key === "ArrowRight"){

    }
})