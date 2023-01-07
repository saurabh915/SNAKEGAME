//game constants

let inputDir = {x:0,y:0};
const  foodSound = new Audio('food.mp4');
const gameOverSound = new Audio('over.wav');
const music = new Audio('gameOn.mp3');
const move = new Audio('move.mp3')
const speed = 5;
let previousPaintTime =0;
let snakeArr = [{x:13,y:15} ]
let food = {x:12,y:4}
let score =0;
let hiscore =0;
//game functions
function main(ctime) {
    // console.log(ctime)
    window.requestAnimationFrame(main)
    if((ctime-previousPaintTime)/1000<1/speed){
        return;
    }
    previousPaintTime = ctime;
    gameEngine();
}
function isCollide(snakeArr) {
    if(snakeArr[0].x>=18 || snakeArr[0].x<=0 || snakeArr[0].y >=18 || snakeArr[0].y<=0){
        console.log(2);
        return true;
    }
         for (let i = 1; i < snakeArr.length; i++) {
      if(snakeArr[i].x === snakeArr[0].x && snakeArr[i].y === snakeArr[0].y){
        console.log(1);
        return true;
      }
       
    }
 
    return false;
}
function gameEngine(params) {
    //part1: updating snake variable
    if (isCollide(snakeArr)) {
        gameOverSound.play();
        music.pause();
        inputDir= {
            x:0,
            y:0
        }
        alert("Game over press any key to play again")
        snakeArr =[{x:13,y:5}]
        music.play();
        score =0;
        scoreBoard.innerHTML = "score:"+score;
    }

    //if you have eaten the food then increment the score and regenerate food

    if(snakeArr[0].x == food.x && snakeArr[0].y == food.y)
    {
        foodSound.play();
        let a = 2;
        let b =16;
        snakeArr.unshift({x: snakeArr[0].x+inputDir.x,y: snakeArr[0].y+inputDir.y})
    food ={
        x: Math.round(a+ (b-a)*Math.random()),
        y: Math.round(a+ (b-a)*Math.random())
    }
    score+=1;
    if(score > hiscore){
        hiscore = score;
        localStorage.setItem("hiscore",JSON.stringify(hiscore));
        highScoreBoard.innerHTML = "high score :"+ hiscore;
    }
    
    scoreBoard.innerHTML = "score:"+score;
    }


    //while snake is moving
for (let i = snakeArr.length-2; i >= 0; i--) {
snakeArr[i+1] ={...snakeArr[i]}
    
}
snakeArr[0].x = snakeArr[0].x+inputDir.x;
snakeArr[0].y = snakeArr[0].y+inputDir.y;


    //part 2 : rendering snake and food
    //display snake
    board.innerHTML = "";
    snakeArr.forEach((ele,index)=>{
     snakeElement = document.createElement("div");
     snakeElement.style.gridRowStart = ele.y;
     snakeElement.style.gridColumnStart =ele.x;
     if(index === 0){
         snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');

        }
     board.appendChild(snakeElement)
    })
    //display food
   
    
    foodElement = document.createElement("div");
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart =food.x;
    foodElement.classList.add('food')
     board.append(foodElement)
 
}
//main logic starts here
 hiscore = localStorage.getItem("hiscore");
if(hiscore === null){
    let hiscoreVal =0;
    localStorage.setItem("hiscore",JSON.stringify(hiscoreVal));
}
else{
    highScoreBoard.innerHTML = "high score :"+ hiscore;
}
window.requestAnimationFrame(main)

window.addEventListener('keydown',e=>{
    inputDir = {x:0,y:1}
    move.play();
    // music.play();
    music.play();
    switch(e.key){
        case "ArrowUp":
            console.log("arrowUp")
            inputDir.x = 0
            inputDir.y= -1
            break;
        case "ArrowDown":
            console.log("arrowDown")
            inputDir.x = 0
            inputDir.y= 1
            break;
        case "ArrowLeft":
            console.log("arrowLeft")
            inputDir.x = -1
            inputDir.y= 0
            break;
        case "ArrowRight":
            console.log("arrowright")
            inputDir.x = 1
            inputDir.y= 0
            break;
        default:
            break;    
    }
})