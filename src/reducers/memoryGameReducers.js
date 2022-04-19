import { LEVELS } from '../utils/Contants'
import AsyncStorage from '@react-native-async-storage/async-storage'

export const memoryGameInitialState = {
  level: LEVELS
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
      const saveScore = async () =>{
      try {
        const item = state["level"]
        const jItem = JSON.stringify(item)
        await AsyncStorage.setItem('@memoryGameScore', jItem).then(()=>
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
    case 'SET_STARS':
      level = state["level"][action.payload.level - 1]
      score = level.points
      const onStars = [score > level.starOne, score > level.starTwo ,score > level.starThree]
      const newStarLevel = state.level.map(item=>{
        if (item.level === action.payload.level) {
          return { ...item, star:onStars }
        }
        return item
      })
     
      return {  
        ...state,
        level:  newStarLevel
      }

    default:
      return state;
  }
};
