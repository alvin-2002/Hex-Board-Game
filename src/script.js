const displayWin = document.querySelector('.endgame');
const cells = document.querySelectorAll('.inside');

let boardSize = 9;
let board; 
let pturn;
let emptyCells = [];
let hBoard = [];
let gameOver = false; 

const p1 = {
    character: 'R',
    color: 'Red',
    pturn: 1
}
const p2 = {
    character: 'B',
    color: 'Blue',
    pturn: -1
}

let h1 = new Human(p1);
let h2 = new Level2AI(p2);

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


function startGame() {

    initializeBoard();
    document.querySelector(".endgame").style.display = "none";
    pturn = 1;
    for (var i = 0; i < cells.length; i++) {
        if (cells[i].firstChild) {
            cells[i].removeChild(cells[i].childNodes[0]);
        }
        cells[i].style.removeProperty('background-color');
        cells[i].addEventListener('click', turnClick, false);
    }


}

function turnClick(square) {
    if (pturn == 1) {
        if (h1.getMove(square))  pturn = -1 * pturn;
       
    }

    if (pturn == -1){
        if (h2.getMove(square))  pturn = -1 * pturn;
    }

}
