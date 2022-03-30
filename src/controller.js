class Controller {

  game;
  board;
  cells;

  constructor(game) {
    this.game = game;
    this.board = document.querySelector(".board");
    this.renderBoard();
    this.cells = document.querySelectorAll(".board div");
    document.addEventListener("keyup", (e) => {
      this.handleKeyPress(e);
    });
  }

  renderBoard() {
    for (let i = 0; i < 121; i++) {
      const div = document.createElement("div");
        this.board.appendChild(div);
    }
  }

  handleKeyPress(e) {
    if (e.keyCode === 37) this.game.changeHeading("l");
    if (e.keyCode === 39) this.game.changeHeading("r");
  }

  play() {
    this.renderSnake();
    this.renderFood();
    this.renderScore();
    this.game.move();
    setTimeout(() => {
      this.play()
    }, 250);
  }
  
  renderSnake() {
    this.cells.forEach(cell => cell.classList.remove("snake"));
    this.game.snake.forEach(index => this.cells[index].classList.add("snake"));
  }

  renderFood() {
    this.cells.forEach(cell => cell.classList.remove("food"));
    this.cells[this.game.food].classList.add("food");
  }

  renderScore() {
    const scoreElement = document.querySelector(".score");
    scoreElement.innerHTML = this.game.score;
  }

}


if (typeof module !== 'undefined' && module.exports) {
  module.exports = Controller;
} else {
  window.Port = Controller;
}