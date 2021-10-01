const displayWin = document.querySelector('.endgame');
const cells = document.querySelectorAll('.inside');
let board; 
let pturn;
const p1 = {
    character: 'R',
    color: 'Red'
}
const p2 = {
    character: 'B',
    color: 'Blue'
}
function initializeBoard() {
    board = (new Array(9)).fill().map(x => new Array(9).fill(0));

}

function startGame() {
    initializeBoard();
    document.querySelector(".endgame").style.display = "none";
    pturn = 1;
    console.log(
        "SDf"
    );
    for (var i = 0; i < cells.length; i++) {
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

    if (pturn == -1){
        if (typeof board[row][col] == 'number'){
            turn(square.target.id, p2, row, col);
            pturn = -1 * pturn;
        }
    }
}

function turn(squareId, p, row, col) {
    board[row][col] = p.character;
    document.getElementById(squareId).style.backgroundColor = p.color;
    let gameDecision = checkWin(board, p);
    if (gameDecision == 'R') {
        updatePlayerWin(gameDecision);
        console.log("R wins");
    } else if (gameDecision == 'B') {
        updatePlayerWin(gameDecision);
        console.log("B wins");
    }
}

function checkWin(board, character) {
    let isVisited = (new Array(9)).fill().map(x => new Array(9).fill(false));
    let copyNeighbor = [];
    let stack = [];
    
    for (let i = 0; i < 9; i++) {
        if (character.character == 'B') {
            if (board[9 - 1][i] == 'B') {
                stack.push(calculateIndex(9-1, i));
            }
        }
        else if (character.character == 'R') {
            if (board[i][0] == 'R') {
                stack.push(calculateIndex(i, 0));
            }
        }
        while (stack.length != 0) {
            let cell = stack.pop();
            console.log("cell", cell)
            // stack.pop();
            let x = Math.floor(cell / 9);
            let y = cell % 9;

            if (character.character == 'B' && (x == 0)){
                return 'B';
            }

            else if (character.character == 'R' && y == (9 - 1)){
                return 'R';
            }
            console.log("Text ", isVisited[1][2])
            if (isVisited[x][y] == false) {
                isVisited[x][y] = true;
                copyNeighbor = checkNeighbors(character, x, y);

                while (copyNeighbor.length != 0) {
                    let neighborCell = copyNeighbor.pop();
                    let nX = Math.floor(neighborCell / 9);
                    let nY = neighborCell % 9;

                    if (isVisited[nX][nY] == 0) {
                        stack.push(neighborCell);
                    }
                }
            }
        }
    }

    return 0;

}
function calculateIndex(x, y) {
    return x*9 + y;
}

function checkNeighbors(character, x, y) {
    let neighbors = [];
    
    let checkTop = x - 1;
    let checkBottom = x + 1;
    let checkLeft = y - 1;
    let checkRight = y + 1;

        if ((checkTop >= 0) && (board[checkTop][y] == character.character)){
            let c = checkTop * 9 + y;
            neighbors.push(c);
        }
        if ((checkTop >= 0) && (checkRight <= 9 - 1) && (board[checkTop][checkRight] == character.character)){
            let c =  checkTop* 9 + checkRight;
            neighbors.push(c);
        }
        if ((checkRight <= 9 - 1) && (board[x][checkRight] == character.character)){
            let c =  x * 9 + checkRight;
            neighbors.push(c);
        }
        if ((checkLeft >= 0) && (board[x][checkLeft] == character.character)){
            let c = x  * 9 + checkLeft; 
            neighbors.push(c);
        }
        if ((checkBottom <= 9 - 1) && (board[checkBottom][y] == character.character)){
            let c = checkBottom * 9 + y;
            neighbors.push(c);
        }
        if ((checkBottom <= 9 - 1) && (checkLeft >= 0) && (board[checkBottom][checkLeft] == character.character)){
            c =  checkBottom* 9 +checkLeft ;
            neighbors.push(c);
        }

    return neighbors;
}

function updatePlayerWin(gameWon){

    for (var i = 0; i < cells.length; i++){
        cells[i].removeEventListener('click', turnClick, false);
    }

    displayWin.querySelector(".play-again").innerText = 'Play Again';
    if (gameWon == 'R') {
        displayWin.style.display = "block";
        displayWin.querySelector(".text").innerText = 'R WINS';
    }
    else {
        displayWin.style.display = "block";
        displayWin.querySelector(".text").innerText = 'B WINS';
        // document.getElementById('score2').textContent = '';
    } 

    displayWin.addEventListener('click', startGame, false);
}