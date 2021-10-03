
function turn(squareId, p, row, col) {
    board[row][col] = p.character;
    hBoard[squareId] = p.character;
    storeCells(squareId);
    let colorClass = document.createElement("div");
    colorClass.setAttribute("class", p.color);
    document.getElementById(squareId).appendChild(colorClass);
    let gameDecision = checkWin(board, p);
    if (gameDecision != 0) {
        updatePlayerWin(gameDecision);
        gameOver = true; 
    } 
}

function checkWin(board, character) {
    let isVisited = (new Array(boardSize)).fill().map(() => new Array(boardSize).fill(false));
    let copyNeighbor = [];
    let stack = [];
    
    for (let i = 0; i < 9; i++) {
        if (character.character == 'B') {
            if (board[boardSize - 1][i] == 'B') {
                stack.push(calculateIndex(boardSize-1, i));
            }
        }
        else if (character.character == 'R') {
            if (board[i][0] == 'R') {
                stack.push(calculateIndex(i, 0));
            }
        }
        while (stack.length != 0) {
            let cellIndex = stack.pop();
            let row = Math.floor(cellIndex / boardSize);
            let col = cellIndex % boardSize;

            if (character.character == 'B' && (row == 0)){
                return 'B';
            }

            else if (character.character == 'R' && col == (boardSize - 1)){
                return 'R';
            }
            if (isVisited[row][col] == false) {
                isVisited[row][col] = true;
                copyNeighbor = checkNeighbors(character, row, col);

                while (copyNeighbor.length != 0) {
                    let neighborCell = copyNeighbor.pop();
                    let neighborRow = Math.floor(neighborCell / boardSize);
                    let neighborCol = neighborCell % boardSize;

                    if (isVisited[neighborRow][neighborCol] == 0) {
                        stack.push(neighborCell);
                    }
                }
            }
        }
    }

    return 0;
}

function botLevel_1() {
    let index = randomizeMove(emptyCells); 
    return emptyCells[index];
}


// minmax still in process
function botLevel_3(newBoard, helperBoard, player, currentPlayer, opponentPlayer){
    var availSpots = helperBoard.filter(s => typeof s == 'number'); 

    if (checkWin(newBoard, opponentPlayer) == opponentPlayer.character){
        return {score: -10};
    }
    else if (checkWin(newBoard, currentPlayer) == currentPlayer.character){
        return {score : 10};
    }
    var moves = [];
    while (availSpots.length != 0){
        var currentMove = {};

        var randMove = randomizeMove(availSpots);
        var index = availSpots.splice(randMove, 1);
        let row = Math.floor(index / 9);
        let col = index % 9;
       
        currentMove.index = newBoard[row][col];
        newBoard[row][col] = player;
        helperBoard[index] = player;

        if (player == currentPlayer.character) {
            if (checkWin(newBoard, currentPlayer) == currentPlayer.character) {
              currentMove.score = 10;
              newBoard[row][col] = currentMove.index;
              helperBoard[index] = currentMove.index;
              return currentMove;
            }
            var result = botLevel_3(newBoard, helperBoard, opponentPlayer.character,  currentPlayer, opponentPlayer);
            currentMove.score = result.score;
          } 
          else {
            var result = botLevel_3(newBoard, helperBoard, currentPlayer.character, currentPlayer, opponentPlayer);
            currentMove.score = result.score;
        }

        newBoard[row][col] = currentMove.index;
        helperBoard[index] = currentMove.index;
        moves.push(currentMove);

    }

    // maximize
    var bestMove;
    if (player == currentPlayer.character){
        var bestScore = -10000;
        for (var i = 0; i < moves.length; i++){
            if (moves[i].score > bestScore){
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    }
    //minimize
    else {
        var bestScore = 10000;
        for (var i = 0; i < moves.length; i++){
            if (moves[i].score < bestScore){
                bestScore = moves[i].score;
                bestMove = i;
            }
        }
    }
    return moves[bestMove];
}



function storeCells(index) {
    emptyCells = emptyCells.filter(arrIndex => arrIndex != index);
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
        displayWin.querySelector(".text").innerText = 'Red WINS';
    }
    else {
        displayWin.style.display = "block";
        displayWin.querySelector(".text").innerText = 'Blue WINS';
    } 

    displayWin.addEventListener('click', startGame, false);
}

function randomizeMove(arr){
    var max = arr.length - 1;
    return Math.floor(Math.random() * (max - 0) + 0);
}