const SnakeGame = require("../src/snake");

// const game = new SnakeGame();

let game;

beforeEach(() => {
  game = new SnakeGame();
});

describe("Snake object", () => {
  it("can be instantiated", () => {
    expect(game).toBeInstanceOf(Object);
  });

  it("has a boardWidth property which is a number set to 11", () => {
    expect(typeof game.boardWidth).toBe("number");
    expect(game.boardWidth).toBe(11);
  });

  it("has a snake property which is an array", () => {
    expect(game.snake).toBeInstanceOf(Array);
  });

  it("has a heading property which is a string initially set to 'n'", () => {
    expect(game.heading).toBe("n")
  });

});

describe("initialise snake", () => {
  it("initialises the snake array to [49, 60, 71] for default board width of 11", () => {
    game.initialise();
    expect(game.snake).toEqual([49, 60, 71]);
  });
});

describe("changeHeading", () => {
  it("changes from n to w when direction = l", () => {
    game.changeHeading("l");
    expect(game.heading).toBe("w");
  });

  it("changes from s to e when direction = l", () => {
    game.heading = "s"
    game.changeHeading("l");
    expect(game.heading).toBe("e");
  });

  it("changes from w to n when direction = r", () => {
    game.heading = "w"
    game.changeHeading("r");
    expect(game.heading).toBe("n");
  });

  it("changes from e to s when direction = r", () => {
    game.heading = "e"
    game.changeHeading("r");
    expect(game.heading).toBe("s");
  });
});

describe("move", () => {
  it("n from [49, 60, 71] results in the snake head becoming 38 and tail 60", () => {
    game.initialise();
    game.move();
    expect(game.snake[0]).toBe(38);
    expect(game.snake[game.snake.length - 1]).toBe(60);
  });

  it("n from [10, 21, 32] results in the snake head wrapping to 120 and tail 21", () => {
    game.snake = [10, 21, 32];
    game.heading = "n"
    game.move();
    expect(game.snake[0]).toBe(120);
    expect(game.snake[game.snake.length - 1]).toBe(21);
  });

  it("e from [49, 60, 71] results in the snake head becoming 50 and tail 60", () => {
    game.initialise();
    game.heading = "e"
    game.move();
    expect(game.snake[0]).toBe(50);
    expect(game.snake[game.snake.length - 1]).toBe(60);
  });

  it("e from [10, 21, 32] results in the snake head wrapping to 0 and tail 21", () => {
    game.snake = [10, 21, 32];
    game.heading = "e"
    game.move();
    expect(game.snake[0]).toBe(0);
    expect(game.snake[game.snake.length - 1]).toBe(21);
  });

  it("w from [49, 60, 71] results in the snake head becoming 48 and tail 60", () => {
    game.initialise();
    game.heading = "w"
    game.move();
    expect(game.snake[0]).toBe(48);
    expect(game.snake[game.snake.length - 1]).toBe(60);
  });

  it("w from [66, 67, 68, 79] results in the snake head wrapping to 76 and tail 68", () => {
    game.snake = [66, 67, 68, 79];
    game.heading = "w"
    game.move();
    expect(game.snake[0]).toBe(76);
    expect(game.snake[game.snake.length - 1]).toBe(68);
  });

  it("s from [104, 93, 82, 81, 80, 69] results in the snake head becoming 115 and tail 80", () => {
    game.snake = [104, 93, 82, 81, 80, 69];
    game.heading = "s"
    game.move();
    expect(game.snake[0]).toBe(115);
    expect(game.snake[game.snake.length - 1]).toBe(80);
  });

  it("s from [115, 104, 93, 82, 81, 80, 69] results in the snake head becoming 5 and tail 80", () => {
    game.snake = [115, 104, 93, 82, 81, 80, 69];
    game.heading = "s"
    game.move();
    expect(game.snake[0]).toBe(5);
    expect(game.snake[game.snake.length - 1]).toBe(80);
  });

  it("adds a new head but doesn't lose the tail when head === food", () => {
    game.initialise();
    game.food = 38;
    game.move();
    expect(game.snake[0]).toBe(38);
    expect(game.snake[game.snake.length - 1]).toBe(71);
  });
});

