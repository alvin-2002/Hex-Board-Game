class Player{

    getMove() {

    }
    randomizeMove(arr){
        var max = arr.length - 1;
        return Math.floor(Math.random() * (max - 0) + 0);
    }
}