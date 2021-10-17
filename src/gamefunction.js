
class GameFunction {

    turn(squareId, p, row, col) {
        
        board[row][col] = p.character;
        hBoard[squareId] = p.character;
        storeCells(squareId);
        let colorClass = document.createElement("div");
        colorClass.setAttribute("class", p.color);
        document.getElementById(squareId).appendChild(colorClass);
        console.log("turb");
        let gameDecision = this.checkWin(board, p);
        if (gameDecision != 0) {
            this.updatePlayerWin(gameDecision);
            gameOver = true; 
        } 
    }

    calculateRowAndCol(index){
        return {
            row: Math.floor(index / 9),
            col: index % 9
        };
    }

    checkWin(board, character) {
        let isVisited = (new Array(boardSize)).fill().map(() => new Array(boardSize).fill(false));
        let copyNeighbor = [];
        let stack = [];
    
        for (let i = 0; i < 9; i++) {
            if (character.character == 'B') {
                if (board[boardSize - 1][i] == 'B') {
                    let c = new Cell();
                    c.row = boardSize - 1;
                    c.col = i;
                    stack.push(c);
                    // stack.push(calculateIndex(boardSize-1, i));
                }
            }
            else if (character.character == 'R') {
                if (board[i][0] == 'R') {
                    let c = new Cell();
                    c.row = i;
                    c.col = 0;
                    stack.push(c);
                    // stack.push(calculateIndex(i, 0));
                }
            }
            while (stack.length != 0) {
                let cellIndex = stack.pop();
                // let row = Math.floor(cellIndex / boardSize);
                // let col = cellIndex % boardSize;
                let row = cellIndex.row;
                let col = cellIndex.col;
    
                if (character.character == 'B' && (row == 0)){
                    return 'B';
                }
    
                else if (character.character == 'R' && col == (boardSize - 1)){
                    return 'R';
                }
                if (isVisited[row][col] == false) {
                    isVisited[row][col] = true;
                    copyNeighbor = this.checkNeighbors(character, row, col, board);
    
                    while (copyNeighbor.length != 0) {
                        let neighborCell = copyNeighbor.pop();
                        // let neighborRow = Math.floor(neighborCell / boardSize);
                        // let neighborCol = neighborCell % boardSize;
                        let neighborRow = neighborCell.row;
                        let neighborCol = neighborCell.col;
    
                        if (isVisited[neighborRow][neighborCol] == 0) {
                            stack.push(neighborCell);
                        }
                    }
                }
            }
        }
    
        return 0;
    }
    
    checkNeighbors(character, x, y, b) {
        let neighbors = [];
    
        let checkTop = x - 1;
        let checkBottom = x + 1;
        let checkLeft = y - 1;
        let checkRight = y + 1;

            if ((checkTop >= 0) && (b[checkTop][y] == character.character)){
                // let c = checkTop * boardSize + y;
                // neighbors.push(c);
                let c = new Cell();
                c.row = checkTop;
                c.col = y;
                neighbors.push(c);
            }
            if ((checkTop >= 0) && (checkRight <= boardSize - 1) && (b[checkTop][checkRight] == character.character)){
                // let c =  checkTop * boardSize + checkRight;
                // neighbors.push(c);
                let c = new Cell();
                c.row = checkTop;
                c.col = checkRight;
                neighbors.push(c);
            }
            if ((checkRight <= boardSize - 1) && (b[x][checkRight] == character.character)){
                // let c =  x * boardSize + checkRight;
                // neighbors.push(c);
                let c = new Cell();
                c.row = x;
                c.col = checkRight;
                neighbors.push(c);
            }
            if ((checkLeft >= 0) && (b[x][checkLeft] == character.character)){
                // let c = x  * boardSize + checkLeft; 
                // neighbors.push(c);
                let c = new Cell();
                c.row = x;
                c.col = checkLeft;
                neighbors.push(c);
            }
            if ((checkBottom <= boardSize - 1) && (b[checkBottom][y] == character.character)){
                // let c = checkBottom * 9 + y;
                // neighbors.push(c);
                let c = new Cell();
                c.row = checkBottom;
                c.col = y;
                neighbors.push(c);
            }
            if ((checkBottom <= boardSize - 1) && (checkLeft >= 0) && (b[checkBottom][checkLeft] == character.character)){
                // c =  checkBottom* boardSize +checkLeft ;
                // neighbors.push(c);
                let c = new Cell();
                c.row = checkBottom;
                c.col = checkLeft;
                neighbors.push(c);
            }

        return neighbors;
    }

