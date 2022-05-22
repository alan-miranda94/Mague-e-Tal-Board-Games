import { LEVELS } from './Contants'

export function shuffle(array) {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {
    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }

  return array;
}

export function startPoints(level) {
  let startON = [false, false, false]
  let actualLevel = LEVELS[level]

}

export function checkColumnMatch(board, column, row, currentPlayer) {
  let newBoard = copyBoard(board)
  let valueMatch = 0
  let isMatch = false

  for (let i = 0; i < board.length; i++) {
    const columnOfThree = [i, i + 1, i + 2]
    let isBlank = board[i][column] === null

    const rowOfThree = [i, i + 1, i + 2]
    let isBlankRow = board[row][i] === null

    const diagonalOne = [i, i+1, i + 2]
    const diagonalTow = [i+1, i+2, i + 3]
    
    let isBlankDiagonal = board[row][column] === null

    //VERIFICA SE 3 FRUTAS NA COLUNA SÃO INGUAIS 
    if (columnOfThree.every(square => {
      if (square >= board.length) return false
      return board[square][column] === currentPlayer && !isBlank
    })) {
      //SE FOR IGUAL REMOVE AS FRUTAS       
      valueMatch += 0.1
      isMatch = true
      columnOfThree.forEach(square => newBoard[square][column] = null)
    }

    //VERIFICA SE 3 FRUTAS NA LINHA SÃO IGUAIS
    if (rowOfThree.every(square => {
      if (square >= board.length) return 
      return board[row][square] === currentPlayer && !isBlankRow
    })) {
      //SE FOR IGUAL REMOVE AS FRUTAS     
      valueMatch += 0.1
      isMatch = true
      rowOfThree.forEach(square => newBoard[row][square] = null)
    }

    
  }
  return [newBoard,valueMatch,isMatch]
}

export function copyBoard(board) {
  let newBoard = []
  board.forEach((row, numRow) => {
    newBoard[numRow] = []
    row.forEach((column, numCol) => {
      newBoard[numRow][numCol] = column
    })
  })
  return newBoard
}

//CRIAR UM QUE USE APENAS A LINHA E NÃO TODA MATRIZ
export function checkRowMatch2(board, row, currentPlayer) {
  let newBoard = board

  for (let i = 0; i < board.length; i++) {
    const rowOfThree = [i, i + 1, i + 2]
    let isBlank = board[row][i] === null

    //VERIFICA SE 3 FRUTAS SÃO INGUAIS 
    if (rowOfThree.every(square => {
      if (square >= board.length) return false
      return board[row][square] === currentPlayer && !isBlank
    })) {
      //SE FOR IGUAL REMOVE AS FRUTAS       
      rowOfThree.forEach(square => newBoard[row][square] = null)
    }
  }
  return newBoard
}


export function createBoard(row, column) {
  let matriz = new Array(row)
  for (let i = 0; i < row; i++) {
    matriz[i] = new Array(column).fill(null)
  }
  return matriz
}

export function checkMatch(board, row, column, currentPlayer) {
  let newB = board
  newB = checkColumnMatch(newB, column, row, currentPlayer)


  return newB
}