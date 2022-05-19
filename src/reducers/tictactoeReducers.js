
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createBoard, checkRowMatch, checkMatch, copyBoard} from '../utils/Utils'

export const tictactoeInitialState = {
  board: [],
  players:[],
  fruits:[],
  currentPlayer: 0
}

export const TictactoeReducer = (state, action) => {
  switch (action.type) {
    case 'START-TTT':
      console.log('STATE start TICTACTOE')
      const newBoard = createBoard(action.payload.row,action.payload.column)
      return {
        ...state, 
        board:newBoard,
        players:action.payload.players,
        fruits:action.payload.fruits        
      }

    case 'PLAY':
      let newB = state.board
      console.log('STATE play TICTACTOE')
      if(newB[action.payload.row][action.payload.column] !== null) return {...state}

      newB[action.payload.row][action.payload.column] = state.currentPlayer
      return {
        ...state,
        board:newB, 
      }
    
    case 'MATCH':
      console.log('TA NO MATCH')
      
      let isMatch = checkMatch(state.board, action.payload.row, action.payload.column, state.currentPlayer)
     
      return {        
        ...state,
        board:isMatch,
        currentPlayer:state.currentPlayer === 0?1:0
      }

    case 'SAVE':
      const saveScore = async () =>{
      try {
        const item = state["level"]
        const jItem = JSON.stringify(item)
        await AsyncStorage.setItem('@tictactoeScore', jItem).then(()=>
          console.log('SALVO COM SUCESSO')
        )
      } catch (e) {
        console.log('ERRO AO SALVAR - ',e)
      }
    }
      saveScore()
      return {...state}

    case 'OPEN_SCORE_SAVE':
     
      return {
        ...state,
        level:action.payload   
      }
      
    default:
      return state;
  }
};
