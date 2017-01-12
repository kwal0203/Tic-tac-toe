function gameBoard() {
  //console.log('gameboard');
  ctx.beginPath();
  ctx.moveTo(cellWidth, 0);
  ctx.lineTo(cellWidth, height);
  ctx.stroke();
  
  ctx.beginPath();
  ctx.moveTo(cellWidth * 2, 0);
  ctx.lineTo(cellWidth * 2, height);
  ctx.stroke();
  
  ctx.beginPath();
  ctx.moveTo(0, cellHeight);
  ctx.lineTo(width, cellHeight);
  ctx.stroke();
  
  ctx.beginPath();
  ctx.moveTo(0, cellHeight * 2);
  ctx.lineTo(width, cellHeight * 2);
  ctx.stroke();
  
}

function drawCross(cellX, cellY) {
  ctx.beginPath();
  ctx.moveTo(cellX * cellWidth, cellY * cellHeight);
  ctx.lineTo(cellX * cellWidth + cellWidth, cellY * cellHeight + cellHeight);
  ctx.stroke();
  
  ctx.beginPath();
  ctx.moveTo(cellX * cellWidth + cellWidth, cellY * cellHeight);
  ctx.lineTo(cellX * cellWidth, cellY * cellHeight + cellHeight);
  ctx.stroke();
}

function drawCircle(cellX, cellY) {
  ctx.beginPath();
  ctx.arc(cellX * cellWidth + cellWidth / 2, cellY * cellHeight + cellHeight / 2, cellWidth / 2, 0, 360, false);
  ctx.stroke();
}

function getMouseLocation(e) {
  //console.log('getMouseLocation');
  var mouseX = e.pageX - canvas.offsetLeft;
  var mouseY = e.pageY - canvas.offsetTop;
  
  return {
    x: mouseX,
    y: mouseY
  }
}

function getCell(mouseCoordinate) {
  //console.log('getCell');
  var cellCoordinate = {
    x: 0,
    y: 0
  };
  
  if (mouseCoordinate.x > cellWidth * 2) cellCoordinate.x = 2;
  else if (mouseCoordinate.x > cellWidth) cellCoordinate.x = 1;
  
  if (mouseCoordinate.y > cellHeight * 2) cellCoordinate.y = 2;
  else if (mouseCoordinate.y > cellHeight) cellCoordinate.y = 1;
  
  return cellCoordinate;
}

function drawMoves() {
  for (var i = 0; i < 3; i++ ) {
    for (var j = 0; j < 3; j++) {
      var cell = gameStatus[i][j];
      //console.log(cell);
      if (cell == '1') {
        drawCross(i, j);
      } else if (cell == '2') {
        drawCircle(i, j);
      }
    }
  }
}

function processCellClick(cell) {
  
  //console.log('processCellClick');
  
  if (gameStatus[cell.x][cell.y] !== 0) return;
  gameStatus[cell.x][cell.y] = currentPlayer;
  
  refresh();  
  
  checkWin();
  
  if (currentPlayer === '1') currentPlayer = '2';
  else currentPlayer = '1';
  
  if (currentPlayer === computerPlayer) computerTurn();
  
  refresh();
  
  checkWin();
  
}

function computerTurn() {
  //console.log('working');
  switch(true) {
    case gameStatus[1][1] === 0:
      gameStatus[1][1] = computerPlayer;
      break;
    case gameStatus[0][1] === 0:
      gameStatus[0][1] = computerPlayer;
      break;
    case gameStatus[0][2] === 0:
      gameStatus[0][2] = computerPlayer;
      break;
    case gameStatus[1][2] === 0:
      gameStatus[1][2] = computerPlayer;
      break;
    case gameStatus[2][2] === 0:
      gameStatus[2][2] = computerPlayer;
      break;
    case gameStatus[1][0] === 0:
      gameStatus[1][0] = computerPlayer;
      break;
    case gameStatus[2][0] === 0:
      gameStatus[2][0] = computerPlayer;
      break;
    case gameStatus[0][0] === 0:
      gameStatus[0][0] = computerPlayer;
      break;
    case gameStatus[2][1] === 0:
      gameStatus[2][1] = computerPlayer;
      break;
  }
  
  if (currentPlayer === '1') currentPlayer = '2';
  else currentPlayer = '1';
}

function refresh() {
  //console.log('refresh');
  ctx.clearRect(0, 0, width, height);
  gameBoard();
  drawMoves();
}

function onCanvasClick(e) {
  //console.log('onCanvasClick');
  var mouseCoordinate = getMouseLocation(e);
  console.log(mouseCoordinate);
  var cell = getCell(mouseCoordinate);
  console.log(cell);
  processCellClick(cell);
};

function endGame(message) {
  alert(message);
  gameStatus = [[0, 0, 0], [0, 0, 0], [0, 0, 0]];
  refresh();
  currentPlayer = '1';
  computerPlayer = '2';
}

function checkWin() {
  //console.log('check win working');
  var full = true;
  
  for (var i = 0; i < 3; i++) {
    var p1rows = 0,
        p1cols = 0,
        p2rows = 0,
        p2cols = 0;

    for (var j = 0; j < 3; j++) {
      if (gameStatus[j][i] == 1) p1rows++;
      else if (gameStatus[j][i] == 2) p2rows++;
      else full = false;
      
      if (gameStatus[i][j] == 1) p1cols++;
      else if (gameStatus[i][j] == 2) p2cols++;
    }
    
    var p1Diag = gameStatus[0][0] == 1 && gameStatus[1][1] == 1 && gameStatus[2][2] == 1;
    p1Diag = p1Diag || gameStatus[0][2] == 1 && gameStatus[1][1] == 1 && gameStatus[2][0] == 1;
    
    var p2Diag = gameStatus[0][0] == 2 && gameStatus[1][1] == 2 && gameStatus[2][2] == 2;
    p2Diag = p2Diag || gameStatus[0][2] == 2 && gameStatus[1][1] == 2 && gameStatus[2][0] == 2;
    
    if (p1rows == 3 || p1cols == 3 || p1Diag) {
      endGame('Player 1 wins');
      return;
    } else if (p2rows == 3 || p2cols == 3 || p2Diag) {
      endGame('Player 2 wins');
      return;
    }    
  }
  
  if (full === true) {
    endGame("It's a draw");
  }
  
}

var canvas,
    width = 400,
    height = 400,
    cellWidth = width / 3,
    cellHeight = height / 3,
    ctx,
    gameStatus = [[0, 0, 0], [0, 0, 0], [0, 0, 0]],
    currentPlayer,
    computerPlayer;

window.onload = function() {
  
  canvas = document.getElementById('canvas');
  ctx = canvas.getContext('2d');
  
  canvas.width = width;
  canvas.height = height;  
  
  refresh();
  
  canvas.onclick = onCanvasClick;
  
  document.getElementById('x').onclick = function() {
    currentPlayer = '1';
    computerPlayer = '2';
  };
  
  document.getElementById('o').onclick = function() {
    currentPlayer = '2';
    computerPlayer = '1';
  };
  
  currentPlayer = currentPlayer;
}