class Cell {
   row;
   col;
   heuristic;
   constructor(row, col, heuristic) {
       this.row = row;
       this.col = col;
       this.heuristic = heuristic;
   }

   print() {
       console.log(this.row,this.col, this.heuristic);
   }
}