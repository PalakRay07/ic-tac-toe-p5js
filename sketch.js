let board = [
  ['', '', ''],
  ['', '', ''],
  ['', '', '']
];

let players = ['X', 'O'];
let human = 'X';
let ai = 'O';
let currentPlayer = human;
let button;

function setup() {
  createCanvas(400, 400);
  strokeWeight(4);
  textAlign(CENTER, CENTER);
  textSize(32);

  // Create restart button
  button = createButton('Restart Game');
  button.position(10, height + 10);
  button.mousePressed(restartGame);
}

function equals3(a, b, c) {
  return a == b && b == c && a != '';
}

function checkWinner() {
  let winner = null;

  // horizontal
  for (let i = 0; i < 3; i++) {
    if (equals3(board[i][0], board[i][1], board[i][2])) {
      winner = board[i][0];
    }
  }

  // vertical
  for (let i = 0; i < 3; i++) {
    if (equals3(board[0][i], board[1][i], board[2][i])) {
      winner = board[0][i];
    }
  }

  // diagonal
  if (equals3(board[0][0], board[1][1], board[2][2])) {
    winner = board[0][0];
  }
  if (equals3(board[2][0], board[1][1], board[0][2])) {
    winner = board[2][0];
  }

  let openSpots = 0;
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] == '') {
        openSpots++;
      }
    }
  }

  if (winner == null && openSpots == 0) {
    return 'tie';
  } else {
    return winner;
  }
}

function nextTurn() {
  let available = [];
  for (let i = 0; i < 3; i++) {
    for (let j = 0; j < 3; j++) {
      if (board[i][j] == '') {
        available.push([i, j]);
      }
    }
  }

  if (available.length > 0) {
    let move = random(available);
    let i = move[0];
    let j = move[1];
    board[i][j] = ai;
    currentPlayer = human;
  }
}

function mousePressed() {
  if (currentPlayer == human) {
    let w = width / 3;
    let h = height / 3;
    let i = floor(mouseX / w);
    let j = floor(mouseY / h);
    if (i < 3 && j < 3 && board[i][j] == '') {
      board[i][j] = human;
      currentPlayer = ai;
      let result = checkWinner();
      if (result == null) {
        setTimeout(nextTurn, 500); // AI responds after a short delay
      }
    }
  }
}

function draw() {
  background(255);
  let w = width / 3;
  let h = height / 3;

  // draw grid
  for (let i = 1; i < 3; i++) {
    line(w * i, 0, w * i, height);
    line(0, h * i, width, h * i);
  }

  // draw X and O
  for (let j = 0; j < 3; j++) {
    for (let i = 0; i < 3; i++) {
      let x = w * i + w / 2;
      let y = h * j + h / 2;
      let spot = board[i][j];

      if (spot == human) {
        let xr = w / 4;
        line(x - xr, y - xr, x + xr, y + xr);
        line(x + xr, y - xr, x - xr, y + xr);
      } else if (spot == ai) {
        noFill();
        ellipse(x, y, w / 2);
      }
    }
  }

  let result = checkWinner();
  if (result != null) {
    noLoop();
    let resText = result === 'tie' ? "It's a Tie!" : `${result} wins!`;
    createP(resText).style('font-size', '32pt').style('color', '#33e6ff').id('result');
  }
}

// 🔁 Restart the game
function restartGame() {
  board = [
    ['', '', ''],
    ['', '', ''],
    ['', '', '']
  ];
  currentPlayer = human;
  loop();

  // Remove result text if any
  let resultEl = select('#result');
  if (resultEl) resultEl.remove();
}
