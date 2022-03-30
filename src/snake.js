class SnakeGame {

  boardWidth;
  snake;
  food;
  heading;
  score;

  constructor(boardWidth=11) {
    this.boardWidth = boardWidth;
    this.snake = [];
    this.heading = "n";
    this.score = 0;
  }

  initialise() {
    this.createStarterSnake(this.setSnakeStartPosition());
    this.food = this.newFoodLocation();
    this.score = 0;
  }

  setSnakeStartPosition() {
    return this.boardWidth 
      * (Math.floor(this.boardWidth / 2)) 
      - this.boardWidth 
      + (Math.floor(this.boardWidth / 2));
  }

  createStarterSnake(headPos) {
    this.snake.push(headPos);
    this.snake.push(headPos + this.boardWidth);
    this.snake.push(headPos + (this.boardWidth * 2));
  }

  changeHeading(change) {
    const headingChangeMap = new Map();
    headingChangeMap.set("n", {"l": "w", "r": "e"});
    headingChangeMap.set("e", {"l": "n", "r": "s"});
    headingChangeMap.set("s", {"l": "e", "r": "w"});
    headingChangeMap.set("w", {"l": "s", "r": "n"});
    this.heading = headingChangeMap.get(this.heading)[change];
  }

  move() {
    const moveMapper = new Map();
    moveMapper.set("n", -11);
    moveMapper.set("e", 1);
    moveMapper.set("s", 11);
    moveMapper.set("w", -1);
    const currentHead = this.snake[0];
    const newHead = currentHead + moveMapper.get(this.heading) + this.wrapAdjustment(currentHead);
    this.snake.unshift(newHead);
    if (this.hasCollided()) this.endGame();
    if (this.hasFoundFood()) {
      this.eatFood();
    } else {
      this.snake.pop();
    }
  }

  wrapAdjustment(head) {
    if (this.heading === "n" && this.isNorthEdge(head)) return Math.pow(this.boardWidth, 2);
    if (this.heading === "e" && this.isEastEdge(head)) return -1 * this.boardWidth;
    if (this.heading === "s" && this.isSouthEdge(head)) return -1 * Math.pow(this.boardWidth, 2);
    if (this.heading === "w" && this.isWestEdge(head)) return this.boardWidth;
    return 0;
  }

  isNorthEdge(head) {
    return head < this.boardWidth;
  }

  isEastEdge(head) {
    return head % this.boardWidth === 10;
  }

  isSouthEdge(head) {
    return (head >= this.boardWidth * (this.boardWidth - 1) && head < Math.pow(this.boardWidth, 2))
  }

  isWestEdge(head) {
    return head % this.boardWidth === 0;
  }

  newFoodLocation() {
    let emptyCells = [];
    for (let i = 0; i < Math.pow(this.boardWidth, 2); i++) {
      if (this.snake.includes(i)) continue;
      emptyCells.push(i);
    }
    if (emptyCells.length === 1) return emptyCells[0];
    return emptyCells[Math.floor(Math.random() * emptyCells.length)];
  }

  hasFoundFood() {
    return this.snake[0] === this.food;
  }

  eatFood() {
    this.score++;
    this.food = this.newFoodLocation();
  }

  hasCollided() {
    return this.snake.slice(1).includes(this.snake[0]);
  }

  endGame() {
    console.log("GAME OVER");
    console.log("You scored: ", this.score);
    this.snake = [];
  }


  /**
   * A utility method that can be called to draw the board to 
   * the console for simple visualisation purposes. Not part of the game.
   * Delete when development complete.
   */
  logBoard() {
    let matrix = "";
    for (let i = 0; i < 11; i++) {
      let row = "";
      for (let j = 0; j < 11; j++) {
        let padding = " ";
        let suffix = String(j + (i * 11));
        if (suffix.length === 2) padding = "  ";
        if (suffix.length === 1) padding = "   ";
        row += suffix + padding;
      }
      matrix += row + "\n";
    }
    console.log(matrix);
  }

}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = SnakeGame;
} else {
  window.Port = SnakeGame;
}