let puzzle;
let tileSize;
let canvasSize;

function setup() {
  canvasSize = 300;
  tileSize = canvasSize / 3;
  createCanvas(canvasSize, canvasSize).parent('sketch01');
  initializePuzzle();
}

function initializePuzzle() {
  let startStates = [
    [[0, 1, 3], [4, 2, 5], [7, 8, 6]],
    [[4, 1, 3], [7, 2, 5], [8, 0, 6]],
    [[2, 3, 1], [4, 0, 5], [7, 8, 6]],
    // Add more start states as needed
  ];

  // Randomly select a start state
  let randomStartState = random(startStates);
  puzzle = new Puzzle(randomStartState);
}

function mousePressed() {
  let i = floor(mouseX / tileSize);
  let j = floor(mouseY / tileSize);

  if (puzzle.isValidMove(i, j)) {
    puzzle.moveTile(i, j);
  }
}

function restartGame() {
  initializePuzzle();
}

class Puzzle {
  constructor(initialState) {
    this.board = initialState;
  }

  display() {
    textSize(32);
    textAlign(CENTER, CENTER);
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (this.board[i][j] !== 0) {
          fill(200);
          rect(i * tileSize, j * tileSize, tileSize, tileSize);
          fill(0);
          text(this.board[i][j], i * tileSize + tileSize / 2, j * tileSize + tileSize / 2);
        }
      }
    }
  }

  moveTile(i, j) {
    if (this.isValidMove(i, j)) {
      this.swapWithBlank(i, j);
    }
  }

  isValidMove(i, j) {
    return (
      (i > 0 && this.board[i - 1][j] === 0) ||
      (i < 2 && this.board[i + 1][j] === 0) ||
      (j > 0 && this.board[i][j - 1] === 0) ||
      (j < 2 && this.board[i][j + 1] === 0)
    );
  }

  swapWithBlank(i, j) {
    for (let x = 0; x < 3; x++) {
      for (let y = 0; y < 3; y++) {
        if (this.board[x][y] === 0) {
          let temp = this.board[i][j];
          this.board[i][j] = 0;
          this.board[x][y] = temp;
          return;
        }
      }
    }
  }

  isGoalState() {
    const goalState = [
      [1, 2, 3],
      [4, 5, 6],
      [7, 8, 0]
    ];

    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        if (this.board[i][j] !== goalState[i][j]) {
          return false;
        }
      }
    }

    return true;
  }
}

function draw() {
  background(255);
  puzzle.display();

  if (puzzle.isGoalState()) {
    displaySuccessMessage();
  }
}

function displaySuccessMessage() {
  swal("Congratulations", "You solved the puzzle", "success")
}
