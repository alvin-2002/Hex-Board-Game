const displayWin = document.querySelector('.endgame');
const cells = document.querySelectorAll('.inside');
const allButtons = document.querySelectorAll('input[type=radio]');


let boardSize = 9;
let board; 
let pturn;
let emptyCells = [];
let hBoard = [];
let gameOver = false; 

const p1 = {
    character: 'R',
    color: 'Red',
    playerType: '',
    level: null,
    pturn: 1
}
const p2 = {
    character: 'B',
    playerType: '',
    level: null,
    color: 'Blue',
    pturn: -1
}

let h1 = new Human(p1);
let h2 = new Human(p2);

allButtons.forEach((btn) => {
    btn.disabled = true;
});

function initializeBoard() {
    let n = 0;
    board = (Array(boardSize)).fill().map(() => Array(boardSize).fill(0));
    for (let i = 0; i < boardSize; i++){
        for (let j= 0; j < boardSize; j++) {
            board[i][j] = n++;
        }
    }
    emptyCells = Array.from(Array(boardSize * boardSize).keys());
    hBoard = Array.from(Array(boardSize * boardSize).keys());
}

function setGameSetting(){
    let p1Type = document.getElementsByName('player-1');
    let p1Difficulty = document.getElementsByName('p1-level');

    let p2Type = document.getElementsByName('player-2');
    let p2Difficulty = document.getElementsByName('p2-level');

    setPlayerSetting(p1, p1Type, p1Difficulty);
    setPlayerSetting(p2, p2Type, p2Difficulty);
}


function setPlayerSetting(player, playerType, difficulty_level){
    for (var i = 0; i < playerType.length; i++){
        if (playerType[i].checked == true){
            player.playerType = playerType[i].id;
        }
    }

    if (player.playerType == 'computerPlayer'){
        for (var i = 0; i < difficulty_level.length; i++){
            if (difficulty_level[i].checked == true){
                player.level = difficulty_level[i].id;
            }
        }
    } 
    else {
        player.level = null
    }
}


function startGame() {

    initializeBoard();

    document.querySelector('.start-quit-btn').style.display = 'none';
    document.querySelector(".endgame").style.display = "none";
    pturn = 1;
    for (let i = 0; i < cells.length; i++) {
        if (cells[i].firstChild) {
            cells[i].removeChild(cells[i].childNodes[0]);
        }
        cells[i].style.removeProperty('background-color');
        cells[i].addEventListener('click', turnClick, false);
    }

}

function turnClick(square) {
    if (pturn == 1) {
        if (h1.getMove(square)) pturn = -1 * pturn;
    }
    if (pturn == -1){
        if (h2.getMove(square)) pturn = -1 * pturn;
    }
}