    updatePlayerWin(gameWon){
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
    heuristics(playerType, x, y, b) {
        let length = 0.0;
        let queue = [];
        let isVisited = (new Array(boardSize)).fill().map(() => new Array(boardSize).fill(false));
    
        let copyNeighbor = []
    
            for (let i = 0; i < boardSize; i++) {
                if (playerType.character == 'R') {
                    if (b[i][0] == 'R') {
                        let k = new Cell();
                        k.row = i;
                        k.col = 0;
                        queue.push(k);
                    }
                }
                else if (playerType.character == 'B'){
                    if (b[0][i] == 'B') {
                        let k = new Cell();
                        k.row = 0;
                        k.col = i;
                        queue.push(k);
                    }
                }

                while (queue.length != 0) {
                    let cell = queue.shift();

                    if (playerType.character == 'R' && (cell.col == 0 && cell.col == y && cell.row == x)){
                        length = 1;
                    }
                    if (playerType.character == 'B' && (cell.row == 0 && cell.row == x && cell.col == y)){
                        length = 1;
                    }
    
                    if (playerType.character == 'R' && y < boardSize-1 && b[x][y+1] == 'B'){
                        length = 0.5;
                    }
                    if (playerType.character == 'B' && x < boardSize - 1 && b[x + 1][y] == 'R'){
                        length = 0.5;
                    }
    
                    if (isVisited[cell.row][cell.col] == false) {
                        isVisited[cell.row][cell.col] = true;
                        copyNeighbor = this.checkNeighbors(playerType, cell.row, cell.col, b);

                        while (copyNeighbor.length != 0) {
                            let neighborCell = copyNeighbor.pop();
                            if (isVisited[neighborCell.row][neighborCell.col] == false) {
                                if (playerType.character == 'R' && neighborCell.row == x && neighborCell.col == y){
                                    length = neighborCell.col + 1;
                                }
                                else if (playerType.character == 'B' && neighborCell.row == x && neighborCell.col == y){
                                    length = neighborCell.row + 1;
                                }
                                queue.push(neighborCell);
                            }
                        }
                    }
                }
            }
    
        return length;
    }
    
    
}




// minmax still in process
function botLevel_3(newBoard, player, currentPlayer, opponentPlayer){
    // var availSpots = helperBoard.filter(s => typeof s == 'number'); 

    if (checkWin(newBoard, opponentPlayer) == opponentPlayer.character){
        return {score: -10};
    }
    else if (checkWin(newBoard, currentPlayer) == currentPlayer.character){
        return {score : 10};
    }
    var moves = [];
    // while (availSpots.length != 0){
    for (let i = 0; i < boardSize; i++){
        for (let j = 0; j < boardSize; j++){
            var currentMove = {};
            if (typeof newBoard[i][j] == 'number') {
                currentMove.index = newBoard[i][j];
                newBoard[i][j] = player;
            } else {
                continue;
            }
            // var randMove = randomizeMove(availSpots);
            // var index = availSpots.splice(randMove, 1);
            // let row = Math.floor(index / 9);
            // let col = index % 9;
           
            if (player == currentPlayer.character) {
                if (checkWin(newBoard, currentPlayer) == currentPlayer.character) {
                  currentMove.score = 10;
                  newBoard[i][j] = currentMove.index;
                  return currentMove;
                }
                var result = botLevel_3(newBoard, opponentPlayer.character,  currentPlayer, opponentPlayer);
                currentMove.score = result.score;
              } 
              else {
                var result = botLevel_3(newBoard, currentPlayer.character, currentPlayer, opponentPlayer);
                currentMove.score = result.score;
            }
    
            newBoard[i][j] = currentMove.index;

            moves.push(currentMove);
        }
    // }


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


// function randomizeMove(arr){
//     var max = arr.length - 1;
//     return Math.floor(Math.random() * (max - 0) + 0);
// }