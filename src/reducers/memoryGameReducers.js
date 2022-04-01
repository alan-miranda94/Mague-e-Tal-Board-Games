import {LEVELS} from '../utils/Contants'

export const memoryGameInitialState = {
  level:LEVELS
  
}

export const MemoryGameReducer = (state, action) => {
  switch (action.type) {    
    case 'SET_SCORE':
     console.log('CHAMOU SET POINT')
      return {
              ...state,               
              }

    case 'SET_STARS':
      return { ...initialState }
    
    default:
      return state;
  }
};
