class Human extends Player {

    constructor(player) {
        super();
        this.player = player
    }

    clickEventHandler(event){
        const elm = event.target;
        let gameFunction = new GameFunction();
        if(elm.className == 'inside' ){
          console.log("click");
          let row = gameFunction.calculateRowAndCol(elm.id).row;
          let col = gameFunction.calculateRowAndCol(elm.id).col;
      
          if(typeof board[row][col] === 'number'){
            // note this line - it only turns off the event 
            //   listener if the click is valid!  
            document.removeEventListener("click", this.clickEventHandler);
            // then the game function's turn. At the end of its turn,
            gameFunction.turn(elm.id, row, col);
            // change player's Turn here 
            pturn = pturn * -1;
           
          }
        } else {
          console.log("not clicked inside");
        }
      };

      getMove() {
         (this.player.pturn == pturn) 
                    ? document.addEventListener("click", this.clickEventHandler) 
                    : document.removeEventListener("click", this.clickEventHandler);
      }
      
}