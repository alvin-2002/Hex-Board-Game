class Human extends Player {
    // square;
    isHumanTurn = false;
    huMove;
    constructor(player) {
        super();
        this.player = player
        console.log(player)
    }

    async getHuMove() {
        let gameFunction = new GameFunction();
        // copies playInfo from constructor bec it becomes undefined inside eventListener
        let playerInfo = this.player

        const controller = new AbortController();
        // console.log(controller.signal)
        return new Promise((resolve, reject) => {
        document.addEventListener("click", function(event) {
                var elm = event.target;
                if (elm.className == 'inside') {
                    console.log("click")
                    let row = gameFunction.calculateRowAndCol(elm.id).row;
                    let col = gameFunction.calculateRowAndCol(elm.id).col;
                    
                    if (typeof board[row][col] == 'number'){
                        gameFunction.turn(elm.id, playerInfo, row, col);
                        controller.abort();
                        // How do i return True? 

                        // // this pass in the value true to getMove
                        // resolve(true);
                    }
                } else {
                    console.log("not clicked")
                    // reject(false);
                }
                
            }, {signal: controller.signal})
        });
    }

    // make main function wait for getMove to return true 
    async getMove() {
        return await this.getHuMove().then(data => {
            console.log('primise', data)
            if (data == true) return data;
            
        }).catch(err => {
            console.log('error', err)
        })
       
    
        // return true
        // const handler = e => {
        //     if (e == false) {
        //         console.log("ee", e)
        //         funToBreak = true;
        //         return true;
        //     } else {
        //         return false;
        //     }
        // }
        // if (funToBreak) {
        //     console.log("ehehehe")
        // }

        // console.log(this.player.character)

        
        
        
        // console.log(ss);
        // return true;
        // let row = gameFunction.calculateRowAndCol(square.target.id).row;
        // let col = gameFunction.calculateRowAndCol(square.target.id).col;
        // console.log(this.player)
        // if (typeof board[row][col] == 'number'){
        //     gameFunction.turn(square.target.id, this.player, row, col);
        //     return true;
        // }
    }

}