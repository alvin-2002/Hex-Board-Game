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
    color: 'Red'
}
const p2 = {
    character: 'B',
    color: 'Blue'
}
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
    console.log(board);
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
    let row = Math.floor(square.target.id / 9);
    let col = square.target.id % 9;


    if (pturn == 1) {
        if (typeof board[row][col] == 'number'){
            turn(square.target.id, p1, row, col);
            pturn = -1 * pturn;
        }
    }
    human
    if (pturn == -1){
        if (typeof board[row][col] == 'number'){
            turn(square.target.id, p2, row, col);
            pturn = -1 * pturn;
        }
    }

    // ai
    // if (pturn == -1 && !gameOver) {
    //     // let index = botLevel_3(board, hBoard, p2.character, p2, p1).index;
    //     let index = minimax(board, hBoard, p2).index;
    //     console.log(index);
    //     let row = Math.floor(index / 9);
    //     let col = index % 9;
    //     if (typeof board[row][col] == 'number'){
    //             turn(index, p2, row, col);
    //             pturn = -1 * pturn;
    //         }
    // }
}
