const getData = require("./data");
const dictionary = getData.words;

class Boggle {
  constructor(num) {
    this.num = num;
    this.board = this.generateBoard(this.num);
  }

  generateBoard() {
    let createBoard = [];
    for (let i = 0; i < Math.pow(this.num, 2); i++) {
      if (i % this.num === 0) {
        createBoard.push([]);
        createBoard[createBoard.length - 1].push(" ");
      } else {
        createBoard[createBoard.length - 1].push(" ");
      }
    }
    return createBoard;
  }

  shake() {
    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board[i].length; j++) {
        this.board[i][j] = String.fromCharCode(
          Math.floor(Math.random() * 25) + 65
        );
      }
    }
  }

  solve() {
    let foundWords = [];

    for (let word of dictionary) {
      let letterCoordinate = [];
      var dummyBoard = [];

      for (var i = 0; i < this.board.length; i++)
        dummyBoard[i] = this.board[i].slice();

      let indexFirstLetter = this.findFirstLetter(word[0]);

      if (indexFirstLetter === false) continue;
      let row = indexFirstLetter[0];
      let col = indexFirstLetter[1];
      dummyBoard[row][col] = " ";
      letterCoordinate.push(indexFirstLetter);

      let slicedWord = word.slice(1);
      let remainingLetter = this.checkRemainingLetter(
        dummyBoard,
        letterCoordinate,
        slicedWord
      );
      if (remainingLetter === false) continue;

      let joinFoundLetters = this.joinLetter(remainingLetter);
      foundWords.push(joinFoundLetters);
    }
    this.printBoard(foundWords);
  }

  joinLetter(remainingLetter) {
    let word = [];
    for (let i = 0; i < remainingLetter.length; i++) {
      let row = remainingLetter[i][0];
      let col = remainingLetter[i][1];
      word.push(this.board[row][col]);
    }
    return word.join("");
  }

  findFirstLetter(letter) {
    for (let i = 0; i < this.board.length; i++) {
      for (let j = 0; j < this.board[i].length; j++) {
        if (this.board[i][j] === letter) {
          return [i, j];
        }
      }
    }
    return false;
  }

  checkRemainingLetter(dummyBoard, letterCoordinate, slicedWord) {
    let found = letterCoordinate;
    for (let i = 0; i < slicedWord.length; i++) {
      let row = found[found.length - 1][0];
      let col = found[found.length - 1][1];
      if (
        row >= 0 &&
        row < 4 &&
        (col + 1 >= 0 && col + 1 < 4) &&
        dummyBoard[row][col + 1] === slicedWord[i]
      ) {
        found.push([row, col + 1]);
        dummyBoard[row][col + 1] = " ";
      } else if (
        row - 1 >= 0 &&
        row - 1 < 4 &&
        (col + 1 >= 0 && col + 1 < 4) &&
        dummyBoard[row - 1][col + 1] === slicedWord[i]
      ) {
        found.push([row - 1, col + 1]);
        dummyBoard[row - 1][col + 1] = "0";
      } else if (
        row - 1 >= 0 &&
        row - 1 < 4 &&
        (col >= 0 && col < 4) &&
        dummyBoard[row - 1][col] === slicedWord[i]
      ) {
        found.push([row - 1, col]);
        dummyBoard[row - 1][col] = " ";
      } else if (
        row - 1 >= 0 &&
        row - 1 < 4 &&
        (col - 1 >= 0 && col - 1 < 4) &&
        dummyBoard[row - 1][col - 1] === slicedWord[i]
      ) {
        found.push([row - 1, col - 1]);
        dummyBoard[row - 1][col - 1] = " ";
      } else if (
        row >= 0 &&
        row < 4 &&
        (col - 1 >= 0 && col - 1 < 4) &&
        dummyBoard[row][col - 1] === slicedWord[i]
      ) {
        found.push([row, col - 1]);
        dummyBoard[row][col - 1] = " ";
      } else if (
        row + 1 >= 0 &&
        row + 1 < 4 &&
        (col - 1 >= 0 && col - 1 < 4) &&
        dummyBoard[row + 1][col - 1] === slicedWord[i]
      ) {
        found.push([row + 1, col - 1]);
        dummyBoard[row + 1][col - 1] = " ";
      } else if (
        row + 1 >= 0 &&
        row + 1 < 4 &&
        (col >= 0 && col < 4) &&
        dummyBoard[row + 1][col] === slicedWord[i]
      ) {
        found.push([row + 1, col]);
        dummyBoard[row + 1][col] = " ";
      } else if (
        row + 1 >= 0 &&
        row + 1 < 4 &&
        (col + 1 >= 0 && col + 1 < 4) &&
        dummyBoard[row + 1][col + 1] === slicedWord[i]
      ) {
        found.push([row + 1, col + 1]);
        dummyBoard[row + 1][col + 1] = " ";
      } else {
        return false;
      }
    }
    return found;
  }

  strBoard() {
    let newBoard = [];
    let line = "";
    for (let i = 0; i < this.num; i++) {
      line += "----";
      if (i === this.num - 1) {
        line += "-";
      }
    }
    newBoard.push(line);
    for (let i = 0; i < this.board.length; i++) {
      let temp = "| ";
      temp += this.board[i].join(" | ");
      temp += " |";
      newBoard.push(temp);
      line = "";
      for (let j = 0; j < this.num; j++) {
        line += "----";
        if (j === this.num - 1) {
          line += "-";
        }
      }
      newBoard.push(line);
    }
    newBoard = newBoard.join("\n");
    return newBoard;
  }

  printBoard(foundWords) {
    let found = foundWords.join(", ");
    console.log(this.strBoard());
    console.log("\n");
    console.log(`Found ${foundWords.length} words : ${found}`);
  }
}

let boggle = new Boggle(10);

boggle.shake();
boggle.solve();
