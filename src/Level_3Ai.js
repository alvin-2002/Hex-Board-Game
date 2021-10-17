class Level3AI extends Player {
    
    constructor(player) {
        super();
        this.player = player;
        this.fpturn = 1;
    }
    
    // getMove(square) {
    //     let priorityQueue = [];
    //     let z = 0;
    //     console.log(board)
    //     let gameFun = new GameFunction();
    //     for (let i = 0; i < boardSize; i++) {
    //         for (let j = 0; j < boardSize; j++) {
    //             let player;
    //             if (typeof board[i][j] == 'number') continue;
    //             let b = this.copyBoard(board);
    //             b[i][j] = this.player.character;
    //             if (gameFun.checkWin(b, p2) == 'B') {
    //                 if (typeof b[i][j] == 'number'){
    //                     let value =  calculateIndex(i, j);
    //                     gameFun.turn(value, this.player, i, j);
    //                     return true;
    //                 }
    //             }
    //             let utility = this.simulation(b);
    //             let c = new Cell();
    //             c.row = i;
    //             c.col = j;
    //             c.heuristic = utility;
    //             priorityQueue.push(c);
                
    //             // console.log(z++,c.heuristic);
    //         }
    //     }
    //     if (priorityQueue.length != 0) {
    //         priorityQueue.sort((a, b) => a.heuristic > b.heuristic && 1 || -1);
    //         let row = priorityQueue[priorityQueue.length-1].row;
    //         let col = priorityQueue[priorityQueue.length-1].col;
    //         console.log("Best utility  = ",  priorityQueue[priorityQueue.length-1].heuristic)
    //         // if (typeof board[row][col] == 'number'){
    //             let value =  calculateIndex(row, col);
    //             gameFun.turn(value, this.player, row, col);
    //             return true;
    //         // }
    //     }

    // }

    // simulation(b) {
    //     let times = 10.0;
    //     let winning = 0.0;
    //     for (let i = 0; i < times; i++) {
    //         let tempB = this.copyBoard(b);
    //         winning += this.expansion(tempB);
    //         // console.log("wiinig", winning);
    //     }
    //     return (winning / times);
    // }

    // expansion(b) {
    //     let gameFunction = new GameFunction();
    //     if (gameFunction.checkWin(b, p2) == 'B') {
    //         console.log("win", b);
    //         return 1.0;
    //     }
    //     else if (gameFunction.checkWin(b, p1) == 'R') return 0.0;

    //     else {
    //         let player;
    //         let emptyCell = this.convertTo1D(b);
    //         emptyCell = emptyCell.filter(s => typeof s == 'number');
    //         let index = this.randomizeMove(emptyCell);
    //         let value = emptyCell[index];
    //         let row = gameFunction.calculateRowAndCol(value).row;
    //         let col = gameFunction.calculateRowAndCol(value).col;
    //         (this.fpturn == 1) ? player = p1 : player = p2;
    //         b[row][col] = player.character;
    //         // console.log("plsyer", player.character)
    //         this.fpturn = this.fpturn * -1;

    //         return this.expansion(b);
    //     }
    // }

    copyBoard(b) {
        let copyBoard;
        copyBoard = (Array(boardSize)).fill().map(() => Array(boardSize).fill(0));
        for (let i = 0; i < boardSize; i++){
            for (let j = 0; j < boardSize; j++) {
                copyBoard[i][j] = b[i][j];
            }
        }
        // console.log("cpy", b);
        return copyBoard;
    }
    convertTo1D(b) {
        let copyBoard;
        copyBoard =Array.from(Array(boardSize * boardSize).keys());
        for (let i = 0; i < boardSize; i++){
            for (let j = 0; j < boardSize; j++) {
                copyBoard[i + j] = b[i][j];
            }
        }
        // console.log("cpy", copyBoard);
        return copyBoard;
    }
}