var app = angular.module('TicTacToe', []);
app.controller('MainCtrl', function($scope) {

  $scope.gameBoard = [
    0, 0, 0,
    0, 0, 0,
    0, 0, 0
  ];

  $scope.testBoard = [
    0, 0, 0,
    0, 0, 0,
    0, 0, 0
  ];

  $scope.tileScores = [
    0, 0, 0,
    0, 0, 0,
    0, 0, 0
  ];

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

  $scope.isTestPlayerTurn = false;


  $scope.gameOver = function() {
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
      if ($scope.victoryConditions[k][0] === $scope.victoryConditions[k][1] && $scope.victoryConditions[k][0] === $scope.victoryConditions[k][2] && $scope.victoryConditions[k][0] === "X") {
        return "X wins";
      }
      if ($scope.victoryConditions[k][0] === $scope.victoryConditions[k][1] && $scope.victoryConditions[k][0] === $scope.victoryConditions[k][2] && $scope.victoryConditions[k][0] === "O") {
        return "O wins";
      }
    }
    return "No winner";
  };

  $scope.testGameOver = function() {
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
      if ($scope.testVictoryConditions[j][0] === $scope.testVictoryConditions[j][1] && $scope.testVictoryConditions[j][0] === $scope.testVictoryConditions[j][2] && $scope.testVictoryConditions[j][0] === "X") {
        return "X wins";
      }
      if ($scope.testVictoryConditions[j][0] === $scope.testVictoryConditions[j][1] && $scope.testVictoryConditions[j][0] === $scope.testVictoryConditions[j][2] && $scope.testVictoryConditions[j][0] === "O") {
        return "O wins";
      }
    }
    return "No winner";
  };

  $scope.resetAllBoards = function() {
    $scope.testBoard.fill(0);
    $scope.gameBoard.fill(0);
    $scope.tileScores.fill(0);
  };

  $scope.setTestBoardToGameBoard = function() {
    var dupeGameBoard = $scope.gameBoard;
    for (var i = 0; i < $scope.testBoard.length; i++) {
      $scope.testBoard[i] = dupeGameBoard[i];
    }
  };

  $scope.updateTileScores = function() {
    for (var q = 0; q < $scope.testBoard.length; q++) {
      if ($scope.testGameOver() === "X wins") {

        if ($scope.testBoard[q] === "X") {
          $scope.tileScores[q] += 1;
        }
        if ($scope.testBoard[q] === "O") {
          $scope.tileScores[q] -= 1;
        }
      }
      if ($scope.testGameOver() === "O wins") {

        if ($scope.testBoard[q] === "X") {
          $scope.tileScores[q] -= 1;
        }
        if ($scope.testBoard[q] === "O") {
          $scope.tileScores[q] += 1;
        }
      }
    }
  };

  $scope.resetTileScores = function() {
    $scope.tileScores.fill(0);
  };

  $scope.runTrial = function() {

    $scope.setTestBoardToGameBoard();

    while ($scope.testGameOver() === "No winner" && $scope.testBoard.indexOf(0) !== -1) {
      var randChoice = Math.floor(Math.random() * $scope.testBoard.length);
      if ($scope.isTestPlayerTurn === false && $scope.testBoard[randChoice] === 0) {
        $scope.testBoard[randChoice] = "O";
        $scope.isTestPlayerTurn = true;
      }
      if ($scope.isTestPlayerTurn === true && $scope.testBoard[randChoice] === 0) {
        $scope.testBoard[randChoice] = "X";
        $scope.isTestPlayerTurn = false;
      }
    }
  };

  $scope.makeMove = function(index) {
    $scope.gameBoard[index] = "X";
    $scope.setTestBoardToGameBoard();
    if ($scope.gameOver() === "X wins") {
      alert("You Win!");
      $scope.resetAllBoards();
    } else if ($scope.gameOver() === "O wins") {
      alert("The Computer Wins!");
      $scope.resetAllBoards();
    } else if ($scope.gameOver() === "No winner" && $scope.gameBoard.indexOf(0) === -1) {
      alert("It's a draw!");
      $scope.resetAllBoards();
    }
    var curTrial = 0;
    while (curTrial < 300) {
      $scope.runTrial();
      $scope.updateTileScores();
      curTrial += 1;
    }
    for (var z = 0; z < $scope.testBoard.length; z++) {
      $scope.testBoard[z] = $scope.gameBoard[z];
      if ($scope.testBoard[z] !== 0) {
        $scope.tileScores[z] = -1000;
      }
    }
    var highestScore = Math.max(...$scope.tileScores);
    var highestScoreIndex = $scope.tileScores.indexOf(highestScore);
    $scope.gameBoard[highestScoreIndex] = "O";
    $scope.testBoard[highestScoreIndex] = "O";
    $scope.resetTileScores();
    if ($scope.gameOver() === "X wins") {
      alert("You Win!");
      $scope.resetAllBoards();
    } else if ($scope.gameOver() === "O wins") {
      alert("The Computer Wins!");
      $scope.resetAllBoards();
    } else if ($scope.gameOver() === "No winner" && $scope.gameBoard.indexOf(0) === -1) {
      alert("It's a draw!");
      $scope.resetAllBoards();
    }
  }

});