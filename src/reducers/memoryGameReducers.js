import { LEVELS } from '../utils/Contants'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createBoard, checkRowMatch, checkMatch, copyBoard} from '../utils/Utils'
import { CHARACTERS, FRUITS } from '../utils/Contants'

export const memoryGameInitialState = {
  level: LEVELS,

  board: [],
  players: [],
  fruits: [],
  characters: CHARACTERS,
  fruits: FRUITS,
  currentPlayer: 0,
  playerOne: null,
  playerTwo: null,
  fruitOne: null,
  fruitTwo: null,
  progressOne: 0,
  progressTwo: .8
}

export const MemoryGameReducer = (state, action) => {
  switch (action.type) {
    case 'ADD_REMOVE_POINTS':
      let level = state["level"][action.payload.level - 1]
      let score
      score = action.payload.type === 'ADD' ? { points: level.points + action.payload.points } : { points: level.points - action.payload.points }
      const newScoreLevel = state.level.map(item => {
        if (item.level === action.payload.level) {

          return { ...item, ...score }
        }
        return item
      })
      return {
        ...state,
        level: newScoreLevel
        //newScoreLevel,             
      }

    case 'SAVE':
      const saveScore = async () => {
        try {
          const item = state["level"]
          const jItem = JSON.stringify(item)
          await AsyncStorage.setItem('@memoryGameScore', jItem).then(() =>
            console.log('SALVO COM SUCESSO')
          )
        } catch (e) {
          console.log('ERRO AO SALVAR - ', e)
        }
      }
      saveScore()
      return { ...state }

    case 'OPEN_SCORE_SAVE':

      return {
        ...state,
        level: action.payload
      }
    case 'SET_STARS':
      level = state["level"][action.payload.level - 1]
      score = level.points
      const onStars = [score > level.starOne, score > level.starTwo, score > level.starThree]
      const newStarLevel = state.level.map(item => {
        if (item.level === action.payload.level) {
          return { ...item, star: onStars }
        }
        return item
      })

      return {
        ...state,
        level: newStarLevel
      }

    case 'START-TTT':
      console.log('STATE start TICTACTOE')
      const newBoard = createBoard(action.payload.row, action.payload.column)
      return {
        ...state,
        board: newBoard,
        players: action.payload.players,
        fruits: action.payload.fruits,
        progressOne: 0,
        progressTwo: 0
      }

    case 'PLAY':
      let newB = state.board
      if (newB[action.payload.row][action.payload.column] !== null) return { ...state }
      newB[action.payload.row][action.payload.column] = state.currentPlayer
      return {
        ...state,
        board: newB,

      }

    case 'SELECT':
      return {
        ...state,
        ...action.payload
      }

    case 'MATCH':

      let isMatch = checkMatch(state.board, action.payload.row, action.payload.column, state.currentPlayer)
      if (!isMatch[2]) return { ...state, currentPlayer: state.currentPlayer === 0 ? 1 : 0 }
      return {
        ...state,
        board: isMatch[0],
        progressOne: state.currentPlayer === 0 ? state.progressOne + isMatch[1] : state.progressOne,
        progressTwo: state.currentPlayer === 1 ? state.progressTwo + isMatch[1] : state.progressTwo,
        currentPlayer: state.currentPlayer === 0 ? 1 : 0

      }

    default:
      return state;
  }
};
