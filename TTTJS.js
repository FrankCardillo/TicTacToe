var app = angular.module('TicTacToe', []);
app.controller('MainCtrl', function($scope) {

  $scope.playerPiece = '';
  $scope.computerPiece = '';
  $scope.piecesAssigned = false;

  $scope.gameBoard = [
    '', '', '',
    '', '', '',
    '', '', ''
  ];

  $scope.testBoard = [
    '', '', '',
    '', '', '',
    '', '', ''
  ];

  $scope.tileScores = [
    0, 0, 0,
    0, 0, 0,
    0, 0, 0
  ];

  $scope.isTestPlayerTurn = false;
  
  $scope.setColor = function(id) {
    if ($scope.gameBoard[Number(id)] === "X") {
      $("#" + id).addClass("Xcolor");
    } else if ($scope.gameBoard[Number(id)] === "O") {
      $("#" + id).addClass("Ocolor");
    } else {
      $("#" + id).removeClass("Xcolor Ocolor");
    }
  };
  
  $scope.playAsX = function() {
    $scope.playerPiece = 'X';
    $scope.computerPiece = 'O';
    $("li").removeClass("faded");
    $scope.piecesAssigned = true;
  };
  
  $scope.playAsO = function() {
    $scope.playerPiece = 'O';
    $scope.computerPiece = 'X';
    $("li").removeClass("faded");
    $scope.piecesAssigned = true;
  }

  $scope.gameOver = function() {
    // assigned internal to this function to ensure the values are updated to current game state
    $scope.victoryConditions = [
      [$scope.gameBoard[0], $scope.gameBoard[1], $scope.gameBoard[2]],
      [$scope.gameBoard[3], $scope.gameBoard[4], $scope.gameBoard[5]],
      [$scope.gameBoard[6], $scope.gameBoard[7], $scope.gameBoard[8]],
      [$scope.gameBoard[0], $scope.gameBoard[3], $scope.gameBoard[6]],
      [$scope.gameBoard[1], $scope.gameBoard[4], $scope.gameBoard[7]],
      [$scope.gameBoard[2], $scope.gameBoard[5], $scope.gameBoard[8]],
      [$scope.gameBoard[0], $scope.gameBoard[4], $scope.gameBoard[8]],
      [$scope.gameBoard[2], $scope.gameBoard[4], $scope.gameBoard[6]]
    ];
    for (var k = 0; k < $scope.victoryConditions.length; k++) {
      if ($scope.victoryConditions[k][0] === $scope.victoryConditions[k][1] && $scope.victoryConditions[k][0] === $scope.victoryConditions[k][2] && $scope.victoryConditions[k][0] === $scope.playerPiece) {
        return "player wins";
      }
      if ($scope.victoryConditions[k][0] === $scope.victoryConditions[k][1] && $scope.victoryConditions[k][0] === $scope.victoryConditions[k][2] && $scope.victoryConditions[k][0] === $scope.computerPiece) {
        return "computer wins";
      }
    }
    return "No winner";
  };

  $scope.testGameOver = function() {
    // assigned internal to this function to ensure the values are updated to current test game state
    $scope.testVictoryConditions = [
      [$scope.testBoard[0], $scope.testBoard[1], $scope.testBoard[2]],
      [$scope.testBoard[3], $scope.testBoard[4], $scope.testBoard[5]],
      [$scope.testBoard[6], $scope.testBoard[7], $scope.testBoard[8]],
      [$scope.testBoard[0], $scope.testBoard[3], $scope.testBoard[6]],
      [$scope.testBoard[1], $scope.testBoard[4], $scope.testBoard[7]],
      [$scope.testBoard[2], $scope.testBoard[5], $scope.testBoard[8]],
      [$scope.testBoard[0], $scope.testBoard[4], $scope.testBoard[8]],
      [$scope.testBoard[2], $scope.testBoard[4], $scope.testBoard[6]]
    ];
    for (var j = 0; j < $scope.testVictoryConditions.length; j++) {
      if ($scope.testVictoryConditions[j][0] === $scope.testVictoryConditions[j][1] && $scope.testVictoryConditions[j][0] === $scope.testVictoryConditions[j][2] && $scope.testVictoryConditions[j][0] === $scope.playerPiece) {
        return "player wins";
      }
      if ($scope.testVictoryConditions[j][0] === $scope.testVictoryConditions[j][1] && $scope.testVictoryConditions[j][0] === $scope.testVictoryConditions[j][2] && $scope.testVictoryConditions[j][0] === $scope.computerPiece) {
        return "computer wins";
      }
    }
    return "No winner";
  };

  $scope.resetAllBoards = function() {
    $scope.testBoard.fill('');
    $scope.gameBoard.fill('');
    $scope.tileScores.fill(0);
    for (var b = 0; b < $scope.gameBoard.length; b++) {
      $("#" + b).removeClass("Xcolor Ocolor");
    }
  };

  $scope.setTestBoardToGameBoard = function() {
    var dupeGameBoard = $scope.gameBoard;
    for (var i = 0; i < $scope.testBoard.length; i++) {
      $scope.testBoard[i] = dupeGameBoard[i];
    }
  };

  $scope.updateTileScores = function() {
    // incentivize the computer's selection of tiles leading to a win
    for (var q = 0; q < $scope.testBoard.length; q++) {
      if ($scope.testGameOver() === "player wins") {

        if ($scope.testBoard[q] === $scope.playerPiece) {
          $scope.tileScores[q] += 1;
        }
        if ($scope.testBoard[q] === $scope.computerPiece) {
          $scope.tileScores[q] -= 1;
        }
      }
      if ($scope.testGameOver() === "computer wins") {

        if ($scope.testBoard[q] === $scope.playerPiece) {
          $scope.tileScores[q] -= 1;
        }
        if ($scope.testBoard[q] === $scope.computerPiece) {
          $scope.tileScores[q] += 1;
        }
      }
    }
  };

  $scope.resetTileScores = function() {
    $scope.tileScores.fill(0);
  };

  $scope.runTrial = function() {
  // this function plays a test game by taking the current board configuration and randomly placing player and computer pieces until one side wins or a draw is reached
    $scope.setTestBoardToGameBoard();

    while ($scope.testGameOver() === "No winner" && $scope.testBoard.indexOf('') !== -1) {
      var randChoice = Math.floor(Math.random() * $scope.testBoard.length);
      if ($scope.isTestPlayerTurn === false && $scope.testBoard[randChoice] === '') {
        $scope.testBoard[randChoice] = $scope.computerPiece;
        $scope.isTestPlayerTurn = true;
      }
      if ($scope.isTestPlayerTurn === true && $scope.testBoard[randChoice] === '') {
        $scope.testBoard[randChoice] = $scope.playerPiece;
        $scope.isTestPlayerTurn = false;
      }
    }
  };

  $scope.makeAIMove = function() {
    // generate scores for each square on the board, the computer will then pick the available square with the highest score
    var curTrial = 0;
    while (curTrial < 300) {
      $scope.runTrial();
      $scope.updateTileScores();
      curTrial += 1;
    }
    for (var z = 0; z < $scope.testBoard.length; z++) {
      $scope.testBoard[z] = $scope.gameBoard[z];
      // prevent computer from playing an already occupied square
      if ($scope.testBoard[z] !== '') {
        $scope.tileScores[z] = -1000;
      }
    }
    var highestScore = Math.max(...$scope.tileScores);
    var highestScoreIndex = $scope.tileScores.indexOf(highestScore);
    $scope.gameBoard[highestScoreIndex] = $scope.computerPiece;
    if ($scope.computerPiece === "O") {
      $("#" + highestScoreIndex).addClass("Ocolor");
    }
    else {
      $("#" + highestScoreIndex).addClass("Xcolor");
    }
    $scope.testBoard[highestScoreIndex] = $scope.computerPiece;
    $scope.resetTileScores();
    if ($scope.gameOver() === "player wins") {
      alert("You Win!");
      $scope.playerPiece = '';
      $scope.computerPiece = '';
      $scope.piecesAssigned = false;
      $("li").addClass("faded");
      $scope.resetAllBoards();
    } else if ($scope.gameOver() === "computer wins") {
      alert("The Computer Wins!");
      $scope.playerPiece = '';
      $scope.computerPiece = '';
      $scope.piecesAssigned = false;
      $("li").addClass("faded");
      $scope.resetAllBoards();
    } else if ($scope.gameOver() === "No winner" && $scope.gameBoard.indexOf('') === -1) {
      alert("It's a draw!");
      $scope.playerPiece = '';
      $scope.computerPiece = '';
      $scope.piecesAssigned = false;
      $("li").addClass("faded");
      $scope.resetAllBoards();
    }
  };

  $scope.makeMove = function(index, id) {
    // no need for variable tracking whose turn it is, player always goes first and computer must react to the player's move
    if ($scope.piecesAssigned === true) {
      if ($scope.gameBoard[index] === '') {
        $scope.gameBoard[index] = $scope.playerPiece;
        $scope.setColor(id);
        $scope.setTestBoardToGameBoard();
        if ($scope.gameOver() === "player wins") {
          alert("You Win!");
          $scope.resetAllBoards();
          $scope.playerPiece = '';
          $scope.computerPiece = '';
          $scope.piecesAssigned = false;
          $("li").addClass("faded");
        } else if ($scope.gameOver() === "computer wins") {
          alert("The Computer Wins!");
          $scope.resetAllBoards();
          $scope.playerPiece = '';
          $scope.computerPiece = '';
          $scope.piecesAssigned = false;
          $("li").addClass("faded");
        } else if ($scope.gameOver() === "No winner" && $scope.gameBoard.indexOf('') === -1) {
          alert("It's a draw!");
          $scope.resetAllBoards();
          $scope.playerPiece = '';
          $scope.computerPiece = '';
          $scope.piecesAssigned = false;
          $("li").addClass("faded");
        } else {
          $scope.makeAIMove();
        }
      } else {
        alert("That square is already taken. Please choose an empty square.")
      }
    }
  };
});