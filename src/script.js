const displayWin = document.querySelector('.endgame');
const cells = document.querySelectorAll('.inside');
const allButtons = document.querySelectorAll('input[type=radio]');

let boardSize = 9;
let board; 
let pturn;
let emptyCells = [];
let hBoard = [];
let gameOver = false; 

let p1 = {
    character: 'R',
    color: 'Red',
    playerType: 'Computer',
    level: null,
    pturn: 1
}
let p2 = {
    character: 'B',
    color: 'Blue',
    playerType: 'Computer',
    level: null,
    pturn: -1
}

let player1;
let player2;


function initializeBoard() {
    gameOver = false;
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

    if (player.playerType == 'Computer'){
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

function createNewPlayerObject(setPlayer, player) {
    if (player.playerType == 'Computer') {
        if (player.level == 1) return new Level1AI(player); 
        else if (player.level == 2) return new Level2AI(player)
    }
    if (player.playerType == 'Human') {
        return new Human(player)
    }
}

function startGame() {
 
    initializeBoard();
  
    document.querySelector('.start-quit-btn').style.display = 'none';
    document.querySelector(".endgame").style.display = "none";

    setGameSetting();
    player1 = createNewPlayerObject(player1, p1);
    player2 = createNewPlayerObject(player2, p2);


    pturn = 1;

    for (let i = 0; i < cells.length; i++) {
        if (cells[i].firstChild) {
            cells[i].removeChild(cells[i].childNodes[0]);
        }
        cells[i].style.removeProperty('background-color');
    }

    allButtons.forEach((btn) => {
        btn.disabled = true;
    });

    turnClick();
}

function turnClick() {
    let h1Time, h2Time;
    h1Time = (player1.player.playerType == 'Computer') ? 800 : 0;
    h2Time = (player2.player.playerType == 'Computer') ? 800 : 0;
    if (player1.player.pturn == pturn && !gameOver) {
            setTimeout(() => {
                player1.getMove()
                turnClick();
            }, h1Time);
    }
    else if (player2.player.pturn == pturn && !gameOver){
            setTimeout(() => {
                player2.getMove()
                turnClick();
            }, h2Time);
    }
}



