const displayWin = document.querySelector('.endgame');
const cells = document.querySelectorAll('.inside');
const allButtons = document.querySelectorAll('input[type=radio]');


let boardSize = 9;
let board; 
let pturn;
let emptyCells = [];
let hBoard = [];
let gameOver = false; 

const p1 = {
    character: 'R',
    color: 'Red',
    playerType: 'Human',
    level: null,
    pturn: 1
}
const p2 = {
    character: 'B',
    playerType: 'Human',
    level: null,
    color: 'Blue',
    pturn: -1
}
let unique = false;

let h1 = new Human(p1);
let h2 = new Human(p2);

allButtons.forEach((btn) => {
    btn.disabled = true;
});

function initializeBoard() {
    gameOver = false;
    let n = 0;
    board = (Array(boardSize)).fill().map(() => Array(boardSize).fill(0));
    for (let i = 0; i < boardSize; i++){
        for (let j= 0; j < boardSize; j++) {
            board[i][j] = n++;
        }
    }
    emptyCells = Array.from(Array(boardSize * boardSize).keys());
    hBoard = Array.from(Array(boardSize * boardSize).keys());
}

function setGameSetting(){
    let p1Type = document.getElementsByName('player-1');
    let p1Difficulty = document.getElementsByName('p1-level');

    let p2Type = document.getElementsByName('player-2');
    let p2Difficulty = document.getElementsByName('p2-level');

    setPlayerSetting(p1, p1Type, p1Difficulty);
    setPlayerSetting(p2, p2Type, p2Difficulty);
}


function setPlayerSetting(player, playerType, difficulty_level){
    for (var i = 0; i < playerType.length; i++){
        if (playerType[i].checked == true){
            player.playerType = playerType[i].id;
        }
    }

    if (player.playerType == 'computerPlayer'){
        for (var i = 0; i < difficulty_level.length; i++){
            if (difficulty_level[i].checked == true){
                player.level = difficulty_level[i].id;
            }
        }
    } 
    else {
        player.level = null
    }
}

let numb;
function startGame() {
    let ss;
    initializeBoard();
    let z = 0;
    document.querySelector('.start-quit-btn').style.display = 'none';
    document.querySelector(".endgame").style.display = "none";
    pturn = 1;
 ss =true;
    for (let i = 0; i < cells.length; i++) {
        // ss = true;

        (function() {
            if (cells[i].firstChild) {
                cells[i].removeChild(cells[i].childNodes[0]);
            }
            cells[i].style.removeProperty('background-color');
            // if (!ss) return;
            // cells[i].addEventListener('click', (e) => {
            //     if (typeof e.target.id == 'string') {
            //         console.log(ss)
            //         ss = false;
            //         numb = e.target.id;
            //         console.log(numb)
            //         if (ss == false) break
            //     } else {
            //         console.log(typeof e.target.id)
            //     }
            // }, false)
       
        }());
        


        // break;
            // if ((h1.player.playerType != 'Computer' && z != 0)){
        
            //     cells[i].addEventListener('click', turnClick, false);
            // }
        // if (cells[i].firstChild) {
        //     cells[i].removeChild(cells[i].childNodes[0]);
        // }
        // cells[i].style.removeProperty('background-color');
        // cells[i].addEventListener('click', turnClick, false);
    }
    turnClick(h1.player);

    // document.addEventListener("click", function(event) {
    //     if (!ss) return false
    //     var elm = event.target;
    //     if (elm.className == 'inside') {
    //         console.log("click")
    //         numb = elm.id;
    //         ss =false;
    //         ssq(numb); 
    //     } else {
    //         console.log("not clicked")
    //     }
    // })
    // console.log("sss", numb)
    // return false;
    // console.log("main")
    // if (h1.player.playerType == 'Computer' && z == 0 && pturn == 1 ){
    //     console.log(z);
    //     z++
    //     turnClick(true);
    // } 
    // console.log(numb);
}
// console.log(startGame());


function turnClick() {
    let h1Time, h2Time;
    h1Time = (h1.player.playerType == 'Computer') ? 1000 : 0;
    h2Time = (h2.player.playerType == 'Computer') ? 1000 : 0;
        if (pturn == 1 && !gameOver) {
            setTimeout(() => {
                if (h1.getMove()) {
                    pturn = -1 * pturn;
                    console.log("done")
                    turnClick();
                }
                
            }, h1Time);

    }
    else if (pturn == -1 && !gameOver){
            setTimeout(() => {
                if (h2.getMove()){
                    pturn = -1 * pturn;
                    turnClick()
                }
            }, h2Time);
    }
}

// let yourTurn = false;
// function turnClick(square) {

//     // if (!yourTurn) {
//     //     console.log(yourTurn)
//     //     return;
//     // }
//     console.log(
//         "check for human click" , square)
//     let h1Time, h2Time;
//     h1Time = (h1.player.playerType == 'Computer') ? 1000 : 0;
//     h2Time = (h2.player.playerType == 'Computer') ? 1000 : 0;
//     // if ()
//     // if (square != null)
//     // console.log("sssddd", square.target);
//     if (pturn == 1 && !gameOver) {
//             yourTurn = false;
//         // return new Promise((resolve) => {
//             // if (typeof square == 'boolean' || (typeof square == 'number')) yourTurn = false;
//             setTimeout(() => {
//                 if (h1.getMove(square)) {
//                     pturn = -1 * pturn;
//                     console.log("turn off")
//                     yourTurn = true;
//                     // console.log(yourTurn)
//                     // if (square.target != undefined) {
//                     //     turnClick(square.target.id) 
//                     // } else  turnClick('ss');
//                     // (square.target != undefined) ? turnClick(square.target.id) : turnClick('ss');
//                 }
                
//             }, h1Time);
//             if (yourTurn) turnClick('ss');
//             // setTimeout(resolve, h1Time);
            
//         // });
        
//         // if (await h1.getMove(square)) {
//         //     pturn = -1 * pturn;
//         //     turnClick("ss")
//         // }
//     }
//     else if (pturn == -1 && !gameOver){
//         // return new Promise((resolve) => {
//             // if (typeof square == 'boolean' || (typeof square == 'number')) yourTurn = false;
//             yourTurn = false;
//             setTimeout(() => {
//                 if (h2.getMove(square)){
//                     pturn = -1 * pturn;
//                     yourTurn = true;
//                     // if (square.target != undefined) {
//                     //     turnClick(square.target.id) 
//                     // } else  turnClick('ss');
//                     // (square.target != undefined) ? turnClick(square.target.id) : turnClick('ss');
//                 }
//             }, h2Time);
//             if (yourTurn) turnClick('ss');
//             // setTimeout(resolve, h2Time);
//             // yourTurn = true;
//         // });
//         // if (await h2.getMove(square))
//         // {
//         //     pturn = -1 * pturn;
//         //     turnClick("ss");
//         // }
//     }
// }

function click(square) {
    console.log("Dsdd", square); 
}

