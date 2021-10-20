class Level1AI extends Player{

    constructor(player) {
        super();
        this.player = player;
    }
    
    async getMove() {
        console.log("dfsd");
        let gameFunction = new GameFunction();
        let emptyCell = hBoard.filter(s => typeof s == 'number'); 
        let index = this.randomizeMove(emptyCell);
        let value = emptyCell[index];
        let row = gameFunction.calculateRowAndCol(value).row;
        let col = gameFunction.calculateRowAndCol(value).col;
        console.log(this.player)
        if (typeof board[row][col] == 'number'){
            gameFunction.turn(value, this.player, row, col);
            return true;
        }
    }

}