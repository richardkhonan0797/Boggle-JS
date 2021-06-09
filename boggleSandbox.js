let board = [
  ["P", "B", "I", "H"],
  ["R", "D", "A", "T"],
  ["F", "K", "O", "Q"],
  ["E", "W", "K", "Q"]
];

let words = ["DATO", "KOTA", "DOK", "BABA", "DAT", "HIBA", "SUSAN", "GUSTI"];

let foundWords = [];

for (let word of words) {
  let letterCoordinate = [];
  var dummyBoard = [];

  for (var i = 0; i < board.length; i++) dummyBoard[i] = board[i].slice();

  let indexFirstLetter = findFirstLetter(word[0]);

  if (indexFirstLetter === false) continue;
  let row = indexFirstLetter[0];
  let col = indexFirstLetter[1];
  dummyBoard[row][col] = " ";
  letterCoordinate.push(indexFirstLetter);

  let slicedWord = word.slice(1);
  let remainingLetter = checkRemainingLetter(
    dummyBoard,
    letterCoordinate,
    slicedWord
  );
  if (remainingLetter === false) continue;

  let joinFoundLetters = joinLetter(remainingLetter);
  foundWords.push(joinFoundLetters);
  console.log(foundWords);
}

function joinLetter(remainingLetter) {
  let word = [];
  for (let i = 0; i < remainingLetter.length; i++) {
    let row = remainingLetter[i][0];
    let col = remainingLetter[i][1];
    word.push(board[row][col]);
  }
  return word.join("");
}

function findFirstLetter(letter) {
  for (let i = 0; i < board.length; i++) {
    for (let j = 0; j < board[i].length; j++) {
      if (board[i][j] === letter) {
        return [i, j];
      }
    }
  }
  return false;
}

function checkRemainingLetter(dummyBoard, letterCoordinate, slicedWord) {
  let found = letterCoordinate;
  for (let i = 0; i < slicedWord.length; i++) {
    let row = found[found.length - 1][0];
    let col = found[found.length - 1][1];
    if (
        (row >= 0 && row < 4) &&
        (col + 1 >= 0 && col + 1 < 4) &&
        dummyBoard[row][col + 1] === slicedWord[i]
    ) {
      found.push([row, col + 1]);
      dummyBoard[row][col + 1] = " ";
    } else if (
        (row - 1 >= 0 && row - 1 < 4) &&
        (col + 1 >= 0 && col + 1 < 4) && dummyBoard[row - 1][col + 1] === slicedWord[i]
      
    ) {
      found.push([row - 1, col + 1]);
      dummyBoard[row - 1][col + 1] = "0";
    } else if (
      (row - 1 >= 0 && row - 1 < 4) &&
      (col >= 0 && col < 4)
      && dummyBoard[row - 1][col] === slicedWord[i] 
      
    ) {
      found.push([row - 1, col]);
      dummyBoard[row - 1][col] = " ";
    } else if (
      (row - 1 >= 0 && row - 1 < 4) &&
      (col - 1 >= 0 && col - 1 < 4)
      && dummyBoard[row - 1][col - 1] === slicedWord[i] 
      
    ) {
      found.push([row - 1, col - 1]);
      dummyBoard[row - 1][col - 1] = " ";
    } else if (
      (row >= 0 && row < 4) &&
      (col - 1 >= 0 && col - 1 < 4)
      && dummyBoard[row][col - 1] === slicedWord[i]
      
    ) {
      found.push([row, col - 1]);
      dummyBoard[row][col - 1] = " ";
    } else if (
      (row + 1 >= 0 && row + 1 < 4) &&
      (col - 1 >= 0 && col - 1 < 4)  
      && dummyBoard[row + 1][col - 1] === slicedWord[i] 
    ) {
      found.push([row + 1, col - 1]);
      dummyBoard[row + 1][col - 1] = " ";
    } else if (
      (row + 1 >= 0 && row + 1 < 4) &&
      (col >= 0 && col < 4)
      && dummyBoard[row + 1][col] === slicedWord[i] 
    ) {
      found.push([row + 1, col]);
      dummyBoard[row + 1][col] = " ";
    } else if (
      (row + 1 >= 0 && row + 1 < 4) &&
      (col + 1 >= 0 && col + 1 < 4)
      && dummyBoard[row + 1][col + 1] === slicedWord[i] 
    ) {
      found.push([row + 1, col + 1]);
      dummyBoard[row + 1][col + 1] = " ";
    } else {
      return false;
    }
  }
  console.log(dummyBoard);
  console.log(board);
  return found;
}

console.log(foundWords);