describe("is southEdge", () => {
  it("returns true for numbers from 110 to 120 inclusive", () => {
    const currentHead = Math.floor(Math.random() * (121 - 110) + 110);
    expect(game.isSouthEdge(currentHead)).toBeTruthy();
  });

  it("returns false for numbers less than 110", () => {
    const currentHead = Math.floor(Math.random() * 110);
    expect(game.isSouthEdge(currentHead)).toBeFalsy();
  });
});

describe("is northEdge", () => {
  it("returns true for numbers from 0 to 10 inclusive", () => {
    const currentHead = Math.floor(Math.random() * 10);
    expect(game.isNorthEdge(currentHead)).toBeTruthy();
  });

  it("returns false for numbers greater than 10", () => {
    const currentHead = Math.floor(Math.random() * (121 - 11) + 11);
    expect(game.isNorthEdge(currentHead)).toBeFalsy();
  });
});

describe("is westEdge", () => {
  it("returns true for 0 and any factor of 11", () => {
    let currentHead = 55;
    expect(game.isWestEdge(currentHead)).toBeTruthy();
    currentHead = 99;
    expect(game.isWestEdge(currentHead)).toBeTruthy();
    currentHead = 22;
    expect(game.isWestEdge(currentHead)).toBeTruthy();
  });

  it("returns false for any number not a factor of 11", () => {
    let currentHead = 8;
    expect(game.isWestEdge(currentHead)).toBeFalsy();
    currentHead = 76;
    expect(game.isWestEdge(currentHead)).toBeFalsy();
    currentHead = 113;
    expect(game.isWestEdge(currentHead)).toBeFalsy();
  });
});

describe("is eastEdge", () => {
  it("returns true for values 1 below factors of 11", () => {
    let currentHead = 54;
    expect(game.isEastEdge(currentHead)).toBeTruthy();
    currentHead = 98;
    expect(game.isEastEdge(currentHead)).toBeTruthy();
    currentHead = 21;
    expect(game.isEastEdge(currentHead)).toBeTruthy();
  });

  it("returns false for any number not 1 below a factor of 11", () => {
    let currentHead = 8;
    expect(game.isWestEdge(currentHead)).toBeFalsy();
    currentHead = 75;
    expect(game.isWestEdge(currentHead)).toBeFalsy();
    currentHead = 113;
    expect(game.isWestEdge(currentHead)).toBeFalsy();
  });
})

describe("newFoodLocation", () => {
  it("selects a random cell that isn't part of the initial snake", () => {
    game.initialise();
    const loc = game.newFoodLocation();
    expect(game.snake).not.toContain(loc);
  });

  it("selects the only remaining cell where snake covers all but one cell", () => {
    game.snake = [];
    for (let i = 0; i < 120; i++) {
      game.snake.push(i);
    }
    expect(game.newFoodLocation()).toBe(120);
  });
});

describe("hasFoundFood", () => {
  it("returns true where snake head location === food location", () => {
    game.snake = [1,2,3];
    game.food = 1;
    expect(game.hasFoundFood()).toBeTruthy();
  });

  it("returns false where snake head location !== food location", () => {
    game.snake = [1,2,3];
    game.food = 3;
    expect(game.hasFoundFood()).toBeFalsy();
  })
});

describe("eatFood", () => {
  it("increments score by 1", () => {
    game.initialise();
    game.eatFood();
    expect(game.score).toBe(1);
  });
});

describe("hasCollided", () => {
  it("returns true where new headPosition is already part of snake", () => {
    game.snake = [71,72,73,84,95,94,93,82,71,60];
    expect(game.hasCollided()).toBeTruthy();
  });

  it("returns false where new headPosition is not already part of snake", () => {
    game.snake = [71,72,73,84,95,94,93,82];
    expect(game.hasCollided()).toBeFalsy();
  });
});