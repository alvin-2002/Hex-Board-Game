class Human extends Player {
    pt
    constructor(player) {
        super();
        this.player = player
    }

    getMove(square) {
        let gameFunction = new GameFunction();
        let row = gameFunction.calculateRowAndCol(square.target.id).row;
        let col = gameFunction.calculateRowAndCol(square.target.id).col;
        console.log(this.player)
        if (typeof board[row][col] == 'number'){
            // console.log(gameFunction.heuristics(this.player, row, col))
            gameFunction.turn(square.target.id, this.player, row, col);
            return true;
        }
    }
    
  
}