class Level2AI extends Player{
    
    constructor(player) {
        super();
        this.player = player;
        
    }

    getMove(square) {
        let priorityQueue = [];
        let copy = [];
        let gameFun = new GameFunction();
        for (let i = 0; i < boardSize; i++){
            for (let j = 0; j < boardSize; j++) {
                let b = this.copyBoard(board);
                if (typeof board[i][j] == 'number') {
                    b[i][j] = this.player.character;
                    let c = new Cell();
                    c.row = i;
                    c.col = j;
                    c.heuristic = gameFun.heuristics(this.player,i ,j, b);
                    console.log("heuristic " ,gameFun.heuristics(this.player,i ,j, b))
                    priorityQueue.push(c);
                }
            }
        }
        if (priorityQueue.length > 0) {
            priorityQueue.sort((a, b) => a.heuristic > b.heuristic && 1 || -1);
            let largestHeuristic = priorityQueue[priorityQueue.length - 1].heuristic;

            while (priorityQueue.length != 0) {
                if (largestHeuristic == priorityQueue[priorityQueue.length - 1].heuristic) {
                    copy.push(priorityQueue.pop());
                } else break;
            }
            let index = this.randomizeMove(copy);
            let getCell = copy[index];
            let row = getCell.row;
            let col = getCell.col;
            let value = calculateIndex(row, col);
            if (typeof board[row][col] == 'number'){
                gameFun.turn(value, this.player, row, col);
                return true;
            }
        } else {
            return false;
        }
    
    }
    copyBoard(b) {
        let copyBoard;
        copyBoard = (Array(boardSize)).fill().map(() => Array(boardSize).fill(0));
        for (let i = 0; i < boardSize; i++){
            for (let j = 0; j < boardSize; j++) {
                copyBoard[i][j] = b[i][j];
            }
        }
        // console.log("cpy", copyBoard);
        return copyBoard;
    }

}