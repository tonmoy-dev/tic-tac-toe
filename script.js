// console.log('tic tac toe')
let turnMusic = new Audio("Tic.mp3");
let gameOverMusic = new Audio("Game Over.mp3");
const cells = document.querySelectorAll('[data-cell]');
const winningMsgBox = document.getElementById('winningMsgWrapper');
const winningMsg = document.querySelector('[data-winning-msg]');
const winningLine = document.getElementById('game-line');
const gameTurn = document.querySelector('.turn');
const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle';

// all the winning possibilities with the winning line styles
const WINNING_COMBINATIONS = [
    [0,1,2,300,0,50,0], 
    [3,4,5,300,0,150,0],
    [6,7,8,300,0,250,0],
    [0,3,6,300,-100,150,90],
    [1,4,7,300,0,150,90],
    [2,5,8,300,100,150,90],
    [0,4,8,400,-51,146,45],
    [2,4,6,400,-48,146,135]
];

let circleTurn;
let timeout;
let isDraw;

// restart
restartBtn.addEventListener('click', () => {
    winningMsgBox.classList.remove('show');
    winningLine.classList.remove('show');
    startGame();
});

//  game logics
function startGame() {
    circleTurn = false;
    cells.forEach((cell) => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(CIRCLE_CLASS);
        cell.removeEventListener('click', handleCellClick);
        cell.addEventListener("click", handleCellClick, {once: true});
    });
}
function gameOver() {
    winningMsgBox.classList.add('show');
    gameOverMusic.play();
    clearTimeout(timeout);
}
function handleCellClick(e) {
    // console.log(e.target)
    turnMusic.play();
    gameTurn.innerText = circleTurn ? 'X' : 'O';
    
    const cell = e.target;
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;
    // console.log(circleTurn,currentClass)
    
    // place mark
    placeMark(cell, currentClass);
    
    // check for win
    checkWin();
    
    // check for draw
    checkDraw();
    
    // alternate turns
    swapTurns();
}
function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
}
function swapTurns() {
    circleTurn = !circleTurn;
    // if circleTurn is true, currentClass will be 'circle'
}
function checkWin() {
    WINNING_COMBINATIONS.forEach(e => {
        if(cells[e[0]].classList.contains(X_CLASS) && 
           cells[e[1]].classList.contains(X_CLASS) && 
           cells[e[2]].classList.contains(X_CLASS)){
            winningMsg.innerText = 'X wins!';
            isWin(e);
          }
        else if(cells[e[0]].classList.contains(CIRCLE_CLASS) && 
           cells[e[1]].classList.contains(CIRCLE_CLASS) && 
           cells[e[2]].classList.contains(CIRCLE_CLASS)){
            winningMsg.innerText = 'O wins!';
            isWin(e);
           }
    })
}
function isWin(e) {
    winningLine.classList.add('show');
    winningLine.style.width = `${e[3]}px`;
    winningLine.style.transform = `translate(${e[4]}px, ${e[5]}px) rotate(${e[6]}deg)`;
    timeout = setTimeout(gameOver, 1000);
}

function checkDraw() {
    isDraw = [...cells].every(cell => cell.classList.contains('x') || cell.classList.contains('circle'));
    if(isDraw){
        winningMsg.innerText = 'Oops! Draw.';
        gameOver();
    }
}

startGame();