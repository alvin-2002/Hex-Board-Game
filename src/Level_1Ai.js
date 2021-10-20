class Level1AI extends Player{

    constructor(player) {
        super();
        this.player = player;
    }
    
    getMove() {
        let gameFunction = new GameFunction();
        let emptyCell = hBoard.filter(s => typeof s == 'number'); 
        let index = this.randomizeMove(emptyCell);
        let value = emptyCell[index];
        let row = gameFunction.calculateRowAndCol(value).row;
        let col = gameFunction.calculateRowAndCol(value).col;
        if (typeof board[row][col] == 'number'){
            gameFunction.turn(value, row, col);
            pturn = pturn * -1;
            return true;
        }
    }

}